import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthService from '../services/authService'
import { Children } from '../types/props.type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import FetchClient from '../utils/FetchClient'
import { useUserContext } from './UserProvider'
import { io, Socket } from 'socket.io-client'

const storeAccessToken = async (access_token: string) => {
    try {
        await AsyncStorage.setItem('access_token', access_token)
    } catch (e) {
        console.error('Error saving to local storage')
    }
}

const getAccessToken = async () => {
    try {
        return await AsyncStorage.getItem('access_token')
    } catch (e) {
        console.error('Error saving to local storage')
    }
}

const SocketContext = createContext<Socket | null>(null)

interface AuthContextType {
    token: string | null
    logIn: Function
    logOut: Function
    register: Function
    loggedIn: boolean
}

const AuthContext = createContext<AuthContextType>({
    token: '',
    logIn: () => { },
    logOut: () => { },
    register: () => { },
    loggedIn: false
})

export function useAuthContext() {
    return useContext(AuthContext)
}

export function useSocket() {
    return useContext(SocketContext)
}

export default function AuthProvider({ children }: Children) {
    const [token, setToken] = useState<string | null>(null)
    const [socket, setSocket] = useState<Socket | null>(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const { getUserData, clearUserData } = useUserContext()

    const handleLoggedIn = (loggedIn: boolean) => {
        if (loggedIn) {
            setLoggedIn(true),
                getUserData()
            return
        }

        setLoggedIn(false)
        clearUserData()
    }

    FetchClient.setLoggedIn = handleLoggedIn

    async function logIn(email: string, password: string) {
        const response = await AuthService.logIn(
            email.toLowerCase().trim(),
            password
        ).then((response) => {
            return response
        })

        if (response.error) {
            return response
        }

        if (response.access_token) {
            storeAccessToken(response.access_token)
            setToken(response.access_token)
        }

        getUserData().then((error: number) => {
            if (!error) {
                setLoggedIn(true)
            }
        })

        return response
    }

    async function logOut() {
        return await AuthService.logOut().then((response) => {
            setToken('')
            setLoggedIn(false)
            socket && socket.removeAllListeners()
            return response
        })
    }

    async function register(key: number, email: string, password: string) {
        const response = await AuthService.register(key, email, password).then(
            (response) => {
                return response
            }
        )
        if (response.error) return response

        return await logIn(email, password)
    }

    async function loadToken() {
        const loadedToken = await getAccessToken()
        if (loadedToken && loadedToken.length > 0) {
            getUserData().then((error: number) => {
                !error && setLoggedIn(true)
            })
            setToken(loadedToken)
            return
        }
        setToken('')
    }

    useEffect(() => {
        loadToken()
    }, [])

    useEffect(() => {
        if (!token) {
            if (socket) {
                socket.disconnect()
                setSocket(null)
            }
            return
        }

        const newSocket = io(process.env.EXPO_PUBLIC_API_URL || '', {
            path: `/${process.env.EXPO_PUBLIC_API_VERSION || ''}socket.io`,
            transports: ['websocket'],
            auth: { token },
            forceNew: true,
            timeout: 5000
        })

        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
        }
    }, [token])

    const contextValue: AuthContextType = {
        token,
        logIn,
        logOut,
        register,
        loggedIn
    }

    return (
        <SocketContext.Provider value={socket}>
            <AuthContext.Provider value={contextValue}>
                {children}
            </AuthContext.Provider>
        </SocketContext.Provider>
    )
}

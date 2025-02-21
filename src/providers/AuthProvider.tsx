import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthService from '../services/authService'
import { Children } from '../types/props.type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import io from 'socket.io-client'
import FetchClient from '../utils/FetchClient'

export const socket = io(process.env.EXPO_PUBLIC_API_URL || '', {
    path: `/socket.io`,
    // path: `/${process.env.EXPO_PUBLIC_API_VERSION || ''}/socket.io`,
    transports: ['websocket'], // Use WebSocket transport explicitly (you can remove if not necessary)
    forceNew: true, // Ensures a new connection
    timeout: 5000 // Set a timeout for connection
})

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

interface AuthContextType {
    token: string
    logIn: Function
    logOut: Function
    register: Function
    loggedIn: boolean
}

const AuthContext = createContext<AuthContextType>({
    token: '',
    logIn: () => {},
    logOut: () => {},
    register: () => {},
    loggedIn: false
})

export function useAuthContext() {
    return useContext(AuthContext)
}

export default function AuthProvider({ children }: Children) {
    const [token, setToken] = useState<string>('')
    const [loggedIn, setLoggedIn] = useState(false)
    FetchClient.setLoggedIn = setLoggedIn

    async function logIn(email: string, password: string) {
        const response = await AuthService.logIn(email.toLowerCase().trim(), password).then(
            (response) => {
                return response
            }
        )

        if (response.error) {
            return response
        }

        if (response.access_token) {
            storeAccessToken(response.access_token)
        }

        setLoggedIn(true)

        return response
    }

    async function logOut() {
        return await AuthService.logOut().then((response) => {
            setToken('')
            setLoggedIn(false)
            socket.removeAllListeners()
            return response
        })
    }

    async function register(key: number, email: string, password: string) {
        const response = await AuthService.register(
            key,
            email,
            password
        ).then((response) => {
            return response
        })
        if (response.error) return response

        return await logIn(email, password)
    }

    async function connectToSocket() {
        const loadedToken = await getAccessToken()
        if (loadedToken && loadedToken.length > 0) {
            setLoggedIn(true)
            setToken(loadedToken)
                // TODO.. connect to socket
        }
    }

    useEffect(() => {
        connectToSocket()
    }, [])

    const contextValue: AuthContextType = {
        token,
        logIn,
        logOut,
        register,
        loggedIn
    }

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

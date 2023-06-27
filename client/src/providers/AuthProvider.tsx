import React, { createContext, useContext, useEffect, useState } from 'react'
import AuthService from '../services/authService'
import { apiLoginResponse } from '../types/response.type'
import { Children } from '../types/props.type'
import { User } from '../types/auth.type'
import AsyncStorage from '@react-native-async-storage/async-storage'

const storeCredentials = async (username: string, password: string) => {
    try {
        await AsyncStorage.setItem('credentials', JSON.stringify({ username, password }))
    } catch (e) {
        console.error('Error saving to local storage')
    }
}

const getCredentials = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('credentials')
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.error('Error reading from local storage')
    }
}

const userDataPlaceholder = {
    id: 0,
    username: '',
    openDayId: 1,
    accountType: { id: 0, accountType: '' },
    pictureName: null,
    ManagedClassroom: [],
    ReservedClassroom: [],
    TakenClassroom: []
}

const TokenContext = createContext<apiLoginResponse>({ error: 2, result: '' })
const LogInContext = createContext<Function>(() => {})
const LogOutContext = createContext<Function>(() => {})
const RegisterContext = createContext<Function>(() => {})
const UserDataContext = createContext<User>(userDataPlaceholder)
const CredentialsContext = createContext({ username: '', password: '' })

export function useToken() {
    return useContext(TokenContext)
}

export function useLogIn() {
    return useContext(LogInContext)
}

export function useLogOut() {
    return useContext(LogOutContext)
}

export function useRegister() {
    return useContext(RegisterContext)
}

export function useUserData() {
    return useContext(UserDataContext)
}

export function useCredentials() {
    return useContext(CredentialsContext)
}

export default function AuthProvider({ children }: Children) {
    const [token, setToken] = useState<apiLoginResponse>({
        error: 2,
        result: ''
    })
    const [userData, setUserData] = useState<User>(userDataPlaceholder)
    const [credentials, setCredentials] = useState({ username: '', password: '' })

    async function logIn(username: string, password: string) {
        const response = await AuthService.logIn(username, password).then((response) => {
            setToken(response)
            storeCredentials(username, password)
            return response
        })

        if (response.error) return response

        return await getUserData()
    }

    async function logOut() {
        return await AuthService.logOut().then((response) => {
            setToken({ error: 1, result: '' })
            return response
        })
    }

    async function register(key: number, username: string, password: string) {
        const response = await AuthService.register(key, username, password).then((response) => {
            setToken(response)
            return response
        })
        if (response.error) return response

        return await logIn(username, password)
    }

    async function getUserData() {
        return await AuthService.getUserData().then((response) => {
            setUserData(response.result)
            return response
        })
    }

    useEffect(() => {
        getCredentials().then((credentials) => {
            if (credentials) {
                setCredentials(credentials)
                logIn(credentials.username, credentials.password).then()
            }
        })
    }, [])

    return (
        <TokenContext.Provider value={token}>
            <LogInContext.Provider value={logIn}>
                <LogOutContext.Provider value={logOut}>
                    <UserDataContext.Provider value={userData}>
                        <CredentialsContext.Provider value={credentials}>
                            <RegisterContext.Provider value={register}>{children}</RegisterContext.Provider>
                        </CredentialsContext.Provider>
                    </UserDataContext.Provider>
                </LogOutContext.Provider>
            </LogInContext.Provider>
        </TokenContext.Provider>
    )
}

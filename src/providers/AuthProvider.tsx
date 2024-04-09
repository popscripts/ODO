import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState
} from 'react'
import AuthService from '../services/authService'
import { apiLoginResponse } from '../types/response.type'
import { Children } from '../types/props.type'
import { User } from '../types/auth.type'
import AsyncStorage from '@react-native-async-storage/async-storage'
import io from 'socket.io-client'
import { API_URL } from '../config'
import { AppState } from 'react-native'
export const socket = io(API_URL)

const storeCredentials = async (username: string, password: string) => {
    try {
        await AsyncStorage.setItem(
            'credentials',
            JSON.stringify({ username, password })
        )
    } catch (e) {
        console.error('Error saving to local storage')
    }
}

const storeLogIn = async (login: boolean) => {
    try {
        await AsyncStorage.setItem('login', String(login))
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

const getLogIn = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('login')
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.error('Error reading from local storage')
    }
}

const userDataPlaceholder = {
    id: 0,
    username: '',
    openDayId: 1,
    accountType: { id: 0, name: '' },
    pictureName: null,
    name: null,
    ManagedClassroom: null,
    Group: null
}

const TokenContext = createContext<apiLoginResponse>({ error: 2, result: '' })
const LogInContext = createContext<Function>(() => {})
const LogOutContext = createContext<Function>(() => {})
const RegisterContext = createContext<Function>(() => {})
const UserDataContext = createContext<User>(userDataPlaceholder)
const CredentialsContext = createContext({ username: '', password: '' })
const UpdateNameContext = createContext((name: string, surname: string) => {})
const LoggedInContext = createContext(false)
const GetUserDataContext = createContext(async () => {})

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

export function useUpdateName() {
    return useContext(UpdateNameContext)
}

export function useLoggedIn() {
    return useContext(LoggedInContext)
}

export function useGetUserData() {
    return useContext(GetUserDataContext)
}

export default function AuthProvider({ children }: Children) {
    const [token, setToken] = useState<apiLoginResponse>({
        error: 2,
        result: ''
    })
    const [userData, setUserData] = useState<User>(userDataPlaceholder)
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    })
    const [loggedIn, setLoggedIn] = useState(false)

    async function logIn(username: string, password: string) {
        const response = await AuthService.logIn(username, password).then(
            (response) => {
                storeCredentials(username, password)
                storeLogIn(true)
                setCredentials({ username: username, password: password })
                return response
            }
        )

        if (response.error) {
            setToken(response)
            return response
        }

        await getUserData().then(() => {
            setLoggedIn(true)
            setToken(response)
        })

        return response
    }

    async function logOut() {
        return await AuthService.logOut().then((response) => {
            setToken({ error: 1, result: '' })
            setLoggedIn(false)
            setTimeout(() => setUserData(userDataPlaceholder), 300)
            storeLogIn(false)
            socket.removeAllListeners()
            return response
        })
    }

    async function register(key: number, username: string, password: string) {
        const response = await AuthService.register(
            key,
            username,
            password
        ).then((response) => {
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

    function handleUpdateName(name: string, surname: string) {
        AuthService.setUserName(userData.id, `${name} ${surname}`)
        setTimeout(() => {
            const data = { ...userData, name: `${name} ${surname}` }
            setUserData(data)
        }, 1500)
    }

    function joinRoom() {
        if (userData.accountType) {
            let data = {
                accountType: userData.accountType.name,
                id: userData.id
            }
            socket.emit('joinRoom', data)
        }
    }

    useEffect(() => {
        loggedIn && joinRoom()
    }, [loggedIn])

    useEffect(() => {
        getCredentials().then((credentials) => {
            if (credentials) {
                setCredentials(credentials)
                getLogIn().then((response) => {
                    response
                        ? logIn(
                              credentials.username,
                              credentials.password
                          ).then()
                        : setToken({ error: 1, result: '' })
                })
            } else {
                setToken({ error: 1, result: '' })
            }
        })
    }, [])

    const appState = useRef(AppState.currentState)

    useEffect(() => {
        const subscription = AppState.addEventListener(
            'change',
            (nextAppState) => {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    loggedIn && joinRoom()
                }

                appState.current = nextAppState
            }
        )

        return () => {
            subscription.remove()
        }
    }, [])

    return (
        <TokenContext.Provider value={token}>
            <LogInContext.Provider value={logIn}>
                <LogOutContext.Provider value={logOut}>
                    <UserDataContext.Provider value={userData}>
                        <CredentialsContext.Provider value={credentials}>
                            <UpdateNameContext.Provider
                                value={handleUpdateName}
                            >
                                <RegisterContext.Provider value={register}>
                                    <LoggedInContext.Provider value={loggedIn}>
                                        <GetUserDataContext.Provider
                                            value={getUserData}
                                        >
                                            {children}
                                        </GetUserDataContext.Provider>
                                    </LoggedInContext.Provider>
                                </RegisterContext.Provider>
                            </UpdateNameContext.Provider>
                        </CredentialsContext.Provider>
                    </UserDataContext.Provider>
                </LogOutContext.Provider>
            </LogInContext.Provider>
        </TokenContext.Provider>
    )
}

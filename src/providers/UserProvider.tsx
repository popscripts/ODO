import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { User } from '../types/auth.type'
import UserService from '../services/userService'
import { useAuthContext } from './AuthProvider'

const userDataPlaceholder = {
    id: 0,
    email: '',
    openDayId: 1,
    accountType: { id: 0, name: '' },
    pictureName: null,
    name: null,
    ManagedClassroom: null,
    Group: null
}

interface UserContextType {
    userData: User
    updateName: Function
    getUserData: Function
    setPicture: Function
}

const UserContext = createContext<UserContextType>({
    userData: userDataPlaceholder,
    updateName: (name: string, surname: string) => {},
    getUserData: async () => {},
    setPicture: (formData: FormData) => {}
})

export function useUserContext() {
    return useContext(UserContext)
}

export default function UserProvider({ children }: Children) {
    const [userData, setUserData] = useState<User>(userDataPlaceholder)
    const {loggedIn} = useAuthContext()

    async function getUserData() {
        return await UserService.getUserData().then((response) => {
            setUserData(response.result as User)
            return response
        })
    }

    async function updateName(name: string, surname: string) {
        const response = await UserService.setUserName(`${name} ${surname}`)
        if (response.error) return false
        setTimeout(() => {
            const data = { ...userData, name: `${name} ${surname}` }
            setUserData(data)
        }, 1500)
        return true
    }

    function setPicture(formData: FormData) {
        UserService.setPicture(formData).then(() => {
            getUserData()
        })
    }

    const contextValue: UserContextType = {
        userData,
        updateName,
        getUserData,
        setPicture
    }

    useEffect(() => {
        if (loggedIn) {
            getUserData()
        } else {
            setTimeout(() => setUserData(userDataPlaceholder), 300)
        }

    },[loggedIn])

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    )
}

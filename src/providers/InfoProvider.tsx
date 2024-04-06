import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import InfoService from '../services/InfoService'
import { socket } from './AuthProvider'
import { useLoggedIn } from './AuthProvider'

const InfoContext = createContext<string>('')

export function useInfo() {
    return useContext(InfoContext)
}

function InfoProvider({ children }: Children) {
    const [info, setInfo] = useState('')
    const loggedIn = useLoggedIn()

    useEffect(() => {
        if (loggedIn) {
            InfoService.getInfo().then((res) => {
                setInfo(res.result.content)
            })

            socket.on('infoUpdate', (res) => {
                setInfo(res.info.content)
            })
        }
    }, [loggedIn])

    return <InfoContext.Provider value={info}>{children}</InfoContext.Provider>
}

export default InfoProvider

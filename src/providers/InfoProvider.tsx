import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import InfoService from '../services/InfoService'
import { socket, useAuthContext } from './AuthProvider'

const InfoContext = createContext<string>('')

export function useInfo() {
    return useContext(InfoContext)
}

function InfoProvider({ children }: Children) {
    const [info, setInfo] = useState('')
    const { loggedIn } = useAuthContext()

    useEffect(() => {
        if (loggedIn) {
            InfoService.getInfo().then((res) => {
                const result = res.result as {content: string}
                setInfo(result.content)
            })

            socket.on('infoUpdate', (res) => {
                const result = res.result as {content: string}
                setInfo(result.content)
            })
        }
    }, [loggedIn])

    return <InfoContext.Provider value={info}>{children}</InfoContext.Provider>
}

export default InfoProvider

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import InfoService from '../services/InfoService'
import { useAuthContext, useSocket } from './AuthProvider'

const InfoContext = createContext<string>('')

export function useInfo() {
    return useContext(InfoContext)
}

function InfoProvider({ children }: Children) {
    const socket = useSocket()
    const [info, setInfo] = useState('')
    const { loggedIn } = useAuthContext()

    useEffect(() => {
        if (loggedIn) {
            InfoService.getInfo().then((res) => {
                const result = res.result as { content: string }
                setInfo(result.content)
            })

            socket &&
                socket.on('infoUpdate', (res) => {
                    const result = res.result as { content: string }
                    setInfo(result.content)
                })
        }
    }, [loggedIn, socket])

    return <InfoContext.Provider value={info}>{children}</InfoContext.Provider>
}

export default InfoProvider

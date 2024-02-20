import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'

const ClockContext = createContext<boolean>(false)

export function useClock() {
    return useContext(ClockContext)
}

function ClockProvider({ children }: Children) {
    const [clock, setClock] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setClock((clock) => !clock)
        }, 1000)
        return () => {
            clearInterval(interval)
        }
    }, [])

    return (
        <ClockContext.Provider value={clock}>{children}</ClockContext.Provider>
    )
}

export default ClockProvider

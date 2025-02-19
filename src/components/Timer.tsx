import React, { useEffect, useState } from 'react'
import { useClockContext } from '../providers/ClockProvider'
import TimerDisplay from './TimerDisplay'

type Props = {
    changedAt: string | null
    reverse?: boolean
}
function Timer({ changedAt, reverse = false }: Props) {
    const MAX_TIME = parseInt(process.env.EXPO_APP_MAX_TIME || '600000')
    const clock = useClockContext()

    const [time, setTime] = useState(0)

    useEffect(() => {
        const changedAtDate = changedAt
            ? new Date(new Date(changedAt).getTime())
            : null
        const now = new Date()

        const timePassed = changedAtDate
            ? now.getTime() - changedAtDate.getTime()
            : 0
        let timeLeft = timePassed ? MAX_TIME - timePassed : 0
        setTime(reverse ? timePassed : timeLeft)
    }, [clock])

    return <TimerDisplay time={time} />
}

export default Timer

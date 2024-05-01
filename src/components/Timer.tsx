import React, { useEffect, useState } from 'react'
import { useClock } from '../providers/ClockProvider'
import TimerDisplay from './TimerDisplay'
import { MAX_TIME } from '../config'

type Props = {
    changedAt: string | null
    reverse?: boolean
}
function Timer({ changedAt, reverse = false }: Props) {
    const clock = useClock()

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

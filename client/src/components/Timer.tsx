import React, { useEffect, useState } from 'react'
import { MediumText } from './commonStyles'
import { useClock } from '../providers/ClockProvider'
import TimerDisplay from './TimerDisplay'

type Props = {
    timeLeft: number | null
}
function Timer({ timeLeft }: Props) {
    // Get time with timezone
    const clock = useClock()

    const [time, setTime] = useState(timeLeft || 0)

    useEffect(() => {
        setTime((time) => time - 1000)
    }, [clock])

    return <TimerDisplay time={time} />
}

export default Timer

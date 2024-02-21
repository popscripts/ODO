import React from 'react'
import { MediumText } from './commonStyles'
import { Text } from 'react-native'

type Props = {
    time: number
}
function TimerDisplay({ time }: Props) {
    const minus = time < 0 ? 1 : 0
    const Minutes = Math.abs(Math.floor((time / 1000 / 60) % 60) + minus)
        .toString()
        .padStart(2, '0')

    const Seconds = Math.abs(Math.floor(((time / 1000) % 60) + minus))
        .toString()
        .padStart(2, '0')
    return (
        <MediumText>
            {minus ? '-' : ''}
            {Minutes}:{Seconds}
            {minus ? <Text style={{ color: 'transparent' }}>-</Text> : ''}
        </MediumText>
    )
}

export default TimerDisplay

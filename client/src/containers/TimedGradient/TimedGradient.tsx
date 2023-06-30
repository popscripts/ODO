import React, { useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { AnimatedStyle, Gradient } from './TimedGradientStyle'

type Props = {
    changedAt: string
    colors: any[]
}

function TimedGradient({ changedAt, colors }: Props) {
    // Get time with timezone
    const changedAtDate = new Date(new Date(changedAt).getTime() + new Date().getTimezoneOffset() * 60000)
    const now = new Date()

    const timePassed = now.getTime() - changedAtDate.getTime()
    const maxTime = 600000

    const startAnimation = 1 - timePassed / maxTime
    const timeLeft = maxTime - timePassed

    const scale = useRef(new Animated.Value(startAnimation)).current

    Animated.timing(scale, {
        toValue: 0,
        duration: timeLeft,
        easing: Easing.linear,
        useNativeDriver: true
    }).start()

    return (
        <Animated.View
            style={[
                {
                    transform: [{ scaleX: scale }]
                },
                AnimatedStyle
            ]}
        >
            <Gradient colors={colors} />
        </Animated.View>
    )
}

export default TimedGradient

import React, { useRef } from 'react'
import { Animated, Easing } from 'react-native'
import { AnimatedStyle, Gradient } from './TimedGradientStyle'

type Props = {
    changedAt: string
    colors: any[]
}

function TimedGradient({ changedAt, colors }: Props) {
    const MAX_TIME = parseInt(process.env.EXPO_APP_MAX_TIME || '600000')

    const changedAtDate = new Date(new Date(changedAt).getTime())
    const now = new Date()

    const timePassed = now.getTime() - changedAtDate.getTime()

    const startAnimation = 1 - timePassed / MAX_TIME
    const timeLeft = MAX_TIME - timePassed

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

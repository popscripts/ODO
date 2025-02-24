import React, { useEffect, useRef } from 'react'
import { Gradient, WrapperStyle } from './TimedGradientStyle'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

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
    const scale = useSharedValue(startAnimation)

    useEffect(() => {
        scale.value = withTiming(0, { duration: timeLeft, easing: Easing.linear })
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: scale.value }]
    }))

    return (
        <Animated.View
            style={[
                animatedStyle,
                WrapperStyle
            ]}
        >
            <Gradient colors={colors} />
        </Animated.View>
    )
}

export default TimedGradient

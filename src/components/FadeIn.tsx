import React, { useEffect, useRef } from 'react'
import { Children } from '../types/props.type'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

function FadeIn({ children }: Children) {
    const animation = useSharedValue(0)

    useEffect(() => {
        animation.value = withTiming(1, { duration: 1000 })
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({ opacity: animation.value }))

    return (
        <Animated.View style={animatedStyle}>{children}</Animated.View>
    )
}

export default FadeIn

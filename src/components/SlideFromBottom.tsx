import React, { useEffect, useRef } from 'react'
import { Dimensions } from 'react-native'
import { Children } from '../types/props.type'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

function SlideFromBottom({ children }: Children) {
    const height = Dimensions.get('screen').height
    const animation = useSharedValue(height)

    useEffect(() => {
        animation.value = withTiming(0, { duration: 800 })
    }, [])

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: animation.value }]
    }))

    return (
        <Animated.View style={animatedStyle}>
            {children}
        </Animated.View >
    )
}

export default SlideFromBottom

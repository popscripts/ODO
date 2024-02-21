import React, { useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Children } from '../types/props.type'

function FadeIn({ children }: Children) {
    const animation = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }, [])

    return (
        <Animated.View style={{ opacity: animation }}>{children}</Animated.View>
    )
}

export default FadeIn

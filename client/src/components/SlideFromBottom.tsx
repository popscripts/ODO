import React, { useEffect, useRef } from 'react'
import { Animated, Dimensions } from 'react-native'
import { Children } from '../types/props.type'

function SlideFromBottom({ children }: Children) {
    const height = Dimensions.get('window').height
    const animation = useRef(new Animated.Value(height)).current

    useEffect(() => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true
        }).start()
    }, [])

    return <Animated.View style={{ transform: [{ translateY: animation }] }}>{children}</Animated.View>
}

export default SlideFromBottom

import { useEffect, useState } from 'react'
import { Keyboard, LayoutAnimation } from 'react-native'

export function useKeyboardHeight() {
    const [keyboardHeight, setKeyboardHeight] = useState(0)

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setKeyboardHeight(e.endCoordinates.height)
        })
        const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            setKeyboardHeight(0)
        })
        return () => {
            showSubscription.remove()
            hideSubscription.remove()
        }
    }, [])

    return keyboardHeight
}

import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { ViewStyle } from 'react-native'

export const Gradient = styled(LinearGradient)`
    width: 100%;
    height: 100%;
`

export const AnimatedStyle: ViewStyle = {
    position: 'absolute',
    width: '200%',
    height: 150,
    right: 0
}

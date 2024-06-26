import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

export const Wrapper = styled(SafeAreaView)`
    height: 100%;
    display: flex;
    align-items: center;
`

export const Background = styled.View`
    position: absolute;
    background-color: ${() => colors.background};
    width: 100%;
    height: 100%;
`

type TabsGradientProps = {
    bottom: number
}

export const TabsGradient = styled(LinearGradient)<TabsGradientProps>`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: ${(props) => props.bottom + 80}px;
`

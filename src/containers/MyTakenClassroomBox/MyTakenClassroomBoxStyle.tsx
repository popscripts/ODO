import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { spacing } from '../../theme/spacing'

export const Wrapper = styled(LinearGradient)`
    width: 100%;
    border-radius: 20px;
    elevation: 6;
    overflow: hidden;
    position: relative;
`

export const ContentWrapper = styled.View`
    padding: ${spacing.md} ${spacing.md} ${spacing.lg} ${spacing.md};
    position: relative;
`

export const Press = styled.TouchableHighlight`
    border-radius: 20px;
    width: 100%;
`

export const IconWrapper = styled.TouchableOpacity`
    position: absolute;
    right: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    margin: ${spacing.md} ${spacing.xs} 0 0;
`

export const TimerWrapper = styled.View`
    transform: scale(1.3);
    transform-origin: left;
    margin-top: ${spacing.sm};
`

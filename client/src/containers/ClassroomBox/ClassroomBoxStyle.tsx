import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { spacing } from '../../theme/spacing'

type WrapperProps = {
    width: number
}

export const Wrapper = styled(LinearGradient)<WrapperProps>`
    width: ${(props) => (props.width - 45) / 2}px;
    border-radius: 20px;
    elevation: 6;
    overflow: hidden;
`

export const ContentWrapper = styled.View`
    width: 100%;
    padding: ${spacing.sm};
`

export const TimerWrapper = styled.View`
    width: 100%;
    justify-content: center;
    align-items: center;
    padding-top: ${spacing.sm};
`

export const Highlight = styled(LinearGradient)`
    width: 96%;
    height: 20px;
    margin: 2%;
    border-radius: 0 0 20px 20px;
    position: absolute;
    bottom: 0;
`

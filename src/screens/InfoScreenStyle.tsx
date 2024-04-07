import styled from 'styled-components/native'
import { WebView } from 'react-native-webview'
import { colors } from '../theme/colors'

type WrapperProps = {
    height: number
}

export const Wrapper = styled.View<WrapperProps>`
    width: 90%;
    height: ${(props) => props.height - 120}px;
    border-radius: 20px;
    margin-top: 10px;
    overflow: hidden;
    background-color: #505063;
`

export const Corner = styled.View`
    height: 30px;
    width: 30px;
    background-color: ${colors.palette.primary200};
    position: absolute;
    right: 0;
    elevation: 4;
    z-index: 5;
`

export const Radius = styled.View`
    height: 20px;
    width: 100%;
    background-color: ${colors.palette.neutral600};
    padding: 2px;
`

export const Web = styled(WebView)`
    height: 100%;
    width: 100%;
`

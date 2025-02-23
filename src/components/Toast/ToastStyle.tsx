import styled from 'styled-components/native'
import { colors } from '../../theme/colors'

type ToastContainerProps = {
    bottom: number
}

export const ToastContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 5px;
    background-color: ${colors.palette.angry200};
    max-width: 85%;
    padding: 10px 20px;
    border-radius: 10px;
    margin-bottom: ${(props: ToastContainerProps) => props.bottom}px;
`
export const ToastMessage = styled.Text`
    color: ${colors.text}
`
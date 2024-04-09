import styled from 'styled-components/native'
import { spacing } from '../../theme/spacing'

type Props = {
    top: number
}

export const XWrapper = styled.View<Props>`
    position: absolute;
    right: 0;
    top: ${(props) => props.top}px;
    z-index: 100;
`

export const Press = styled.TouchableOpacity`
    padding: ${spacing.lg};
`

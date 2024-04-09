import styled from "styled-components/native";
import { spacing } from "../../theme/spacing";

type Props = {
    top: number
}

export const XWrapper = styled.View<Props>`
    position: absolute;
    right: ${spacing.lg};
    top: ${props => props.top + spacing.xl}
`
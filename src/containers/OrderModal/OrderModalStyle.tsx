import styled from "styled-components/native"
import { colors } from "../../theme/colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { spacing } from "../../theme/spacing"

export const Background = styled(SafeAreaView)`
    width: 100%;
    height: 100%;
    background-color: ${colors.background};
    display: flex;
    align-items: center;
`

export const OrderWrapper = styled.View`
    width: 90%;
    background-color: ${colors.palette.neutral500};
    padding: ${spacing.md};
    border-radius: ${spacing.md};
    display: flex;
    flex-direction: row;
`

export const InputWrapper = styled.View`
    transform: scale(0.6);
    transform-origin: right;
`

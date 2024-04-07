import styled from "styled-components/native"
import { colors } from "../../theme/colors"
import { typography } from "../../theme/typography"
import { spacing } from "../../theme/spacing"

export const AddButton = styled.TouchableOpacity`
    background-color: ${colors.palette.quinary200};
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding: 0 20px 0 30px;
    margin: 20px;
`

export const AddButtonText = styled.Text`
    font-family: ${typography.primary.medium};
    color: ${colors.text};
    font-size: ${spacing.md};
    padding: 10px;
    text-align: center;
`
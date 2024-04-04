import styled from "styled-components/native"
import { colors } from "../../theme/colors"
import { spacing } from "../../theme/spacing"
import { typography } from "../../theme/typography"

export const Heading = styled.Text`
    color: ${colors.text};
    font-size: ${spacing.xxl};
    font-family: ${typography.primary.bold};
`

export const ColorSpan = styled.Text`
    color: ${colors.palette.primary200};
`

export const SubHeading = styled.Text`
    color: ${colors.text};
    font-size: ${spacing.md};
    margin-left: ${spacing.md};
    font-family: ${typography.primary.normal};
`

export const Wrapper = styled.View`
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    gap: ${spacing.md};
    padding: ${spacing.md};
`
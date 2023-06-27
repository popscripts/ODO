import styled from 'styled-components/native'
import { typography } from '../theme/typography'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'

export const ErrorText = styled.Text`
    font-family: ${typography.primary.medium};
    color: ${colors.palette.angry500};
    padding-left: ${spacing.md};
    padding-right: ${spacing.md};
`

export const Heading = styled.Text`
    font-family: ${typography.primary.bold};
    font-size: ${spacing.lg};
    color: ${colors.text};
`

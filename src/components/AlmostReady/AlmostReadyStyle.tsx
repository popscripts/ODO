import styled from 'styled-components/native'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'
import { colors } from '../../theme/colors'

export const Text = styled.Text`
    font-family: ${typography.primary.semiBold};
    font-size: ${spacing.xxl};
    color: ${colors.text};
`

export const Color = styled.Text`
    color: ${colors.palette.primary200};
`

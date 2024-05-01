import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const Heading = styled.Text`
    color: ${colors.text};
    font-size: ${spacing.lg};
    font-family: ${typography.primary.bold};
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
    flex-flow: row nowrap;
    gap: ${spacing.md};
    padding: ${spacing.md};
`

export const Button = styled.TouchableOpacity`
    background-color: ${colors.palette.neutral600};
    border-radius: 20px;
    padding: ${spacing.xs} ${spacing.md} ${spacing.xs} ${spacing.md};
    margin-top: ${spacing.xs};
`

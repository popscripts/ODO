import styled from 'styled-components/native'
import { typography } from '../theme/typography'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'

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

export const DefaultBackground = styled.View`
    height: 100%;
    width: 100%;
    background-color: ${colors.background};
`

export const SafeArea = styled(SafeAreaView)`
    width: 100%;
    height: 100%;
`

export const Link = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.md};
    color: ${colors.text};
    text-decoration: underline;
`

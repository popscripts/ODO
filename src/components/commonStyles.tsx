import styled from 'styled-components/native'
import { typography } from '../theme/typography'
import { colors } from '../theme/colors'
import { spacing } from '../theme/spacing'
import { SafeAreaView } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'

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
export const HeadingCenter = styled.Text`
    font-family: ${typography.primary.bold};
    font-size: ${spacing.lg};
    color: ${colors.text};
    margin: ${spacing.lg};
    width: 100%;
    text-align: center;
`

export const MediumText = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.nm};
    color: ${colors.text};
`

export const SmallText = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.sm};
    color: ${colors.text};
`

export const MediumTextCenter = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.nm};
    color: ${colors.text};
    width: 100%;
    text-align: center;
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

export const Scroll = styled.ScrollView`
    width: 100%;
`

export const Link = styled.Text`
    font-family: ${typography.primary.normal};
    font-size: ${spacing.md};
    color: ${colors.text};
    text-decoration: underline;
`

export const StretchWrapper = styled.View`
    width: 100%;
    flex-grow: 20;
    justify-content: center;
    align-items: center;
`

export const TextDim = styled.Text`
    color: ${colors.textDim};
`

export const HigherLinearGradient = styled(LinearGradient)`
    margin-top: -35px;
`

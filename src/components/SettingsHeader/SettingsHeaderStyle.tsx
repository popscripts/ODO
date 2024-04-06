import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'
import { ImageBackground } from 'react-native'

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

type WrapperProps = {
    top: number
}

export const Wrapper = styled.View`
    width: 100%;
    margin-bottom: ${spacing.xl};
`

export const Image = styled.ImageBackground<WrapperProps>`
    padding-top: ${(props) => props.top}px;
    margin-top: ${(props) => -props.top}px;
`

export const InsideWrapper = styled.View`
    padding: ${spacing.xxl} ${spacing.md};
    width: 100%;
    display: flex;
    gap: ${spacing.md};
    flex-flow: column nowrap;
`

export const LogoutButton = styled.TouchableOpacity`
    position: absolute;
    padding: 10px;
    right: 10px;
    top: 10px;
`

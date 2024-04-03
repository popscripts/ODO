import { styled } from 'styled-components/native'
import { colors } from '../../theme/colors'
import { spacing } from '../../theme/spacing'
import { typography } from '../../theme/typography'

export const Background = styled.View`
    width: 100%;
    height: 100%;
    background-color: ${colors.palette.overlay50};
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${spacing.xxl};
    gap: ${spacing.md};
`

export const Backdrop = styled.Pressable`
    width: 100%;
    height: 100%;
    background-color: ${colors.palette.blackoverlay80};
    display: flex;
    align-items: center;
    justify-content: center;
`

type ClassroomNumberProps = {
    color: string
}

export const ClassroomNumber = styled.Text<ClassroomNumberProps>`
    font-size: ${spacing.xxxl};
    font-family: ${typography.primary.bold};
    color: ${(props) => props.color};
`

export const ClassroomTitle = styled.Text`
    font-size: ${spacing.lg};
    font-family: ${typography.primary.semiBold};
    color: ${colors.text};
`

export const ClassroomManager = styled.Text`
    color: ${colors.text};
    margin-top: ${spacing.xxl};
    bottom: ${spacing.md};
`

export const Warning = styled.Text`
    font-size: ${spacing.md};
    font-family: ${typography.primary.normal};
    color: ${colors.textDim};
    text-align: center;
    margin: ${spacing.xxl};
`

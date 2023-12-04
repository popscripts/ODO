import { styled } from "styled-components/native";
import { colors } from '../../theme/colors'
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

export const Background = styled.View`
    width: 90%;
    height: 80%;
    background-color: ${colors.background};
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: ${spacing.lg};
    gap: ${spacing.md}
`

export const Backdrop = styled.Pressable`
    width: 100%;
    height: 100%;
    background-color: ${colors.palette.blackoverlay60};
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
    color: ${(props) => props.color}
`

export const ClassroomTitle = styled.Text`
    font-size: ${spacing.lg};
    font-family: ${typography.primary.semiBold};
    color: ${colors.text};
`




import styled from 'styled-components/native'
import { colors } from '../../theme/colors'
import { typography } from '../../theme/typography'
import { spacing } from '../../theme/spacing'

type TextInputProps = {
    placeholder: string
    value: string
    onChangeText: Function
    onFocus: Function
    onBlur: Function
    focused: boolean
}

export const TextInput = styled.TextInput<TextInputProps>`
    background-color: ${colors.palette.overlay22};
    color: ${colors.text};
    font-family: ${typography.primary.medium};
    font-size: ${spacing.xl};
    height: 55px;
    padding: ${spacing.xs};
    width: 60px;
    text-align: center;
    border: 1px
        ${(props) =>
            props.focused
                ? colors.palette.primary300
                : colors.palette.neutral600};
    position: relative;
    z-index: 3;
`

type ButtonProps = {
    focused: boolean
}

export const LeftButton = styled.TouchableOpacity<ButtonProps>`
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding: 15px;
    background-color: ${(props) =>
        props.focused ? colors.palette.primary300 : colors.palette.neutral600};
    margin-right: -1px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const RightButton = styled.TouchableOpacity<ButtonProps>`
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    padding: 15px;
    background-color: ${(props) =>
        props.focused ? colors.palette.primary300 : colors.palette.neutral600};
    margin-left: -1px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
`

export const Wrapper = styled.View`
    display: flex;
    flex-direction: row;
`

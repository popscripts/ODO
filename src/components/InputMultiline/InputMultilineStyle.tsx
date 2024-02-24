import styled from "styled-components/native";
import { colors } from "../../theme/colors";
import { typography } from "../../theme/typography";
import { spacing } from "../../theme/spacing";

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
    font-size: ${spacing.md};
    height: 100%;
    padding: ${spacing.xs};
    width: 100%;
    border-radius: 10px;
    border: 1px
        ${(props) =>
            props.focused
                ? colors.palette.primary300
                : colors.palette.neutral300};
    position: relative;
    z-index: 3;
`

export const Wrapper = styled.KeyboardAvoidingView`
    width: 100%;
    height: 120px;
`

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
    error: boolean
}

export const TextInput = styled.TextInput<TextInputProps>`
    background-color: ${(props) => (props.error ? colors.palette.angry100 : colors.palette.overlay22)};
    color: ${colors.text};
    font-family: ${typography.primary.medium};
    font-size: ${spacing.md};
    padding: ${spacing.xs};
    padding-left: ${spacing.md};
    border-radius: 10px;
    border: 1px ${(props) => (props.focused ? colors.palette.primary300 : colors.palette.neutral300)};
`

export const Wrapper = styled.View`
    width: 100%;
    flex-shrink: 3;
`

export const InputIconWrapper = styled.TouchableOpacity`
    position: absolute;
    z-index: 3;
    right: 0;
    height: ${spacing.xxl};
    width: ${spacing.xxl};
    display: flex;
    justify-content: center;
    align-items: center;
`

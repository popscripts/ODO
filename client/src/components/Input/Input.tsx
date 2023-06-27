import React, { useState } from 'react'
import { InputIcon, InputIconWrapper, TextInput, Wrapper } from './InputStyle'
import { ErrorText } from '../commonStyles'
import { colors } from '../../theme/colors'
import { KeyboardTypeOptions } from 'react-native'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

type Props = {
    text: string
    setText: Function
    placeholder: string
    error?: boolean
    errorText?: string | undefined
    password?: boolean
    keyboardType?: KeyboardTypeOptions
}
function Input({
    text,
    setText,
    placeholder,
    error = false,
    errorText,
    password = false,
    keyboardType = 'default'
}: Props) {
    const [focused, setFocused] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(password)

    function handlePassword() {
        setShowPassword((showPassword) => !showPassword)
    }
    return (
        <Wrapper>
            {password && (
                <InputIconWrapper onPress={handlePassword}>
                    <InputIcon icon={showPassword ? faEyeSlash : faEye} size={20} />
                </InputIconWrapper>
            )}

            <TextInput
                placeholder={placeholder}
                value={text}
                onChangeText={(e) => setText(e)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                focused={focused}
                error={error}
                placeholderTextColor={colors.textDim}
                autoCapitalize={'none'}
                secureTextEntry={showPassword}
                keyboardType={keyboardType}
            />
            {errorText && <ErrorText>{errorText}</ErrorText>}
        </Wrapper>
    )
}

export default Input

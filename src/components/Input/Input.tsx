import React, { useState } from 'react'
import { InputIconWrapper, TextInput, Wrapper } from './InputStyle'
import { ErrorText } from '../commonStyles'
import { colors } from '../../theme/colors'
import { KeyboardTypeOptions } from 'react-native'
import EyeIcon from '../icons/EyeIcon'
import EyeClosedIcon from '../icons/EyeClosedIcon'

type Props = {
    text: string
    setText: Function
    placeholder: string
    error?: boolean
    errorText?: string | undefined
    password?: boolean
    keyboardType?: KeyboardTypeOptions
    autoCapitalize?: boolean
}
function Input({
    text,
    setText,
    placeholder,
    error = false,
    errorText,
    password = false,
    keyboardType = 'default',
    autoCapitalize = false
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
                    {showPassword ? (
                        <EyeClosedIcon
                            color={colors.palette.neutral300}
                            size={25}
                        />
                    ) : (
                        <EyeIcon color={colors.palette.neutral300} size={25} />
                    )}
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
                autoCapitalize={autoCapitalize ? 'words' : 'none'}
                secureTextEntry={showPassword}
                keyboardType={keyboardType}
            />
            {errorText && <ErrorText>{errorText}</ErrorText>}
        </Wrapper>
    )
}

export default Input

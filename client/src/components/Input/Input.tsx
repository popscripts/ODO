import React, { useState } from 'react'
import { TextInput, Wrapper } from './InputStyle'
import { ErrorText } from '../commonStyles'
import { colors } from '../../theme/colors'
import { KeyboardTypeOptions } from 'react-native'

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
    return (
        <Wrapper>
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
                secureTextEntry={password}
                keyboardType={keyboardType}
            />
            {errorText && <ErrorText>{errorText}</ErrorText>}
        </Wrapper>
    )
}

export default Input

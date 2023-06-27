import React from 'react'
import { Children } from '../../types/props.type'
import { Keyboard } from 'react-native'
import { FormWrapper, Press } from './FormScreenWrapperStyle'

function FormScreenWrapper({ children }: Children) {
    return (
        <Press onPress={() => Keyboard.dismiss()}>
            <FormWrapper>{children}</FormWrapper>
        </Press>
    )
}

export default FormScreenWrapper

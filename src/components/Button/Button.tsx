import React from 'react'
import { ButtonText, ButtonWrapper } from './ButtonStyle'
import { colors } from '../../theme/colors'

type Props = {
    content: string
    onPress: Function
    color?: string
}

function Button({ content, onPress, color = colors.palette.quinary400 }: Props) {
    return (
        <ButtonWrapper onPress={() => onPress()} color={color}>
            <ButtonText>{content}</ButtonText>
        </ButtonWrapper>
    )
}

export default Button

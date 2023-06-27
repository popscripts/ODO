import React from 'react';
import {ButtonText, ButtonWrapper} from "./ButtonStyle";


type Props = {
    content: string,
    onPress: Function
}

function Button({content, onPress}: Props) {
    return (
        <ButtonWrapper onPress={() => onPress()}>
            <ButtonText>
                {content}
            </ButtonText>
        </ButtonWrapper>
    );
}

export default Button;
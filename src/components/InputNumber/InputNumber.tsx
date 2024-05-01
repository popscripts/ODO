import { useState } from "react"
import { LeftButton, RightButton, TextInput, Wrapper } from "./InputNumberStyle"
import { colors } from "../../theme/colors"
import PlusIcon from "../icons/PlusIcon"
import MinusIcon from "../icons/MinusIcon"

type Props = {
    value: string
    setValue: Function
}

function InputNumber({value, setValue}: Props) {
    const [focused, setFocused] = useState<boolean>(false)

    const handleSetValue = (text: string) => {
        if (text.length <= 2)
        setValue(isNaN(parseInt(text)) ? '' : parseInt(text).toString())
    }

    const handleLeftValue = () => {
        let number = parseInt(value) - 1
        if (number >=0)
            setValue(isNaN(number) ? '' : number.toString())
    }

    const handleRightValue = () => {
        if (value === '') setValue('1')
        else {
            let number = parseInt(value) + 1
            if (number <=99)
                setValue(isNaN(number) ? '' : number.toString())
        }
    }
    
    return (
        <Wrapper>
            <LeftButton focused={focused} onPress={handleLeftValue}>
                <MinusIcon size={20}/>
            </LeftButton>
            <TextInput
                placeholder="0"
                value={value}
                onChangeText={(e: string) => handleSetValue(e)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                focused={focused}
                placeholderTextColor={colors.textDim}
                keyboardType={'numeric'}
                maxLength={2}
            />
            <RightButton focused={focused} onPress={handleRightValue}>
                <PlusIcon size={20}/>
            </RightButton>
        </Wrapper>
    )
}

export default InputNumber
import { useState } from "react"
import { TextInput, Wrapper } from "./InputMultilineStyle"
import { colors } from "../../theme/colors"


type Props = {
    value: string
    setValue: Function
}

function InputMultiline({value, setValue}: Props) {
    const [focused, setFocused] = useState<boolean>(false)

    const handleSetValue = (text: string) => {
        setValue(text)
    }
    
    return (
        <Wrapper>
            <TextInput
                placeholder="opis..."
                value={value}
                onChangeText={(e: string) => handleSetValue(e)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                focused={focused}
                placeholderTextColor={colors.textDim}
                multiline={true}
                maxLength={255}
                numberOfLines={5}
                style={{textAlignVertical: 'top'}}
            />
        </Wrapper>
    )
}

export default InputMultiline
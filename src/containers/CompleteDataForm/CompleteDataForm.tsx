import React, { useEffect, useState } from 'react'
import { TopText, Wrapper } from './CompleteDataFormStyle'
import Input from '../../components/Input/Input'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../components/Button/Button'
import { Error } from '../../types/response.type'
import { useKeyboardHeight } from '../../hooks/useKeyboardHeight'
import { nameValidation, surnameValidation } from '../../utils/inputValidators'
import { Platform, UIManager, Vibration } from 'react-native'
import { useUpdateName } from '../../providers/AuthProvider'
import SlideFromBottom from '../../components/SlideFromBottom'

if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
}

type Props = {
    done: boolean
    setDone: Function
}

function CompleteDataForm({ done, setDone }: Props) {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [surname, setSurname] = useState<string>('')
    const [nameError, setNameError] = useState<Error>({
        error: false,
        errorText: ''
    })
    const [surnameError, setSurnameError] = useState<Error>({
        error: false,
        errorText: ''
    })
    const { bottom } = useSafeAreaInsets()
    const keyboard = useKeyboardHeight()
    const updateName = useUpdateName()

    function ValidateName() {
        setNameError(nameValidation(name))
    }

    function ValidatePassword() {
        setSurnameError(surnameValidation(surname))
    }

    useEffect(() => {
        isSubmitted && ValidateName()
    }, [name, isSubmitted])

    useEffect(() => {
        isSubmitted && ValidatePassword()
    }, [surname, isSubmitted])

    function ReadyPress() {
        setIsSubmitted(true)

        if (nameValidation(name).error) {
            Vibration.vibrate(100)
            return null
        }

        if (surnameValidation(surname).error) {
            Vibration.vibrate(100)
            return null
        }

        setDone(true)
        updateName(name, surname)
    }

    return (
        <SlideFromBottom>
            <Wrapper bottom={keyboard ? keyboard + bottom : bottom} done={done}>
                {done ? (
                    <TopText>Dziękujemy!</TopText>
                ) : (
                    <>
                        <TopText>
                            Prosimy cię jeszcze o uzupełnienie paru informacji
                        </TopText>
                        <Input
                            text={name}
                            setText={setName}
                            placeholder={'imię'}
                            autoCapitalize={true}
                            error={nameError.error}
                            errorText={nameError.errorText}
                        />
                        <Input
                            text={surname}
                            setText={setSurname}
                            placeholder={'nazwisko'}
                            autoCapitalize={true}
                            error={surnameError.error}
                            errorText={surnameError.errorText}
                        />
                        <Button content={'Zrobione!'} onPress={ReadyPress} />
                    </>
                )}
            </Wrapper>
        </SlideFromBottom>
    )
}

export default CompleteDataForm

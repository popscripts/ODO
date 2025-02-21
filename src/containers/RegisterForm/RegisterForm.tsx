import React, { useEffect, useState } from 'react'
import { Heading } from '../../components/commonStyles'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useAuthContext } from '../../providers/AuthProvider'
import {
    keyValidation,
    emailValidation,
    passwordValidation,
    repeatPasswordValidation
} from '../../utils/inputValidators'
import { ApiResponse } from '../../types/response.type'
import { BottomWrapper, FormWrapper } from './RegisterFormStyle'
import { colors } from '../../theme/colors'
import { Vibration } from 'react-native'
import { Error } from '../../types/response.type'

type Props = {
    setLoading: Function
}

function RegisterForm({ setLoading }: Props) {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [key, setKey] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [keyError, setKeyError] = useState<Error>({
        error: false,
        errorText: ''
    })
    const [emailError, setEmailError] = useState<Error>({
        error: false,
        errorText: ''
    })
    const [passwordError, setPasswordError] = useState<Error>({
        error: false,
        errorText: ''
    })
    const [repeatPasswordError, setRepeatPasswordError] = useState<Error>({
        error: false,
        errorText: ''
    })

    const { register } = useAuthContext()

    function ValidateEmail() {
        setEmailError(emailValidation(email))
    }

    function ValidatePassword() {
        setPasswordError(passwordValidation(password))
    }

    function ValidateRepeatPassword() {
        setRepeatPasswordError(
            repeatPasswordValidation(password, repeatPassword)
        )
    }

    function ValidateKey() {
        setKeyError(keyValidation(key))
    }

    function setError(result: string, param: string | undefined) {
        switch (param) {
            case 'username':
                setEmailError({ error: true, errorText: result })
                break
            case 'password':
                setPasswordError({ error: true, errorText: result })
                break
            case 'key':
                setKeyError({ error: true, errorText: result })
                break
        }
    }

    useEffect(() => {
        isSubmitted && ValidateEmail()
    }, [email, isSubmitted])

    useEffect(() => {
        isSubmitted && ValidatePassword()
    }, [password, isSubmitted])

    useEffect(() => {
        isSubmitted && ValidateRepeatPassword()
    }, [repeatPassword, isSubmitted])

    useEffect(() => {
        isSubmitted && ValidateKey()
    }, [key, isSubmitted])

    function RegisterPress() {
        setIsSubmitted(true)

        if (emailValidation(email).error) {
            Vibration.vibrate(100)
            return null
        }

        if (passwordValidation(password).error) {
            Vibration.vibrate(100)
            return null
        }

        if (repeatPasswordValidation(password, repeatPassword).error) {
            Vibration.vibrate(100)
            return null
        }

        if (keyValidation(key).error) {
            Vibration.vibrate(100)
            return null
        }

        setLoading(true)
        register(parseInt(key), email, password).then(
            (res: ApiResponse) => {
                if (res.error) {
                    Vibration.vibrate(100)
                    setError(res?.result as string, res?.param)
                    setTimeout(() => setLoading(false), 200)
                }
            }
        )
    }
    return (
        <FormWrapper>
            <Heading>Rejestracja</Heading>
            <Input
                text={email}
                setText={setEmail}
                placeholder={'email'}
                error={emailError.error}
                errorText={emailError.errorText}
                keyboardType='email-address'
            />
            <Input
                text={password}
                setText={setPassword}
                placeholder={'hasło'}
                error={passwordError.error}
                errorText={passwordError.errorText}
                password={true}
            />
            <Input
                text={repeatPassword}
                setText={setRepeatPassword}
                placeholder={'powtórz hasło'}
                error={repeatPasswordError.error}
                errorText={repeatPasswordError.errorText}
                password={true}
            />
            <BottomWrapper>
                <Input
                    text={key}
                    setText={setKey}
                    placeholder={'klucz'}
                    error={keyError.error}
                    errorText={keyError.errorText}
                    keyboardType={'numeric'}
                />
                <Button
                    content={'Zarejestruj się'}
                    onPress={RegisterPress}
                    color={colors.palette.tertiary300}
                />
            </BottomWrapper>
        </FormWrapper>
    )
}

export default RegisterForm

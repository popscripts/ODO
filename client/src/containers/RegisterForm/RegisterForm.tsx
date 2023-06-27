import React, { useEffect, useState } from 'react'
import { ErrorText, Heading } from '../../components/commonStyles'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { useRegister } from '../../providers/AuthProvider'
import {
    keyValidation,
    loginValidation,
    passwordValidation,
    repeatPasswordValidation
} from '../../utils/inputValidators'
import { apiLoginResponse } from '../../types/response.type'
import { BottomWrapper, FormWrapper } from './RegisterFormStyle'

type Error = {
    error: boolean
    errorText: string
}

function RegisterForm() {
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)
    const [key, setKey] = useState<string>('')
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [keyError, setKeyError] = useState<Error>({
        error: false,
        errorText: ''
    })
    const [loginError, setLoginError] = useState<Error>({
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
    const [otherError, setOtherError] = useState<string>('')

    const register = useRegister()

    function ValidateLogin() {
        setLoginError(loginValidation(login))
    }

    function ValidatePassword() {
        setPasswordError(passwordValidation(password))
    }

    function ValidateRepeatPassword() {
        setRepeatPasswordError(repeatPasswordValidation(password, repeatPassword))
    }

    function ValidateKey() {
        setKeyError(keyValidation(key))
    }

    useEffect(() => {
        isSubmitted && ValidateLogin()
    }, [login, isSubmitted])

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
        register(parseInt(key), login, password).then((res: apiLoginResponse) => {
            if (
                res.error &&
                !loginError.error &&
                !passwordError.error &&
                !repeatPasswordError.error &&
                !keyError.error &&
                isSubmitted
            ) {
                setOtherError(res?.result)
                setPasswordError({ error: true, errorText: '' })
                setLoginError({ error: true, errorText: '' })
            }
        })
        setIsSubmitted(true)
    }
    return (
        <FormWrapper>
            <Heading>Rejestracja</Heading>
            {otherError && <ErrorText>{otherError}</ErrorText>}
            <Input
                text={login}
                setText={setLogin}
                placeholder={'login'}
                error={loginError.error}
                errorText={loginError.errorText}
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
                <Button content={'Zarejestruj się'} onPress={RegisterPress} />
            </BottomWrapper>
        </FormWrapper>
    )
}

export default RegisterForm

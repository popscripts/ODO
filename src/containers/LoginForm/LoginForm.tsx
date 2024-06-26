import React, { useEffect, useState } from 'react'
import { FormWrapper } from './LoginFormStyle'
import { useCredentials, useLogIn } from '../../providers/AuthProvider'
import {
    loginValidation,
    passwordValidation
} from '../../utils/inputValidators'
import { apiLoginResponse } from '../../types/response.type'
import { Heading } from '../../components/commonStyles'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { colors } from '../../theme/colors'
import { Vibration } from 'react-native'
import { Error } from '../../types/response.type'
import Loading from '../../components/Loading/Loading'

type Props = {
    setLoading: Function
}

function LoginForm({ setLoading }: Props) {
    const credentials = useCredentials()
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

    const [login, setLogin] = useState<string>(credentials.username)
    const [password, setPassword] = useState<string>(credentials.password)
    const [loginError, setLoginError] = useState<Error>({
        error: false,
        errorText: ''
    })
    const [passwordError, setPasswordError] = useState<Error>({
        error: false,
        errorText: ''
    })

    const logIn = useLogIn()

    function ValidateLogin() {
        setLoginError(loginValidation(login))
    }

    function ValidatePassword() {
        setPasswordError(passwordValidation(password))
    }

    function setError(result: string, param: string | undefined) {
        switch (param) {
            case 'username':
                setLoginError({ error: true, errorText: result })
                break
            case 'password':
                setPasswordError({ error: true, errorText: result })
                break
        }
    }

    useEffect(() => {
        isSubmitted && ValidateLogin()
    }, [login, isSubmitted])

    useEffect(() => {
        isSubmitted && ValidatePassword()
    }, [password, isSubmitted])

    function LogInPress() {
        setIsSubmitted(true)

        if (loginValidation(login).error) {
            Vibration.vibrate(100)
            return null
        }

        if (passwordValidation(password).error) {
            Vibration.vibrate(100)
            return null
        }

        setLoading(true)
        logIn(login, password).then((res: apiLoginResponse) => {
            if (res.error) {
                Vibration.vibrate(100)
                setError(res?.result, res?.param)
                setTimeout(() => setLoading(false), 200)
            }
        })
    }
    return (
        <FormWrapper>
            <Heading>Logowanie</Heading>
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
            <Button
                content={'Zaloguj się'}
                onPress={LogInPress}
                color={colors.palette.secondary300}
            />
        </FormWrapper>
    )
}

export default LoginForm

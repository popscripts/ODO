import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import Logo from '../components/Logo/Logo'
import RegisterForm from '../containers/RegisterForm/RegisterForm'
import FormScreenWrapper from '../containers/FormScreenWrapper/FormScreenWrapper'

function RegisterScreen() {
    return (
        <ScreenWrapper showGradient={false}>
            <FormScreenWrapper>
                <Logo />
                <RegisterForm />
            </FormScreenWrapper>
        </ScreenWrapper>
    )
}

export default RegisterScreen

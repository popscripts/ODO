import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import Logo from '../components/Logo/Logo'
import FormScreenWrapper from '../containers/FormScreenWrapper/FormScreenWrapper'
import LoginForm from '../containers/LoginForm/LoginForm'

function LogInScreen() {
    return (
        <ScreenWrapper showGradient={false}>
            <FormScreenWrapper>
                <Logo />
                <LoginForm />
            </FormScreenWrapper>
        </ScreenWrapper>
    )
}

export default LogInScreen

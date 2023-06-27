import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import Button from '../components/Button/Button'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

function WelcomeScreen({ navigation }: NativeStackScreenProps<any>) {
    function openLogin() {
        navigation.navigate('Login')
    }
    function openRegister() {
        navigation.navigate('Register')
    }

    return (
        <ScreenWrapper showGradient={false}>
            <Button content={'Zaloguj się'} onPress={openLogin} />
            <Button content={'Zarejestruj się'} onPress={openRegister} />
        </ScreenWrapper>
    )
}

export default WelcomeScreen

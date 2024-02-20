import React from 'react'
import Lottie from 'lottie-react-native'
import { Keyboard } from 'react-native'
import { Wrapper } from './WelcomeHeaderStyle'
const logoAnimation = require('../../../assets/logo-animation.json')

function WelcomeHeader() {
    return (
        <Wrapper onPress={() => Keyboard.dismiss()}>
            <Lottie
                source={logoAnimation}
                loop={false}
                autoPlay
                style={{ width: 250, height: 180 }}
            />
        </Wrapper>
    )
}

export default WelcomeHeader

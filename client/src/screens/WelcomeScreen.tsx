import React from 'react'
import { ImageBackground } from 'react-native'
import WelcomeScreenWrapper from '../containers/WelcomeScreenWrapper/WelcomeScreenWrapper'
const background = require('../../assets/background.png')

function WelcomeScreen() {
    return (
        <ImageBackground source={background} style={{ width: '100%', height: '100%' }}>
            <WelcomeScreenWrapper />
        </ImageBackground>
    )
}

export default WelcomeScreen

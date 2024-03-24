import React from 'react'
import { Dimensions, ImageBackground, ScrollView, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import FormDrawer from '../containers/FormDrawer/FormDrawer'
import WelcomeHeader from '../containers/WelcomeHeader/WelcomeHeader'
import { useKeyboardHeight } from '../hooks/useKeyboardHeight'
const background = require('../../assets/background.png')

function WelcomeScreen() {
    const height = Dimensions.get('screen').height
    const keyboardHeight = useKeyboardHeight()
    return (
        <ImageBackground
            source={background}
            style={{ width: '100%', height: '100%' }}
        >
            <ScrollView keyboardShouldPersistTaps="handled">
                <View style={{ height: height + keyboardHeight }}>
                    <WelcomeHeader />
                    <FormDrawer />
                </View>
            </ScrollView>
            <StatusBar style={'light'} />
        </ImageBackground>
    )
}

export default WelcomeScreen

import React, { useEffect, useState } from 'react'
import { ImageBackground, LayoutAnimation } from 'react-native'
import CompleteDataForm from '../containers/CompleteDataForm/CompleteDataForm'
import AlmostReady from '../components/AlmostReady/AlmostReady'
import { StatusBar } from 'expo-status-bar'
const background = require('../../assets/background.png')

function CompleteDataScreen() {
    const [done, setDone] = useState(false)

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [done])

    return (
        <ImageBackground
            source={background}
            style={{ width: '100%', height: '100%' }}
        >
            {!done && <AlmostReady />}
            <CompleteDataForm done={done} setDone={setDone} />
            <StatusBar style={'light'} />
        </ImageBackground>
    )
}

export default CompleteDataScreen

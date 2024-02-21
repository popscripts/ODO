import React from 'react'
import { Background } from './LoadingStyle'
import Lottie from 'lottie-react-native'
const logoAnimation = require('../../../assets/logo-animation.json')

type Props = {
    show: boolean
}

function Loading({ show }: Props) {
    if (show) {
        return (
            <Background>
                <Lottie
                    source={logoAnimation}
                    loop={true}
                    autoPlay
                    style={{ width: 80, height: 80 }}
                    speed={3}
                />
            </Background>
        )
    } else {
        return <></>
    }
}

export default Loading

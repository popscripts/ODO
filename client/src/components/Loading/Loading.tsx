import React from 'react'
import { Modal } from 'react-native'
import { Background } from './LoadingStyle'
import Lottie from 'lottie-react-native'
const logoAnimation = require('../../../assets/logo-animation.json')

type Props = {
    show: boolean
}

function Loading({ show }: Props) {
    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={show}
            presentationStyle={'overFullScreen'}
            statusBarTranslucent={true}
        >
            <Background>
                <Lottie
                    source={logoAnimation}
                    loop={true}
                    autoPlay
                    style={{ width: 80, height: 80 }}
                    speed={1.5}
                />
            </Background>
        </Modal>
    )
}

export default Loading

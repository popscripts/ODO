import React from 'react'
import { Wrapper } from './WelcomeScreenWrapperStyle'
import { Dimensions } from 'react-native'
import { JustifyAlignCenter } from '../../components/commonStyles'
import FormDrawer from '../FormDrawer/FormDrawer'
const logoAnimation = require('../../../assets/logo-animation.json')
import Lottie from 'lottie-react-native'

function WelcomeScreenWrapper() {
    const height = Dimensions.get('screen').height + 20

    return (
        <Wrapper height={height}>
            <JustifyAlignCenter>
                <Lottie source={logoAnimation} loop={false} autoPlay style={{ width: 250, height: 200 }} />
            </JustifyAlignCenter>
            <FormDrawer />
        </Wrapper>
    )
}

export default WelcomeScreenWrapper

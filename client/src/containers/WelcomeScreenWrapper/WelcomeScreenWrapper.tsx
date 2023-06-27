import React from 'react'
import { Wrapper } from './WelcomeScreenWrapperStyle'
import { Dimensions, Image } from 'react-native'
import { JustifyAlignCenter } from '../../components/commonStyles'
import FormDrawer from '../FormDrawer/FormDrawer'
const logoGif = require('../../../assets/odo.gif')

function WelcomeScreenWrapper() {
    const height = Dimensions.get('screen').height + 20
    return (
        <Wrapper height={height}>
            <JustifyAlignCenter>
                <Image source={logoGif} style={{ width: 300, height: 200 }} resizeMode={'contain'} />
            </JustifyAlignCenter>
            <FormDrawer />
        </Wrapper>
    )
}

export default WelcomeScreenWrapper

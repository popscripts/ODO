import React, { useState } from 'react'
import {
    ColorSpan,
    Heading,
    Image,
    InsideWrapper,
    SubHeading,
    Wrapper
} from './SettingsHeaderStyle'
import { useUserData } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { ImageBackground, View } from 'react-native'
import { translateAccountType } from '../../utils/userDataHelper'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const background = require('../../../assets/background.png')

function SettingsHeader() {
    const userData = useUserData()
    const { top } = useSafeAreaInsets()

    return (
        <Wrapper>
            <Image source={background} top={top}>
                <InsideWrapper>
                    <ProfilePicture url={userData?.pictureName} size={100} />
                    <View>
                        <Heading>
                            Cześć{' '}
                            <ColorSpan>
                                {userData?.name?.split(' ')[0]}
                            </ColorSpan>
                            !
                        </Heading>
                    </View>
                </InsideWrapper>
            </Image>
        </Wrapper>
    )
}

export default SettingsHeader

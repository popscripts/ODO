import React, { useState } from 'react'
import { ColorSpan, Heading, SubHeading, Wrapper } from './SettingsHeaderStyle'
import { useUserData } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import {  View } from 'react-native'
import { translateAccountType } from '../../utils/userDataHelper'


function SettingsHeader() {
    const userData = useUserData()


    return (
        <Wrapper>
            <ProfilePicture url={userData?.pictureName} size={100} />
            <View>
                <Heading>Cześć <ColorSpan>{userData?.name?.split(' ')[0]}</ColorSpan>!</Heading>

            </View>
        </Wrapper>
    )
}

export default SettingsHeader

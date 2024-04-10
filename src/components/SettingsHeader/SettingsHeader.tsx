import React, { useState } from 'react'
import {
    ColorSpan,
    Heading,
    Image,
    InsideWrapper,
    LogoutButton,
    PictureText,
    PictureWrapper,
    Wrapper
} from './SettingsHeaderStyle'
import { useLogOut, useSetPicture, useUserData } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LogoutIcon from '../icons/LogoutIcon'
import * as ImagePicker from "expo-image-picker"
import PencilIcon from '../icons/PencilIcon'
const background = require('../../../assets/background.png')

function SettingsHeader() {
    const userData = useUserData()
    const { top } = useSafeAreaInsets()
    const logout = useLogOut()
    const setPicture = useSetPicture()

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets[0]) {
        const formdata = new FormData()
        //@ts-ignore
        formdata.append('picture', {
            uri: result?.assets[0]?.uri,
            type: result?.assets[0]?.mimeType,
            name: "test.jpeg"
        })

        setPicture(formdata)
        }
    };

    return (
        <Wrapper>
            <Image source={background} top={top}>
                <InsideWrapper>
                    <LogoutButton onPress={() => logout()}>
                        <LogoutIcon />
                    </LogoutButton>
                    <PictureWrapper onPress={pickImage}>
                        <PictureText><PencilIcon /></PictureText>
                        <ProfilePicture url={userData?.pictureName} size={100} />
                    </PictureWrapper>
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

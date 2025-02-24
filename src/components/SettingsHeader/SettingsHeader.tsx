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
import { useAuthContext } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LogoutIcon from '../icons/LogoutIcon'
import * as ImagePicker from 'expo-image-picker'
import PencilIcon from '../icons/PencilIcon'
import { useUserContext } from '../../providers/UserProvider'
const background = require('../../../assets/background.png')

function SettingsHeader() {
    const { userData, setPicture } = useUserContext()
    const { top } = useSafeAreaInsets()
    const { logOut } = useAuthContext()

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'images',
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })

        if (!result.canceled && result.assets[0]) {
            if (result?.assets?.[0]?.uri && result?.assets?.[0]?.mimeType) {
                const file: { uri: string; type: string; name: string } = {
                    uri: result.assets[0].uri,
                    type: result.assets[0].mimeType,
                    name: 'test.jpeg'
                };

                console.log(file)

                const formdata = new FormData();
                formdata.append('picture', file as any);

                setPicture(formdata)
            }
        }
    }

    return (
        <Wrapper>
            <Image source={background} top={top}>
                <InsideWrapper>
                    <LogoutButton onPress={() => logOut()}>
                        <LogoutIcon />
                    </LogoutButton>
                    <PictureWrapper onPress={pickImage}>
                        <PictureText>
                            <PencilIcon />
                        </PictureText>
                        <ProfilePicture
                            url={userData?.pictureName}
                            size={100}
                        />
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

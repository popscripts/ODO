import React from 'react'
import {
    ColorSpan,
    Heading,
    Image,
    InsideWrapper,
    LogoutButton,
    Wrapper
} from './SettingsHeaderStyle'
import { useLogOut, useUserData } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import LogoutIcon from '../icons/LogoutIcon'
const background = require('../../../assets/background.png')

function SettingsHeader() {
    const userData = useUserData()
    const { top } = useSafeAreaInsets()
    const logout = useLogOut()

    return (
        <Wrapper>
            <Image source={background} top={top}>
                <InsideWrapper>
                    <LogoutButton onPress={() => logout()}>
                        <LogoutIcon />
                    </LogoutButton>
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

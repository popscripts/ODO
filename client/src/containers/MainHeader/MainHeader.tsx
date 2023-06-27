import React from 'react'
import { Heading, SubHeading, Wrapper } from './MainHeaderStyle'
import { useUserData } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { View } from 'react-native'
import { translateAccountType } from '../../utils/userDataHelper'

function MainHeader() {
    const userData = useUserData()
    return (
        <Wrapper>
            <ProfilePicture url={userData.pictureName} size={100} />
            <View>
                <Heading>{userData.username}</Heading>
                <SubHeading>{translateAccountType(userData.accountType)}</SubHeading>
            </View>
        </Wrapper>
    )
}

export default MainHeader

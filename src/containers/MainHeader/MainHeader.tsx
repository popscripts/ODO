import React from 'react'
import { Button, Heading, SubHeading, Wrapper } from './MainHeaderStyle'
import { useLogOut, useUserData } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { View } from 'react-native'
import { translateAccountType } from '../../utils/userDataHelper'
import { MediumText } from '../../components/commonStyles'

function MainHeader() {
    const userData = useUserData()
    const logOut = useLogOut()
    return (
        <Wrapper>
            <ProfilePicture url={userData?.pictureName} size={100} />
            <View>
                <Heading>{userData?.name}</Heading>
                <SubHeading>
                    {translateAccountType(userData?.accountType)}
                </SubHeading>
                <Button onPress={() => logOut()}>
                    <MediumText>Zakończ oprowadzanie</MediumText>
                </Button>
            </View>
        </Wrapper>
    )
}

export default MainHeader

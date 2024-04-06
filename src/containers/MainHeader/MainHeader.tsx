import React, { useState } from 'react'
import { Button, Heading, SubHeading, Wrapper } from './MainHeaderStyle'
import { useUserData } from '../../providers/AuthProvider'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { Alert, View } from 'react-native'
import { translateAccountType } from '../../utils/userDataHelper'
import { MediumTextCenter } from '../../components/commonStyles'
import CreateGroupModal from '../CreateGroupModal/CreateGroupModal'
import { useDeleteGroup } from '../../providers/GroupProvider'

function MainHeader() {
    const userData = useUserData()
    const [formVisible, setFormVisible] = useState(false)
    const deleteGroup = useDeleteGroup()

    const handleVisible = () => {
        setFormVisible((prev) => !prev)
    }

    const handlePress = () => {
        if (userData.Group) {
            Alert.alert('Czy na pewno chcesz zakończyć oprowadzanie?', '', [
                {
                    text: 'Anuluj',
                    onPress: () => {},
                    style: 'default'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        deleteGroup()
                    },
                    style: 'default'
                }
            ])
        } else handleVisible()
    }

    return (
        <Wrapper>
            <CreateGroupModal
                visible={formVisible}
                handleVisible={handleVisible}
            />
            <ProfilePicture url={userData?.pictureName} size={100} />
            <View>
                <Heading>{userData?.name}</Heading>
                <SubHeading>
                    {translateAccountType(userData?.accountType)}
                </SubHeading>
                <Button onPress={handlePress}>
                    <MediumTextCenter>
                        {userData.Group
                            ? 'Zakończ oprowadzanie'
                            : 'Rozpocznij oprowadzanie'}
                    </MediumTextCenter>
                </Button>
            </View>
        </Wrapper>
    )
}

export default MainHeader

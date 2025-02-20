import React, { useState } from 'react'
import { Button, Heading, SubHeading, Wrapper } from './MainHeaderStyle'
import ProfilePicture from '../../components/ProfilePicture/ProfilePicture'
import { Alert, View } from 'react-native'
import { translateAccountType } from '../../utils/userDataHelper'
import { MediumTextCenter } from '../../components/commonStyles'
import CreateGroupModal from '../CreateGroupModal/CreateGroupModal'
import { useGroupContext } from '../../providers/GroupProvider'
import { useUserContext } from '../../providers/UserProvider'

function MainHeader() {
    const { userData } = useUserContext()
    const [formVisible, setFormVisible] = useState(false)
    const { deleteGroup } = useGroupContext()

    const handleVisible = () => {
        setFormVisible((prev) => !prev)
    }

    const handlePress = () => {
        if (userData.Group) {
            Alert.alert('', 'Czy na pewno chcesz zakończyć oprowadzanie?', [
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

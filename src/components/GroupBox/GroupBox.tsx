import React, { useState } from 'react'
import { Background, InsideWrapper, Left, Right, Wrapper, Circle, Description, Press } from './GroupBoxStyle'
import { Heading, MediumText } from '../commonStyles'
import { useUserData } from '../../providers/AuthProvider'
import { Group } from '../../types/auth.type'
import PencilIcon from '../icons/PencilIcon'
import CreateGroupModal from '../../containers/CreateGroupModal/CreateGroupModal'
import { View } from 'react-native'
const background = require('../../../assets/background.png')

type Props = {
    group: Group
}

function Inside({group}: Props) {
    return (<>
        <InsideWrapper>
            <Left>
                <Heading>Grupa nr {group.id}</Heading>
                {group.GroupMembers?.map((member, id) => <MediumText key={id}>{member.name}</MediumText>)}
            </Left>
            {group.groupSize &&
            <Right>
                <Circle>{group.groupSize}</Circle>
                <MediumText>osób w grupie</MediumText>
            </Right>
            }
        </InsideWrapper>
        <Description>
            <MediumText>{group.description}</MediumText>
            <PencilIcon/>
        </Description>
        </>
    )
}

function GroupBox() {
    const userData = useUserData()
    const [visible, setVisible] = useState(false)

    const handleVisible = () => {
        setVisible(prev => !prev)
    }

    return (
        <Wrapper>
            <CreateGroupModal visible={visible} handleVisible={handleVisible}/>
            <Background source={background}>
                {userData.Group?.id ? <Inside group={userData.Group}/> : 

                <Press onPress={handleVisible}>
                    <MediumText>Rozpocznij oprowadzanie</MediumText>
                </Press>
                }
            
            </Background>
        </Wrapper>
    )
}

export default GroupBox

import React, { useState } from 'react'
import {
    Background,
    InsideWrapper,
    Left,
    Right,
    Wrapper,
    Circle,
    Description,
    Press,
    PencilPress,
    MediumTextShrink
} from './GroupBoxStyle'
import { Heading, MediumText, SmallText, TextDim } from '../commonStyles'
import { useUserData } from '../../providers/AuthProvider'
import { Group } from '../../types/auth.type'
import PencilIcon from '../icons/PencilIcon'
import CreateGroupModal from '../../containers/CreateGroupModal/CreateGroupModal'
const background = require('../../../assets/background.png')

type Props = {
    group: Group
    handleVisible: Function
    visible: boolean
}

function Inside({ group, handleVisible, visible }: Props) {
    return (
        <>
            <InsideWrapper>
                <CreateGroupModal
                    visible={visible}
                    handleVisible={() => handleVisible()}
                    group={group}
                />
                <Left>
                    <Heading>Grupa nr {group.id}</Heading>
                    {group.GroupMembers?.map((member, id) => (
                        <MediumText key={id}>{member.name}</MediumText>
                    ))}
                </Left>
                {group.groupSize && (
                    <Right>
                        <Circle>{group.groupSize}</Circle>
                        <SmallText>osób w grupie</SmallText>
                    </Right>
                )}
            </InsideWrapper>
            <Description>
                <MediumTextShrink>{group.description}</MediumTextShrink>
                <PencilPress onPress={() => handleVisible()}>
                    <PencilIcon />
                </PencilPress>
            </Description>
        </>
    )
}

function GroupBox() {
    const userData = useUserData()
    const [visible, setVisible] = useState(false)

    const handleVisible = () => {
        setVisible((prev) => !prev)
    }

    return (
        <>
            {!userData.Group?.id && <TextDim>Brak aktywnej grupy</TextDim>}
            <Wrapper>
                <Background source={background}>
                    {userData.Group?.id ? (
                        <Inside
                            group={userData.Group}
                            handleVisible={handleVisible}
                            visible={visible}
                        />
                    ) : (
                        <Press onPress={handleVisible}>
                            <CreateGroupModal
                                visible={visible}
                                handleVisible={() => handleVisible()}
                            />
                            <MediumText>Rozpocznij oprowadzanie</MediumText>
                        </Press>
                    )}
                </Background>
            </Wrapper>
        </>
    )
}

export default GroupBox

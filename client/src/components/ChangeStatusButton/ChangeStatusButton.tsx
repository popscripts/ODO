import React from 'react'
import { BottomDrawer, BottomDrawerText, ButtonText, ButtonWrapper, DisabledButtonWrapper } from './ChangeStatusButtonStyle'
import { colors } from '../../theme/colors'
import { useSetStatus } from '../../providers/ClassroomProvider'
import { Status } from '../../types/status.type'
import { useButtonSettings } from '../../hooks/useButtonSettings'
import { Classroom } from '../../types/classroom.type'

type Props = {
    classroom: Classroom
    prevStatus: Status["name"]
    status: Status["name"]
    disabled: boolean
}

function ChangeStatusButton({ classroom, prevStatus, status, disabled}: Props) {
    const setStatus = useSetStatus()
    const settings = useButtonSettings(status)
    console.log(classroom?.takenBy?.GroupMembers[0])
    if (!disabled)
        return (
            <ButtonWrapper onPress={() => setStatus(classroom.id, prevStatus, status)} color={settings.color}>
                <ButtonText dimText={false}>{settings.label}</ButtonText>
            </ButtonWrapper>
        )
    else
        return (
            <>
                <DisabledButtonWrapper color={colors.palette.neutral700}>
                    <ButtonText dimText={true}>{settings.label}</ButtonText>
                </DisabledButtonWrapper>
                { classroom?.takenBy &&
                <BottomDrawer>
                    <BottomDrawerText>{classroom.takenBy.GroupMembers.map(member => member.username)}</BottomDrawerText>
                </BottomDrawer>
                }
            </>
        )
}

export default ChangeStatusButton

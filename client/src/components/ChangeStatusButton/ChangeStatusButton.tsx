import React from 'react'
import { ButtonText, ButtonWrapper } from './ChangeStatusButtonStyle'
import { colors } from '../../theme/colors'
import { useSetStatus } from '../../providers/ClassroomProvider'
import { Status } from '../../types/status.type'
import { useButtonSettings } from '../../hooks/useButtonSettings'

type Props = {
    classroomId: number
    prevStatus: Status["name"]
    status: Status["name"]
}

function ChangeStatusButton({ classroomId, prevStatus, status}: Props) {
    const setStatus = useSetStatus()
    const settings = useButtonSettings(status)
    return (
        <ButtonWrapper onPress={() => setStatus(classroomId, prevStatus, status)} color={settings.color}>
            <ButtonText>{settings.label}</ButtonText>
        </ButtonWrapper>
    )
}

export default ChangeStatusButton

import React from 'react'
import { BottomDrawer, BottomDrawerText, BottomDrawerTimerWrapper, ButtonText, ButtonWrapper, DisabledButtonWrapper, MemberView } from './ChangeStatusButtonStyle'
import { colors } from '../../theme/colors'
import { useSetStatus } from '../../providers/ClassroomProvider'
import { Status } from '../../types/status.type'
import { useButtonSettings } from '../../hooks/useButtonSettings'
import { Classroom } from '../../types/classroom.type'
import Timer from '../Timer'
import ProfilePicture from '../ProfilePicture/ProfilePicture'

type Props = {
    classroom: Classroom
    prevStatus: Status["name"]
    status: Status["name"]
    disabled: boolean
}

function ChangeStatusButton({ classroom, prevStatus, status, disabled}: Props) {
    const setStatus = useSetStatus()
    const settings = useButtonSettings(status)
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
                { status === "busy" && classroom?.takenBy &&
                <BottomDrawer>
                        {classroom.takenBy?.GroupMembers?.map(member => 
                            <MemberView key={member.id}>
                                <ProfilePicture url={member.pictureName} size={25} />
                                <BottomDrawerText>{member.name}</BottomDrawerText> 
                            </MemberView>
                        )}
                        <BottomDrawerTimerWrapper><Timer changedAt={classroom.takenAt} /></BottomDrawerTimerWrapper>
                </BottomDrawer>
                }

                { status === "reserved" && classroom?.reservedBy &&
                <BottomDrawer>
                    {classroom.reservedBy?.GroupMembers?.map(member => 
                            <MemberView key={member.id}>
                                <ProfilePicture url={member.pictureName} size={25} />
                                <BottomDrawerText>{member.name}</BottomDrawerText> 
                            </MemberView>
                        )}
                    <BottomDrawerTimerWrapper><Timer changedAt={classroom.reservedAt} /></BottomDrawerTimerWrapper>
                </BottomDrawer>
                }
            </>
        )
}

export default ChangeStatusButton

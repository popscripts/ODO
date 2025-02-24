import React, { useEffect, useState } from 'react'
import { Classroom, ShortClassroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { colors } from '../../theme/colors'
import {
    Wrapper,
    Press,
    IconWrapper,
    ContentWrapper,
    TimerWrapper
} from './MyTakenClassroomBoxStyle'
import TimedGradient from '../TimedGradient/TimedGradient'
import Timer from '../../components/Timer'
import { useClassroomContext } from '../../providers/ClassroomProvider'
import FreeClassroomIcon from '../../components/icons/FreeClassroomIcon'
import { useClassroomModal } from '../../providers/ClassroomModalProvider'


type Props = {
    classroom: ShortClassroom
}
function ClassroomBox({ classroom }: Props) {
    const { classrooms, setStatus } = useClassroomContext()
    const { showModal } = useClassroomModal()

    const [fullclassroom, setFullClassroom] = useState<Classroom | undefined>()

    const handleModalVisible = () => {
        fullclassroom && showModal(fullclassroom, colorPalette[0])
    }

    const colorPaletteBg = [
        colors.palette.primary100,
        colors.palette.primary200
    ]
    const colorPalette = [colors.palette.primary200, colors.palette.primary300]

    useEffect(() => {
        setFullClassroom(
            classrooms?.busy?.find((item) => item?.id === classroom.id)
        )
    }, [classrooms])

    return (
        <Press underlayColor={'#ffffff'} onPress={handleModalVisible}>
            <Wrapper colors={colorPaletteBg}>
                {classroom.takenAt && (
                    <TimedGradient
                        changedAt={classroom.takenAt}
                        colors={colorPalette}
                    />
                )}
                <ContentWrapper>
                    <Heading>{classroom.classroom}</Heading>
                    <MediumText>{classroom.title}</MediumText>

                    <TimerWrapper>
                        <MediumText>
                            Zajęta od:{' '}
                            <Timer
                                changedAt={classroom.takenAt}
                                reverse={true}
                            />
                        </MediumText>
                    </TimerWrapper>

                    <IconWrapper
                        onPress={() => setStatus(classroom.id, 'busy', 'free')}
                    >
                        <FreeClassroomIcon size={75} />
                    </IconWrapper>
                </ContentWrapper>
            </Wrapper>
        </Press>
    )
}

export default ClassroomBox

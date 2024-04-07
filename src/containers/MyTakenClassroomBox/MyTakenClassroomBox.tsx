import React, { useEffect, useState } from 'react'
import { ShortClassroom } from '../../types/classroom.type'
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
import ClassroomModal from '../ClassroomModal/ClassroomModal'
import {
    useParsedClassrooms,
    useSetStatus
} from '../../providers/ClassroomProvider'
import FreeClassroomIcon from '../../components/icons/FreeClassroomIcon'

type Props = {
    classroom: ShortClassroom
}
function ClassroomBox({ classroom }: Props) {
    const setStatus = useSetStatus()
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const classrooms = useParsedClassrooms()
    const [fullclassroom, setFullClassroom] = useState(
        classrooms.busy.find((item) => item?.id === classroom.id)
    )

    const handleModalVisible = () => {
        setModalVisible((prev) => !prev)
    }

    const colorPaletteBg = [
        colors.palette.primary100,
        colors.palette.primary200
    ]
    const colorPalette = [colors.palette.primary200, colors.palette.primary300]

    useEffect(() => {
        setFullClassroom(
            classrooms.busy.find((item) => item?.id === classroom.id)
        )
    }, [classrooms])

    return (
        <Press underlayColor={'#ffffff'} onPress={handleModalVisible}>
            <Wrapper colors={colorPaletteBg}>
                {fullclassroom && (
                    <ClassroomModal
                        visible={modalVisible}
                        handleVisible={handleModalVisible}
                        classroom={fullclassroom}
                        color={colorPalette[0]}
                    />
                )}
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
                        <FreeClassroomIcon />
                    </IconWrapper>
                </ContentWrapper>
            </Wrapper>
        </Press>
    )
}

export default ClassroomBox

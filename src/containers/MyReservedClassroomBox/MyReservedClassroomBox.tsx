import React, { useEffect, useState } from 'react'
import { Classroom, ShortClassroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { colors } from '../../theme/colors'
import {
    Wrapper,
    Press,
    ContentWrapper,
    TakenCorner
} from './MyReservedClassroomBoxStyle'
import TimedGradient from '../TimedGradient/TimedGradient'
import Timer from '../../components/Timer'
import { useClassroomContext } from '../../providers/ClassroomProvider'
import { useClassroomModal } from '../../providers/ClassroomModalProvider'

type Props = {
    classroom: ShortClassroom
}
function ClassroomBox({ classroom }: Props) {
    const { showModal } = useClassroomModal()
    const { classrooms } = useClassroomContext()
    const [fullclassroom, setFullClassroom] = useState<Classroom | undefined>()

    const handleModalVisible = () => {
        fullclassroom && showModal(fullclassroom, colorPalette[0])
    }

    const colorPaletteBg = [
        colors.palette.secondary100,
        colors.palette.secondary200
    ]
    const colorPalette = [
        colors.palette.secondary200,
        colors.palette.secondary300
    ]

    useEffect(() => {
        setFullClassroom(
            classroom.status.name === 'reserved'
                ? classrooms?.reserved?.find(
                    (item) => item?.id === classroom.id
                )
                : classrooms?.busy?.find((item) => item?.id === classroom.id)
        )
    }, [classrooms])

    return (
        <>
            <Press underlayColor={'#ffffff'} onPress={handleModalVisible}>
                <Wrapper colors={colorPaletteBg}>
                    {classroom.reservedAt && (
                        <TimedGradient
                            changedAt={classroom.reservedAt}
                            colors={colorPalette}
                        />
                    )}
                    <ContentWrapper>
                        <MediumText>
                            <Heading>{classroom.classroom}</Heading>{' '}
                            {classroom.title}
                        </MediumText>

                        <MediumText>
                            Do końca rezerwacji:{' '}
                            <Timer changedAt={classroom.reservedAt} />
                        </MediumText>
                    </ContentWrapper>
                    {classroom.status.name === 'busy' && <TakenCorner />}
                </Wrapper>
            </Press>
        </>
    )
}

export default ClassroomBox

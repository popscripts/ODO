import React, { useEffect, useState } from 'react'
import { ShortClassroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { colors } from '../../theme/colors'
import { Wrapper, Press, ContentWrapper } from './MyReservedClassroomBoxStyle'
import TimedGradient from '../TimedGradient/TimedGradient'
import Timer from '../../components/Timer'
import { useClassrooms } from '../../providers/ClassroomProvider'
import ClassroomModal from '../ClassroomModal/ClassroomModal'

type Props = {
    classroom: ShortClassroom
}
function ClassroomBox({ classroom }: Props) {
    const [modalVisible, setModalVisible] = useState<boolean>(false)

    const classrooms = useClassrooms()
    const [fullclassroom, setClassroom] = useState(
        classrooms.find((item) => item?.id === classroom.id)
    )

    const handleModalVisible = () => {
        setModalVisible((prev) => !prev)
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
        setClassroom(classrooms.find((item) => item?.id === classroom.id))
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
            </Wrapper>
        </Press>
    )
}

export default ClassroomBox

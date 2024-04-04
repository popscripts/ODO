import React, { useEffect, useState } from 'react'
import { Classroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import {
    useClassrooms,
    useHandleVisited
} from '../../providers/ClassroomProvider'
import {
    ContentWrapper,
    FillerBottom,
    FillerLeft,
    FillerRight,
    FillerTop,
    IconWrapper
} from './VisitedClassroomBoxStyle'
import { Alert, View } from 'react-native'
import PlusIcon from '../../components/icons/PlusIcon'

type Props = {
    classroomId: number
}
function VisitedClassroomBox({ classroomId }: Props) {
    const [classroom, setClassroom] = useState<Classroom | undefined>(undefined)
    const classrooms = useClassrooms()
    const handleVisited = useHandleVisited()

    useEffect(() => {
        setClassroom(classrooms.find((item) => item?.id === classroomId))
    }, [classrooms])

    function Delete() {
        Alert.alert(
            `Czy na pewno chcesz przywrócić klasę ${classroom?.classroom} do głównego widoku?`,
            '',
            [
                {
                    text: 'Anuluj',
                    onPress: () => {},
                    style: 'default'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        handleVisited.removeFromVisited(classroomId)
                    },
                    style: 'default'
                }
            ]
        )
    }

    return (
        <View>
            <ContentWrapper>
                <MediumText>
                    <Heading>{classroom?.classroom}</Heading> {classroom?.title}
                </MediumText>
                <IconWrapper onPress={Delete}>
                    <PlusIcon size={20} />
                </IconWrapper>
            </ContentWrapper>
            <FillerBottom />
            <FillerTop />
            <FillerRight />
            <FillerLeft />
        </View>
    )
}

export default VisitedClassroomBox

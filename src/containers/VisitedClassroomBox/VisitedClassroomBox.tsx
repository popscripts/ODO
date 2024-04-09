import React from 'react'
import { VisitedClassroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { useHandleVisited } from '../../providers/ClassroomProvider'
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
import { useConjugated } from '../../hooks/useConjugated'

type Props = {
    classroom: VisitedClassroom
}
function VisitedClassroomBox({ classroom }: Props) {
    const handleVisited = useHandleVisited()

    function Delete() {
        Alert.alert(
            ``,
            `Czy na pewno chcesz przywrócić ${useConjugated(classroom?.classroom)} do głównego widoku?`,
            [
                {
                    text: 'Anuluj',
                    onPress: () => {},
                    style: 'default'
                },
                {
                    text: 'Ok',
                    onPress: () => {
                        handleVisited.removeFromVisited(classroom.classroomId)
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

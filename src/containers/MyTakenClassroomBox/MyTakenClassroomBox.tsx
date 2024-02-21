import React from 'react'
import { Classroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { colors } from '../../theme/colors'
import { Wrapper } from './MyTakenClassroomBoxStyle'

type Props = {
    classroom: Classroom
}
function ClassroomBox({ classroom }: Props) {
    const colorPalette = [colors.palette.primary200, colors.palette.primary300]

    return (
        <Wrapper colors={colorPalette}>
            <Heading>{classroom.classroom}</Heading>
            <MediumText>{classroom.title}</MediumText>
        </Wrapper>
    )
}

export default ClassroomBox

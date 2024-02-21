import React from 'react'
import { Classroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { colors } from '../../theme/colors'
import { Wrapper } from './MyReservedClassroomBoxStyle'

type Props = {
    classroom: Classroom
}
function ClassroomBox({ classroom }: Props) {
    const colorPalette = [
        colors.palette.secondary200,
        colors.palette.secondary300
    ]

    return (
        <Wrapper colors={colorPalette}>
            <Heading>{classroom.classroom}</Heading>
            <MediumText>{classroom.title}</MediumText>
        </Wrapper>
    )
}

export default ClassroomBox

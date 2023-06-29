import React from 'react'
import { Classroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { Wrapper } from './ClassroomBoxStyle'

type Props = {
    classroom: Classroom
    colorPalette: any[]
}
function ClassroomBox({ classroom, colorPalette }: Props) {
    return (
        <Wrapper colors={colorPalette}>
            <Heading>{classroom.classroom}</Heading>
            <MediumText>{classroom.title}</MediumText>
        </Wrapper>
    )
}

export default ClassroomBox

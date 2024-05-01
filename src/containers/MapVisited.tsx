import React from 'react'
import VisitedClassroomBox from './VisitedClassroomBox/VisitedClassroomBox'
import { colors } from '../theme/colors'
import { VisitedClassroom } from '../types/classroom.type'
import { HigherLinearGradient } from '../components/commonStyles'

type Props = {
    classrooms: VisitedClassroom[]
}
function MapVisited({ classrooms }: Props) {
    return (
        <HigherLinearGradient
            colors={[
                colors.palette.primary200,
                colors.palette.tertiary200,
                colors.palette.secondary200
            ]}
        >
            {classrooms?.length > 0 &&
                classrooms.map((classroom) => (
                    <VisitedClassroomBox
                        classroom={classroom}
                        key={classroom.classroomId}
                    />
                ))}
        </HigherLinearGradient>
    )
}

export default MapVisited

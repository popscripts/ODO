import React from 'react'
import VisitedClassroomBox from './VisitedClassroomBox/VisitedClassroomBox'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../theme/colors'
import { VisitedClassroom } from '../types/classroom.type'

type Props = {
    classrooms: VisitedClassroom[]
}
function MapVisited({ classrooms }: Props) {
    return (
        <LinearGradient
            colors={[
                colors.palette.primary200,
                colors.palette.tertiary200,
                colors.palette.secondary200
            ]}
        >
            {classrooms.length > 0 &&
                classrooms.map((classroom) => (
                    <VisitedClassroomBox
                        classroom={classroom}
                        key={classroom.classroomId}
                    />
                ))}
        </LinearGradient>
    )
}

export default MapVisited

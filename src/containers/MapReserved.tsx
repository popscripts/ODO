import React from 'react'
import VisitedClassroomBox from './VisitedClassroomBox/VisitedClassroomBox'
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from '../theme/colors'

type Props = {
    filter: number[]
}
function MapReserved({ filter }: Props) {
    return (
        <LinearGradient
            colors={[
                colors.palette.primary200,
                colors.palette.tertiary200,
                colors.palette.secondary200
            ]}
        >
            {filter.length > 0 &&
                filter.map((id) => (
                    <VisitedClassroomBox classroomId={id} key={id} />
                ))}
        </LinearGradient>
    )
}

export default MapReserved

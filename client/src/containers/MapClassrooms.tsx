import React from 'react'
import ClassroomBox from './ClassroomBox/ClassroomBox'
import { Classroom } from '../types/classroom.type'
import { colors } from '../theme/colors'
import { Dimensions, View } from 'react-native'

type Props = {
    data: Classroom[]
    status: string
}
function MapClassrooms({ data, status }: Props) {
    const colorPalette =
        status === 'free'
            ? [colors.palette.tertiary200, colors.palette.tertiary300]
            : status === 'busy'
            ? [
                  colors.palette.quaternary100,
                  colors.palette.quaternary100,
                  colors.palette.quaternary200,
                  colors.palette.quaternary300
              ]
            : [
                  colors.palette.quinary100,
                  colors.palette.quinary100,
                  colors.palette.quinary200,
                  colors.palette.quinary300
              ]
    return (
        <>
            {data.map((item, id) => (
                <ClassroomBox classroom={item} key={id} colorPalette={colorPalette} />
            ))}
        </>
    )
}

export default MapClassrooms

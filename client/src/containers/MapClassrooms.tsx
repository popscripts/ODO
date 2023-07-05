import React from 'react'
import ClassroomBox from './ClassroomBox/ClassroomBox'
import { Classroom } from '../types/classroom.type'
import { colors } from '../theme/colors'
import { HeadingCenter, MediumTextCenter } from '../components/commonStyles'

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
            {data.length > 0 ? (
                data.map((item, id) => <ClassroomBox classroom={item} key={id} colorPalette={colorPalette} />)
            ) : (
                <MediumTextCenter>Brak sal do wyświetlenia</MediumTextCenter>
            )}
        </>
    )
}

export default MapClassrooms

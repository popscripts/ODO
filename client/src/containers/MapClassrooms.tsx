import React, { useEffect } from 'react'
import ClassroomBox from './ClassroomBox/ClassroomBox'
import { Classroom } from '../types/classroom.type'
import { colors } from '../theme/colors'
import { HeadingCenter, MediumTextCenter } from '../components/commonStyles'
import { LayoutAnimation, Platform, UIManager } from 'react-native'

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
}

type Props = {
    data: Classroom[]
    status: string
    filter: number[]
}
function MapClassrooms({ data, status, filter }: Props) {
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

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    }, [filter])

    return (
        <>
            {filter.length > 0 ? (
                filter.map((id) => (
                    <ClassroomBox
                        classroom={data.filter((classroom) => classroom.id === id)[0]}
                        key={id}
                        colorPalette={colorPalette}
                        status={status}
                    />
                ))
            ) : (
                <MediumTextCenter>Brak sal do wyświetlenia</MediumTextCenter>
            )}
        </>
    )
}

export default MapClassrooms

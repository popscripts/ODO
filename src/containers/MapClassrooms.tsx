import React, { useEffect } from 'react'
import ClassroomBox from './ClassroomBox/ClassroomBox'
import { colors } from '../theme/colors'
import { MediumTextCenter } from '../components/commonStyles'
import { LayoutAnimation, Platform, UIManager } from 'react-native'
import { useUserData } from '../providers/AuthProvider'
import { Classroom } from '../types/classroom.type'

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true)
    }
}

type Props = {
    status: string
    classrooms: Classroom[]
}
function MapClassrooms({ status, classrooms }: Props) {
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

    // useEffect(() => {
    //     LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    // }, [filter])

    const userData = useUserData()

    return (
        <>
            {classrooms && classrooms.length > 0 ? (
                classrooms.map(
                    (classroom) =>
                        userData?.Group?.Taken?.id !== classroom.id &&
                        userData?.Group?.Reserved?.id !== classroom.id && (
                            <ClassroomBox
                                classroom={classroom}
                                key={classroom.id}
                                colorPalette={colorPalette}
                                status={status}
                            />
                        )
                )
            ) : (
                <MediumTextCenter>Brak sal do wyświetlenia</MediumTextCenter>
            )}
        </>
    )
}

export default MapClassrooms

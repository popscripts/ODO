import React, { ReactNode } from 'react'
import { ClassroomSectionWrapper } from './ClassroomSectionStyle'
import { HeadingCenter } from '../commonStyles'
import { View } from 'react-native'
import { CurvedTransition } from 'react-native-reanimated'

type Props = {
    title: string
    children: ReactNode
}

function ClassroomSection({ title, children }: Props) {

    return (
        <View>
            <HeadingCenter>{title}</HeadingCenter>
            <ClassroomSectionWrapper layout={CurvedTransition}>
                {children}
            </ClassroomSectionWrapper>
        </View>
    )
}

export default ClassroomSection

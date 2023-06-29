import React, { ReactNode } from 'react'
import { ClassroomSectionHeader, ClassroomSectionWrapper, Gradient } from './ClassroomSectionStyle'
import { Heading, HeadingCenter } from '../commonStyles'
import { colors } from '../../theme/colors'
import { View } from 'react-native'

type Props = {
    title: string
    children: ReactNode
}

function ClassroomSection({ title, children }: Props) {
    return (
        <View>
            <Gradient colors={[colors.transparent, colors.palette.neutral800]} />
            <ClassroomSectionHeader>
                <Heading>{title}</Heading>
            </ClassroomSectionHeader>
            <ClassroomSectionWrapper>{children}</ClassroomSectionWrapper>
        </View>
    )
}

export default ClassroomSection

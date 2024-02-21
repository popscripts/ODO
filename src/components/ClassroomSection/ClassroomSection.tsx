import React, { ReactNode } from 'react'
import {
    ClassroomSectionHeader,
    ClassroomSectionWrapper,
    Gradient
} from './ClassroomSectionStyle'
import { Heading } from '../commonStyles'
import { colors } from '../../theme/colors'
import { Dimensions, View } from 'react-native'

type Props = {
    title: string
    children: ReactNode
}

function ClassroomSection({ title, children }: Props) {
    const width = Dimensions.get('screen').width

    return (
        <View>
            <Gradient
                colors={[colors.transparent, colors.palette.neutral800]}
            />
            <ClassroomSectionHeader>
                <Heading>{title}</Heading>
            </ClassroomSectionHeader>
            <ClassroomSectionWrapper>
                {children}
                <View style={{ width: (width - 45) / 2 }}></View>
            </ClassroomSectionWrapper>
        </View>
    )
}

export default ClassroomSection

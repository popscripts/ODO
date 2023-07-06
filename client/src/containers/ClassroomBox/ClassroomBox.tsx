import React from 'react'
import { Classroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { ContentWrapper, Highlight, TimerWrapper, Wrapper } from './ClassroomBoxStyle'
import TimedGradient from '../TimedGradient/TimedGradient'
import Timer from '../../components/Timer'
import { Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import { MAX_TIME } from '../../config'
import { useSetStatus } from '../../providers/ClassroomProvider'

type Props = {
    classroom: Classroom
    colorPalette: any[]
    status: string
}
function ClassroomBox({ classroom, colorPalette, status }: Props) {
    const setStatus = useSetStatus()

    const width = Dimensions.get('screen').width
    const changedAt = classroom.takenAt || classroom.reservedAt

    const changedAtDate = changedAt ? new Date(new Date(changedAt).getTime()) : null
    const now = new Date()

    const timePassed = changedAtDate ? now.getTime() - changedAtDate.getTime() : null
    const timeLeft = timePassed ? MAX_TIME - timePassed : null

    return (
        <TouchableOpacity onPress={() => setStatus(classroom.id, 'reserved')}>
            <Wrapper colors={[colorPalette[0], colorPalette[1]]} width={width}>
                {status !== 'free' && changedAt && (
                    <TimedGradient changedAt={changedAt} colors={[colorPalette[2], colorPalette[3]]} />
                )}
                <ContentWrapper>
                    <Heading>{classroom.classroom}</Heading>
                    <MediumText>{classroom.title}</MediumText>
                    <TimerWrapper>
                        {status !== 'free' && changedAt && <Timer timeLeft={timeLeft} />}
                    </TimerWrapper>
                </ContentWrapper>
                <Highlight colors={['#ffffff00', '#ffffff33']} />
            </Wrapper>
        </TouchableOpacity>
    )
}

export default ClassroomBox

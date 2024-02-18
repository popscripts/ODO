import React, { useEffect, useState } from 'react'
import { Classroom } from '../../types/classroom.type'
import { Heading, MediumText } from '../../components/commonStyles'
import { ContentWrapper, Highlight, Press, TimerWrapper, Wrapper } from './ClassroomBoxStyle'
import TimedGradient from '../TimedGradient/TimedGradient'
import Timer from '../../components/Timer'
import { Dimensions } from 'react-native'
import { MAX_TIME } from '../../config'
import { useClassrooms, useSetStatus } from '../../providers/ClassroomProvider'

type Props = {
    classroomId: number
    colorPalette: any[]
    status: string
}
function ClassroomBox({ classroomId, colorPalette, status }: Props) {
    const setStatus = useSetStatus()
    const width = Dimensions.get('screen').width
    const classrooms = useClassrooms()
    const [classroom, setClassroom] = useState(classrooms.filter((item) => item?.id === classroomId)[0])
    const [changedAt, setChangedAt] = useState<null | string>(null)

    useEffect(() => {
        if(classroom){
            setChangedAt(classroom?.takenAt || classroom?.reservedAt)
        }
    }, [classroom])

    useEffect(() => {
        setClassroom(classrooms.filter((item) => item?.id === classroomId)[0])
    }, [classrooms])

    return (
        <Press underlayColor={'#ffffff'} 
            onPress={() => setStatus(classroom.id, status, 'busy')}
            onLongPress={() => setStatus(classroom.id, status, 'free')}
        >
            <Wrapper colors={[colorPalette[0], colorPalette[1]]} width={width}>
                {status !== 'free' && changedAt && (
                    <TimedGradient changedAt={changedAt} colors={[colorPalette[2], colorPalette[3]]} />
                )}
                <ContentWrapper>
                    <Heading>{classroom?.classroom}</Heading>
                    <MediumText>{classroom?.title}</MediumText>
                    <TimerWrapper>
                        {status !== 'free' && changedAt && <Timer changedAt={changedAt} />}
                    </TimerWrapper>
                </ContentWrapper>
                <Highlight colors={['#ffffff00', '#ffffff33']} />
            </Wrapper>
        </Press>
    )
}

export default ClassroomBox

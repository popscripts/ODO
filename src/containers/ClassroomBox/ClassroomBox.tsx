import React, { useEffect, useState } from 'react'
import { Heading, MediumText } from '../../components/commonStyles'
import {
    ContentWrapper,
    Highlight,
    Press,
    ReservedCorner,
    TimerWrapper,
    Wrapper
} from './ClassroomBoxStyle'
import TimedGradient from '../TimedGradient/TimedGradient'
import Timer from '../../components/Timer'
import ClassroomModal from '../ClassroomModal/ClassroomModal'
import { Classroom } from '../../types/classroom.type'

type Props = {
    classroom: Classroom
    colorPalette: any[]
    status: string
}
function ClassroomBox({ classroom, colorPalette, status }: Props) {
    const [showModal, setShowModal] = useState(false)
    const handleVisible = () => {
        setShowModal(!showModal)
    }

    const [changedAt, setChangedAt] = useState<null | string>(null)

    useEffect(() => {
        if (classroom) {
            setChangedAt(classroom?.takenAt || classroom?.reservedAt)
        }
    }, [classroom])

    return (
        <>
            <Press underlayColor={'#ffffff'} onPress={handleVisible}>
                <Wrapper colors={[colorPalette[0], colorPalette[1]]}>
                    {status !== 'free' && changedAt && (
                        <TimedGradient
                            changedAt={changedAt}
                            colors={[colorPalette[2], colorPalette[3]]}
                        />
                    )}
                    <ContentWrapper>
                        {classroom && (
                            <ClassroomModal
                                visible={showModal}
                                handleVisible={handleVisible}
                                classroom={classroom}
                                color={colorPalette[0]}
                            />
                        )}
                        <Heading>{classroom?.classroom}</Heading>
                        <MediumText>{classroom?.title}</MediumText>
                        <TimerWrapper>
                            {status !== 'free' && changedAt && (
                                <Timer changedAt={changedAt} />
                            )}
                        </TimerWrapper>
                    </ContentWrapper>
                    <Highlight colors={['#ffffff00', '#ffffff33']} />
                    {status === 'busy' && classroom?.reservedBy && (
                        <ReservedCorner />
                    )}
                </Wrapper>
            </Press>
        </>
    )
}

export default ClassroomBox

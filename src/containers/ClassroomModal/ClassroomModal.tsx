import { Dimensions, Modal, useWindowDimensions } from 'react-native'
import {
    Backdrop,
    Background,
    ClassroomManager,
    ClassroomNumber,
    ClassroomTitle,
    Warning
} from './ClassroomModalStyle'
import { MediumText } from '../../components/commonStyles'
import { Classroom } from '../../types/classroom.type'
import ChangeStatusButton from '../../components/ChangeStatusButton/ChangeStatusButton'
import { useState, useEffect } from 'react'
import { useClassModalSettings } from '../../hooks/useClassModalSettings'
import CloseModal from '../../components/CloseModal/CloseModal'
import { useUserContext } from '../../providers/UserProvider'

type Props = {
    visible: boolean
    handleVisible: () => void
    classroom: Classroom | null
    color: string
}

const ClassroomModal = ({
    visible,
    handleVisible,
    classroom,
    color
}: Props) => {
    const [settings, setSettings] = useState({
        taken: { disabled: false },
        reserved: { disabled: false },
        free: { disabled: false }
    })

    const { userData } = useUserContext()

    const size = Dimensions.get('screen')

    useEffect(() => {
        if (!classroom) return
        setSettings(useClassModalSettings(classroom, userData))
    }, [userData, classroom])

    if (!classroom) return <></>

    return (
        <Modal
            visible={visible}
            onRequestClose={handleVisible}
            transparent={true}
            animationType="fade"
            //presentationStyle="overFullScreen"
            statusBarTranslucent={true}
            style={{ height: '100%', width: '100%' }}
        >
            <Backdrop size={size}>
                <Background>
                    <CloseModal handleVisible={handleVisible} />
                    <ClassroomNumber color={color}>
                        {classroom.classroom}
                    </ClassroomNumber>
                    <ClassroomTitle>{classroom.title}</ClassroomTitle>
                    <MediumText>{classroom.description}</MediumText>
                    <ChangeStatusButton
                        classroom={classroom}
                        prevStatus={classroom.status.name}
                        status="busy"
                        disabled={settings.taken.disabled}
                    />
                    <ChangeStatusButton
                        classroom={classroom}
                        prevStatus={classroom.status.name}
                        status="reserved"
                        disabled={settings.reserved.disabled}
                    />
                    <ChangeStatusButton
                        classroom={classroom}
                        prevStatus={classroom.status.name}
                        status="free"
                        disabled={settings.free.disabled}
                    />
                    {!userData.Group?.id && (
                        <Warning>
                            Aby zarządzać statusami musisz rozpocząć
                            oprowadzanie
                        </Warning>
                    )}
                    <ClassroomManager>
                        {classroom.managedBy?.name &&
                            'Zarządca klasy: ' + classroom.managedBy?.name}
                    </ClassroomManager>
                </Background>
            </Backdrop>
        </Modal>
    )
}

export default ClassroomModal

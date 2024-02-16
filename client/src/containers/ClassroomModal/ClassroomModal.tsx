import { Modal } from "react-native"
import { Backdrop, Background, ClassroomNumber, ClassroomTitle } from "./ClassroomModalStyle";
import { MediumText } from "../../components/commonStyles";
import { Classroom } from "../../types/classroom.type";
import ChangeStatusButton from "../../components/ChangeStatusButton/ChangeStatusButton";
import { useState } from "react";

type Props = {
    visible: boolean;
    handleVisible: () => void;
    classroom: Classroom;
    color: string
}

const ClassroomModal = ({visible, handleVisible, classroom, color}: Props) => {
    const [settings, setSettings] = useState({
        taken: {disabled: false},
        reserved: {disabled: false},
        free: {disabled: false}
    })

    return (
        <Modal
            visible={visible}
            onRequestClose={handleVisible}
            transparent={true}
            animationType="fade"
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}
        >
            <Backdrop onPress={handleVisible}>
                <Background>
                    <ClassroomNumber color={color}>
                        {classroom.classroom}
                    </ClassroomNumber>
                    <ClassroomTitle>
                        {classroom.title}
                    </ClassroomTitle>
                    <MediumText>
                        {classroom.description}
                    </MediumText>
                    <ChangeStatusButton classroom={classroom} prevStatus={classroom.status.name} status='busy' disabled={settings.taken.disabled}/>
                    <ChangeStatusButton classroom={classroom} prevStatus={classroom.status.name} status='reserved' disabled={settings.reserved.disabled}/>
                    <ChangeStatusButton classroom={classroom} prevStatus={classroom.status.name} status='free' disabled={settings.free.disabled}/>
                    <MediumText>
                        {classroom.managedBy?.username && "Zarządca klasy: " + classroom.managedBy?.username }
                    </MediumText>
                </Background>
            </Backdrop>
        </Modal>
    )
}

export default ClassroomModal
import { View, Modal } from "react-native"
import { Backdrop, Background, ClassroomNumber, ClassroomTitle } from "./ClassroomModalStyle";
import { MediumText } from "../../components/commonStyles";
import { Classroom } from "../../types/classroom.type";
import ChangeStatusButton from "../../components/ChangeStatusButton/ChangeStatusButton";

type Props = {
    visible: boolean;
    handleVisible: () => void;
    classroom: Classroom;
    color: string
}

const ClassroomModal = ({visible, handleVisible, classroom, color}: Props) => {
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
                    <ChangeStatusButton classroomId={classroom.id} prevStatus={classroom.status.name} status='busy' />
                    <ChangeStatusButton classroomId={classroom.id} prevStatus={classroom.status.name} status='reserved' />
                    <ChangeStatusButton classroomId={classroom.id} prevStatus={classroom.status.name} status='free' />
                    <MediumText>
                        {classroom.managedBy?.username && "Zarządca klasy: " + classroom.managedBy?.username }
                    </MediumText>
                </Background>
            </Backdrop>
        </Modal>
    )
}

export default ClassroomModal
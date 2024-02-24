import { Modal } from "react-native"
import { AddButton, AddButtonText, Backdrop, Background, CancelButtonWrapper, InputDescription, MemberInputWrapper, SubmitButton, Title } from "./CreateGroupModalStyle"
import { TextDim } from "../../components/commonStyles"
import PlusIcon from "../../components/icons/PlusIcon"
import InputNumber from "../../components/InputNumber/InputNumber"
import { useEffect, useState } from "react"
import InputMultiline from "../../components/InputMultiline/InputMultiline"
import Input from "../../components/Input/Input"
import { GroupMember } from "../../types/auth.type"
import { useCreateGroup } from "../../providers/GroupProvider"

type Props = {
    visible: boolean
    handleVisible: () => void
}

function NullIfEmpty(string: string) {
    if (string === '') 
        return null

    return string
}

function NullIfEmptyAndParseInt(string: string) {
    if (string === '') 
        return null

    return parseInt(string)
}

function CreateGroupModal({visible, handleVisible}: Props) {
    const createGroup = useCreateGroup();

    const [numberValue, setNumberValue] = useState('')
    const [descValue, setDescValue] = useState('')
    const [memberValue, setMemberValue] = useState('')
    const [isInputVisible, setIsInputVisible] = useState(false)
    const [groupMember, setGroupMember] = useState<GroupMember | null>({
        id: 0,
        name: ""
    })

    const handleIsInputVisible = () => {
        setIsInputVisible(prev => !prev)
    }

    useEffect(() => {
        !isInputVisible && setMemberValue('')
    }, [isInputVisible])

    useEffect(() => {
        if (memberValue === '') setGroupMember(null)
        else
        {
            let data = {
                id: groupMember?.id ? groupMember?.id : 0,
                name: memberValue
            }
            setGroupMember(data)
        }    
    }, [memberValue])

    function handleCreateGroup() {
        createGroup(NullIfEmptyAndParseInt(numberValue), NullIfEmpty(descValue), groupMember)
        handleVisible()
    }

    return (
        <Modal
            visible={visible}
            onRequestClose={handleVisible}
            transparent={true}
            animationType="fade"
            presentationStyle="overFullScreen"
            statusBarTranslucent={true}
        >
            <Backdrop>
                <Background>
                    <Title>Utwórz grupę</Title>
                    {!isInputVisible ?
                    <AddButton onPress={handleIsInputVisible}>
                        <PlusIcon size={20}/>
                        <AddButtonText>
                            Dodaj osobę
                        </AddButtonText>
                    </AddButton> 
                    :
                    <>
                    <InputDescription>Oprowadzam z</InputDescription>
                    <MemberInputWrapper>
                        <Input text={memberValue} setText={setMemberValue} placeholder="wyszukaj..."></Input>
                        <CancelButtonWrapper onPress={handleIsInputVisible}>
                            <PlusIcon size={20}/>
                        </CancelButtonWrapper>
                    </MemberInputWrapper>
                    </>
                    }
                    <InputDescription>Liczba oprowadzanych osób <TextDim>(opcjonalne)</TextDim></InputDescription>
                    <InputNumber value={numberValue} setValue={setNumberValue}></InputNumber>
                    <InputDescription>Opis grupy <TextDim>(opcjonalne)</TextDim></InputDescription>
                    <InputMultiline value={descValue} setValue={setDescValue}/>
                    <SubmitButton onPress={handleCreateGroup}><AddButtonText>Rozpocznij oprowadzanie</AddButtonText></SubmitButton>
                </Background>
            </Backdrop>
        </Modal>
    )
}

export default CreateGroupModal
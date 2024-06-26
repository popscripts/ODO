import { Modal, Keyboard } from 'react-native'
import {
    AddButton,
    AddButtonText,
    Backdrop,
    Background,
    ButtonsWrapper,
    CancelButtonWrapper,
    InactiveMemberWrapper,
    InputDescription,
    LeaveButton,
    MemberInputDrawer,
    MemberInputDrawerWrapper,
    MemberInputWrapper,
    MemberWrapper,
    SubmitButton,
    Title
} from './CreateGroupModalStyle'
import { MediumText, TextDim } from '../../components/commonStyles'
import PlusIcon from '../../components/icons/PlusIcon'
import InputNumber from '../../components/InputNumber/InputNumber'
import { useEffect, useState } from 'react'
import InputMultiline from '../../components/InputMultiline/InputMultiline'
import Input from '../../components/Input/Input'
import { Group, GroupMember } from '../../types/auth.type'
import {
    useCreateGroup,
    useEditGroup,
    useLeaveGroup,
    useMembers
} from '../../providers/GroupProvider'
import { useUserData } from '../../providers/AuthProvider'
import CloseModal from '../../components/CloseModal/CloseModal'

type Props = {
    visible: boolean
    handleVisible: () => void
    group?: Group | null
}

function NullIfEmpty(string: string) {
    if (string === '') return null

    return string
}

function NullIfEmptyAndParseInt(string: string) {
    if (string === '') return null

    return parseInt(string)
}

function CreateGroupModal({ visible, handleVisible, group }: Props) {
    const createGroup = useCreateGroup()
    const editGroup = useEditGroup()
    const leaveGroup = useLeaveGroup()

    const userData = useUserData()

    const otherMember =
        group?.GroupMembers?.length === 2
            ? group.GroupMembers[0].id !== userData.id
                ? group.GroupMembers[0]
                : group.GroupMembers[1]
            : null

    const { membersList, searchMembers } = useMembers()

    const [focused, setFocused] = useState(false)

    const [numberValue, setNumberValue] = useState(
        group?.groupSize?.toString() || ''
    )
    const [descValue, setDescValue] = useState(group?.description || '')
    const [memberValue, setMemberValue] = useState(otherMember?.name || '')
    const [isInputVisible, setIsInputVisible] = useState(!!otherMember)
    const [groupMember, setGroupMember] = useState<GroupMember | null>({
        id: otherMember?.id || 0,
        name: otherMember?.name || ''
    })

    const handleIsInputVisible = () => {
        setIsInputVisible((prev) => !prev)
    }

    useEffect(() => {
        !isInputVisible && setMemberValue('')
    }, [isInputVisible])

    useEffect(() => {
        if (memberValue === '') setGroupMember(null)
        else {
            let member = membersList.find(
                (member) => member.name === memberValue
            )
            let data = {
                id: member?.id ? member?.id : 0,
                name: memberValue
            }
            setGroupMember(data)
        }
    }, [memberValue])

    useEffect(() => {
        if (otherMember)
            setGroupMember({
                id: otherMember?.id,
                name: otherMember.name
            })
    }, [])

    function handleCreateGroup() {
        createGroup(
            NullIfEmptyAndParseInt(numberValue),
            NullIfEmpty(descValue),
            groupMember
        )
        handleVisible()
    }

    function handleEditGroup() {
        editGroup(
            group?.id || 0,
            NullIfEmptyAndParseInt(numberValue),
            NullIfEmpty(descValue),
            groupMember
        )
        handleVisible()
    }

    function search() {
        searchMembers(memberValue)
    }

    function handleMemberClicked(member: GroupMember) {
        setMemberValue(member.name)
        Keyboard.dismiss()
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
                <Background onPress={() => Keyboard.dismiss()}>
                    <CloseModal handleVisible={handleVisible} />
                    <Title>{group ? 'Edytuj grupę' : 'Utwórz grupę'}</Title>
                    {!isInputVisible ? (
                        <AddButton onPress={handleIsInputVisible}>
                            <PlusIcon size={20} />
                            <AddButtonText>Dodaj osobę</AddButtonText>
                        </AddButton>
                    ) : (
                        <>
                            <InputDescription>Oprowadzam z</InputDescription>
                            <MemberInputWrapper>
                                <Input
                                    handleFocused={(focused: boolean) =>
                                        setFocused(focused)
                                    }
                                    onChange={search}
                                    text={memberValue}
                                    setText={setMemberValue}
                                    placeholder="wyszukaj..."
                                ></Input>
                                <CancelButtonWrapper
                                    onPress={handleIsInputVisible}
                                >
                                    <PlusIcon size={20} />
                                </CancelButtonWrapper>
                                {focused && (
                                    <MemberInputDrawerWrapper
                                        keyboardShouldPersistTaps={'handled'}
                                    >
                                        <MemberInputDrawer>
                                            {membersList?.map((member, id) => {
                                                if (
                                                    !member.groupId &&
                                                    member.name !==
                                                        userData.name
                                                )
                                                    return (
                                                        <MemberWrapper
                                                            key={id}
                                                            onPress={() =>
                                                                handleMemberClicked(
                                                                    member
                                                                )
                                                            }
                                                        >
                                                            <MediumText>
                                                                {member.name}
                                                                {member.groupId}
                                                            </MediumText>
                                                        </MemberWrapper>
                                                    )
                                                else if (
                                                    member.name !==
                                                    userData.name
                                                )
                                                    return (
                                                        <InactiveMemberWrapper>
                                                            <TextDim key={id}>
                                                                {member.name}{' '}
                                                                (oprowadza)
                                                            </TextDim>
                                                        </InactiveMemberWrapper>
                                                    )
                                            })}
                                        </MemberInputDrawer>
                                    </MemberInputDrawerWrapper>
                                )}
                            </MemberInputWrapper>
                        </>
                    )}
                    <InputDescription>
                        Liczba oprowadzanych osób{' '}
                        <TextDim>(opcjonalne)</TextDim>
                    </InputDescription>
                    <InputNumber
                        value={numberValue}
                        setValue={setNumberValue}
                    ></InputNumber>
                    <InputDescription>
                        Opis grupy <TextDim>(opcjonalne)</TextDim>
                    </InputDescription>
                    <InputMultiline value={descValue} setValue={setDescValue} />
                    <ButtonsWrapper>
                        {group && (
                            <LeaveButton onPress={leaveGroup}>
                                <AddButtonText>Opuść grupę</AddButtonText>
                            </LeaveButton>
                        )}
                        <SubmitButton
                            onPress={
                                group ? handleEditGroup : handleCreateGroup
                            }
                        >
                            <AddButtonText>
                                {group
                                    ? 'Zatwierdź'
                                    : 'Rozpocznij oprowadzanie'}
                            </AddButtonText>
                        </SubmitButton>
                    </ButtonsWrapper>
                </Background>
            </Backdrop>
        </Modal>
    )
}

export default CreateGroupModal

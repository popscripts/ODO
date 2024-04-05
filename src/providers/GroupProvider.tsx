import React, { createContext, useContext, useState } from 'react'
import { Children } from '../types/props.type'
import { GroupMember, MembersListMember } from '../types/auth.type'
import groupService from '../services/groupService'
import { useGetUserData, useUserData } from './AuthProvider'

type membersContextType = {
    membersList: MembersListMember[]
    searchMembers: Function
}

const CreateGroupContext = createContext(
    (
        groupSize: number | null,
        description: string | null,
        groupMember: GroupMember | null
    ) => {}
)
const EditGroupContext = createContext(
    (
        id: number,
        groupSize: number | null,
        description: string | null,
        groupMember: GroupMember | null
    ) => {}
)
const DeleteGroupContext = createContext(() => {})
const MembersContext = createContext<membersContextType>({
    membersList: [],
    searchMembers: (member: string) => {}
})

export function useCreateGroup() {
    return useContext(CreateGroupContext)
}

export function useEditGroup() {
    return useContext(EditGroupContext)
}

export function useDeleteGroup() {
    return useContext(DeleteGroupContext)
}

export function useMembers() {
    return useContext(MembersContext)
}

function GroupProvider({ children }: Children) {
    const [membersList, setMembersList] = useState<MembersListMember[]>([])
    const userData = useUserData()
    const getUserData = useGetUserData()

    function createGroup(
        groupSize: number | null,
        description: string | null,
        groupMember: GroupMember | null
    ) {
        let members = [
            {
                id: userData.id,
                name: userData.name || ''
            }
        ]
        if (groupMember) members.push(groupMember)
        groupService.createGroup(groupSize, description, members).then(() => {
            getUserData()
        })
    }

    function editGroup(
        id: number,
        groupSize: number | null,
        description: string | null,
        groupMember: GroupMember | null
    ) {
        let temp =
            (userData?.Group?.GroupMembers &&
                userData?.Group?.GroupMembers[0]?.id) ||
            0
        let members =
            groupMember?.id !== temp && groupMember ? [groupMember] : []
        groupService
            .updateGroup(id, groupSize, description, members)
            .then((res) => {
                getUserData()
            })
    }

    function deleteGroup() {
        if (userData?.Group?.id)
            groupService.removeGroup(userData.Group.id).then(() => {
                getUserData()
            })
    }

    function searchMembers(member: string) {
        groupService.searchMembers(member).then((res) => {
            if (!res.error) setMembersList(res.result)
        })
    }

    return (
        <CreateGroupContext.Provider value={createGroup}>
            <EditGroupContext.Provider value={editGroup}>
                <DeleteGroupContext.Provider value={deleteGroup}>
                    <MembersContext.Provider
                        value={{
                            membersList: membersList,
                            searchMembers: searchMembers
                        }}
                    >
                        {children}
                    </MembersContext.Provider>
                </DeleteGroupContext.Provider>
            </EditGroupContext.Provider>
        </CreateGroupContext.Provider>
    )
}

export default GroupProvider

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { GroupMember, MembersListMember } from '../types/auth.type'
import groupService from '../services/groupService'
import { socket, useAuthContext } from './AuthProvider'
import { useUserContext } from './UserProvider'

type membersContextType = {
    membersList: MembersListMember[]
    searchMembers: Function
}

interface GroupContextType {
    createGroup: Function
    editGroup: Function
    deleteGroup: Function
    leaveGroup: Function
    members: membersContextType
}

const GroupContext = createContext<GroupContextType>({
    createGroup: (
        groupSize: number | null,
        description: string | null,
        groupMember: GroupMember | null
    ) => {},
    editGroup: (
        id: number,
        groupSize: number | null,
        description: string | null,
        groupMember: GroupMember | null
    ) => {},
    deleteGroup: () => {},
    leaveGroup: () => {},
    members: {
        membersList: [],
        searchMembers: (member: string) => {}
    }
})

export function useGroupContext() {
    return useContext(GroupContext)
}

function GroupProvider({ children }: Children) {
    const [membersList, setMembersList] = useState<MembersListMember[]>([])
    const { userData, getUserData } = useUserContext()

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
        let members = [
            {
                id: userData.id,
                name: userData.name || ''
            }
        ]
        if (groupMember) members.push(groupMember)
        groupService.updateGroup(id, groupSize, description, members)
    }

    function deleteGroup() {
        if (userData?.Group?.id)
            groupService.removeGroup(userData.Group.id).then(() => {
                getUserData()
            })
    }

    function leaveGroup() {
        if (userData?.Group?.id)
            groupService.leaveGroup(userData.Group.id).then(() => {
                getUserData()
            })
    }

    function searchMembers(member: string) {
        groupService.searchMembers(member).then((res) => {
            if (!res.error) setMembersList(res.result as MembersListMember[])
        })
    }

    const { loggedIn } = useAuthContext()

    useEffect(() => {
        if (loggedIn) {
            socket.on('groupUpdate', () => {
                getUserData()
            })
        }
    }, [loggedIn])

    const contextValue: GroupContextType = {
        createGroup,
        editGroup,
        deleteGroup,
        leaveGroup,
        members: {
            membersList,
            searchMembers
        }
    }

    return (
        <GroupContext.Provider value={contextValue}>
            {children}
        </GroupContext.Provider>
    )
}

export default GroupProvider

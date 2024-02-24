import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { GroupMember } from '../types/auth.type'
import groupService from '../services/groupService'
import { useGetUserData, useUserData } from './AuthProvider'

const CreateGroupContext = createContext((groupSize: number | null, description: string | null, groupMember: GroupMember | null) => {})
const DeleteGroupContext = createContext(() => {})

export function useCreateGroup() {
    return useContext(CreateGroupContext)
}

export function useDeleteGroup() {
    return useContext(DeleteGroupContext)
}

function GroupProvider({ children }: Children) {
    const userData = useUserData()
    const getUserData = useGetUserData()
    
    function createGroup(groupSize: number | null, description: string | null, groupMember: GroupMember | null) {
        let members = [
            {
                id: userData.id,
                name: userData.name || ""
            }
        ]
        if (groupMember) members.push(groupMember)
        groupService.createGroup(groupSize, description, members).then(() => {
            getUserData()
        })
    }

    function deleteGroup() {
        if (userData?.Group?.id)
            groupService.removeGroup(userData.Group.id).then(() => {
                getUserData()
            })
    }


    return (
        <CreateGroupContext.Provider value={createGroup}>
            <DeleteGroupContext.Provider value={deleteGroup}>
                {children}
            </DeleteGroupContext.Provider>
        </CreateGroupContext.Provider>
    )
}

export default GroupProvider

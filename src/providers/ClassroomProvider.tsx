import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import {
    Classroom,
    classroomStatus,
    VisitedClassroom
} from '../types/classroom.type'
import { useAuthContext, useSocket } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import { Status } from '../types/status.type'
import { useUserContext } from './UserProvider'

type GroupedClassrooms = {
    free: Classroom[]
    reserved: Classroom[]
    busy: Classroom[]
    visited: VisitedClassroom[]
}

interface ClassroomContextType {
    classrooms: GroupedClassrooms
    setStatus: Function
    addToVisited: Function
    removeFromVisited: Function
}

const ClassroomContext = createContext<ClassroomContextType>({
    classrooms: {
        free: [],
        reserved: [],
        busy: [],
        visited: []
    },
    setStatus: (
        id: number,
        prevStatus: Status['name'],
        status: Status['name']
    ) => {},
    addToVisited: (classroomId: number) => {},
    removeFromVisited: (classroomId: number) => {}
})

export function useClassroomContext() {
    return useContext(ClassroomContext)
}

function ClassroomProvider({ children }: Children) {
    const socket = useSocket()
    const { getUserData, userData } = useUserContext()
    const { loggedIn } = useAuthContext()

    const [classrooms, setClassrooms] = useState<GroupedClassrooms>({
        free: [],
        reserved: [],
        busy: [],
        visited: []
    })

    function getGroupedClassrooms() {
        ClassroomService.getGroupedClassrooms().then((response) => {
            setClassrooms(response.result as GroupedClassrooms)
        })
    }

    function setStatus(id: number, prevStatus: string, status: string) {
        ClassroomService.changeClassroomStatus(id, status, prevStatus)
    }

    function addToVisited(classroomId: number) {
        if (userData.Group?.id)
            ClassroomService.addToVisitedClassrooms(
                userData.Group.id,
                classroomId
            )
    }

    function removeFromVisited(classroomId: number) {
        if (userData.Group?.id)
            ClassroomService.removeFromVisitedClassrooms(
                userData.Group.id,
                classroomId
            )
    }

    useEffect(() => {
        loggedIn && getGroupedClassrooms()
    }, [userData.Group?.id, loggedIn])

    useEffect(() => {
        if (loggedIn && socket) {
            socket.on('classroomStatus', (data: classroomStatus) => {
                getUserData()
                getGroupedClassrooms()
            })

            socket.on('groupVisitedClassroom', (data: classroomStatus) => {
                getGroupedClassrooms()
            })
        }
    }, [loggedIn, socket])

    const contextValue = {
        classrooms,
        setStatus,
        addToVisited,
        removeFromVisited
    }

    return (
        <ClassroomContext.Provider value={contextValue}>
            {children}
        </ClassroomContext.Provider>
    )
}

export default ClassroomProvider

import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import {
    Classroom,
    classroomStatus,
    VisitedClassroom
} from '../types/classroom.type'
import { useGetUserData, useLoggedIn, useUserData } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import io from 'socket.io-client'
import { API_URL } from '../config'
import { Status } from '../types/status.type'

export const socket = io(API_URL)

type ParsedClassrooms = {
    free: Classroom[]
    reserved: Classroom[]
    busy: Classroom[]
    visited: VisitedClassroom[]
}

const ClassroomContext = createContext<Classroom[]>([])
const ParsedClassroomContext = createContext<ParsedClassrooms>({
    free: [],
    reserved: [],
    busy: [],
    visited: []
})
const SetStatusContext = createContext(
    (
        id: number,
        prevStatus: Status['name'],
        status: Status['name'],
        classroom: string,
        title: string
    ) => {}
)
const HandleVisitedClassroomsContext = createContext({
    addToVisited: (classroomId: number) => {},
    removeFromVisited: (classroomId: number) => {}
})

export function useClassrooms() {
    return useContext(ClassroomContext)
}

export function useParsedClassrooms() {
    return useContext(ParsedClassroomContext)
}

export function useSetStatus() {
    return useContext(SetStatusContext)
}

export function useHandleVisited() {
    return useContext(HandleVisitedClassroomsContext)
}

function ClassroomProvider({ children }: Children) {
    const getUserData = useGetUserData()

    const [classrooms, setClassrooms] = useState<Classroom[]>([])
    const loggedIn = useLoggedIn()
    const userData = useUserData()

    const [parsedClassrooms, setParsedClassrooms] = useState<ParsedClassrooms>({
        free: [],
        reserved: [],
        busy: [],
        visited: []
    })

    function joinRoom() {
        if (userData.accountType) {
            let data = {
                accountType: userData.accountType.name,
                id: userData.id
            }
            socket.emit('joinRoom', data)
        }
    }

    function getClassrooms() {
        ClassroomService.getClassrooms().then((response) => {
            setClassrooms(response.result)
        })
    }

    function getGroupedClassrooms() {
        ClassroomService.getGroupedClassrooms().then((response) => {
            setParsedClassrooms(response.result)
        })
    }

    function setStatus(
        id: number,
        prevStatus: string,
        status: string,
        classroom: string,
        title: string
    ) {
        ClassroomService.changeClassroomStatus(
            id,
            status,
            prevStatus,
            classroom,
            title
        )
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
        if (loggedIn && classrooms.length === 0) {
            getGroupedClassrooms()
        }
        loggedIn && joinRoom()
    }, [loggedIn])

    useEffect(() => {
        socket.removeAllListeners()

        socket.on('classroomStatus', (data: classroomStatus) => {
            getGroupedClassrooms()
            getUserData()
        })

        socket.on('groupVisitedClassroom', (data: classroomStatus) => {
            getGroupedClassrooms()
        })
    }, [])

    return (
        <ClassroomContext.Provider value={classrooms}>
            <ParsedClassroomContext.Provider value={parsedClassrooms}>
                <SetStatusContext.Provider value={setStatus}>
                    <HandleVisitedClassroomsContext.Provider
                        value={{
                            addToVisited,
                            removeFromVisited
                        }}
                    >
                        {children}
                    </HandleVisitedClassroomsContext.Provider>
                </SetStatusContext.Provider>
            </ParsedClassroomContext.Provider>
        </ClassroomContext.Provider>
    )
}

export default ClassroomProvider

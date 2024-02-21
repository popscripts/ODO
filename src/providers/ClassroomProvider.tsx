import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom, classroomStatus } from '../types/classroom.type'
import { useGetUserData, useLoggedIn, useUserData } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import io from 'socket.io-client'
import { API_URL } from '../config'
import { Status } from '../types/status.type'

const socket = io(API_URL)

const ClassroomContext = createContext<Classroom[]>([])
const ParsedClassroomContext = createContext({
    free: [0],
    reserved: [0],
    busy: [0]
})
const SetStatusContext = createContext(
    (id: number, prevStatus: Status['name'], status: Status['name']) => {}
)

export function useClassrooms() {
    return useContext(ClassroomContext)
}

export function useParsedClassrooms() {
    return useContext(ParsedClassroomContext)
}

export function useSetStatus() {
    return useContext(SetStatusContext)
}

function ClassroomProvider({ children }: Children) {
    const getUserData = useGetUserData()

    const [classrooms, setClassrooms] = useState<Classroom[]>([])
    const [freeClassrooms, setFreeClassrooms] = useState<number[]>([])
    const [reservedClassrooms, setReservedClassrooms] = useState<number[]>([])
    const [busyClassrooms, setBusyClassrooms] = useState<number[]>([])
    const [changedClassroom, setChangedClassroom] = useState<classroomStatus>()
    const loggedIn = useLoggedIn()
    const userData = useUserData()

    const setStatusClassrooms = {
        free: setFreeClassrooms,
        reserved: setReservedClassrooms,
        busy: setBusyClassrooms
    }

    const [parsedClassrooms, setParsedClassrooms] = useState({
        free: freeClassrooms,
        reserved: reservedClassrooms,
        busy: busyClassrooms
    })

    function joinRoom() {
        if (userData.accountType) {
            let data = {
                accountType: userData.accountType.name
            }
            socket.emit('joinRoomByAccountType', data)
        }
    }

    function parseClassrooms(classrooms: Classroom[]) {
        classrooms.map((classroom) => {
            setStatusClassrooms[classroom.status.name]((classrooms) => [
                ...classrooms,
                classroom.id
            ])
        })
    }

    function getClassrooms() {
        ClassroomService.getClassrooms().then((response) => {
            setClassrooms(response.result)
            parseClassrooms(response.result)
        })
    }

    function setStatus(id: number, prevStatus: string, status: string) {
        ClassroomService.changeClassroomStatus(id, status, prevStatus)
    }

    function handleStatusChange() {
        if (changedClassroom) {
            const previousClassrooms =
                parsedClassrooms[changedClassroom?.prevStatus].slice()
            const previousIndex = previousClassrooms.indexOf(
                changedClassroom?.classroom.id
            )
            previousIndex > -1 && previousClassrooms.splice(previousIndex, 1)
            setStatusClassrooms[changedClassroom?.prevStatus](
                previousClassrooms
            )

            const currentClassrooms =
                parsedClassrooms[
                    changedClassroom?.classroom.status.name
                ].slice()
            const currentIndex = currentClassrooms.indexOf(
                changedClassroom?.classroom.id
            )
            currentIndex < 0 &&
                currentClassrooms.unshift(changedClassroom?.classroom.id)
            setStatusClassrooms[changedClassroom?.classroom.status.name](
                currentClassrooms
            )
        }
    }

    function updateClassroomData() {
        if (changedClassroom) {
            const previousClassrooms = classrooms.slice()
            for (let item in previousClassrooms) {
                if (
                    previousClassrooms[item].id ===
                    changedClassroom.classroom.id
                )
                    previousClassrooms[item] = {
                        ...changedClassroom?.classroom
                    }
            }
            setClassrooms(previousClassrooms)
        }
    }

    useEffect(() => {
        loggedIn && classrooms.length === 0 && getClassrooms()
        loggedIn && joinRoom()
    }, [loggedIn])

    useEffect(() => {
        setParsedClassrooms({
            free: freeClassrooms,
            reserved: reservedClassrooms,
            busy: busyClassrooms
        })
    }, [freeClassrooms, reservedClassrooms, busyClassrooms])

    useEffect(() => {
        handleStatusChange()
        updateClassroomData()
    }, [changedClassroom])

    useEffect(() => {
        socket.removeAllListeners()
        socket.on('classroomStatus', (data: classroomStatus) => {
            setChangedClassroom(data)
            getUserData()
        })
    }, [])

    return (
        <ClassroomContext.Provider value={classrooms}>
            <ParsedClassroomContext.Provider value={parsedClassrooms}>
                <SetStatusContext.Provider value={setStatus}>
                    {children}
                </SetStatusContext.Provider>
            </ParsedClassroomContext.Provider>
        </ClassroomContext.Provider>
    )
}

export default ClassroomProvider

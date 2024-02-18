import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom, classroomStatus } from '../types/classroom.type'
import { useLoggedIn, useUserData } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import io from 'socket.io-client'
import { API_URL } from '../config'

const socket = io(API_URL)

const ClassroomContext = createContext<Classroom[]>([])
const ParsedClassroomContext = createContext({ free: [0], reserved: [0], busy: [0] })
const SetStatusContext = createContext((id: number, prevStatus: string, status: string) => {})

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
        if (userData.name) {
            let data = {
                username: userData.username,
                accountType: userData.accountType.name
            }
            socket.emit('joinRoomByAccountType', data)
        }
    }

    function parseClassrooms(classrooms: Classroom[]) {
        classrooms.map((classroom, index) => {
            setStatusClassrooms[classroom.status.name]((classrooms) => [...classrooms, classroom.id])
        })
    }

    function getClassrooms() {
        ClassroomService.getClassrooms().then((response) => {
            setClassrooms(response.result)
            parseClassrooms(response.result)
        })
    }

    function changeClassroomStatus(classroomId: number, prevStatus: string, status: string) {
        const data = {
            id: classroomId,
            userId: userData?.id,
            accountType: userData?.accountType.name,
            prevStatus,
            status
        }
        socket.emit('setClassroomStatus', data)
    }

    function setStatus(id: number, prevStatus: string, status: string) {
        changeClassroomStatus(id, prevStatus, status)
    }

    function handleStatusChange() {
        if (changedClassroom) {
            const previousClassrooms = parsedClassrooms[changedClassroom?.prevStatus].slice()
            const previousIndex = previousClassrooms.indexOf(changedClassroom?.id)
            previousIndex > -1 && previousClassrooms.splice(previousIndex, 1)
            setStatusClassrooms[changedClassroom?.prevStatus](previousClassrooms)

            const currentClassrooms = parsedClassrooms[changedClassroom?.status].slice()
            const currentIndex = currentClassrooms.indexOf(changedClassroom?.id)
            currentIndex < 0 && currentClassrooms.unshift(changedClassroom?.id)
            setStatusClassrooms[changedClassroom?.status](currentClassrooms)
        }
    }

    useEffect(() => {
        joinRoom()
    }, [userData])

    useEffect(() => {
        loggedIn && classrooms.length === 0 && getClassrooms()
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
    }, [changedClassroom])

    useEffect(() => {
        socket.removeAllListeners()
        socket.on('classroomStatus', (classroom: classroomStatus) => {
            if (classroom.prevStatus !== classroom.status) {
                setChangedClassroom(classroom)
            }
        })
    }, [])

    return (
        <ClassroomContext.Provider value={classrooms}>
            <ParsedClassroomContext.Provider value={parsedClassrooms}>
                <SetStatusContext.Provider value={setStatus}>{children}</SetStatusContext.Provider>
            </ParsedClassroomContext.Provider>
        </ClassroomContext.Provider>
    )
}

export default ClassroomProvider

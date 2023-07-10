import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom } from '../types/classroom.type'
import { useToken, useUserData } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import io from 'socket.io-client'
const socket = io('http://192.168.1.220:3005')

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
    const token = useToken()
    const userData = useUserData()

    useEffect(() => {
        if (userData.id) {
            socket.removeAllListeners()
            let data = {
                username: userData.username,
                accountType: userData.accountType.name
            }
            socket.emit('joinRoomByAccountType', data)
        }
    }, [userData])

    useEffect(() => {
        !token.error && classrooms.length === 0 && getClassrooms()
    }, [token])

    function parseClassrooms(classrooms: Classroom[]) {
        classrooms.map((classroom, index) => {
            if (classroom.status.name === 'free') {
                setFreeClassrooms((classrooms) => [...classrooms, classroom.id])
            } else if (classroom.status.name === 'reserved') {
                setReservedClassrooms((classrooms) => [...classrooms, classroom.id])
            } else if (classroom.status.name === 'busy') {
                setBusyClassrooms((classrooms) => [...classrooms, classroom.id])
            }
        })
    }

    function getClassrooms() {
        ClassroomService.getClassrooms().then((response) => {
            setClassrooms(response.result)
            parseClassrooms(response.result)
        })
    }

    function changeClassroomStatusS(classroomId: number, prevStatus: string, status: string) {
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
        changeClassroomStatusS(id, prevStatus, status)
        // const temp = freeClassrooms.slice()
        // const index = temp.indexOf(id)
        // if (index > -1) {
        //     temp.splice(index, 1)
        // }
        // setFreeClassrooms(temp)
        //
        // const temp2 = busyClassrooms.slice()
        // temp2.unshift(id)
        // setBusyClassrooms(temp2)
        // ClassroomService.changeClassroomStatus(id, status).then()
    }

    socket.on('classroomStatuses', (classroom) => {
        console.log(classroom.id)
        // const temp = freeClassrooms.slice()
        // const index = temp.indexOf(classroom.id)
        // if (index > -1) {
        //     temp.splice(index, 1)
        // }
        // setFreeClassrooms(temp)
        //
        // const temp2 = busyClassrooms.slice()
        // temp2.unshift(classroom.id)
        // setBusyClassrooms(temp2)
    })

    const [parsedClassrooms, setParsedClassrooms] = useState({
        free: freeClassrooms,
        reserved: reservedClassrooms,
        busy: busyClassrooms
    })

    useEffect(() => {
        setParsedClassrooms({
            free: freeClassrooms,
            reserved: reservedClassrooms,
            busy: busyClassrooms
        })
    }, [freeClassrooms, reservedClassrooms, busyClassrooms])

    return (
        <ClassroomContext.Provider value={classrooms}>
            <ParsedClassroomContext.Provider value={parsedClassrooms}>
                <SetStatusContext.Provider value={setStatus}>{children}</SetStatusContext.Provider>
            </ParsedClassroomContext.Provider>
        </ClassroomContext.Provider>
    )
}

export default ClassroomProvider

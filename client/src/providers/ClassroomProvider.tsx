import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom, classroomStatus } from '../types/classroom.type'
import { useToken, useUserData } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import io from 'socket.io-client'
import { API_URL } from '../config'
import { Status } from '../types/status.type'

const socket = io(API_URL)

const ClassroomContext = createContext<Classroom[]>([])
const ParsedClassroomContext = createContext({ free: [0], reserved: [0], busy: [0] })
const SetStatusContext = createContext((id: number, prevStatus: Status["name"], status: Status["name"]) => {})

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
    const token = useToken()
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
        classrooms.map((classroom) => {
            setStatusClassrooms[classroom.status.name]((classrooms) => [...classrooms, classroom.id])
        })
    }

    function getClassrooms() {
        ClassroomService.getClassrooms().then((response) => {
            setClassrooms(response.result)
            parseClassrooms(response.result)
        })
    }

    function changeClassroomStatus(classroomId: number, prevStatus: Status["name"], status: Status["name"]) {
        const data = {
            id: classroomId,
            userId: userData?.id,
            accountType: userData?.accountType.name,
            prevStatus,
            status
        }
        setChangedClassroom(data)
        socket.emit('setClassroomStatus', data)
    }

    function setStatus(id: number, prevStatus: Status["name"], status: Status["name"]) {
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

    function handleClassroomChange(classroom: Classroom) {
        let temp = classrooms
        let prevClassroom = classrooms.find(item => item.id === classroom.id)
        if (!prevClassroom) return
        console.log(prevClassroom)

        let id = classrooms.indexOf(prevClassroom)   
        console.log("id: ", id,)
        if (id > -1) {
            temp[id] = classroom
            setClassrooms({...temp})
        }    
    }

    useEffect(() => {
        joinRoom()
    }, [userData])
    // useEffect(() => {
    //     console.log("classrooms: ", classrooms)
    // }, [classrooms])

    useEffect(() => {
        !token.error && classrooms.length === 0 && getClassrooms()
    }, [token])

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
        socket.on('classroomStatus', (data) => {
            console.log("socket: ", data.prevStatus, data.classroom.status)
            if (data.prevStatus !== data.classroom.status.name) {
                // TODO... change taken by etc
                let changed: classroomStatus = {id: data.classroom.id, userId: 1, accountType: 'admin' ,status: data.classroom.status.name, prevStatus: data.prevStatus,}
                setChangedClassroom(changed)
                handleClassroomChange(data.classroom)
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

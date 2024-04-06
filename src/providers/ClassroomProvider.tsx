import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom, classroomStatus } from '../types/classroom.type'
import { useGetUserData, useLoggedIn, useUserData } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import io from 'socket.io-client'
import { API_URL } from '../config'
import { Status } from '../types/status.type'

export const socket = io(API_URL)

const ClassroomContext = createContext<Classroom[]>([])
const ParsedClassroomContext = createContext({
    free: [0],
    reserved: [0],
    busy: [0],
    visited: [0]
})
const SetStatusContext = createContext(
    (id: number, prevStatus: Status['name'], status: Status['name']) => {}
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
    const [freeClassrooms, setFreeClassrooms] = useState<number[]>([])
    const [reservedClassrooms, setReservedClassrooms] = useState<number[]>([])
    const [busyClassrooms, setBusyClassrooms] = useState<number[]>([])
    const [visitedClassrooms, setVisitedClassrooms] = useState<number[]>([])
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
        busy: busyClassrooms,
        visited: visitedClassrooms
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

    function parseClassrooms(classrooms: Classroom[]) {
        setFreeClassrooms([])
        setReservedClassrooms([])
        setBusyClassrooms([])
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
            if (userData?.Group?.id) {
                ClassroomService.getVisitedClassrooms(userData.Group.id).then(
                    (response) => setVisitedClassrooms(response.result)
                )
            }
        })
    }

    function setStatus(id: number, prevStatus: string, status: string) {
        ClassroomService.changeClassroomStatus(id, status, prevStatus)
        if (prevStatus === 'busy' && status === 'free') {
            addToVisited(id)
        }
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
            getClassrooms()
        }
        loggedIn && joinRoom()
    }, [loggedIn])

    useEffect(() => {
        setParsedClassrooms({
            free: freeClassrooms,
            reserved: reservedClassrooms,
            busy: busyClassrooms,
            visited: visitedClassrooms
        })
    }, [freeClassrooms, reservedClassrooms, busyClassrooms, visitedClassrooms])

    useEffect(() => {
        handleStatusChange()
        updateClassroomData()
    }, [changedClassroom])

    useEffect(() => {
        let temp = classrooms
        for (let id in visitedClassrooms) {
            temp = temp.filter(
                (classroom) => classroom.id !== visitedClassrooms[id]
            )
        }
        parseClassrooms(temp)
    }, [classrooms, visitedClassrooms])

    useEffect(() => {
        socket.removeAllListeners()

        socket.on('classroomStatus', (data: classroomStatus) => {
            console.log('classroomStatus')
            setChangedClassroom(data)
            getUserData()
        })

        socket.on('groupVisitedClassroomAction', (data: classroomStatus) => {
            console.log(userData.Group)
            if (userData.Group)
                ClassroomService.getVisitedClassrooms(userData.Group.id).then(
                    (response) => setVisitedClassrooms(response.result)
                )
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

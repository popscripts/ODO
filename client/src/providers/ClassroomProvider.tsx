import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom, ParsedClassrooms } from '../types/classroom.type'
import { useToken } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import { ShortUser } from '../types/auth.type'
import { Status } from '../types/status.type'

const ClassroomContext = createContext<Classroom[]>([])
const ParsedClassroomContext = createContext({ free: [0], reserved: [0], busy: [0] })
const SetStatusContext = createContext((id: number, status: string) => {})

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

    useEffect(() => {
        if (classrooms.length === 0) {
            getClassrooms()
        }
    }, [token])

    function parseClassrooms(classrooms: Classroom[]) {
        classrooms.map((classroom, index) => {
            if (classroom.status.status === 'free') {
                setFreeClassrooms((classrooms) => [...classrooms, classroom.id])
            } else if (classroom.status.status === 'reserved') {
                setReservedClassrooms((classrooms) => [...classrooms, classroom.id])
            } else if (classroom.status.status === 'busy') {
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

    function setStatus(id: number, status: string) {
        const temp = freeClassrooms.slice()
        const index = temp.indexOf(id)
        if (index > -1) {
            temp.splice(index, 1)
        }
        setFreeClassrooms(temp)

        const temp2 = busyClassrooms.slice()
        temp2.unshift(id)
        setBusyClassrooms(temp2)
        console.log(parsedClassrooms)
        // ClassroomService.changeClassroomStatus(id, status).then()
    }

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

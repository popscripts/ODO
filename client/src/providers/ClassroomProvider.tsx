import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom, ParsedClassrooms } from '../types/classroom.type'
import { useToken } from './AuthProvider'
import ClassroomService from '../services/classroomService'
import { ShortUser } from '../types/auth.type'
import { Status } from '../types/status.type'

const ClassroomContext = createContext<Classroom[]>([])
const ParsedClassroomContext = createContext({ free: [], reserved: [], busy: [] })
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
    const [parsedClassrooms, setParsedClassrooms] = useState({
        free: [],
        reserved: [],
        busy: []
    })
    const token = useToken()

    useEffect(() => {
        if (classrooms.length === 0) {
            getClassrooms()
            ClassroomService.getParsedClassrooms().then((response) => setParsedClassrooms(response.result))
        }
    }, [token])

    function parseClassrooms() {
        setParsedClassrooms({
            free: classrooms.filter((classroom) => classroom.status.status === 'free'),
            reserved: classrooms.filter((classroom) => classroom.status.status === 'reserved'),
            busy: classrooms.filter((classroom) => classroom.status.status === 'busy')
        })
    }

    function getClassrooms() {
        ClassroomService.getClassrooms().then((response) => setClassrooms(response.result))
    }

    useEffect(() => {
        console.log('dupa')
        parseClassrooms()
    }, [classrooms])

    function setStatus(id: number, status: string) {
        ClassroomService.changeClassroomStatus(id, status).then(
            (response) => !response.error && getClassrooms()
        )
    }

    return (
        <ClassroomContext.Provider value={classrooms}>
            <ParsedClassroomContext.Provider value={parsedClassrooms}>
                <SetStatusContext.Provider value={setStatus}>{children}</SetStatusContext.Provider>
            </ParsedClassroomContext.Provider>
        </ClassroomContext.Provider>
    )
}

export default ClassroomProvider

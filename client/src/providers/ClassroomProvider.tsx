import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom } from '../types/classroom.type'
import { useToken } from './AuthProvider'
import ClassroomService from '../services/classroomService'

const ClassroomContext = createContext<Classroom[]>([])

export function useClassrooms() {
    return useContext(ClassroomContext)
}

function ClassroomProvider({ children }: Children) {
    const [classrooms, setClassrooms] = useState<Classroom[]>([])
    const token = useToken()

    useEffect(() => {
        if (true) {
            ClassroomService.getClassrooms().then((response) => setClassrooms(response.result))
        }
        console.log(classrooms)
    }, [token])

    return <ClassroomContext.Provider value={classrooms}>{children}</ClassroomContext.Provider>
}

export default ClassroomProvider

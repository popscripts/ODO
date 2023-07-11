import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'
import { Classroom } from '../types/classroom.type'
import { useUserData } from './AuthProvider'
import ClassroomService from '../services/classroomService'

const ClassroomContext = createContext<Classroom[]>([])

export function useClassrooms() {
    return useContext(ClassroomContext)
}

function ClassroomProvider({ children }: Children) {
    const [classrooms, setClassrooms] = useState<Classroom[]>([])
    const userData = useUserData()

    useEffect(() => {
        if (classrooms.length === 0 && userData.id) {
            ClassroomService.getClassrooms().then((response) => setClassrooms(response.result))
        }
    }, [userData])

    return <ClassroomContext.Provider value={classrooms}>{children}</ClassroomContext.Provider>
}

export default ClassroomProvider

import { Status } from './status.type'
import { ShortUser } from './auth.type'

export type NewClassroom = {
    openDayId: number
    classroom: string
    title: string
    description: string
    managedById: number | null
}

export type Classroom = {
    id: number
    openDayId: number
    classroom: string
    title: string
    description: string
    managedBy: ShortUser | null
    status: Status
    reservedAt: string | null
    reservedBy: ShortUser | null
    takenBy: ShortUser | null
    takenAt: string | null
}

export type ManagedClassroom = {
    id: number
    classroom: string
    title: string
    description: string
}

export type ParsedClassrooms = {
    free: Classroom[]
    reserved: Classroom[]
    busy: Classroom[]
}

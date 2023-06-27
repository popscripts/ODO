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
    reservedAt: Date | null
    reservedBy: ShortUser | null
    takenBy: ShortUser | null
    takenAt: Date | null
}

export type ManagedClassroom = {
    id: number
    classroom: string
    title: string
    description: string
}

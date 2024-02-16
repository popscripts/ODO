import { Classroom, ManagedClassroom } from './classroom.type'

export type NewUser = {
    openDayId: number
    username: string
    password: string
}

export type LoginUser = {
    id: number
    openDayId: number
    username: string
    password: string
    accountType: object
}

export type User = {
    id: number
    username: string
    openDayId: number
    accountType: AccountType
    pictureName: string | null
    name: string | null
    ManagedClassroom: Array<ManagedClassroom>
    ReservedClassroom: Array<Classroom>
    TakenClassroom: Array<Classroom>
}

export type ShortUser = {
    id: number
    name: string
    username: string
}

export type AccountType = {
    id: number
    name: string
}

export interface Token {
    id: number
    openDayId: number
    username: string
    accountType: AccountType
    iat: number
    exp: number
}

export type Users = {
    id: number
    username: string
    openDayId: number
    accountType: AccountType
    active: boolean
}

export type PictureName = {
    pictureName: string | null
}


export type Group = {
    GroupMembers: ShortUser[]
    description: string
    groupSize: number
    id: number
}
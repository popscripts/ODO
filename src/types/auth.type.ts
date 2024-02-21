import { Classroom, ManagedClassroom, ShortClassroom } from './classroom.type'

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
    openDayId: number
    username: string
    name: string | null
    accountType: AccountType
    pictureName: string | null
    ManagedClassroom: ManagedClassroom | null
    Group: Group | null
}

export type ShortUser = {
    id: number
    name: string
    username: string
    pictureName: string | null
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
    id: number
    groupSize: number | null
    GroupMembers: ShortUser[] | null
    description: string | null
    Reserved: ShortClassroom | null
    Taken: ShortClassroom | null
}

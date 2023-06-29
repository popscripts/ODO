import { ManagedClassroom } from './classroom.type'

export type NewUser = {
    openDayId: number
    username: string
    password: string
    accountType: number
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
    ManagedClassroom: Array<ManagedClassroom>
    group: Group | null
}

export type ShortUser = {
    id: number
    username: string
    name: string | null
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
    groupMemberOne: ShortUser | null
    groupMemberTwo: ShortUser | null
    groupSize: number | null
    description: string | null
}

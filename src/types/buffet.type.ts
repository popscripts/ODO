import { ShortUser } from './auth.type'

export type OrderStatus = {
    id: number
    name: 'ordered' | 'inProgress' | 'done' | 'pickedUp' | 'cancelled'
}

export type Order = {
    id: number
    openDayId: number
    OrderPosition: OrderExtendedPosition[]
    comment: string
    status: OrderStatus
    orderedBy: ShortUser
    createdAt: string
    updatedAt: string
}

export type OrderPosition = {
    dishId: number
    amount: number
}

export type OrderExtendedPosition = {
    id: number
    orderId: number
    amount: number
    dish: {
        id: number
        name: string
        cheese: boolean
        ham: boolean
    }
}

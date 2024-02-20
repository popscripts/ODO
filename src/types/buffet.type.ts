import { Status } from './status.type'
import { ShortUser } from './auth.type'

export type Order = {
    id: number
    openDayId: number
    order: string
    status: Status
    orderedBy: ShortUser
    createdAt: Date
    updatedAt: Date
}

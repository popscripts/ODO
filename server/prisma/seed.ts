import { db } from '../src/utils/db.server'

type Status = {
    id: number
    status: string
}

type AccountType = {
    id: number
    accountType: string
}

const seed = async () => {
    await Promise.all(
        getStatuses().map((status) => {
            return db.status.create({
                data: {
                    id: status.id,
                    status: status.status,
                }
            })
        })
    )

    await Promise.all(
        getAccountTypes().map((accountType) => {
            return db.accountType.create({
                data: {
                    id: accountType.id,
                    accountType: accountType.accountType
                }
            })
        })
    )
}

const getStatuses = (): Array<Status> => {
    return [
        { id: 1, status: 'free' },
        { id: 2, status: 'busy' },
        { id: 3,status: 'reserved' },
        { id: 4, status: 'ordered' },
        { id: 5, status: 'done' },
        { id: 6, status: 'pickedUp' },
        { id: 7, status: 'cancelled' }
    ]
}

const getAccountTypes = (): Array<AccountType> => {
    return [
        { id: 1, accountType: 'admin' },
        { id: 2, accountType: 'user' },
        { id: 3, accountType: 'cook' }
    ]
}

seed()

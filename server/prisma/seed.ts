import { db } from '../src/utils/db.server'
import { Dish } from '../src/types/buffet.type'

type Status = {
    id: number
    name: string
}

type AccountType = {
    id: number
    name: string
}

const seed = async () => {
    await Promise.all(
        getStatuses().map((status) => {
            return db.status.create({
                data: {
                    id: status.id,
                    name: status.name
                }
            })
        })
    )

    await Promise.all(
        getAccountTypes().map((accountType) => {
            return db.accountType.create({
                data: {
                    id: accountType.id,
                    name: accountType.name
                }
            })
        })
    )

    await Promise.all(
        getDishes().map((dish: Dish) => {
            return db.dish.create({
                data: {
                    id: dish.id,
                    name: dish.name,
                    cheese: dish.cheese,
                    ham: dish.ham
                }
            })
        })
    )

    return db.openDay.create({
        data: {
            id: 1
        }
    })
}

const getStatuses = (): Array<Status> => {
    return [
        { id: 1, name: 'free' },
        { id: 2, name: 'busy' },
        { id: 3, name: 'reserved' },
        { id: 4, name: 'ordered' },
        { id: 5, name: 'in progress' },
        { id: 6, name: 'done' },
        { id: 7, name: 'pickedUp' },
        { id: 8, name: 'cancelled' }
    ]
}

const getAccountTypes = (): Array<AccountType> => {
    return [
        { id: 1, name: 'admin' },
        { id: 2, name: 'user' },
        { id: 3, name: 'cook' },
        { id: 4, name: 'classroomManager' }
    ]
}

const getDishes = (): Array<Dish> => {
    return [
        { id: 1, name: 'toastWithCheese', ham: false, cheese: true },
        { id: 2, name: 'toastWithHam', ham: true, cheese: false },
        { id: 3, name: 'toastWithCheeseAndHam', ham: true, cheese: true }
    ]
}

seed()

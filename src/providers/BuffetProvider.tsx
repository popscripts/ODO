import React, { createContext, useContext, useEffect, useState } from 'react'
import { Children } from '../types/props.type'

import { useAuthContext, useSocket } from './AuthProvider'
import { Order, OrderPosition } from '../types/buffet.type'
import BuffetService from '../services/buffetService'

const OrdersContext = createContext<Order[]>([])
const PlaceOrderContext = createContext(
    (
        chValue: number | null,
        cValue: number | null,
        hValue: number | null,
        comment: string
    ) => { }
)
const ChangeOrderStatusContext = createContext(
    (id: number, statusId: number) => { }
)

export function useOrders() {
    return useContext(OrdersContext)
}

export function usePlaceOrder() {
    return useContext(PlaceOrderContext)
}

export function useChangeOrderStatus() {
    return useContext(ChangeOrderStatusContext)
}

function BuffetProvider({ children }: Children) {
    const socket = useSocket()
    const [orders, setOrders] = useState<Order[]>([])

    function placeOrder(
        chValue: number | null,
        cValue: number | null,
        hValue: number | null,
        comment: string
    ) {
        const orderPositions: OrderPosition[] = []

        if (chValue !== null && chValue > 0) {
            orderPositions.push({
                dishId: 3,
                amount: chValue
            })
        }
        if (cValue !== null && cValue > 0) {
            orderPositions.push({
                dishId: 1,
                amount: cValue
            })
        }
        if (hValue !== null && hValue > 0) {
            orderPositions.push({
                dishId: 2,
                amount: hValue
            })
        }
        BuffetService.placeOrder(orderPositions, comment)
    }

    async function getOrders() {
        const orders = await BuffetService.getOrders()
        setOrders(orders.result as Order[])
    }

    function changeOrderStatus(id: number, statusId: number) {
        BuffetService.changeOrderStatus(id, statusId)
    }

    const { loggedIn } = useAuthContext()

    useEffect(() => {
        if (loggedIn) {
            getOrders()

            socket &&
                socket.on('orderUpdate', () => {
                    getOrders()
                })
        }
    }, [loggedIn, socket])

    return (
        <OrdersContext.Provider value={orders}>
            <PlaceOrderContext.Provider value={placeOrder}>
                <ChangeOrderStatusContext.Provider value={changeOrderStatus}>
                    {children}
                </ChangeOrderStatusContext.Provider>
            </PlaceOrderContext.Provider>
        </OrdersContext.Provider>
    )
}

export default BuffetProvider

import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import OrderScreenHeader from '../components/OrderScreenHeader/OrderScreenHeader'
import Order from '../components/Order/Order'
import { useOrders } from '../providers/BuffetProvider'
import { Width100 } from '../components/commonStyles'
import Footer from '../components/Footer/Footer'

function OrderScreen() {
    const orders = useOrders()

    return (
        <ScreenWrapper>
            <OrderScreenHeader />
            {orders && (
                <Width100>
                    {orders
                        .filter((order) => order.status.name === 'done')
                        .map((order) => (
                            <Order order={order} key={order.id} />
                        ))}
                    {orders
                        .filter((order) => order.status.name === 'inProgress')
                        .map((order) => (
                            <Order order={order} key={order.id} />
                        ))}
                    {orders
                        ?.filter((order) => order.status.name === 'ordered')
                        .map((order) => <Order order={order} key={order.id} />)}
                    {orders
                        .filter((order) => order.status.name === 'pickedUp')
                        .map((order) => (
                            <Order order={order} key={order.id} />
                        ))}
                    {orders
                        .filter((order) => order.status.name === 'cancelled')
                        .map((order) => (
                            <Order order={order} key={order.id} />
                        ))}
                    <Footer />
                </Width100>
            )}
        </ScreenWrapper>
    )
}

export default OrderScreen

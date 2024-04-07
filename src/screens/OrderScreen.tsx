import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import { useLogOut } from '../providers/AuthProvider'
import OrderScreenHeader from '../components/OrderScreenHeader/OrderScreenHeader'

function OrderScreen() {
    const logout = useLogOut()
    return (
        <ScreenWrapper>
            <OrderScreenHeader/>     
        </ScreenWrapper>
    )
}

export default OrderScreen

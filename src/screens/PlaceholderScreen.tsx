import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import Button from '../components/Button/Button'
import { useAuthContext } from '../providers/AuthProvider'

function PlaceholderScreen() {
    const { logOut } = useAuthContext()
    return (
        <ScreenWrapper>
            <Button content="wyloguj" onPress={logOut} />
        </ScreenWrapper>
    )
}

export default PlaceholderScreen

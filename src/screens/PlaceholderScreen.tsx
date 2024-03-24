import React from 'react'
import { Pressable, Text } from 'react-native'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import Button from '../components/Button/Button'
import { useLogOut } from '../providers/AuthProvider'

function PlaceholderScreen() {
    const logout = useLogOut()
    return (
        <ScreenWrapper>
            <Button content="wyloguj" onPress={logout}/>       
        </ScreenWrapper>
    )
}

export default PlaceholderScreen

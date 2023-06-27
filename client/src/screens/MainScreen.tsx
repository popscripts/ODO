import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import Button from '../components/Button/Button'
import { useLogOut } from '../providers/AuthProvider'
import MainHeader from '../containers/MainHeader/MainHeader'

function MainScreen() {
    const logOut = useLogOut()

    function LogOutPress() {
        logOut()
    }

    return (
        <ScreenWrapper>
            <MainHeader />
            <Button content={'wyloguj się'} onPress={LogOutPress} />
        </ScreenWrapper>
    )
}

export default MainScreen

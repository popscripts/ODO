import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import { useLogOut } from '../providers/AuthProvider'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import GroupBox from '../components/GroupBox/GroupBox'

function SettingsScreen() {
    const logout = useLogOut()
    return (
        <ScreenWrapper>
            <SettingsHeader />
            <GroupBox/>
        </ScreenWrapper>
    )
}

export default SettingsScreen

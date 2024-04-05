import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper/ScreenWrapper'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import GroupBox from '../components/GroupBox/GroupBox'

function SettingsScreen() {
    return (
        <ScreenWrapper>
            <SettingsHeader />
            <GroupBox />
        </ScreenWrapper>
    )
}

export default SettingsScreen

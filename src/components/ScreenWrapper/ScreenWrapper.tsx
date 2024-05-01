import React from 'react'
import { Background, TabsGradient, Wrapper } from './ScreenWrapperStyle'
import { StatusBar } from 'expo-status-bar'
import { colors } from '../../theme/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'

type Props = {
    showGradient?: boolean
    children: JSX.Element | JSX.Element[]
}

function ScreenWrapper({ showGradient = true, children }: Props) {
    const { bottom } = useSafeAreaInsets()
    return (
        <Background>
            <ScrollView keyboardShouldPersistTaps="handled">
                <Wrapper>
                    {children}
                    <StatusBar style="light" />
                </Wrapper>
            </ScrollView>
            {showGradient && (
                <TabsGradient
                    bottom={bottom}
                    colors={[colors.transparent, colors.palette.neutral900]}
                />
            )}
        </Background>
    )
}

export default ScreenWrapper

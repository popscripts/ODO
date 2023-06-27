import React from 'react'
import { Background, TabsGradient, Wrapper } from './ScreenWrapperStyle'
import { StatusBar } from 'expo-status-bar'
import { colors } from '../../theme/colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const image = require('../../../assets/background.png')

type Props = {
    showGradient?: boolean
    children: JSX.Element | JSX.Element[]
}

function ScreenWrapper({ showGradient = true, children }: Props) {
    const { bottom } = useSafeAreaInsets()
    return (
        <Background source={image} resizeMode={'stretch'}>
            <Wrapper>
                {children}
                <StatusBar style="light" />
            </Wrapper>
            {showGradient && (
                <TabsGradient bottom={bottom} colors={[colors.transparent, colors.palette.neutral900]} />
            )}
        </Background>
    )
}

export default ScreenWrapper

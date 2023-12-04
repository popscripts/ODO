import AuthProvider from './providers/AuthProvider'
import AppNavigator from './navigators/AppNavigator'
import { useFonts } from '@expo-google-fonts/inter'
import { customFontsToLoad } from './theme/typography'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as NavigationBar from 'expo-navigation-bar'
import { DefaultBackground } from './components/commonStyles'
import ClassroomProvider from './providers/ClassroomProvider'
import ClockProvider from './providers/ClockProvider'

export default function Index() {
    const [areFontsLoaded] = useFonts(customFontsToLoad)

    NavigationBar.setPositionAsync('absolute')
    NavigationBar.setBackgroundColorAsync('#00000001')

    if (!areFontsLoaded) return <DefaultBackground />

    return (
        <DefaultBackground>
            <SafeAreaProvider>
                <AuthProvider>
                    <ClassroomProvider>
                        <ClockProvider>
                            <AppNavigator />
                        </ClockProvider>
                    </ClassroomProvider>
                </AuthProvider>
            </SafeAreaProvider>
        </DefaultBackground>
    )
}

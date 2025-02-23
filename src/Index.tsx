import AuthProvider from './providers/AuthProvider'
import AppNavigator from './navigators/AppNavigator'
import { useFonts } from '@expo-google-fonts/inter'
import { customFontsToLoad } from './theme/typography'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import * as NavigationBar from 'expo-navigation-bar'
import { DefaultBackground } from './components/commonStyles'
import ClassroomProvider from './providers/ClassroomProvider'
import ClockProvider from './providers/ClockProvider'
import GroupProvider from './providers/GroupProvider'
import InfoProvider from './providers/InfoProvider'
import BuffetProvider from './providers/BuffetProvider'
import { Platform } from 'react-native'
import UserProvider from './providers/UserProvider'
import { ToastProvider, ToastOptions } from 'react-native-toast-notifications'

export default function Index() {
    const [areFontsLoaded] = useFonts(customFontsToLoad)

    const toastOptions: ToastOptions = {
        animationType: 'zoom-in' as 'zoom-in',
        duration: 4000
    }

    if (Platform.OS === 'android') {
        NavigationBar.setPositionAsync('absolute')
        NavigationBar.setBackgroundColorAsync('#ffffff01')
    }

    if (!areFontsLoaded) return <DefaultBackground />

    return (
        <DefaultBackground>
            <SafeAreaProvider>
                <ToastProvider {...toastOptions}>
                    <UserProvider>
                        <AuthProvider>
                            <ClassroomProvider>
                                <ClockProvider>
                                    <GroupProvider>
                                        <InfoProvider>
                                            <BuffetProvider>
                                                <AppNavigator />
                                            </BuffetProvider>
                                        </InfoProvider>
                                    </GroupProvider>
                                </ClockProvider>
                            </ClassroomProvider>
                        </AuthProvider>
                    </UserProvider>
                </ToastProvider>
            </SafeAreaProvider>
        </DefaultBackground>
    )
}

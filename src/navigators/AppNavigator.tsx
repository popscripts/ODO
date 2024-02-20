import {
    createStackNavigator,
    StackCardInterpolationProps
} from '@react-navigation/stack'
import { useLoggedIn, useToken, useUserData } from '../providers/AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigator'
import WelcomeScreen from '../screens/WelcomeScreen'
import { DefaultBackground } from '../components/commonStyles'
import CompleteDataScreen from '../screens/CompleteDataScreen'

const Stack = createStackNavigator()

const Fade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress
    }
})

function AppNavigator() {
    const loggedIn = useLoggedIn()
    const token = useToken()
    const userData = useUserData()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardOverlay: () => <DefaultBackground />
                }}
            >
                {token.error === 2 ? (
                    <Stack.Screen
                        name="Placeholder"
                        component={DefaultBackground}
                    />
                ) : !userData.name && loggedIn ? (
                    <Stack.Screen
                        name="CompleteData"
                        component={CompleteDataScreen}
                        options={{ cardStyleInterpolator: Fade }}
                    />
                ) : userData.name ? (
                    <Stack.Screen
                        name="MainNavigator"
                        component={MainNavigator}
                        options={{ cardStyleInterpolator: Fade }}
                    />
                ) : (
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                        options={{ cardStyleInterpolator: Fade }}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

import {
    createStackNavigator,
    StackCardInterpolationProps
} from '@react-navigation/stack'
import { useAuthContext } from '../providers/AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigator'
import WelcomeScreen from '../screens/WelcomeScreen'
import { DefaultBackground } from '../components/commonStyles'
import CompleteDataScreen from '../screens/CompleteDataScreen'
import { useUserContext } from '../providers/UserProvider'

const Stack = createStackNavigator()

const Fade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress
    }
})

function AppNavigator() {
    const { loggedIn } = useAuthContext()
    const { userData } = useUserContext()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardOverlay: () => <DefaultBackground />
                }}
            >
                {!userData.name && loggedIn ? (
                    <Stack.Screen
                        name="CompleteData"
                        component={CompleteDataScreen}
                        options={{ cardStyleInterpolator: Fade }}
                    />
                ) : userData.name && loggedIn ? (
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

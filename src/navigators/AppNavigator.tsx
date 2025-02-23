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
import PlaceholderScreen from '../screens/PlaceholderScreen'

const Stack = createStackNavigator()

const Fade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress
    }
})

function AppNavigator() {
    const { loggedIn, token } = useAuthContext()
    const { userData } = useUserContext()

    const renderScreen = () => {
        if (token === null)
            return (
                <Stack.Screen
                    name="Loading"
                    component={PlaceholderScreen}
                    options={{ cardStyleInterpolator: Fade }}
                />
            )

        if (!userData.name && loggedIn)
            return (
                <Stack.Screen
                    name="CompleteData"
                    component={CompleteDataScreen}
                    options={{ cardStyleInterpolator: Fade }}
                />
            )

        if (userData.name && loggedIn)
            return (
                <Stack.Screen
                    name="MainNavigator"
                    component={MainNavigator}
                    options={{ cardStyleInterpolator: Fade }}
                />
            )

        return (
            <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ cardStyleInterpolator: Fade }}
            />
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    cardOverlay: () => <DefaultBackground />
                }}
            >
                {renderScreen()}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

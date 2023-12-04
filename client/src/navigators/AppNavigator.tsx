import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'
import { useToken, useUserData } from '../providers/AuthProvider'
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
    const token = useToken()
    const userData = useUserData()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                {!userData.name && userData.id && token.error === 0? (
                    <Stack.Screen
                        name="CompleteData"
                        component={CompleteDataScreen}
                        options={{ cardStyleInterpolator: Fade }}
                    /> 
                ) : (token.error === 1 || !userData.id) && token.error !== 2? (
                    <Stack.Screen
                        name="Welcome"
                        component={WelcomeScreen}
                        options={{ cardStyleInterpolator: Fade }}
                    />
                ) : userData.name ? (
                    <Stack.Screen
                        name="MainNavigator"
                        component={MainNavigator}
                        options={{ cardStyleInterpolator: Fade }}
                    />
                ) : (
                    <Stack.Screen name="Placeholder" component={DefaultBackground} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

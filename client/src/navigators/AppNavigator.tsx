import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useToken } from '../providers/AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigator'
import WelcomeNavigator from './WelcomeNavigator'

const Stack = createNativeStackNavigator()

function AppNavigator() {
    const token = useToken()

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={token.error ? 'WelcomeNavigator' : 'MainNavigator'}
            >
                {token.error ? (
                    <Stack.Screen name="WelcomeNavigator" component={WelcomeNavigator} />
                ) : (
                    <Stack.Screen name="MainNavigator" component={MainNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

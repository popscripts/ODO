import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack'
import { useToken, useUserData } from '../providers/AuthProvider'
import { NavigationContainer } from '@react-navigation/native'
import MainNavigator from './MainNavigator'
import WelcomeScreen from '../screens/WelcomeScreen'
import { DefaultBackground } from '../components/commonStyles'
import CompleteDataScreen from '../screens/CompleteDataScreen'
import { Navigation } from '../types/props.type'
import { useEffect } from 'react'

const Stack = createStackNavigator()

const Fade = ({ current }: StackCardInterpolationProps) => ({
    cardStyle: {
        opacity: current.progress
    }
})

function Navigator({ navigation }: Navigation) {
    const token = useToken()
    const userData = useUserData()

    useEffect(() => {
        if (token.error === 2) {
            navigation.navigate('WelcomeNavigator')
        } else if (!userData.name && token.error === 0) {
            navigation.navigate('CompleteData')
        } else if (token.error === 0) {
            navigation.navigate('MainNavigator')
        }
    }, [token, userData])
    return <DefaultBackground />
}

function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
            >
                <Stack.Screen name="Placeholder" component={Navigator} />
                <Stack.Screen
                    name="WelcomeNavigator"
                    component={WelcomeScreen}
                    options={{ cardStyleInterpolator: Fade }}
                />
                <Stack.Screen
                    name="MainNavigator"
                    component={MainNavigator}
                    options={{ cardStyleInterpolator: Fade }}
                />
                <Stack.Screen
                    name="CompleteData"
                    component={CompleteDataScreen}
                    options={{ cardStyleInterpolator: Fade }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator

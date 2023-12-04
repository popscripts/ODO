import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MainScreen from '../screens/MainScreen'
import { Dimensions, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../theme/colors'
import UserIcon from '../components/icons/UserIcon'
import ListIcon from '../components/icons/ListIcon'
import InfoIcon from '../components/icons/InfoIcon'
import HomeIcon from '../components/icons/HomeIcon'
import CutleryIcon from '../components/icons/CutleryIcon'
import PlaceholderScreen from '../screens/PlaceholderScreen'

const Tab = createMaterialTopTabNavigator()

function MainNavigator() {
    const { bottom } = useSafeAreaInsets()
    const tabWidth = (Dimensions.get('screen').width * 0.9) / 5

    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName="home"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: [$tabBar, { bottom: bottom + 10 }],
                tabBarIndicatorStyle: [$tabBarIndicator, { marginLeft: (tabWidth - 50) / 2 }],
                tabBarIconStyle: $tabBarIcon
            }}
        >
            <Tab.Screen
                name="settings"
                component={PlaceholderScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <UserIcon color={focused ? colors.palette.neutral200 : colors.palette.neutral800} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="info"
                component={PlaceholderScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <InfoIcon color={focused ? colors.palette.neutral200 : colors.palette.neutral800} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="home"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <HomeIcon color={focused ? colors.palette.neutral200 : colors.palette.neutral800} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="list"
                component={PlaceholderScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <ListIcon color={focused ? colors.palette.neutral200 : colors.palette.neutral800} />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="buffet"
                component={PlaceholderScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <CutleryIcon
                            color={focused ? colors.palette.neutral200 : colors.palette.neutral800}
                        />
                    )
                }}
            ></Tab.Screen>
        </Tab.Navigator>
    )
}

export default MainNavigator

const $tabBar: ViewStyle = {
    backgroundColor: colors.palette.neutral200,
    width: '90%',
    borderTopWidth: 0,
    position: 'absolute',
    marginLeft: '5%',
    borderRadius: 30,
    height: 60
}

const $tabBarIndicator: ViewStyle = {
    backgroundColor: colors.palette.primary200,
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 5,
    elevation: 5
}

const $tabBarIcon: ViewStyle = {
    position: 'absolute',
    left: -15,
    bottom: -15
}

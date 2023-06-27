import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import MainScreen from '../screens/MainScreen'
import { Dimensions, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '../theme/colors'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faInfo, faHome, faList, faCutlery } from '@fortawesome/free-solid-svg-icons'

const Tab = createMaterialTopTabNavigator()

function MainNavigator() {
    const { bottom } = useSafeAreaInsets()
    const tabWidth = (Dimensions.get('window').width * 0.9) / 5

    return (
        <Tab.Navigator
            tabBarPosition="bottom"
            initialRouteName="home"
            screenOptions={{
                tabBarShowLabel: false,
                tabBarStyle: [$tabBar, { bottom: bottom + 10 }],
                tabBarIndicatorStyle: [$tabBarIndicator, { marginLeft: (tabWidth - 45) / 2 }]
            }}
        >
            <Tab.Screen
                name="settings"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faUser}
                            color={focused ? colors.palette.neutral200 : colors.palette.neutral800}
                            size={30}
                        />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="info"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faInfo}
                            color={focused ? colors.palette.neutral200 : colors.palette.neutral800}
                            size={30}
                        />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="home"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faHome}
                            color={focused ? colors.palette.neutral200 : colors.palette.neutral800}
                            size={30}
                        />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="list"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faList}
                            color={focused ? colors.palette.neutral200 : colors.palette.neutral800}
                            size={30}
                        />
                    )
                }}
            ></Tab.Screen>
            <Tab.Screen
                name="buffet"
                component={MainScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesomeIcon
                            icon={faCutlery}
                            color={focused ? colors.palette.neutral200 : colors.palette.neutral800}
                            size={30}
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
    left: '5%',
    borderRadius: 30,
    height: 60
}

const $tabBarIndicator: ViewStyle = {
    backgroundColor: colors.palette.primary200,
    height: 50,
    width: 50,
    borderRadius: 25,
    marginBottom: 5
}

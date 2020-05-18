import React from 'react';
import { ScheduleScreen } from '../../../screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { CalendarStack } from '../..';

export type MainStackParamList = {
    Calendar: undefined;
    Schedule: undefined;
};

const MainTab = createBottomTabNavigator();

const tabNavigatorScreenOptions = ({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'CalendarStack') {
            iconName = focused ? 'ios-calendar' : 'ios-calendar';
        } else if (route.name === 'ScheduleScreen') {
            iconName = focused ? 'ios-list' : 'ios-list';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
    },
});

export const HomeStack = () => {
    return (
        <MainTab.Navigator screenOptions={tabNavigatorScreenOptions}>
            <MainTab.Screen
                name="CalendarStack"
                component={CalendarStack}
                options={{ title: 'Calendar' }}
            />
            <MainTab.Screen
                name="ScheduleScreen"
                component={ScheduleScreen}
                options={{ title: 'Schedule' }}
            />
        </MainTab.Navigator>
    );
};
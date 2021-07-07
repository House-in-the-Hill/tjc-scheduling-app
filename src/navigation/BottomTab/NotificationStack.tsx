import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NotificationsScreen, TaskDetailsScreen } from '../../screens';
import { headerBarHeight } from '../../shared/constants/componentDimensions';

import {
    SwapScreen,
    SwapSummary,
    SwapConfirmation,
    SelectSwapOption,
} from '../../screens/RequestSwap';

const Stack = createStackNavigator();

export const NotificationStack = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{ title: '', headerStyle: { height: headerBarHeight } }}
        >
            <Stack.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="TaskDetails" component={TaskDetailsScreen} />

            <Stack.Screen name="SelectSwapOption" component={SelectSwapOption} />
            <Stack.Screen name="SwapScreen" component={SwapScreen} />
            <Stack.Screen name="SwapSummary" component={SwapSummary} />
            <Stack.Screen
                name="SwapConfirmation"
                component={SwapConfirmation}
                options={{
                    headerShown: false,
                    gestureEnabled: false,
                }}
            />
        </Stack.Navigator>
    );
};

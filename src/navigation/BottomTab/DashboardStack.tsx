import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { DashboardScreen } from '../../screens/Tab/DashboardScreen';

const Stack = createStackNavigator();

export const DashboardStack = (props) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={() => ({ headerShown: false })}
            />
        </Stack.Navigator>
    );
};

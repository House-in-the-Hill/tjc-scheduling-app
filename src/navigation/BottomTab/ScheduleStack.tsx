import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ScheduleScreen } from '../../screens';
import { TaskDetailsScreen, TaskListScreen } from '../../screens';
import {
    SwapScreen,
    SwapSummary,
    SwapConfirmation,
    SelectSwapOption,
} from '../../screens/RequestSwap/';
import { TouchableOpacity } from 'react-native';
import { Icon } from '@ui-kitten/components';
import { headerBarHeight } from '../../shared/constants/componentDimensions';

const Stack = createStackNavigator();

const rightHeaderIcon = (navigation) => (
    <TouchableOpacity
        style={{ paddingRight: 20 }}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('TaskList')}
    >
        <Icon name="list-outline" height={35} width={35} fill="#000000" />
    </TouchableOpacity>
);

//TODO display pdf schedule
// const leftHeaderIcon = (navigation) => {
//     <TouchableOpacity
//         style={{ paddingRight: 20 }}
//         activeOpacity={0.8}
//         onPress={() => navigation.navigate('TaskList')}
//     >
//         <Icon name="list-outline" height={35} width={35} fill="#000000" />
//     </TouchableOpacity>;
// };

export const ScheduleStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{ title: '', headerStyle: { height: headerBarHeight } }}
        >
            <Stack.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={({ navigation }) => ({
                    headerRight: () => rightHeaderIcon(navigation),
                })}
            />
            <Stack.Screen name="TaskList" component={TaskListScreen} />
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

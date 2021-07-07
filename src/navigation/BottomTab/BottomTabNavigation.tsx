import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { DashboardStack } from './DashboardStack';
import { ScheduleStack } from './ScheduleStack';
import { SettingsStack } from './SettingsStack';
import { Icon, BottomNavigation, BottomNavigationTab } from '@ui-kitten/components';
import { bottomTabHeight } from '../../shared/constants/componentDimensions';
import { NotificationStack } from './NotificationStack';

const Tab = createBottomTabNavigator();

const icons = {
    notifications: (props) => <Icon name="bar-chart-outline" {...props} />,
    dashboard: (props) => <Icon name="clipboard-outline" {...props} />,
    schedule: (props) => <Icon name="calendar-outline" {...props} />,
    settings: (props) => <Icon name="settings-outline" {...props} />,
};

const BottomTabBar = ({ navigation, state }) => {
    const routeName =
        state?.routes[state.index].state?.routes[state.routes[state.index].state.index]
            .name;
    return routeName?.includes('Swap') ? null : (
        <BottomNavigation
            selectedIndex={state.index}
            onSelect={(index) => navigation.navigate(state.routeNames[index])}
            style={{ height: bottomTabHeight }}
        >
            <BottomNavigationTab title="Dashboard" icon={icons.dashboard} />
            <BottomNavigationTab title="Schedule" icon={icons.schedule} />
            <BottomNavigationTab title="Notifications" icon={icons.notifications} />
            <BottomNavigationTab title="Settings" icon={icons.settings} />
        </BottomNavigation>
    );
};

//add badges to the bottom tab in the future:  https://github.com/akveo/react-native-ui-kitten/issues/865

export const BottomTabs = () => {
    const getTabBarVisibility = (route) => {
        const routeName = route.state ? route.state.routes[route.state.index].name : '';
        return routeName === 'RequestStack' ? false : true;
    };

    return (
        <NavigationContainer>
            <Tab.Navigator
                lazy={false}
                initialRouteName="Dashboard"
                tabBar={(props) => <BottomTabBar {...props} />}
            >
                <Tab.Screen name="Dashboard" component={DashboardStack} />
                <Tab.Screen
                    name="Schedule"
                    component={ScheduleStack}
                    options={({ route }) => ({
                        tabBarVisible: getTabBarVisibility(route),
                    })}
                />
                <Tab.Screen
                    name="Notifications"
                    component={NotificationStack}
                    // to add badges to the icon:
                    // options={{
                    //     tabBarIcon: icons.feedIcon,
                    //     tabBarBadge: '1',
                    // }}
                />

                <Tab.Screen name="Settings" component={SettingsStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

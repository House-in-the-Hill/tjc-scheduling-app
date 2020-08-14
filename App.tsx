import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Platform } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AppNavigation from './src/navigation/AppNavigation';
import {
    authReducer,
    profileReducer,
    calendarReducer,
    taskReducer,
    loadStateReducer,
    swapReducer,
} from './src/store/reducers';

// //notification imports
// import * as Permissions from 'expo-permissions';
// import { Linking } from 'expo';
// import Constants from 'expo-constants';
// import { Notifications } from 'expo';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    //lets os know what to do with notification before its displayed to user
    handleNotification: async () => {
        return {
            shouldPlaySound: true,
            // shouldSetBadge: true,
            shouldShowAlert: true,
        };
    },
});

//ui kitten imports
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as ui from './src/ui';
import { default as mapping } from './src/ui/mapping.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { ThemeContext } from './src/ui/theme-context';

const rootReducer = combineReducers({
    authReducer: authReducer,
    profileReducer: profileReducer,
    calendarReducer: calendarReducer,
    taskReducer: taskReducer,
    loadStateReducer: loadStateReducer,
    swapReducer: swapReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'Roboto-Bold': require('./src/assets/Fonts/Roboto-Bold.ttf'),
        'Roboto-Italic': require('./src/assets/Fonts/Roboto-Italic.ttf'),
        'Roboto-Regular': require('./src/assets/Fonts/Roboto-Regular.ttf'),
        'OpenSans-Regular': require('./src/assets/Fonts/OpenSans-Regular.ttf'),
        'OpenSans-Bold': require('./src/assets/Fonts/OpenSans-Bold.ttf'),
        'OpenSans-SemiBold': require('./src/assets/Fonts/OpenSans-SemiBold.ttf'),
    });
};

//https://farazpatankar.com/push-notifications-in-react-native/
//notifications tutorial
// const hasNotificationPermission = async () => {
//     try {
//         const { status: existingStatus } = await Permissions.getAsync(
//             Permissions.NOTIFICATIONS,
//         );
//         let finalStatus = existingStatus;
//         // If we don't already have permission, ask for it
//         if (existingStatus !== 'granted') {
//             const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
//             finalStatus = status;
//         }
//         if (finalStatus === 'granted') return true;
//         if (finalStatus !== 'granted') {
//             Alert.alert(
//                 'Warning',
//                 'You will not receive reminders if you do not enable push notifications. If you would like to receive reminders, please enable push notifications for Fin in your settings.',
//                 [
//                     { text: 'Cancel' },
//                     // If they said no initially and want to change their mind,
//                     // we can automatically open our app in their settings
//                     // so there's less friction in turning notifications on
//                     {
//                         text: 'Enable Notifications',
//                         onPress: () =>
//                             Platform.OS === 'ios'
//                                 ? Linking.openURL('app-settings:')
//                                 : Linking.openSettings(),
//                     },
//                 ],
//             );
//             return false;
//         }
//     } catch (error) {
//         Alert.alert(
//             'Error',
//             'Something went wrong while check your notification permissions, please try again later.',
//         );
//         return false;
//     }
// };

// const getPushToken = async () => {
//     const token = await Notifications.getExpoPushTokenAsync();
//     return token;
// };

const App: React.FC = () => {
    const [dataLoaded, setDataLoaded] = useState(false);
    const [theme, setTheme] = React.useState('light');

    const toggleTheme = () => {
        const nextTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(nextTheme);
    };

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fetchFonts}
                onFinish={() => setDataLoaded(true)}
                onError={(err) => console.log(err)}
            />
        );
    }

    // useEffect(() => {
    //     //run when notification is received and when app is running
    //     const subscription = Notifications.addNotificationReceivedListener(
    //         (notification) => {
    //             console.log('notification', notification);
    //         },
    //     );

    //     return () => {
    //         subscription.remove(); //removes subscription on unmount
    //     };
    // });

    return (
        <Provider store={store}>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider
                    {...eva}
                    theme={ui[theme]}
                    customMapping={mapping} //fonts
                >
                    <View style={styles.app}>
                        <AppNavigation />
                    </View>
                </ApplicationProvider>
            </ThemeContext.Provider>
        </Provider>
    );
};

const styles = StyleSheet.create({
    app: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
});

export default App;

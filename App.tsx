import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from 'react-native';
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
    notificationsReducer,
} from './src/store/reducers';
import { StatusBar } from 'expo-status-bar';
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
    notificationsReducer: notificationsReducer,
});

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
    return Font.loadAsync({
        'SourceSansPro-Light': require('./src/assets/Fonts/SourceSansPro-Light.ttf'),
        'SourceSansPro-Regular': require('./src/assets/Fonts/SourceSansPro-Regular.ttf'),
        'SourceSansPro-Bold': require('./src/assets/Fonts/SourceSansPro-Bold.ttf'),
        'SourceSansPro-Italic': require('./src/assets/Fonts/SourceSansPro-Italic.ttf'),
    });
};

//this needs work
// const prefetchImages = () => Image.prefetch('../../assets/images/JleeProfilePic.jpg');

// const preloadAssets = () => {
//     return Promise.all([fetchFonts, prefetchImages]).then((stuff) =>
//         console.log('stuff', stuff),
//     );
// };

// preloadAssets();

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

    return (
        <Provider store={store}>
            <IconRegistry icons={EvaIconsPack} />
            <ThemeContext.Provider value={{ theme, toggleTheme }}>
                <ApplicationProvider
                    {...eva}
                    theme={ui[theme]}
                    customMapping={mapping} //fonts
                >
                    <View style={{ flex: 1 }}>
                        <StatusBar />
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

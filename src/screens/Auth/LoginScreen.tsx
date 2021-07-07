import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, Image, ScrollView, Platform } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { LoginScreenProps } from '../../shared/models';
import { checkCredentials, LoadStateActionTypes, login } from '../../store/actions';
import { determineLoadState } from '../../store/helper';
import { LoadingPage } from '../../components/Unused/LoadingPage';
import { Text, Icon, Layout, Input } from '@ui-kitten/components';
import { EmailInput, PasswordInput } from '../../components/Forms';
import { isValidEmail } from '../../shared/components/';
import { statusBarHeight } from '../../shared/constants';
import { CustomButton, buttonTypes } from '../../components/CustomButton';
import { interactiveColorBlue, mainTextColor } from '../../ui/colors';

//temp imports
import * as Notifications from 'expo-notifications';
import { TouchableOpacity } from 'react-native-gesture-handler';

export interface PasswordState {
    value: string;
    visible: boolean;
    valid: boolean;
    message: string;
}

export interface EmailState {
    value: string;
    valid: boolean;
    message: string;
}

//TODO error message styling and QA

export const LoginScreen = (props: LoginScreenProps) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<EmailState>({
        value: 'shaun.tung@gmail.com',
        valid: true,
        message: null,
    });
    const [password, setPassword] = useState<PasswordState>({
        value: 'password',
        valid: true,
        visible: false,
        message: null,
    });

    function verifyLogin() {
        setEmail({ ...email, valid: true, message: '' });
        setPassword({ ...password, valid: true, message: '' });
        if (isValidEmail(email.value) && password.value.length > 0) {
            dispatch(checkCredentials(email.value.toLowerCase(), password.value));
        } else {
            if (password.value.length === 0)
                setPassword({
                    ...password,
                    valid: false,
                    message: 'Please enter a password',
                });
            if (!isValidEmail(email.value)) {
                setEmail({
                    ...email,
                    valid: false,
                    message: 'Enter a valid email address.',
                });
            }
            if (email.value.length === 0)
                setEmail({
                    ...email,
                    valid: false,
                    message: 'Please enter an email address.',
                });
        }
    }

    //selects the loadstates that need to be listened to
    const {
        AUTH: AuthState,
        PROFILE: ProfileState,
        TASKS: TasksState,
        NOTIFICATIONS: NotificationsState,
    } = useSelector((state) => state.loadStateReducer.loadStatus);

    //selects the error states that need to be listened to
    const {
        AUTH: AuthError,
        PROFILE: ProfileError,
        TASKS: TasksError,
        NOTIFICATIONS: NotificationsError,
    } = useSelector((state) => state.loadStateReducer.loadErrorStatus);

    //using the loadstates, determines if loading page should be shown
    const loadState: LoadStateActionTypes = determineLoadState({
        AuthState,
        ProfileState,
        TasksState,
        NotificationsState,
    });
    //if everything is loaded, change state to login
    if (loadState === LoadStateActionTypes.LOADED) dispatch(login());

    //error message handling
    let errorMessage: React.ReactNode | null = null;
    if (loadState === LoadStateActionTypes.ERROR) {
        //can be cleaned up better, any suggestions?
        if (AuthError) errorMessage = createErrorMessage(AuthError.message);
        else if (ProfileError) errorMessage = createErrorMessage(ProfileError.message);
        else if (TasksError) errorMessage = createErrorMessage(TasksError.message);
        else if (NotificationsError)
            errorMessage = createErrorMessage(NotificationsError.message);
        else errorMessage = null;
    }

    const clearInputHandler = (inputField) => {
        if (inputField === 'email') return setEmail({ ...email, value: '' });
    };

    //This is an example for future implementation of handling notification presses
    //will be used to handle receiving of notifications once activity feed is finished
    // useEffect(() => {
    //     //run when notification is received and tapped and when app is NOT running
    //     const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
    //         (response) => {
    //             // console.log('response: ', response);
    //             Notifications.setBadgeCountAsync(0);
    //         },
    //     );

    //     //run when notification is received and when app is running
    //     const foregroundSubscription = Notifications.addNotificationReceivedListener(
    //         (notification) => {
    //             // console.log('notification', notification);
    //         },
    //     );

    //     return () => {
    //         foregroundSubscription.remove(); //removes subscription on unmount
    //         backgroundSubscription.remove();
    //     };
    // }, []);

    //TODO overlay loading page instead of going to a different component?
    if (loadState === LoadStateActionTypes.LOADING) return <LoadingPage opacity={0.8} />;

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'black',
                paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
            }}
        >
            <Layout>
                <View style={styles.loginScreen}>
                    <ScrollView
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.feedbackContainer}
                        scrollEnabled={false}
                    >
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../../assets/images/TjcLogo.png')}
                                resizeMode="contain"
                                style={styles.image}
                            />
                        </View>
                        <View style={styles.loginCardContainer}>
                            {errorMessage}
                            <EmailInput
                                label={() => (
                                    <Text category="h3" style={{ color: mainTextColor }}>
                                        Email
                                    </Text>
                                )}
                                value={email.value}
                                caption={email.valid ? '' : email.message}
                                onChangeText={(input) =>
                                    setEmail({ ...email, value: input })
                                }
                                clearInputHandler={clearInputHandler}
                            />
                            <PasswordInput
                                label={() => (
                                    <Text category="h3" style={{ color: mainTextColor }}>
                                        Password
                                    </Text>
                                )}
                                value={password.value}
                                caption={password.valid ? '' : password.message}
                                onChangeText={(input) =>
                                    setPassword({ ...password, value: input })
                                }
                            />
                            <TouchableOpacity
                                style={{
                                    alignItems: 'flex-end',
                                    width: 300,
                                }}
                                onPress={() => props.navigation.navigate('RecoverLogin')}
                            >
                                <Text
                                    category="h3"
                                    style={{ color: interactiveColorBlue }}
                                >
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <CustomButton
                                text="Login"
                                onPress={verifyLogin}
                                styling={{ height: 42, width: 180 }}
                                type={buttonTypes.CONFIRM}
                            />
                        </View>
                    </ScrollView>
                </View>
            </Layout>
        </View>
    );

    //helper functions

    function createErrorMessage(msg): React.ReactNode {
        return (
            <Text category="h3" status={'danger'}>
                {msg}
            </Text>
        );
    }
};

const styles = StyleSheet.create({
    loginScreen: {
        height: '100%',
        width: '100%',
    },
    feedbackContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    imageContainer: {
        width: '80%',
        height: '10%',
        flex: 1,
    },
    loginCardContainer: {
        width: '80%',
        height: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 2,
    },
    loginError: {
        color: 'red',
        fontSize: 14,
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    inputStyle: {
        width: '100%',
        paddingVertical: 10,
    },

    image: {
        width: '100%',
        height: '100%',
    },
});

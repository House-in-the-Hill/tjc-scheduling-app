import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { RecoverLoginScreenProps } from '../../shared/models';
import { isValidEmail } from '../../shared/components/';
import { sendResetEmail, LoadStateActionTypes } from '../../store/actions';
import { LoadingPage } from '../../components/Unused/LoadingPage';
import { Screen } from '../../components/Unused/Screen';
import { TopNavigationAction, Icon, Text, Input, Button } from '@ui-kitten/components';
import { EmailInput } from '../../components/Forms';
import { backAction } from '../../shared/components/UI_Actions';

export const RecoverLoginScreen = (props: RecoverLoginScreenProps) => {
    const [email, setEmail] = useState<string>('shaun.tung@gmail.com');
    const [isValidCredentials, setIsValidCredentials] = useState<boolean>(true);
    const dispatch = useDispatch();
    const loadState: LoadStateActionTypes = useSelector(
        (state) => state.loadStateReducer.loadStatus.AUTH,
    );
    const navigateBack = () => {
        props.navigation.goBack();
    };

    const onSubmitHandler = (): void => {
        setIsValidCredentials(true);
        if (isValidEmail(email)) dispatch(sendResetEmail(email));
        else setIsValidCredentials(false);
    };

    if (loadState === LoadStateActionTypes.LOADING) return <LoadingPage />;

    return (
        <Screen title="Recover Login" accessoryLeft={() => backAction(navigateBack)}>
            <View style={styles.screen}>
                <View style={styles.inputContainer}>
                    {loadState === LoadStateActionTypes.LOADED && (
                        <Text category="h4">Email has been sent!</Text>
                    )}

                    <EmailInput
                        label="Please enter your email"
                        value={email}
                        caption={isValidCredentials ? '' : 'Please enter a valid email'}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View>
                        <Button onPress={onSubmitHandler}>
                            Email me a recovery link
                        </Button>
                    </View>
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
        backgroundColor: 'white',
    },
    inputContainer: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 20,
    },
    inputStyle: {
        width: 300,
        paddingVertical: 10,
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
    },
    buttonStyle: {
        width: '80%',
        margin: 2,
    },
});

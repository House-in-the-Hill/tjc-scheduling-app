import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import { logout } from '../../../store/actions';
import { Screen } from '../../../components/Unused/Screen';
import { Layout } from '@ui-kitten/components';
import { openDrawerAction } from '../../../shared/components';

export const LogoutScreen = (props) => {
    const dispatch = useDispatch();
    return (
        // <Screen
        //     title="Logout"
        //     accessoryLeft={() => openDrawerAction(props.navigation.toggleDrawer)}
        // >
        <Layout>
            <Text>This is the LogOutScreen</Text>
            <Button title="Log Out" onPress={() => dispatch(logout())} />
        </Layout>
        // </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
});

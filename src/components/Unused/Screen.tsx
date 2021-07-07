import React, { ReactComponentElement, ReactElement, ReactText, ReactNode } from 'react';
import { Layout, TopNavigation, Divider } from '@ui-kitten/components';
import { SafeAreaView, StyleSheet, Platform } from 'react-native';
import { statusBarHeight } from '../../shared/constants';

type ScreenProps = {
    children?: React.ReactNode;
    title?: () => ReactNode | string;
    accessoryLeft?: () => JSX.Element;
    accessoryRight?: () => JSX.Element;
    style?;
};
//used by outdated screens, need to be culled
export const Screen = (props: ScreenProps) => {
    return (
        <SafeAreaView style={{ ...styles.screen, ...props.style }}>
            <TopNavigation
                alignment="center"
                title={props.title}
                accessoryLeft={props.accessoryLeft}
                accessoryRight={props.accessoryRight}
            ></TopNavigation>
            <Divider />
            {props.children}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
    },
    layout: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

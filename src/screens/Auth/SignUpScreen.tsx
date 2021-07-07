import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Platform } from 'react-native';

import { SignUpScreenProps } from '../../shared/models';
import { Screen } from '../../components/Unused/Screen';
import {
    Icon,
    Layout,
    Text,
    TopNavigationAction,
    Button,
    withStyles,
    Card,
    List,
    ListItem,
} from '@ui-kitten/components';
import { ThemeContext } from '../../../src/ui/theme-context';

//was used for testing ui kitten components, currently unused
export const SignUpScreen = (props: SignUpScreenProps) => {
    const navigateBack = () => {
        props.navigation.goBack();
    };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );

    const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

    const themeContext = React.useContext(ThemeContext);

    const AwesomeView = (props) => {
        const { eva, style, ...restProps } = props;

        return <View {...restProps} style={[eva.style.awesome, style]} />;
    };

    const ThemedAwesomeView = withStyles(AwesomeView, (theme) => ({
        awesome: {
            backgroundColor: theme['color-warning-300'],
        },
    }));

    function cardHeader() {
        return <Text>Wow</Text>;
    }

    function cardExample() {
        return (
            <Card header={cardHeader} appearance="outline" status="basic">
                <Text category="h1">details1</Text>
                <Text category="h2">details2</Text>
                <Text category="h3">details3</Text>
            </Card>
        );
    }

    const cardArray = new Array(5).fill({
        title: 'New card',
    });

    // const cardArray1 = [cardExample()]
    const renderCards = ({ item, index }) => {
        return <ListItem title={`${item.title} ${index + 1}`} />;
    };
    return (
        <Screen accessoryLeft={BackAction} title="Hello">
            <Layout
                style={{
                    flex: 1,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <List
                    style={styles.container}
                    data={cardArray}
                    renderItem={renderCards}
                />
                <Button style={{ marginVertical: 4 }} onPress={themeContext.toggleTheme}>
                    TOGGLE THEME
                </Button>
                <ThemedAwesomeView>
                    <Text>Themed view here</Text>
                </ThemedAwesomeView>
            </Layout>
        </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        maxHeight: 180,
        width: '100%',
    },
});

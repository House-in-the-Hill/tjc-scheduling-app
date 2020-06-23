import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AbbrevDays } from '../../services/Calendar/models';
import { Layout, Text } from '@ui-kitten/components';

// change name to CalendarDayTitleRow
export const DayNameRow = () => {
    const dayNameArray = new Array(7);
    for (let i = 0; i < dayNameArray.length; i++) {
        dayNameArray[i] = (
            <View key={i} style={styles.tiles}>
                <Text style={styles.text}>{AbbrevDays[i]}</Text>
            </View>
        );
    }
    return (
        <Layout level="3" style={styles.container}>
            {dayNameArray}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
    },
    tiles: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderBottomWidth: 1,
        // paddingBottom: 10,
    },
    text: {
        fontFamily: 'Roboto-Bold',
        color: '#6971E2',
        fontSize: 18,
    },
});

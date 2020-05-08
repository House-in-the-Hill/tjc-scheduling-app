import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { Carousel } from '../components/Calender';
import { useSelector } from 'react-redux';

export const CalendarScreen = (props) => {
    const calCardDatesArray = useSelector((state) => state.calendarReducer.dateArray);
    let cardWidth = Dimensions.get('window').width;

    return (
        <View style={styles.screen}>
            <View
                style={styles.scrollContainer}
                onLayout={(event) => {
                    cardWidth = event.nativeEvent.layout.width;
                }}
            >
                <Carousel items={calCardDatesArray} viewWidth={cardWidth} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    scrollContainer: {
        width: '100%',
        height: '80%',
    },
});
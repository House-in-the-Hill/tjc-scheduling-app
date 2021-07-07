import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DayNameRow } from './DayNameRow';
import { DateTile } from './DateTile';
import { Text, Layout } from '@ui-kitten/components';
import { isSameDate } from '../../services/Calendar/helper_functions';
import { dateTileDimensions } from '../../shared/constants';

interface CalendarProps {
    displayedMonth: Date;
    onTilePress?: (date) => void;
    selectedDates?;
    initialTasks;
}

export const Calendar = ({
    displayedMonth,
    onTilePress,
    selectedDates = [],
    initialTasks,
}: CalendarProps) => {
    const month = displayedMonth.getMonth();
    const year = displayedMonth.getFullYear();
    const initialDate = new Date(year, month, 1);
    const dateArray = new Array(6);
    const today = new Date();

    function determineRenderDate(initial): () => Date {
        //sets start of week to correct day
        let renderDate: Date = new Date(
            initial.setDate(initial.getDate() - initial.getDay()),
        );

        return updateDate;

        function updateDate() {
            const returnDate: Date = new Date(renderDate);
            renderDate.setDate(renderDate.getDate() + 1);
            return returnDate;
        }
    }

    const getNextDate: () => Date = determineRenderDate(initialDate);

    for (let j = 0; j < dateArray.length; j++) {
        dateArray[j] = new Array(7);
        for (let k = 0; k < dateArray[j].length; k++) {
            const day: Date = getNextDate();
            const isCurrentMonth = day.getMonth() === month;
            const isSelected = selectedDates.some((date) => isSameDate(day, date));
            const hasTask = initialTasks.some((item) =>
                isSameDate(new Date(item.date), day),
            );

            dateArray[j][k] = (
                <DateTile
                    day={day}
                    key={`${day.toDateString()}${j}-${k}`}
                    onTilePress={onTilePress}
                    isCurrentMonth={isCurrentMonth}
                    isSelected={isSelected}
                    textStyling={isSameDate(day, today) && styles.todayText}
                    hasTask={hasTask}
                />
            );
        }
    }

    return (
        <Layout style={styles.layout}>
            <Text category="h1" style={{ padding: 5 }}>
                {displayedMonth.toLocaleString('default', { month: 'long' })}{' '}
                {displayedMonth.getFullYear()}
            </Text>
            <DayNameRow />
            <View style={styles.datesContainer}>{dateArray}</View>
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    datesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
    },
    fadedStyle: {
        opacity: 0.3,
    },
    selectedStyle: {
        backgroundColor: 'rgb(120, 224, 56)',
        borderRadius: 100,
    },
    todayText: {
        color: 'red',
    },
    tile: {
        width: dateTileDimensions.width,
        height: dateTileDimensions.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        margin: 1,
        padding: 1,
    },
});

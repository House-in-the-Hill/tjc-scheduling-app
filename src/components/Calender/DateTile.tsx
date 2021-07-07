import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Layout, Text } from '@ui-kitten/components';
import { dateTileDimensions } from '../../shared/constants';
import { isSameDate } from '../../services/Calendar/helper_functions/calendar_services';
import {
    calendarHighlight,
    calendarHighlightShadow,
    mainTextColor,
} from '../../ui/colors';

interface DateTileProps {
    isToday: boolean;
    isCurrentMonth: boolean;
    data: Object[];
    day: Date;
    isSelected?: boolean;
    handlePress: (day, data, cardIndex) => void;
    cardIndex: number;
}
//TODO display differently colored dots based on task.

export const DateTile = React.memo((props: DateTileProps) => {
    const {
        isToday,
        day,
        isCurrentMonth,
        data,
        isSelected,
        handlePress,
        cardIndex,
    } = props;

    let date = day.getDate();

    if (!isCurrentMonth) {
        return <Layout style={styles.tile}></Layout>;
    }

    return (
        <Layout style={styles.tile}>
            <TouchableOpacity
                style={isSelected ? styles.selected : styles.main}
                onPress={() => handlePress(day, data, cardIndex)}
            >
                <View
                    style={{
                        flex: 1,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }}
                >
                    <Text
                        category="h3"
                        status="success"
                        style={{
                            color: isToday
                                ? isSelected
                                    ? '#FF7070'
                                    : 'red'
                                : isSelected
                                ? 'white'
                                : mainTextColor,
                        }}
                    >
                        {date}
                    </Text>
                    {data.length > 0 ? (
                        <Entypo name="dot-single" size={20} color="black" />
                    ) : (
                        <View></View>
                    )}
                </View>
            </TouchableOpacity>
        </Layout>
    );
}, areEqual);

function areEqual(prevProps, nextProps): boolean {
    //true will not rerender
    return (
        prevProps.isSelected === nextProps.isSelected &&
        isSameDate(prevProps.day, nextProps.day)
    );
}

const styles = StyleSheet.create({
    tile: {
        width: dateTileDimensions.width,
        height: dateTileDimensions.height,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#C9C9C9',
    },
    main: {
        flex: 1,
        width: '100%',
    },
    selected: {
        flex: 1,
        width: '100%',
        backgroundColor: calendarHighlight,
        borderRadius: 100,
        shadowColor: calendarHighlightShadow,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5 / 2,
    },
    text: {
        fontSize: 20,
        fontFamily: 'Roboto-Regular',
    },
    tileEmpty: {
        width: dateTileDimensions.width,
        height: dateTileDimensions.height,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

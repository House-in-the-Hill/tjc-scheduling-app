import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Text, Icon } from '@ui-kitten/components';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type TaskItemProps = {
    item;
    style?;
    activeOpacity?;
};

//TODO display correct times, morning/afternoon, icon, determine icon color and status text

export const TaskItem = (props: TaskItemProps) => {
    const { date, church, role } = props.item;
    const navigation = useNavigation();

    const onPressHandler = () => {
        navigation.navigate('TaskDetails', { task: props.item });
    };

    const iconProps = {
        height: 40,
        width: 40,
        fill: '#000000',
    };

    return (
        <TouchableOpacity
            style={{ ...styles.container, ...props.style }}
            onPress={onPressHandler}
            activeOpacity={props.activeOpacity ? props.activeOpacity : 0.8}
        >
            <Icon name="book-outline" {...iconProps} />
            <View
                style={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <Text category="h3">{role?.name} - Morning</Text>

                <Text category="p2">
                    <Entypo name="dot-single" size={20} color="green" />
                    Currently Scheduled
                </Text>
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Text category="p2">8:00 AM</Text>
                <Text category="label">to</Text>
                <Text category="p2">12:00 PM</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 60,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,

        borderRadius: 20,
        margin: 10,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        elevation: 3,
    },
});

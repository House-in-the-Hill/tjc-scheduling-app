import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Divider } from '@ui-kitten/components';
import { TaskItem } from './TaskItem';

interface TaskListItemProps {
    tasks;
}

export const TaskListItem = ({ tasks }: TaskListItemProps) => {
    const taskDisplay: [] = tasks.map((item, index) => {
        return (
            <View key={index} style={{ alignItems: 'center' }}>
                <TaskItem item={item} style={styles.taskItemStyle} activeOpacity={0.6} />
                <Divider
                    style={{ backgroundColor: 'rgb(186, 186, 186)', width: '90%' }}
                />
            </View>
        );
    });

    const date = tasks[0].date;

    return (
        <View style={styles.shadow}>
            <View style={styles.container}>
                <View style={styles.dateBar}>
                    <Text style={{ color: 'white' }}>
                        {new Date(date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            weekday: 'long',
                        })}
                    </Text>
                </View>
                {taskDisplay}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 30,
        margin: 10,
        overflow: 'hidden',
    },
    shadow: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 1,
            height: 3,
        },
        shadowOpacity: 0.5,
        shadowRadius: 2.22,

        elevation: 3,
        alignItems: 'center',
    },
    dateBar: {
        height: 30,
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskItemStyle: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
    },
});

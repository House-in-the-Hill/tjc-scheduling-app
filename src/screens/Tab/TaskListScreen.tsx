import React from 'react';
import { StyleSheet, FlatList, View, Dimensions } from 'react-native';
import { TaskListScreenProps } from '../../shared/models';
import { Text, Layout, Divider } from '@ui-kitten/components';
import { TaskItem } from '../../components/ListItems/TaskItem';
import { TitledCard } from '../../components/TitledCard';

import { compareDates } from '../../services/Calendar/helper_functions';

//TODO remove dummy data
const tasks = [
    {
        church: {
            churchId: 3,
            name: 'Elizabeth',
        },
        createdAt: '2020-10-04T01:07:23.900Z',
        date: '2020-08-21T14:30:00.000Z',
        role: {
            name: 'RE',
        },
        roleId: 4,
        taskId: 5,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
    {
        church: {
            churchId: 1,
            name: 'Hillsborough',
        },
        createdAt: '2020-10-04T01:07:23.900Z',
        date: '2020-08-21T14:30:00.000Z',
        role: {
            name: 'AV',
        },
        roleId: 1,
        taskId: 2,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
    {
        church: {
            churchId: 1,
            name: 'Hillsborough',
        },
        createdAt: '2020-10-04T01:07:23.900Z',
        date: '2020-08-22T14:30:00.000Z',
        role: {
            name: 'AV',
        },
        roleId: 1,
        taskId: 4,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
    {
        church: {
            churchId: 1,
            name: 'Hillsborough',
        },
        createdAt: '2020-10-04T01:07:23.901Z',
        date: '2020-08-23T14:30:00.000Z',
        role: {
            name: 'AV',
        },
        roleId: 1,
        taskId: 1,
        user: {
            firstName: 'Shaun',
            lastName: 'Tung',
        },
        userId: 1,
    },
];

const screenWidth = Dimensions.get('window').width;

//TODO ensure real tasks work instead of my dummy tasks
//use michelle's colors once she sends it over
export const TaskListScreen = (props: TaskListScreenProps) => {
    // const tasks = useSelector((state) => state.taskReducer.tasks);

    //regroups tasks by date
    const rearrangedTasks = tasks.reduce((acc, task, index) => {
        if (index === 0) return [[task]];
        const prevDate = acc[acc.length - 1][0].date;
        if (compareDates(new Date(prevDate), new Date(task.date))) {
            const temp = [...acc];
            temp[temp.length - 1] = [...temp[temp.length - 1], task];
            return temp;
        } else return [...acc, [task]];
    }, []);

    const renderItem = (props) => {
        const date = props.item[0].date;
        const title = new Date(date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            weekday: 'long',
        });

        const taskDisplay: [] = props.item.map((item, index) => {
            return (
                <View key={index} style={{ alignItems: 'center' }}>
                    <TaskItem
                        item={item}
                        style={styles.taskItemStyle}
                        activeOpacity={0.6}
                    />
                    <Divider
                        style={{ backgroundColor: 'rgb(186, 186, 186)', width: '90%' }}
                    />
                </View>
            );
        });
        return (
            <TitledCard
                style={{
                    width: screenWidth,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                title={title}
            >
                {taskDisplay}
            </TitledCard>
        );
    };

    return (
        <Layout style={styles.container}>
            {tasks.length > 0 ? (
                <FlatList
                    data={rearrangedTasks}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    directionalLockEnabled={true}
                    // contentContainerStyle={{
                    //     width: screenWidth,
                    // }}
                />
            ) : (
                <Text>You have no assignments!</Text>
            )}
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: screenWidth,
        alignItems: 'center',
        justifyContent: 'center',
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

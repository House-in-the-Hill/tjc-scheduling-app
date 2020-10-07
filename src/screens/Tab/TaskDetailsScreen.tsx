import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card } from '../../components/Card';
import { Layout, Text, Button, Icon, Divider, Input } from '@ui-kitten/components';
import { Entypo } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import { retrieveSwapCandidates, setMyTask } from '../../store/actions/swapActions';

export const TaskDetailsScreen = (props) => {
    const { task } = props.route.params;
    const { myTask } = useSelector((state) => state.swapReducer);
    const dispatch = useDispatch();
    const dotColor = 'green';

    const onButtonPressHandler = () => {
        dispatch(retrieveSwapCandidates(task.church.churchId, task.roleId, task.userId));
        if (myTask === null || myTask.taskId !== task.taskId) dispatch(setMyTask(task));
        props.navigation.navigate('SelectSwapOption');
    };

    const iconProps = {
        height: 35,
        width: 35,
        fill: '#000000',
    };

    return (
        <Layout style={{ flex: 1, width: '100%' }}>
            <LinearGradient
                colors={['rgb(100, 220, 220)', 'rgb(86, 194, 194)']}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 30,
                }}
            >
                <Card
                    style={{
                        alignItems: 'start',
                        padding: 40,
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={styles.top}>
                        <View style={styles.row}>
                            <Icon name="book-outline" {...iconProps} />
                            <Text category="h2">{task.role.name}</Text>
                        </View>
                        <View style={styles.row}>
                            <Entypo name="dot-single" size={40} color={dotColor} />
                            <Text>Currently Scheduled</Text>
                        </View>
                        <Text>
                            {new Date(task.date).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </Text>
                        <Text>8:00 AM - 12:00 AM PlaceHodler</Text>
                    </View>
                    <Divider />
                    <Text>Notes</Text>
                    <Input />
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <Button
                            style={{ margin: 10, width: 200 }}
                            onPress={onButtonPressHandler}
                        >
                            Request Change
                        </Button>
                    </View>
                </Card>
            </LinearGradient>
        </Layout>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    top: {},
});

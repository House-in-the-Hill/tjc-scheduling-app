import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, StyleSheet, Animated, Dimensions } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    calendarCardDimensions,
    headerBarHeight,
    bottomTabHeight,
    windowHeight,
} from '../shared/constants';
import { LinearGradient } from 'expo-linear-gradient';
import { TaskItem } from './ListItems/TaskItem';
import { PanGestureHandler, State as GestureState } from 'react-native-gesture-handler';
import { hidePreviewPane } from '../store/actions';
import { coloredBackgroundGradient1, coloredBackgroundGradient2 } from '../ui/colors';

const calendarHeight: number = calendarCardDimensions.totalHeight;
// const windowHeight = Dimensions.get('window').height;
const taskPreviewHeight = windowHeight - calendarHeight + headerBarHeight;
const closingHeight = windowHeight - bottomTabHeight - 60; //not sure why i need this 60 but it doesnt work well on my phone without it, maybe windowheight doesnt include the header bar height??

//TODO need stuff to display for when there are no tasks? or just blank. also make ts not angry at me
export const TaskPreviewPane = () => {
    const dispatch = useDispatch();
    const defaultSelected = { date: null, tasks: null };
    let selectedDate = useSelector((state) =>
        !!state.calendarReducer.selectedDate
            ? state.calendarReducer.selectedDate
            : defaultSelected,
    );
    const translateY = useRef(new Animated.Value(1000)).current;

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: taskPreviewHeight,
            duration: 250,
            useNativeDriver: true,
        }).start();
    }, [translateY]);

    let { tasks } = selectedDate;

    const renderItem = ({ item }) => <TaskItem item={item} />;

    const gestureHandler = ({ nativeEvent }) => {
        const newPos = Math.max(
            nativeEvent.translationY + taskPreviewHeight,
            taskPreviewHeight,
        );
        translateY.setValue(newPos);
        if (newPos > closingHeight) dispatch(hidePreviewPane());
    };

    const stateChangeHandler = ({ nativeEvent }) => {
        if (nativeEvent.state === GestureState.END) {
            Animated.timing(translateY, {
                toValue: taskPreviewHeight,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    //sometimes the dimensions api returns incorrect window height... not sure if its because of expo, hopefully this error wont get to live
    // console.log('taskPreviewHeight', taskPreviewHeight);
    // console.log('windowHeight', windowHeight);

    return (
        <PanGestureHandler
            onGestureEvent={gestureHandler}
            onHandlerStateChange={stateChangeHandler}
        >
            <Animated.View
                style={{ ...styles.container, transform: [{ translateY: translateY }] }}
            >
                <LinearGradient
                    colors={[coloredBackgroundGradient1, coloredBackgroundGradient2]}
                    style={{ flex: 1, borderRadius: 20, padding: 10 }}
                >
                    {tasks?.length > 0 ? (
                        <FlatList
                            keyExtractor={(item, index) => index.toString()}
                            data={tasks}
                            renderItem={renderItem}
                            scrollEnabled={tasks.length > 2 ? true : false}
                        />
                    ) : (
                        <Text category="h2" style={{ textAlign: 'center' }}>
                            You've got no tasks!
                        </Text>
                    )}
                </LinearGradient>
            </Animated.View>
        </PanGestureHandler>
    );
};

const styles = StyleSheet.create({
    container: {
        height: taskPreviewHeight,
        width: '100%',
        position: 'absolute',
        left: 0,
        right: 0,
    },
    hideText: {
        position: 'absolute',
        top: 0,
        right: 0,
        paddingRight: 10,
    },
    layout: {
        backgroundColor: 'transparent',
        width: '100%',
        height: 30,
        alignItems: 'flex-end',
    },
});

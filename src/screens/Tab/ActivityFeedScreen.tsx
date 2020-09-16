import React, { useState, ReactNode } from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { FlatList, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';
import SwipeableItem from '../../components/SwipeableItem';
import { NewAssignmentItem } from '../../components/NewAssignments/NewAssignmentItem';
import { FeedItem } from '../../components/ListItems/FeedItem';
import { windowWidth } from '../../shared/constants';

interface ActivityFeedProps {
    route;
    navigation;
    onSwipe;
}

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const ActivityFeedScreen = (props: ActivityFeedProps) => {
    const notifications = useSelector(
        (state) => state.notificationsReducer.notifications,
    );

    const [data, setData] = useState(notifications);
    const deleteThreshold: number = windowWidth * 0.4;

    const leftIcon: (string) => ReactNode = (color) => (
        <Icon height={20} width={20} name="trash-2-outline" fill={color} />
    );

    const deleteItem: (number) => void = (taskId) => {
        const updatedData = data.filter((d) => d.taskId !== taskId);
        // Animates list to close gap when item is deleted
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setData(updatedData);
    };

    const renderItem = ({ item, index }) => (
        <SwipeableItem
            swipeThreshold={deleteThreshold}
            onSwipe={deleteItem}
            itemId={item.taskId}
            leftIcon={leftIcon}
        >
            <FeedItem item={item} />
        </SwipeableItem>
    );

    return (
        <Layout style={styles.layout}>
            <LinearGradient
                colors={['#EDEEF3', '#FFFFFF']}
                style={{
                    flex: 1,
                    width: '100%',
                    alignItems: 'center',
                }}
            >
                {data.length > 0 ? (
                    <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => item.id.toString()}
                        decelerationRate={0.1}
                    />
                ) : (
                    <Text>You don't have any new assignments!</Text>
                )}
            </LinearGradient>
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        flex: 1,
    },
});

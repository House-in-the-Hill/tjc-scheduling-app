import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Carousel } from '../../components/Calender';
import { TaskPreviewPane } from '../../components/TaskPreviewPane';
import { Layout } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { useCheckPermissions } from '../../services/Hooks/useCheckPermissions';

interface ScheduleScreenProps {
    route;
    navigation;
}

export const ScheduleScreen = (props: ScheduleScreenProps) => {
    const isPreviewPaneOpen = useSelector(
        (state) => state.calendarReducer.previewPaneVisible,
    );

    useEffect(() => {
        //checks for notification permission, requests expo token, and updates db with updated expo token
        useCheckPermissions();
    }, []);

    return (
        <Layout style={styles.scrollContainer}>
            <Carousel />
            {isPreviewPaneOpen && <TaskPreviewPane />}
        </Layout>
    );
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },
    scrollContainer: {
        width: '100%',
        height: '100%',
    },
});

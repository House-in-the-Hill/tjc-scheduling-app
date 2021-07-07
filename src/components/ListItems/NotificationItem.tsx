import React, { useState } from 'react';
import { Text } from '@ui-kitten/components';
import { windowWidth } from '../../shared/constants';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, TouchableOpacity, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { selectDate } from '../../store/actions';
import { useDispatch } from 'react-redux';
import { CustomButton, buttonTypes } from '../../components/CustomButton';
import User1 from '../../assets/Svgs/User1.svg';
// import User2 from '../../assets/Svgs/User2.svg';

interface NotificationItemProps {
    item;
    navigation;
}

const screenWidth = Dimensions.get('window').width;

//TODO load picture of user that created notification
//display correct buttons to handle requests
//determine how long ago notification was created
//on tap of notification, take them to appropriate page

const fakeTask = {
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
};

export const NotificationItem = ({ item, navigation }: NotificationItemProps) => {
    const dispatch = useDispatch();

    const onNotificationPress = () => {
        //navigate to screen depending on what the notification is linked to
        //task --> task details done
        //request --> request details
        //? anything else
        navigation.navigate('TaskDetails', { task: fakeTask });
    };

    const onCancelPress = () => {
        console.log('cancel pressed');
    };

    const onConfirmPress = () => {
        console.log('confirm pressed');
    };

    const ButtonRow = () => (
        <View style={styles.buttonContainer}>
            <CustomButton
                text="Sorry, can't"
                type={buttonTypes.CANCEL}
                onPress={onCancelPress}
                styling={{ height: 29, width: 118, zIndex: 10 }}
            />
            <CustomButton
                text="Ok, change"
                type={buttonTypes.CONFIRM}
                onPress={onConfirmPress}
                styling={{ height: 29, width: 118, zIndex: 10 }}
            />
        </View>
    );

    return (
        <TouchableWithoutFeedback style={styles.container} onPress={onNotificationPress}>
            <View
                style={{
                    paddingVertical: 10,
                    justifyContent: 'flex-start',
                    width: '100%',
                    flexDirection: 'row',
                }}
            >
                <User1 height={28} width={28} />
                {/* <Text>{item.message}</Text> */}
                <Text category="h3" style={{ paddingLeft: 15 }}>
                    Theres a notification here ok?
                </Text>
            </View>
            <ButtonRow />
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: screenWidth,
        height: 100,
        backgroundColor: 'white',

        marginVertical: 3,
        alignItems: 'center',
        paddingLeft: 30,
    },
    leftAction: {
        height: 50,
    },
    buttonContainer: {
        flexDirection: 'row',
    },
});

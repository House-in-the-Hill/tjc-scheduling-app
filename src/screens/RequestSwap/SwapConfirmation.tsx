import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { useSelector } from 'react-redux';
import { LoadStateActionTypes } from '../../store/actions';
import { Card } from '../../components/Card';
import { CustomButton, buttonTypes } from '../../components/CustomButton';
import { coloredBackgroundGradient1, coloredBackgroundGradient2 } from '../../ui/colors';
import { LinearGradient } from 'expo-linear-gradient';

//TODO: configure error message if request was unsuccessful
//TODO: missing dove asset
export const SwapConfirmation = ({ route, navigation }) => {
    // const requestState = useSelector((state) => state.loadStateReducer.loadStatus.SWAP);

    const onButtonPress = () => navigation.popToTop();

    return (
        <LinearGradient
            colors={[coloredBackgroundGradient1, coloredBackgroundGradient2]}
            style={{
                flex: 1,
                borderRadius: 20,
                padding: 10,
                paddingTop: 40,
                alignItems: 'center',
            }}
        >
            <Icon name="alert-circle-outline" height={250} width={250} fill="#000" />
            <Card style={{ height: 350, width: '75%' }}>
                <Text>Success!</Text>
                <View>
                    <Text>Your request has been sent!</Text>
                    <Text>Once your request has been</Text>
                    <Text>accepted, you will be notified.</Text>
                </View>
                <CustomButton
                    text="Return"
                    type={buttonTypes.CONFIRM}
                    onPress={onButtonPress}
                    styling={{ height: 42, width: 180 }}
                />
            </Card>
        </LinearGradient>
    );
};

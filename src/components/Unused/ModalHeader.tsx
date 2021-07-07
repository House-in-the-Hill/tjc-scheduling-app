import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Icon, Text } from '@ui-kitten/components';

//unused
export const ModalHeader = ({ goBack, closeModal }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                width: '100%',
                height: 50,
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
                onPress={goBack}
            >
                <Icon style={{ width: 33, height: 55 }} name="arrow-ios-back" />
                <Text category="h4">Back</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
                <Icon style={{ width: 50, height: 50 }} name="close-square" />
            </TouchableOpacity>
        </View>
    );
};

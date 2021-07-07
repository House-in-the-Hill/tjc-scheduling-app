import React from 'react';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    primaryButtonColor,
    shadowColor,
    interactiveColorRed,
    neutralButtonColor,
    greyedOutButtonColor,
} from '../ui/colors';

export const buttonTypes = {
    CONFIRM: 'confirm',
    CANCEL: 'cancel',
    NEUTRAL: 'neutral',
    DISABLED: 'disabled',
};

interface CustomButtonProps {
    text: string;
    onPress: () => void;
    styling: { height: number; width: number; zIndex?: number };
    type: string;
}

export const CustomButton = ({ text, onPress, styling, type }: CustomButtonProps) => {
    const buttonTypeStyle = styles[type];
    const textColor = styles[type + 'Text'];
    return (
        <TouchableOpacity
            disabled={type === buttonTypes.DISABLED ? true : false}
            style={{ ...styles.main, ...styling, ...buttonTypeStyle }}
            onPress={onPress}
        >
            <Text category="h2" style={textColor}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    main: {
        width: 180,
        height: 42,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: primaryButtonColor,
        margin: 10,
        padding: 1,

        shadowColor: shadowColor,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 1,
        shadowRadius: 5 / 2,

        elevation: 5,
    },
    confirm: {
        backgroundColor: primaryButtonColor,
    },
    cancel: {
        borderWidth: 1,
        padding: 0,
        borderColor: interactiveColorRed,
        backgroundColor: 'white',
        shadowColor: '#AC7070',
    },
    neutral: {
        backgroundColor: 'white',
        borderColor: neutralButtonColor,
        borderWidth: 1,
        padding: 0,
    },
    disabled: {
        backgroundColor: greyedOutButtonColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        elevation: 0,
    },
    confirmText: {
        color: 'white',
    },
    cancelText: {
        color: interactiveColorRed,
    },
    neutralText: {
        color: neutralButtonColor,
    },
    disabledText: {
        color: 'white',
    },
});

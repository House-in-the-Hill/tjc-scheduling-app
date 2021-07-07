import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Input, Icon } from '@ui-kitten/components';
import { errorCaption } from '../shared/components/';

interface EmailInputProps {
    label: () => JSX.Element | string;
    value: string;
    caption?: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
    clearInputHandler: (inputField) => void;
}
interface PasswordInputProps {
    label: () => JSX.Element | string;
    value: string;
    caption?: string;
    onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

const clearInputIcon = (callback) => (
    <TouchableWithoutFeedback onPress={() => callback('email')}>
        <Icon
            color={'red'}
            width={20}
            height={20}
            name="close-circle-outline"
            style={{ opacity: 0.4 }}
            fill="#000000"
        />
    </TouchableWithoutFeedback>
);

export const EmailInput = ({
    label,
    value,
    caption,
    onChangeText,
    clearInputHandler,
}: EmailInputProps) => {
    return (
        <View style={{ width: '100%', paddingVertical: 10 }}>
            <Input
                label={label}
                value={value}
                caption={errorCaption(caption)}
                keyboardType={'email-address'}
                onChangeText={onChangeText}
                accessoryRight={() => clearInputIcon(clearInputHandler)}
            />
        </View>
    );
};

export const PasswordInput = ({
    label,
    value,
    caption,
    onChangeText,
}: PasswordInputProps) => {
    return (
        <View style={{ width: '100%', paddingTop: 10 }}>
            <Input
                label={label}
                value={value}
                caption={errorCaption(caption)}
                onChangeText={onChangeText}
                secureTextEntry={true}
            />
        </View>
    );
};

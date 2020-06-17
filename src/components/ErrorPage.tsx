import { View, Text } from 'react-native';
import React from 'react';

export const ErrorPage = (props) => {
    console.log('error pageprops', props);
    return (
        <View
            style={{
                ...{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: props.opacity,
                },
                ...props.style,
            }}
        >
            <Text style={{ color: 'red' }}>
                There has been an error retrieving your data
            </Text>
        </View>
    );
};

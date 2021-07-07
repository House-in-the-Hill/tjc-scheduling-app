import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import { secondaryColor, titledCardShadowColor } from '../ui/colors.js';

interface TitledCardProps {
    children;
    title;
    style?;
}

export const TitledCard = ({ children, title, style }: TitledCardProps) => (
    <View style={{ ...styles.shadow, ...style }}>
        <View style={styles.container}>
            <View style={styles.titleBar}>
                <Text category="h3" style={{ color: 'white' }}>
                    {title}
                </Text>
            </View>
            {children}
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: 'white',
        borderColor: secondaryColor,
        borderRadius: 30,
        margin: 10,
        overflow: 'hidden',
    },
    shadow: {
        shadowColor: titledCardShadowColor,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 23 / 2,

        elevation: 3,
        alignItems: 'center',
    },
    titleBar: {
        height: 40,
        padding: 3,
        width: '100%',
        backgroundColor: secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

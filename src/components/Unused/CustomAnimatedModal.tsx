import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Modal } from '@ui-kitten/components';
import { windowWidth, windowHeight } from '../../shared/constants';
import { RequestSwapStack } from '../../navigation/RequestSwap/RequestSwapStack';

interface CustomAnimatedModalProps {
    isVisible: boolean;
    closeModal: () => void;
    layoutHeight: number;
    children?;
}
//unused
export const CustomAnimatedModal = (props: CustomAnimatedModalProps) => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const transformY = useRef(new Animated.Value(1000)).current;

    // console.log('windowHeight', windowHeight);
    // console.log('props.layoutHeight', props.layoutHeight);

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 350,
                useNativeDriver: true,
            }),

            Animated.timing(transformY, {
                toValue: 0, //positioning math needs fine tuning
                duration: 350,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <Animated.View
            style={{
                height: props.layoutHeight,
                width: windowWidth,
                opacity: fadeAnim,
                backgroundColor: 'rgba(0,0,0,0.5)',
                position: 'absolute',
            }}
        >
            <Modal visible={props.isVisible} onBackdropPress={props.closeModal}>
                <Animated.View
                    style={{
                        transform: [{ translateY: transformY }],
                        width: windowWidth * 0.95,
                        height: props.layoutHeight * 0.95,
                    }}
                >
                    {props.children}
                </Animated.View>
            </Modal>
        </Animated.View>
    );
};

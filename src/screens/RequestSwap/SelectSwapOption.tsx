import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Layout, Text, Icon, Button } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { setSwapConfig } from '../../store/actions/swapActions';
import { SelectCard } from '../../components/SelectCard';
import { CustomButton, buttonTypes } from '../../components/CustomButton';
import User1 from '../../assets/Svgs/User1.svg';
import User4 from '../../assets/Svgs/User4.svg';
import ThreeUsers from '../../assets/Svgs/ThreeUsers.svg';

interface SelectSwapOptionProps {
    navigation;
    route;
}

export const SelectSwapOption = (props: SelectSwapOptionProps) => {
    //TODO hook up these choices to do their intended purpose
    //maybbe rephrase some of these
    //try to line up icons?
    const [selectedIndex1, setSelectedIndex1] = useState(0);
    const [selectedIndex2, setSelectedIndex2] = useState(0);

    const iconSettings = {
        height: 25,
        width: 25,
        fill: '#000000',
    };
    const dispatch = useDispatch();

    const onNextHandler = () => {
        const swapConfig = {
            choice1: selectedIndex1,
            choice2: selectedIndex2,
        };
        dispatch(setSwapConfig(swapConfig));
        props.navigation.navigate('SwapScreen');
    };

    const iconSetSwap = () => (
        <View style={{ flexDirection: 'row' }}>
            {/* <Icon name="person" {...iconSettings} /> */}
            <User1 {...iconSettings} />
            <Icon name="swap" {...iconSettings} />
            <User4 {...iconSettings} />
        </View>
    );

    const iconSetReplace = () => (
        <View style={{ flexDirection: 'row' }}>
            <User1 {...iconSettings} />
            <Icon name="arrow-forward" {...iconSettings} />
            <User4 {...iconSettings} />
        </View>
    );

    const iconSetPerson = () => <User4 {...iconSettings} />;

    const iconSetAnyone = () => (
        <View style={{ paddingLeft: 20 }}>
            <ThreeUsers height={50} width={50} />
        </View>
    );

    const onCardPress1 = (index) => {
        setSelectedIndex1(index);
    };

    const onCardPress2 = (index) => {
        setSelectedIndex2(index);
    };

    return (
        <Layout style={styles.layout}>
            <View style={styles.cardContainer}>
                <Text category="h1" style={{ paddingBottom: 10 }}>
                    Would you like to
                </Text>
                <SelectCard
                    displayedText={'Switch duty with someone'}
                    icons={iconSetSwap}
                    onPressHandler={onCardPress1}
                    cardIndex={0}
                    selectedIndex={selectedIndex1}
                />
                <SelectCard
                    displayedText="Have your duty replaced"
                    icons={iconSetReplace}
                    onPressHandler={onCardPress1}
                    cardIndex={1}
                    selectedIndex={selectedIndex1}
                />
            </View>

            <View style={styles.cardContainer}>
                <Text category="h1" style={{ paddingBottom: 10 }}>
                    Is this request for
                </Text>
                <SelectCard
                    displayedText="Specific time or person"
                    icons={iconSetPerson}
                    onPressHandler={onCardPress2}
                    cardIndex={0}
                    selectedIndex={selectedIndex2}
                />
                <SelectCard
                    displayedText="Anyone, as long as \nmy duty is replaced"
                    icons={iconSetAnyone}
                    onPressHandler={onCardPress2}
                    cardIndex={1}
                    selectedIndex={selectedIndex2}
                />
            </View>
            <CustomButton
                type={buttonTypes.CONFIRM}
                styling={{ height: 57, width: 300 }}
                text="Next"
                onPress={onNextHandler}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    layout: {
        height: '100%',
        width: '100%',
        padding: 20,
        paddingVertical: 35,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        height: '30%',
        paddingVertical: 10,
    },
});

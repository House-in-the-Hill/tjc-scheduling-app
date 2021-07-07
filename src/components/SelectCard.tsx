import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@ui-kitten/components';
import {
    optionCardBorderColor,
    optionCardShadowColorHighlighted,
    optionCardShadowColorNeutral,
} from '../ui/colors';

interface SelectCardProps {
    displayedText;
    icons;
    cardIndex;
    onPressHandler;
    selectedIndex;
}

//TODO finalize icon alignment
export const SelectCard = ({
    displayedText,
    icons,
    cardIndex,
    onPressHandler,
    selectedIndex,
}: SelectCardProps) => {
    const style =
        selectedIndex === cardIndex
            ? { ...selectStyle.selectCard, ...selectStyle.selected }
            : selectStyle.selectCard;

    //need this to get the line breaks to work from a string... so dumb lol
    //https://stackoverflow.com/questions/54796368/line-break-inside-string-react-native
    const text = displayedText.replace(/\\n/g, '\n');
    return (
        <TouchableOpacity
            activeOpacity={1}
            style={style}
            onPress={() => onPressHandler(cardIndex)}
        >
            <Text category="h3" style={{ paddingVertical: 5, marginRight: 15 }}>
                {text}
            </Text>
            {icons()}
        </TouchableOpacity>
    );
};
const selectStyle = StyleSheet.create({
    selectCard: {
        width: 300,
        height: 73,
        marginVertical: 5,
        borderRadius: 30,
        backgroundColor: 'white',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',

        shadowColor: optionCardShadowColorNeutral,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 18 / 2,

        elevation: 5,
    },
    selected: {
        borderColor: optionCardBorderColor,
        borderWidth: 3,
        padding: 7,
        shadowColor: optionCardShadowColorHighlighted, //hard to see this shadow on ios
        shadowRadius: 23 / 2,
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 0,
            width: 2,
        },
    },
});

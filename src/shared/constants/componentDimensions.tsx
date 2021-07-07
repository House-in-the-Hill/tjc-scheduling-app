import Constants from 'expo-constants';
import { Dimensions } from 'react-native';

export const statusBarHeight = Constants.statusBarHeight;
export const headerBarHeight = 63; //TODO may need to change depending on device
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;
export const bottomTabHeight = 60; //default is 56 on my phone

export const calendarCardDimensions = {
    height: 380,
    margin: 20,
    totalHeight: 400,
};

export const dateTileDimensions = {
    height: 50,
    width: '14.2857%',
};

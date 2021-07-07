import React from 'react';
import { Platform, View } from 'react-native';
import { Layout, Spinner } from '@ui-kitten/components';
import { statusBarHeight } from '../../shared/constants';

interface LoadingPageProps {
    style?;
    styleSafeArea?;
    opacity?;
}
//unused
//jk its being imported somewhere but this needs to be overhauled
export const LoadingPage = (props: LoadingPageProps) => {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: 'black',
                paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
                ...props.styleSafeArea,
            }}
        >
            <Layout
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
                <Spinner size="giant" status="primary" />
            </Layout>
        </View>
    );
};

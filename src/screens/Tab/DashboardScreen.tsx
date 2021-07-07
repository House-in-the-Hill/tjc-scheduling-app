import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Icon, Text } from '@ui-kitten/components';
import { TitledCard } from '../../components/TitledCard';
import * as ImagePicker from 'expo-image-picker';

const profilePic = require('../../assets/images/JleeProfilePic.jpg');

//TODO
//profile data needed
//church photo, profile photo
//how are tasks organized? if only upcoming tasks are grabbed, then upcoming assignment is easy
//https://medium.com/@rossbulat/react-native-working-with-notification-badges-5e60138b83e8 handle notifications
export const DashboardScreen = () => {
    const [image, setImage] = useState(null);
    const { tasks } = useSelector((state) => state.taskReducer);
    const requests = [
        {
            message: 'This guy requested something!',
            requesterFirstName: 'Ted',
            requesterLastName: 'Chen',
            requestId: 5,
            targetTask: 13,
        },
        {
            message: 'This guy requested something!',
            requesterFirstName: 'Mike',
            requesterLastName: 'Lee',
            requestId: 135,
            targetTask: 1353,
        },
        {
            message: 'This guy requested something!',
            requesterFirstName: 'Roger',
            requesterLastName: 'Dodger',
            requestId: 21,
            targetTask: 62,
        },
        {
            message: 'This guy requested something!',
            requesterFirstName: 'Bobob',
            requesterLastName: 'Hamburger',
            requestId: 32,
            targetTask: 151,
        },
        {
            message: 'This guy requested something!',
            requesterFirstName: 'Thomas',
            requesterLastName: 'Choo',
            requestId: 75,
            targetTask: 8797,
        },
        {
            message: 'This guy requested something!',
            requesterFirstName: 'Becky',
            requesterLastName: 'Cosmo',
            requestId: 4784,
            targetTask: 15050,
        },
    ];

    const largeIconProps = {
        height: 35,
        width: 35,
        fill: '#000000',
    };

    const iconProps = {
        height: 20,
        width: 20,
        fill: '#000000',
    };

    const infoCard = [
        <View key={0} style={styles.infoRow}>
            <Icon name="person" {...iconProps} />
            <Text> Michelle Lin</Text>
        </View>,
        <View key={1} style={styles.infoRow}>
            <Icon name="email-outline" {...iconProps} />
            <Text> Michelle.Lin@gmail.com</Text>
        </View>,
        <View key={2} style={styles.infoRow}>
            <Icon name="phone" {...iconProps} />
            <Text> 562-896-6301</Text>
        </View>,
        <View key={3} style={styles.infoRow}>
            <Icon name="home" {...iconProps} />
            <Text> Philadelphia Church</Text>
        </View>,
    ];

    const upcomingAssignment = (
        <TouchableOpacity style={{ flexDirection: 'row', ...styles.center, height: 90 }}>
            <View style={{ flexDirection: 'column', flex: 1, ...styles.center }}>
                <Text>RE-E1</Text>
                <Icon name="book" {...iconProps} />
            </View>
            <View
                style={{
                    flexDirection: 'column',
                    backgroundColor: 'black',
                    width: 1,
                    height: '80%',
                }}
            ></View>
            <View style={{ flexDirection: 'column', flex: 2, ...styles.center }}>
                <Text>July 23, Saturday</Text>
                <Text>10:30 AM - 12:00 PM</Text>
            </View>
        </TouchableOpacity>
    );

    const onCameraPressHandler = async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        status !== 'granted' &&
            alert('Sorry, we need camera roll permissions to make this work!');

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3], //android only
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri); //why is ts angry at me :(
            //TODO save image to db
        }
    };

    const renderRequestCarousel = ({ item }) => (
        <TitledCard title="Received" style={{ marginHorizontal: 20 }}>
            <View style={{ height: 200, width: 160 }}>
                <Text>{item.message}</Text>
                <Text>
                    {item.requesterFirstName} {item.requesterLastName}
                </Text>
            </View>
        </TitledCard>
    );

    return (
        <View style={styles.container}>
            <ScrollView style={{ ...styles.container }} bounces={false}>
                {/* <Image source={profilePic} style={styles.backgroundImage} /> */}
                <View style={styles.profileCard}>
                    <Image
                        source={image ? { uri: image } : profilePic}
                        style={styles.profilePictureContainer}
                    />

                    <TouchableOpacity
                        style={{ position: 'absolute', left: 130, top: 15 }}
                        onPress={onCameraPressHandler}
                    >
                        <Icon name="camera-outline" {...largeIconProps} />
                    </TouchableOpacity>
                    <View
                        style={{
                            ...styles.center,
                            flexDirection: 'column',
                            height: '100%',
                            width: '60%',
                            justifyContent: 'space-around',
                        }}
                    >
                        <Text category="h5" style={styles.profileText}>
                            Michelle Lin
                        </Text>
                        <Text category="h6" style={styles.profileText}>
                            Philadelphia
                        </Text>
                        <Text category="p1" style={styles.profileText}>
                            Stuff that I do down here
                        </Text>
                    </View>
                </View>
                <View style={{ ...styles.mainCard, alignItems: 'center' }}>
                    <TitledCard title="General Info" style={{ width: '80%' }}>
                        {infoCard}
                    </TitledCard>
                    <TitledCard title="Upcoming Assignment" style={{ width: '80%' }}>
                        {upcomingAssignment}
                    </TitledCard>
                    <View style={styles.flatListContainer}>
                        <Text>Recent Requests</Text>
                        <FlatList
                            // pagingEnabled={true}
                            data={requests}
                            renderItem={renderRequestCarousel}
                            horizontal={true}
                            keyExtractor={(item, index) => index.toString()}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(35, 117, 117, 0.62)',
    },
    profileCard: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        overflow: 'hidden',
        paddingTop: 20,
    },
    profilePictureContainer: {
        borderRadius: 100,
        borderWidth: 2,
        borderColor: 'grey',
        height: 150,
        width: 150,
    },
    profileText: { color: 'white' },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainCard: {
        flex: 3,
        width: '100%',
        backgroundColor: 'rgba(178, 178, 178, 0.62)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: 'hidden',
    },
    infoRow: { flexDirection: 'row', padding: 5, paddingLeft: 35 },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
        opacity: 0.7,
        resizeMode: 'cover',
    },
    flatListContainer: {
        height: 275,
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 15,
    },
});

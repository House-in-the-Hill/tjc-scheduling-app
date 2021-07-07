import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Image,
    FlatList,
    Modal,
    Alert,
    Button,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Entypo } from '@expo/vector-icons';
import { ProfileScreenProps } from '../../shared/models';
import { Screen } from '../../components/Unused/Screen';
import { openDrawerAction } from '../../shared/components';
import { Text, Layout } from '@ui-kitten/components';

//unused
export const ProfileScreen = (props: ProfileScreenProps) => {
    const { email, firstName, lastName, church } = useSelector(
        ({ profileReducer }) => profileReducer.profile,
    );
    const [modalVisible, setModalVisible] = useState(false);
    const [modalParameter, setModalParameter] = useState({ label: '', data: '' });
    const [modalInput, setModalInput] = useState('');

    const editIconHandler = (label, data) => {
        setModalParameter({ label, data });
        setModalVisible(true);
    };

    const Tile = (props) => {
        return (
            <View style={styles.tile}>
                <View style={{ width: 70 }}>
                    <Text>{props.label}:</Text>
                </View>
                <View style={{ flex: 10, paddingLeft: 10 }}>
                    <Text>{props.data}</Text>
                </View>
                <TouchableOpacity style={{ flex: 1 }}>
                    <Entypo
                        name="edit"
                        size={20}
                        color="black"
                        onPress={() => editIconHandler(props.label, props.data)}
                        style={{
                            borderWidth: 1,
                            padding: 1,
                            borderColor: 'rgba(150, 150, 150, 0.67)',
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };

    const profileDetailsArray = [
        {
            label: 'Name',
            data: firstName + ' ' + lastName,
        },
        {
            label: 'Email',
            data: email,
        },
        {
            label: 'Church',
            data: church.name,
        },
    ];

    const render = (item) => <Tile label={item.item.label} data={item.item.data} />;

    const onSaveHandler = () => {
        if (modalInput === '') {
            //check for valid inputs
            //action -> api call
            //
        }
        setModalVisible(false);
    };

    return (
        <Screen
            title={() => <Text category="h2">Profile</Text>}
            accessoryLeft={() => openDrawerAction(props.navigation.toggleDrawer)}
        >
            <Layout style={styles.screen}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => Alert.alert('modal has been closed')}
                >
                    <ScrollView
                        contentContainerStyle={styles.modalContainer}
                        keyboardShouldPersistTaps="handled"
                    >
                        <KeyboardAvoidingView
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '100%',
                            }}
                        >
                            <View style={styles.modalCard}>
                                <Text>Edit {modalParameter.label}</Text>
                                <View style={{ flexDirection: 'row', flex: 1 }}>
                                    <TextInput
                                        placeholder={modalParameter.data}
                                        style={{
                                            width: 250,
                                            borderWidth: 1,
                                            height: 35,
                                            fontSize: 20,
                                        }}
                                        onChangeText={setModalInput}
                                    />
                                </View>
                                <View style={{ width: '65%' }}>
                                    <View style={{ marginBottom: 5 }}>
                                        <Button
                                            title={'Save changes'}
                                            onPress={onSaveHandler}
                                        />
                                    </View>
                                    <Button
                                        title={'Exit without saving'}
                                        onPress={() => setModalVisible(false)}
                                    />
                                </View>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </Modal>
                <View style={styles.imageCard}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={require('../../assets/images/JleeProfilePic.jpg')}
                            resizeMode="contain"
                            style={styles.image}
                        />
                    </View>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        scrollEnabled={false}
                        keyExtractor={(item, index) => index.toString()}
                        data={profileDetailsArray}
                        renderItem={render}
                    />
                </View>
            </Layout>
        </Screen>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        zIndex: -1,
    },
    imageCard: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        elevation: 10,
    },
    imageContainer: {
        width: 250,
        height: 250,
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    profileCard: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Roboto-Regular',
        fontSize: 20,
    },
    tile: {
        paddingHorizontal: 10,
        margin: 5,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    tileTextContainer: {
        // justifyContent:
    },
    listContainer: {
        width: '90%',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
    },
    modalCard: {
        height: 175,
        width: '70%',
        backgroundColor: 'white',
        elevation: 10,
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        opacity: 0.97,
    },
});

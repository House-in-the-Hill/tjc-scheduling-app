import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import axios from 'axios';
import { secretIp } from '../../../secrets/secrets';
import { AsyncStorage } from 'react-native';
import { extractId } from '../../store/helper';

export const useCheckPermissions = async () => {
    let accesskey = await AsyncStorage.getItem('access_token');
    const userId = extractId(accesskey);

    try {
        let pushToken;
        let permissionStatus = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        if (permissionStatus.status !== 'granted') {
            permissionStatus = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        pushToken =
            permissionStatus.status === 'granted' &&
            (await Notifications.getExpoPushTokenAsync()).data;
        savePushToken(accesskey, userId, pushToken);
    } catch (err) {
        console.log('err', err);
    }
};

function savePushToken(accesskey, userId, token) {
    return axios.patch(
        secretIp + `/api/users/expoPushToken/${userId}`,
        {
            pushToken: token,
        },
        {
            headers: {
                authorization: accesskey,
            },
        },
    );
}

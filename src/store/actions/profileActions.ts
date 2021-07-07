import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { ProfileStateActions } from './loadStateActions';
import { errorDataExtractor } from '../helper';

export const SET_PROFILE = 'SET_PROFILE';

export const setProfile = (profile) => {
    return {
        type: SET_PROFILE,
        payload: profile,
    };
};

//maybe move somewhere else?
function getProfile(userId, accesskey) {
    return axios.get(secretIp + `/api/user/${userId}`, {
        // headers: {
        //     authorization: accesskey,
        // },
    });
}

export const fetchProfileOnLogin = () => {
    return async (dispatch) => {
        dispatch(ProfileStateActions.Loading());
        let accesskey = await AsyncStorage.getItem('access_token');
        const userId = extractId(accesskey);
        try {
            const { data: userProfile } = await getProfile(userId, accesskey);
            dispatch(setProfile(userProfile));
            dispatch(ProfileStateActions.Loaded());
        } catch (error) {
            console.log('error in profile', error);
            const errorData = errorDataExtractor(error);
            return dispatch(ProfileStateActions.Error(errorData));
        }
    };
};

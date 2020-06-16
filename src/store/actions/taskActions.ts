import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { secretIp } from '../../../secrets/secrets';
import { extractId } from '../helper';
import { TaskStateActions } from '../actions/loadStateActions';
import { errorDataExtractor } from '../helper';

export const SET_TASKS = 'SET_TASKS';

export const setTasks = (tasks) => {
    return {
        type: SET_TASKS,
        payload: tasks,
    };
};

function getTasks(userId, accesskey) {
    return axios.get(secretIp + '/api/tasks/getAllUserTasks', {
        params: { id: userId },
        headers: {
            authorization: accesskey,
        },
    });
}

export const fetchTasksOnLogin = () => {
    return async (dispatch) => {
        let accesskey = await AsyncStorage.getItem('access_token');
        const userId = extractId(accesskey);
        dispatch(TaskStateActions.Loading());
        try {
            const { data: userTasks } = await getTasks(userId, accesskey);
            dispatch(setTasks(userTasks));
            dispatch(TaskStateActions.Loaded());
        } catch (error) {
            const errorData = errorDataExtractor(error);
            return dispatch(TaskStateActions.Error(errorData));
        }
    };
};

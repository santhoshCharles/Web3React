import axios from 'axios';
import { EnvironmentActions } from './getEnvironmentAction';

export const getEnvironmentsAsync = () => {
    return async (dispatch) => {
        try {
            dispatch(EnvironmentActions.getEnvironments());
            let { data } = await axios({
                url: process.env.REACT_APP_ENVIRONMENT_URL,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (data.responseCode === 200) {
                return dispatch(EnvironmentActions.getEnvironmentsSuccess(data.responseData));
            }
            dispatch(EnvironmentActions.getEnvironmentsError());
        } catch (error) {
            dispatch(EnvironmentActions.getEnvironmentsError());
        }
    }
}

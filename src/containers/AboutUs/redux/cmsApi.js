import axios from 'axios';
import { CmsActions } from './cmsAction';
import { toast } from "react-toastify";

const userBaseURL = process.env.REACT_APP_USER_BASE_URL;
const apiUrl = process.env.REACT_APP_API;

export const getCMSDetailsAsync = (type) => {
    return async (dispatch) => {
        try {
            dispatch(CmsActions.getCMSDetailsStart());
            const { data } = await axios({
                method: "GET",
                url: `${apiUrl}${userBaseURL}/getCMSDetails/${type}`,
            });
            if (data.responseCode === 200) {
                return dispatch(CmsActions.getCMSDetailsSuccess(data.responseData));
            }
            return dispatch(CmsActions.getCMSDetailsError(data.responseMessage));
        } catch (error) {
            dispatch(CmsActions.getCMSDetailsError());
            return toast.error("Error while fetching data.");
        }
    }
}

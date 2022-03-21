import axios from "axios";
import { GetMasterDetailsActions } from "./getMasterDetailActions";

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

export const getMasterDetailsAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      dispatch(GetMasterDetailsActions.getMasterDetailsStart());

      //Checked whether user is logged in 
      let url = `${apiUrl}${userBaseURL}/getMasterDetails`;
      if (_id) {
        url = `${apiUrl}${userBaseURL}/getMasterDetails?id=${_id}`;
      }
      //Checked whether user is logged in 

      let { data } = await axios({
        url: url,
        method: 'GET',
      });
      if (data.responseCode === 200) {
        return dispatch(GetMasterDetailsActions.getMasterDetailsSuccess(data.responseData));
      }
      dispatch(GetMasterDetailsActions.getMasterDetailsError());
    } catch (error) {
      dispatch(GetMasterDetailsActions.getMasterDetailsError());
    }
  }
};

import axios from "axios";
import { ChatActions } from "./chatAction";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;
const commonBaseURL = process.env.REACT_APP_COMMON_BASE_URL;

export const getChatListAsync = (searchText) => {
  return async (dispatch, getState) => {
    try {
      dispatch(ChatActions.getChatListStart());
      let { _id } = getState().auth.user;
      let { skip, limit } = getState().chat;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getChatList/${_id}?search=${searchText}&skip=${skip}&limit=${limit}`,
      });
      if (data.responseCode === 200) {
        return dispatch(ChatActions.getChatListSuccess(data.responseData));
      }
      dispatch(ChatActions.getChatListError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ChatActions.getChatListError());
      return toast.error(
        "Error while fetching chat list. Please try again after sometime."
      );
    }
  };
};

export const uploadImageFunc = async (formData) => {
  if (formData) {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
        data: formData,
      });
      if (data.responseCode !== 200) {
        toast.error(`${data.responseMessage}`);
        return data;
      } else {
        // toast.success(`${data.responseMessage}`);
        return data;
      }
    } catch (err) {
      console.log(err, "err");
      toast.error(
        " Error while uploading file. Please try again after sometime."
      );
      return err;
    }
  }
};

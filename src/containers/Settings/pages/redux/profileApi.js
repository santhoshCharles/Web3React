import axios from "axios";
import { ProfileActions } from "./profileAction";
import { toast } from "react-toastify";

const getCommonBaseURL = (state) => {
  return state.environnment.environmentLists.commonBaseURL;
};

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

export const updateUserProfileAsync = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(ProfileActions.profileUpdateStart());
      let { _id } = getState().auth.user;
      let { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateProfile/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: user,
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.profileUpdateSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(ProfileActions.profileUpdateError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProfileActions.profileUpdateError());
      return toast.error(
        "Error while updating profile.Please try again after sometime."
      );
    }
  };
};

export const resetPasswordAsync = (password) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.resetPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/resetPassword/${_id}`,
        data: password,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(ProfileActions.resetPasswordSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(ProfileActions.resetPasswordError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProfileActions.resetPasswordError());
      return toast.error(
        "Error while reseting password.Please try again after sometime."
      );
    }
  };
};

export const changeEmailRequestAsync = (emailId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.changeEmailRequestStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/changeEmailRequest/${_id}`,
        data: emailId,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(data);
      if (data.responseCode === 200) {
        dispatch(ProfileActions.changeEmailRequestSuccess(data.responseData));
        dispatch(ProfileActions.openChangeModal());
        return toast.success(data.responseMessage);
      }
      dispatch(ProfileActions.changeEmailRequestError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProfileActions.changeEmailRequestError());
      toast.error("Error while changing email. Please try again later");
    }
  };
};

export const updateEmailRequestAsync = ({ code, emailId }) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProfileActions.updateEmailStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/updateEmail/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { code, emailId },
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          ...data.responseData,
        };
        dispatch(ProfileActions.profileUpdateSuccess(payload));
        dispatch(ProfileActions.updateEmailSuccess(emailId));
        dispatch(ProfileActions.closeChangeModal());
        return toast.success(data.responseMessage);
      }
      dispatch(ProfileActions.updateEmailError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProfileActions.updateEmailError());
      toast.error("Error while updating email. Please try again later");
    }
  };
};

export const changeContactRequestAsync = (contactNumber) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(ProfileActions.changeContactRequestStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/changeContactRequest/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: contactNumber,
      });
      console.log(data);
      if (data.responseCode === 200) {
        dispatch(ProfileActions.changeContactRequestSuccess(data.responseData));
        dispatch(ProfileActions.openContactChangeModal());
        return toast.success(data.responseMessage);
      }
      toast.error(data.responseMessage);
      return dispatch(ProfileActions.changeContactRequestError());
    } catch (error) {
      dispatch(ProfileActions.changeContactRequestError());
      return toast.error(
        "Error while receiving request. Please try again later"
      );
    }
  };
};

export const updateContactRequestAsync = ({ code, contactNumber }) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(ProfileActions.updateContactStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/updateContact/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { code, contactNumber },
      });
      console.log(data);
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          ...data.responseData,
        };
        dispatch(ProfileActions.profileUpdateSuccess(payload));
        dispatch(ProfileActions.updateContactSuccess(contactNumber));
        dispatch(ProfileActions.closeContactChangeModal());
        return toast.success(data.responseMessage);
      }
      dispatch(ProfileActions.updateContactError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProfileActions.updateContactError());
      return toast.error(
        "Error while updating contact. Please try again later"
      );
    }
  };
};

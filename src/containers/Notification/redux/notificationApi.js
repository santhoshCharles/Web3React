import axios from "axios";
import { notificationActions } from "./notificationAction";
import { toast } from "react-toastify";

export const getNotificationListAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      let { notificationSkip, notificationLimit } = getState().notification;
      dispatch(notificationActions.getNotificationListStart());
      const { REACT_APP_API, REACT_APP_USER_BASE_URL } = process.env;
      const { data } = await axios({
        method: "GET",
        url: `${REACT_APP_API}${REACT_APP_USER_BASE_URL}/getAllNotifications/${_id}?skip=${notificationSkip}&limit=${notificationLimit}`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          notificationActions.getNotificationListSuccess(data.responseData)
        );
      }
      return dispatch(notificationActions.getNotificationListError());
    } catch (error) {
      dispatch(notificationActions.getNotificationListError());
      return toast.error(
        " Error while fetching notification. Please try again after sometime."
      );
    }
  };
};

export const getBellNotificationListAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(notificationActions.getBellNotificationListStart());
      const { REACT_APP_API, REACT_APP_USER_BASE_URL } = process.env;
      const { data } = await axios({
        method: "GET",
        url: `${REACT_APP_API}${REACT_APP_USER_BASE_URL}/getAllNotifications/${_id}?skip=0&limit=5`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          notificationActions.getBellNotificationListSuccess(data.responseData)
        );
      }
      return dispatch(notificationActions.getBellNotificationListError());
    } catch (error) {
      dispatch(notificationActions.getBellNotificationListError());
      return toast.error(
        " Error while fetching notification. Please try again after sometime."
      );
    }
  };
};

export const getLinkRedirection = (notification) => {
  let link = "";
  switch (notification.categoryType) {
    case "PROJECT": {
      link = `/project-details/${notification.refId}`;
      break;
    }
    case "PAYMENT": {
      link = "";
      break;
    }
    case "CHAT": {
      link = `/chat?recieverId=${notification.refId}`;
      break;
    }
    case "CARD_COMMENT": {
      link = `/deliverables?projectId=${notification.projectId}&packageId=${notification.packageId}&cardId=${notification.refId}`;
      break;
    }
  }

  return link;
};

import { notificationMap } from "./notificationAction";

const initialState = {
  isLoading: false,
  notificationList: [],
  bellNotificationList: [],
  notificationSkip: 0,
  notificationLimit: 10,
  refreshNotificationList: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationMap.GET_NOTIFICATION_LIST_START: {
      return {
        ...state,
        isLoading: true,
        refreshNotificationList: false,
      };
    }
    case notificationMap.GET_NOTIFICATION_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        notificationList: action.payload,
      };
    }
    case notificationMap.GET_NOTIFICATION_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case notificationMap.GET_BELL_NOTIFICATION_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case notificationMap.GET_BELL_NOTIFICATION_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        bellNotificationList: action.payload,
      };
    }
    case notificationMap.GET_BELL_NOTIFICATION_LIST_ERROR: {
      return {
        ...state,
        //isLoading: false,
      };
    }
    case notificationMap.SET_NOTIFICATION_BATCH_NUMBER: {
      return {
        ...state,
        notificationSkip: action.payload,
        refreshNotificationList: true,
      };
    }
    case notificationMap.RESET_NOTIFICATION_BATCH_NUMBER: {
      return {
        ...state,
        notificationSkip: action.payload,
        refreshNotificationList: true,
      };
    }
    default:
      return { ...state };
  }
};

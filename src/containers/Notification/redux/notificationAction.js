export const notificationMap = {
    GET_NOTIFICATION_LIST_START: "GET_NOTIFICATION_LIST_START",
    GET_NOTIFICATION_LIST_SUCCESS: "GET_NOTIFICATION_LIST_SUCCESS",
    GET_NOTIFICATION_LIST_ERROR: "GET_NOTIFICATION_LIST_ERROR",

    GET_BELL_NOTIFICATION_LIST_START: "GET_BELL_NOTIFICATION_LIST_START",
    GET_BELL_NOTIFICATION_LIST_SUCCESS: "GET_BELL_NOTIFICATION_LIST_SUCCESS",
    GET_BELL_NOTIFICATION_LIST_ERROR: "GET_BELL_NOTIFICATION_LIST_ERROR",

    SET_NOTIFICATION_BATCH_NUMBER: "SET_NOTIFICATION_BATCH_NUMBER",
    RESET_NOTIFICATION_BATCH_NUMBER: "RESET_NOTIFICATION_BATCH_NUMBER",
}

export const notificationActions = {
    getNotificationListStart: (data) => ({
        type: notificationMap.GET_NOTIFICATION_LIST_START,
        payload: data,
    }),
    getNotificationListSuccess: (data) => ({
        type: notificationMap.GET_NOTIFICATION_LIST_SUCCESS,
        payload: data,
    }),
    getNotificationListError: (errors) => ({
        type: notificationMap.GET_NOTIFICATION_LIST_ERROR,
        payload: { errors },
    }),

    getBellNotificationListStart: (data) => ({
        type: notificationMap.GET_BELL_NOTIFICATION_LIST_START,
        payload: data,
    }),
    getBellNotificationListSuccess: (data) => ({
        type: notificationMap.GET_BELL_NOTIFICATION_LIST_SUCCESS,
        payload: data,
    }),
    getBellNotificationListError: (errors) => ({
        type: notificationMap.GET_BELL_NOTIFICATION_LIST_ERROR,
        payload: { errors },
    }),
    setNotificationBatchNumber: (data) => ({ type: notificationMap.SET_NOTIFICATION_BATCH_NUMBER, payload: data }),
    resetNotificationBatchNumber: (data) => ({ type: notificationMap.RESET_NOTIFICATION_BATCH_NUMBER, payload: data }),
}
export const ChatMap = {
  GET_CHAT_LIST_START: "GET_CHAT_LIST_START",
  GET_CHAT_LIST_SUCCESS: "GET_CHAT_LIST_SUCCESS",
  GET_CHAT_LIST_ERROR: "GET_CHAT_LIST_ERROR",
  SEARCH_TEXT_CHANGE: "SEARCH_TEXT_CHANGE",
  REFRESH_PROJECT_CHAT_LIST: "REFRESH_PROJECT_CHAT_LIST",
  SET_CHAT_LIST_BATCH_NUMBER: "SET_CHAT_LIST_BATCH_NUMBER",
  SET_SELECTED_CHAT_INFO: "SET_SELECTED_CHAT_INFO",
  SET_SELECTED_CHAT_MESSAGE: "SET_SELECTED_CHAT_MESSAGE",
  REFRESH_MESSAGES: "REFRESH_MESSAGES",
  RESET_REFRESH_MESSAGE: "RESET_REFRESH_MESSAGE",
  RESET_STATE: "RESET_STATE",
};

export const ChatActions = {
  getChatListStart: () => ({ type: ChatMap.GET_CHAT_LIST_START }),
  getChatListSuccess: (data) => ({
    type: ChatMap.GET_CHAT_LIST_SUCCESS,
    payload: data,
  }),
  getChatListError: (errors) => ({
    type: ChatMap.GET_CHAT_LIST_ERROR,
    payload: errors,
  }),
  searchTextChange: (data) => ({
    type: ChatMap.SEARCH_TEXT_CHANGE,
    payload: data,
  }),
  refreshChatList: () => ({
    type: ChatMap.REFRESH_PROJECT_CHAT_LIST,
  }),
  setChatListBatchNumber: (data) => ({
    type: ChatMap.SET_CHAT_LIST_BATCH_NUMBER,
    payload: data,
  }),
  setSelectedChatInfo: (data) => ({
    type: ChatMap.SET_SELECTED_CHAT_INFO,
    payload: data,
  }),
  resetRefreshMessage: (data) => ({
    type: ChatMap.RESET_REFRESH_MESSAGE,
    payload: data,
  }),
  setSelectedChatMessages: (data) => ({
    type: ChatMap.SET_SELECTED_CHAT_MESSAGE,
    payload: data,
  }),
  resetState: (data) => ({
    type: ChatMap.RESET_STATE,
  }),
};

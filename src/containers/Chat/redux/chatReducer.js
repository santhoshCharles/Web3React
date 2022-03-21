import { ChatMap } from "./chatAction";

const initialState = {
  chatList: [],
  isLoading: false,
  refreshChatListing: true,
  searchText: "",
  skip: 0,
  limit: 5,
  selectedChatInfo: {},
  selectedChatMessage: {},
  refreshMessages: true,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ChatMap.GET_CHAT_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ChatMap.GET_CHAT_LIST_SUCCESS: {
      return {
        ...state,
        chatList: action.payload,
        isLoading: false,
        refreshChatListing: false,
        // refreshMessages: false,
      };
    }
    case ChatMap.GET_CHAT_LIST_ERROR: {
      return {
        ...state,
        chatList: {},
        isLoading: false,
        refreshChatListing: false,
      };
    }
    case ChatMap.SEARCH_TEXT_CHANGE: {
      return {
        ...state,
        searchText: action.payload,
        limit: 5,
      };
    }
    case ChatMap.REFRESH_PROJECT_CHAT_LIST: {
      return {
        ...state,
        refreshChatListing: true,
        limit: 5,
        isLoading: true,
      };
    }
    case ChatMap.SET_CHAT_LIST_BATCH_NUMBER: {
      return {
        ...state,
        limit: action.payload,
        isLoading: true,
        refreshChatListing: true,
      };
    }
    case ChatMap.SET_SELECTED_CHAT_INFO: {
      return {
        ...state,
        selectedChatInfo: action.payload,
        refreshMessages: true,
      };
    }
    case ChatMap.SET_SELECTED_CHAT_MESSAGE: {
      return {
        ...state,
        refreshMessages: false,
        selectedChatMessage: action.payload,
        // refreshMessages: true,
      };
    }
    case ChatMap.RESET_REFRESH_MESSAGE: {
      return {
        ...state,
        refreshMessages: false,
      };
    }
    case ChatMap.RESET_STATE: {
      return {
        ...initialState,
      };
    }
    default:
      return { ...state };
  }
};

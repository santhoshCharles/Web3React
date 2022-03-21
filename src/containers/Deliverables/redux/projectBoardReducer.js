import { ProjectCardMap } from "./projectBoardAction";

const initialState = {
  isLoading: false,
  projectBoardDetails: {},
  cardData: {},
  refreshData: true,
  isFetching: false,
  refreshCardData: true,
  //refreshCardList: true,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ProjectCardMap.ADD_CARD_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.ADD_CARD_SUCCESS: {
      return {
        ...state,
        refreshData: true,
        isLoading: false,
      };
    }
    case ProjectCardMap.ADD_CARD_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProjectCardMap.GET_PROJECTBOARD_DETAILS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.GET_PROJECTBOARD_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        projectBoardDetails: action.payload,
        refreshData: false,
      };
    }
    case ProjectCardMap.GET_PROJECTBOARD_DETAILS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case ProjectCardMap.UPDATE_CARD_START: {
      return {
        ...state,
        isLoading: true,
        isFetching: true,
      };
    }
    case ProjectCardMap.UPDATE_CARD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshData: true,
        refreshCardData: true,
        isFetching: false,
      };
    }
    case ProjectCardMap.UPDATE_CARD_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProjectCardMap.RESET_STATE: {
      return {
        ...initialState,
      };
    }
    case ProjectCardMap.DELETE_CARD_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.DELETE_CARD_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshData: true,
      };
    }
    case ProjectCardMap.DELETE_CARD_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProjectCardMap.DELETE_CARD_COMMENT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.DELETE_CARD_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshCardData: true,
      };
    }
    case ProjectCardMap.DELETE_CARD_COMMENT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProjectCardMap.DELETE_CARD_COMMENT_ATTACHMENT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.DELETE_CARD_COMMENT_ATTACHMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshCardData: true,
      };
    }
    case ProjectCardMap.DELETE_CARD_COMMENT_ATTACHMENT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProjectCardMap.HANDLE_CARD_DRAG_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.HANDLE_CARD_DRAG_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshData: true,
      };
    }
    case ProjectCardMap.HANDLE_CARD_DRAG_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProjectCardMap.MARK_AS_COMPLETE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.MARK_AS_COMPLETE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshCardData: true,
        refreshData: true,
      };
    }
    case ProjectCardMap.MARK_AS_COMPLETE_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case ProjectCardMap.GET_CARD_DETAIL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ProjectCardMap.GET_CARD_DETAIL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshCardData: false,
        cardData: action.payload,
      };
    }
    case ProjectCardMap.GET_CARD_DETAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ProjectCardMap.RESET_CARD_DETAILS: {
      return {
        ...state,
        cardData: {},
        refreshCardData: true,
      };
    }
    case ProjectCardMap.RESET_PROJECT_BOARD_DETAILS: {
      return {
        ...initialState,
      };
    }
    default:
      return { ...state };
  }
};

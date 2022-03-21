import { projectListConstant } from "./projectListAction";
import { observerListConstant } from "../../ProjectDetails/redux/observerListAction";

const initialState = {
  isLoading: false,
  projectList: {},
  collaboratorList: [],
  minProjectCost: "",
  maxProjectCost: "",
  skip: 0,
  limit: 4,
  refreshList: false,
  refreshCost: false,
  masterData: {},
  allUsers: {},
  addingObserverLoading: false,
  observerList: {},
  observerSkip: 0,
  observerLimit: 5,
  removingObserverLoading: false,
  observerDetails: {},
  collaboratorRatting: [],
  refreshCollaboratorListing: true,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case projectListConstant.PROJECT_LIST_START: {
      return {
        ...state,
        isLoading: true,
        refreshList: false,
      };
    }
    case projectListConstant.PROJECT_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        projectList: action.payload,
        refreshCost: false,
        /* minProjectCost: "",
                maxProjectCost: "", */
      };
    }
    case projectListConstant.PROJECT_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case projectListConstant.COLLABORATOR_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case projectListConstant.COLLABORATOR_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        collaboratorList: action.payload,
      };
    }
    case projectListConstant.COLLABORATOR_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case projectListConstant.BUDGET_RANGE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case projectListConstant.BUDGET_RANGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        minProjectCost:
          action.payload != undefined ? action.payload.minProjectCost : "",
        maxProjectCost:
          action.payload != undefined ? action.payload.maxProjectCost : "",
      };
    }
    case projectListConstant.BUDGET_RANGE_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case projectListConstant.SET_PROJECT_BATCH_NUMBER: {
      return {
        ...state,
        //isLoading: false,
        skip: action.payload,
        refreshList: true,
      };
    }
    case projectListConstant.CLEAN_UP_PROJECT_LIST: {
      return {
        ...state,
        projectList: {},
        skip: 0,
      };
    }
    case projectListConstant.RESET_BATCH_NUMBER: {
      return {
        ...state,
        skip: action.payload,
      };
    }
    case projectListConstant.RESET_FILTERS: {
      return {
        ...state,
        refreshCost: true,
      };
    }
    case observerListConstant.ADD_OBSERVER_START: {
      return {
        ...state,
        addingObserverLoading: true,
      };
    }
    case observerListConstant.ADD_OBSERVER_SUCCESS: {
      return {
        ...state,
        addingObserverLoading: false,
        //observerList: state.observerList.records.concat([action.payload]),
      };
    }
    
    case observerListConstant.ADD_OBSERVER_ERROR: {
      return {
        ...state,
        addingObserverLoading: false,
      };
    }
    case observerListConstant.ADD_OBSERVER_SC_START: {
      return {
        ...state,
        addingObserverLoading: true,
      };
    }
    case observerListConstant.ADD_OBSERVER_SC_SUCCESS: {
      return {
        ...state,
        addingObserverLoading: false,
        //observerList: state.observerList.records.concat([action.payload]),
      };
    }
    case observerListConstant.UPDATE_OBSERVER_START: {
      return {
        ...state,
        addingObserverLoading: true,
        removingObserverLoading: true,
      };
    }
    case observerListConstant.UPDATE_OBSERVER_SUCCESS: {
      return {
        ...state,
        addingObserverLoading: false,
        removingObserverLoading: false,
      };
    }
    case observerListConstant.UPDATE_OBSERVER_ERROR: {
      return {
        ...state,
        addingObserverLoading: false,
        removingObserverLoading: false,
      };
    }
    case observerListConstant.MASTER_DETAILS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case observerListConstant.MASTER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        masterData: action.payload,
      };
    }
    case observerListConstant.MASTER_DETAILS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case observerListConstant.GET_ALL_USERS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case observerListConstant.GET_ALL_USERS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        allUsers: action.payload,
      };
    }
    case observerListConstant.GET_ALL_USERS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case observerListConstant.GET_OBSERVER_LIST_START: {
      return {
        ...state,
        isLoading: true,
        refreshList: false,
      };
    }
    case observerListConstant.GET_OBSERVER_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        observerList: action.payload,
      };
    }
    case observerListConstant.GET_OBSERVER_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case observerListConstant.SET_OBSERVER_BATCH_NUMBER: {
      return {
        ...state,
        observerSkip: action.payload,
        refreshList: true,
      };
    }
    case observerListConstant.REMOVE_OBSERVER_START: {
      return {
        ...state,
        removingObserverLoading: true,
        refreshList: false,
      };
    }
    case observerListConstant.REMOVE_OBSERVER_SUCCESS: {
      return {
        ...state,
        removingObserverLoading: false,
        refreshList: true,
      };
    }
    case observerListConstant.REMOVE_OBSERVER_ERROR: {
      return {
        ...state,
        removingObserverLoading: false,
      };
    }
    case observerListConstant.GET_OBSERVER_DETAILS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case observerListConstant.GET_OBSERVER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        observerDetails: action.payload,
      };
    }
    case observerListConstant.GET_OBSERVER_DETAILS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case observerListConstant.RESET_OBSERVER_DETAILS: {
      return {
        ...state,
        observerDetails: "",
      };
    }
    case observerListConstant.RESET_PAGINATION_COUNT: {
      return {
        ...state,
        observerDetails: "",
        observerSkip: action.payload,
      };
    }
    case observerListConstant.COLLABORATOR_RATING_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case observerListConstant.COLLABORATOR_RATING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        collaboratorRatting: action.payload,
        refreshCollaboratorListing: false,
      };
    }
    case observerListConstant.COLLABORATOR_RATING_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case observerListConstant.SUBMIT_COLLABORATOR_RATING_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case observerListConstant.SUBMIT_COLLABORATOR_RATING_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshCollaboratorListing: true,
      };
    }
    case observerListConstant.SUBMIT_COLLABORATOR_RATING_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    default:
      return { ...state };
  }
};

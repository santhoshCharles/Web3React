import { deliverablesMap } from "./deliverableAction";

const initialState = {
  taskList: [],
  refreshDeliverableList: true,
  deliverablesList: [],
  isLoading: false,
  skip: 0,
  limit: 5,
  collaboratorList: [],
  deliverableStatus: ""
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case deliverablesMap.GET_DELIVERABLES_TASK_DATA_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case deliverablesMap.GET_DELIVERABLES_TASK_DATA_SUCCESS: {
      return {
        ...state,
        taskList: action.payload,
        isLoading: false,
      };
    }
    case deliverablesMap.GET_DELIVERABLES_TASK_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case deliverablesMap.UPLOAD_FILE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case deliverablesMap.UPLOAD_FILE_SUCCESS: {
      return {
        ...state,

        isLoading: false,
      };
    }
    case deliverablesMap.UPLOAD_FILE_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case deliverablesMap.DELIVERABLES_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case deliverablesMap.DELIVERABLES_SUCCESS: {
      return {
        ...state,
        refreshDeliverableList: true,
        isLoading: false,
        deliverableStatus: action.payload.responseCode
      };
    }
    case deliverablesMap.DELIVERABLES_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case deliverablesMap.GET_DELIVERABLES_LIST_DATA_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case deliverablesMap.GET_DELIVERABLES_LIST_DATA_SUCCESS: {
      return {
        ...state,
        deliverablesList: action.payload,
        isLoading: false,
        refreshDeliverableList: false,
      };
    }
    case deliverablesMap.GET_DELIVERABLES_LIST_DATA_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case deliverablesMap.SET_BATCH_NUMBER: {
      return {
        ...state,
        //isLoading: false,
        skip: action.payload,
        refreshDeliverableList: true,
      };
    }
    case deliverablesMap.GET_PACKAGE_COLLABORATOR_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case deliverablesMap.GET_PACKAGE_COLLABORATOR_SUCCESS: {
      return {
        ...state,
        collaboratorList: action.payload,
        isLoading: false,
      };
    }
    case deliverablesMap.GET_PACKAGE_COLLABORATOR_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case deliverablesMap.RESET_DELIVER_RESPONSE_CODE: {
      return {
        ...state,
        deliverableStatus: "",
      };
    }
    default:
      return { ...state };
  }
};

import { PaymentDashboardMap } from "./paymentDashboardAction";

const initialState = {
  currentWorkTask: {},
  transactionHistory: {},
  isLoading: false,
  worktaskSkip: 0,
  workTasksLimit: 5,
  transactionSkip: 0,
  transactionLimit: 5,
  currentWorkTaskInitiator: [],
  deliveredWorkTask: [],
  refreshTransactions: false,
  refreshWorkTasks: false,
  worktaskSkipIn: 0,
  workTasksLimitIn: 5,
  refreshWorkTasksIn: false,
  deliveredworktaskSkipIn: 0,
  deliveredworkTasksLimitIn: 5,
  refreshDeliveredWorkTasksIn: false
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PaymentDashboardMap.GET_CURRENT_WORKTASK_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PaymentDashboardMap.GET_CURRENT_WORKTASK_SUCCESS: {
      return {
        ...state,
        currentWorkTask: action.payload,
        isLoading: false,
        refreshWorkTasks: false
      };
    }
    case PaymentDashboardMap.GET_CURRENT_WORKTASK_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshWorkTasks: false
      };
    }

    case PaymentDashboardMap.GET_TRANSACTION_HISTORY_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PaymentDashboardMap.GET_TRANSACTION_HISTORY_SUCCESS: {
      return {
        ...state,
        transactionHistory: action.payload,
        isLoading: false,
        refreshTransactions: false
      };
    }
    case PaymentDashboardMap.GET_TRANSACTION_HISTORY_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshTransactions: false
      };
    }
    case PaymentDashboardMap.SET_WORKTASK_BATCH_NUMBER: {
      console.log("limit", action.payload)
      return {
        ...state,
        workTasksLimit: action.payload,
        refreshWorkTasks: true
      };
    }
    case PaymentDashboardMap.SET_WORKTASK_IN_BATCH_NUMBER: {
      console.log("limit", action.payload)
      return {
        ...state,
        workTasksLimitIn: action.payload,
        refreshWorkTasksIn: true
      };
    }
    case PaymentDashboardMap.SET_TRANSACTION_BATCH_NUMBER: {
      return {
        ...state,
        transactionLimit: action.payload,
        refreshTransactions: true
      };
    }

    case PaymentDashboardMap.GET_CURRENT_WORKTASK_INITIATOR_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PaymentDashboardMap.GET_CURRENT_WORKTASK_INITIATOR_SUCCESS: {
      return {
        ...state,
        currentWorkTaskInitiator: action.payload,
        isLoading: false,
        refreshWorkTasksIn: false
      };
    }
    case PaymentDashboardMap.GET_CURRENT_WORKTASK_INITIATOR_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshWorkTasksIn: false
      };
    }

    case PaymentDashboardMap.GET_DELIVERED_WORKTASK_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PaymentDashboardMap.GET_DELIVERED_WORKTASK_SUCCESS: {
      return {
        ...state,
        deliveredWorkTask: action.payload,
        isLoading: false,
        refreshDeliveredWorkTasksIn: false
      };
    }
    case PaymentDashboardMap.GET_DELIVERED_WORKTASK_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshDeliveredWorkTasksIn: false
      };
    }
    case PaymentDashboardMap.SET_DELIVERED_WORKTASK_IN_BATCH_NUMBER: {
      return {
        ...state,
        deliveredworkTasksLimitIn: action.payload,
        refreshDeliveredWorkTasksIn: true
      };
    }
    default:
      return { ...state };
  }
};

export const PaymentDashboardMap = {
  GET_CURRENT_WORKTASK_START: "GET_CURRENT_WORKTASK_START",
  GET_CURRENT_WORKTASK_SUCCESS: "GET_CURRENT_WORKTASK_SUCCESS",
  GET_CURRENT_WORKTASK_ERROR: "GET_CURRENT_WORKTASK_ERROR",
  GET_TRANSACTION_HISTORY_START: "GET_TRANSACTION_HISTORY_START",
  GET_TRANSACTION_HISTORY_SUCCESS: "GET_TRANSACTION_HISTORY_SUCCESS",
  GET_TRANSACTION_HISTORY_ERROR: "GET_TRANSACTION_HISTORY_ERROR",
  SET_WORKTASK_BATCH_NUMBER: "SET_WORKTASK_BATCH_NUMBER",
  SET_WORKTASK_IN_BATCH_NUMBER: "SET_WORKTASK_IN_BATCH_NUMBER",
  SET_TRANSACTION_BATCH_NUMBER: "SET_TRANSACTION_BATCH_NUMBER",

  GET_CURRENT_WORKTASK_INITIATOR_START: "GET_CURRENT_WORKTASK_INITIATOR_START",
  GET_CURRENT_WORKTASK_INITIATOR_SUCCESS: "GET_CURRENT_WORKTASK_INITIATOR_SUCCESS",
  GET_CURRENT_WORKTASK_INITIATOR_ERROR: "GET_CURRENT_WORKTASK_INITIATOR_ERROR",

  GET_DELIVERED_WORKTASK_START: "GET_DELIVERED_WORKTASK_START",
  GET_DELIVERED_WORKTASK_SUCCESS: "GET_DELIVERED_WORKTASK_SUCCESS",
  GET_DELIVERED_WORKTASK_ERROR: "GET_DELIVERED_WORKTASK_ERROR",

  SET_DELIVERED_WORKTASK_IN_BATCH_NUMBER: "SET_DELIVERED_WORKTASK_IN_BATCH_NUMBER"
};

export const PaymentDashboardActions = {
  getCurrentWorkTaskStart: (data) => ({
    type: PaymentDashboardMap.GET_CURRENT_WORKTASK_START,
    payload: data,
  }),
  getCurrentWorkTaskSuccess: (data) => ({
    type: PaymentDashboardMap.GET_CURRENT_WORKTASK_SUCCESS,
    payload: data,
  }),

  getCurrentWorkTaskError: (data) => ({
    type: PaymentDashboardMap.GET_CURRENT_WORKTASK_ERROR,
    payload: data,
  }),

  getTransactionHistoryStart: (data) => ({
    type: PaymentDashboardMap.GET_TRANSACTION_HISTORY_START,
    payload: data,
  }),
  getTransactionHistorySuccess: (data) => ({
    type: PaymentDashboardMap.GET_TRANSACTION_HISTORY_SUCCESS,
    payload: data,
  }),

  getTransactionHistoryError: (data) => ({
    type: PaymentDashboardMap.GET_TRANSACTION_HISTORY_ERROR,
    payload: data,
  }),
  setWorkTaskBatchNumber: (data) => ({
    type: PaymentDashboardMap.SET_WORKTASK_BATCH_NUMBER,
    payload: data,
  }),
  setWorkTaskBatchNumberIn: (data) => ({
    type: PaymentDashboardMap.SET_WORKTASK_IN_BATCH_NUMBER,
    payload: data,
  }),
  setTransactionBatchNumber: (data) => ({
    type: PaymentDashboardMap.SET_TRANSACTION_BATCH_NUMBER,
    payload: data,
  }),
  setDeliveredWorkTaskBatchNumberIn: (data) => ({
    type: PaymentDashboardMap.SET_DELIVERED_WORKTASK_IN_BATCH_NUMBER,
    payload: data,
  }),

  getCurrentWorkTaskInitiatorStart: (data) => ({
    type: PaymentDashboardMap.GET_CURRENT_WORKTASK_INITIATOR_START,
    payload: data,
  }),
  getCurrentWorkTaskInitiatorSuccess: (data) => ({
    type: PaymentDashboardMap.GET_CURRENT_WORKTASK_INITIATOR_SUCCESS,
    payload: data,
  }),

  getCurrentWorkTaskInitiatorError: (data) => ({
    type: PaymentDashboardMap.GET_CURRENT_WORKTASK_INITIATOR_ERROR,
    payload: data,
  }),

  getDeliveredWorkTaskStart: (data) => ({
    type: PaymentDashboardMap.GET_DELIVERED_WORKTASK_START,
    payload: data,
  }),
  getDeliveredWorkTaskSuccess: (data) => ({
    type: PaymentDashboardMap.GET_DELIVERED_WORKTASK_SUCCESS,
    payload: data,
  }),

  getDeliveredWorkTaskError: (data) => ({
    type: PaymentDashboardMap.GET_DELIVERED_WORKTASK_ERROR,
    payload: data,
  }),
};

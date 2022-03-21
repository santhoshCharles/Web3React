export const observerListConstant = {
  ADD_OBSERVER_START: "ADD_OBSERVER_START",
  ADD_OBSERVER_SUCCESS: "ADD_OBSERVER_SUCCESS",
  ADD_OBSERVER_ERROR: "ADD_OBSERVER_ERROR",
  ADD_OBSERVER_SC_START: "ADD_OBSERVER_SC_START",
  ADD_OBSERVER_SC_SUCCESS: "ADD_OBSERVER_SC_SUCCESS",
  UPDATE_OBSERVER_START: "UPDATE_OBSERVER_START",
  UPDATE_OBSERVER_SUCCESS: "UPDATE_OBSERVER_SUCCESS",
  UPDATE_OBSERVER_ERROR: "UPDATE_OBSERVER_ERROR",
  MASTER_DETAILS_START: "MASTER_DETAILS_START",
  MASTER_DETAILS_SUCCESS: "MASTER_DETAILS_SUCCESS",
  MASTER_DETAILS_ERROR: "MASTER_DETAILS_ERROR",
  GET_ALL_USERS_START: "GET_ALL_USERS_START",
  GET_ALL_USERS_SUCCESS: "GET_ALL_USERS_SUCCESS",
  GET_ALL_USERS_ERROR: "GET_ALL_USERS_ERROR",
  GET_OBSERVER_LIST_START: "GET_OBSERVER_LIST_START",
  GET_OBSERVER_LIST_SUCCESS: "GET_OBSERVER_LIST_SUCCESS",
  GET_OBSERVER_LIST_ERROR: "GET_OBSERVER_LIST_ERROR",
  SET_OBSERVER_BATCH_NUMBER: "SET_OBSERVER_BATCH_NUMBER",
  REMOVE_OBSERVER_START: "REMOVE_OBSERVER_START",
  REMOVE_OBSERVER_SUCCESS: "REMOVE_OBSERVER_SUCCESS",
  REMOVE_OBSERVER_ERROR: "REMOVE_OBSERVER_ERROR",
  GET_OBSERVER_DETAILS_START: "GET_OBSERVER_DETAILS_START",
  GET_OBSERVER_DETAILS_SUCCESS: "GET_OBSERVER_DETAILS_SUCCESS",
  GET_OBSERVER_DETAILS_ERROR: "GET_OBSERVER_DETAILS_ERROR",
  RESET_OBSERVER_DETAILS: "RESET_OBSERVER_DETAILS",
  RESET_PAGINATION_COUNT: "RESET_PAGINATION_COUNT",
  COLLABORATOR_RATING_START: "COLLABORATOR_RATING_START",
  COLLABORATOR_RATING_SUCCESS: "COLLABORATOR_RATING_SUCCESS",
  COLLABORATOR_RATING_ERROR: "COLLABORATOR_RATING_ERROR",
  SUBMIT_COLLABORATOR_RATING_START: "SUBMIT_COLLABORATOR_RATING_START",
  SUBMIT_COLLABORATOR_RATING_SUCCESS: "SUBMIT_COLLABORATOR_RATING_SUCCESS",
  SUBMIT_COLLABORATOR_RATING_ERROR: "SUBMIT_COLLABORATOR_RATING_ERROR",
};

export const observerListActions = {
  addObserverStart: (data) => ({
    type: observerListConstant.ADD_OBSERVER_START,
    payload: data,
  }),
  addObserverSuccess: (data) => ({
    type: observerListConstant.ADD_OBSERVER_SUCCESS,
    payload: data,
  }),
  addObserverError: (errors) => ({
    type: observerListConstant.ADD_OBSERVER_ERROR,
    payload: { errors },
  }),

  addObserverSCStart: (data) => ({
    type: observerListConstant.ADD_OBSERVER_SC_START,
    payload: data,
  }),
  addObserverSCSuccess: (data) => ({
    type: observerListConstant.ADD_OBSERVER_SC_SUCCESS,
    payload: data,
  }),

  updateObserverStart: (data) => ({
    type: observerListConstant.UPDATE_OBSERVER_START,
    payload: data,
  }),
  updateObserverSuccess: (data) => ({
    type: observerListConstant.UPDATE_OBSERVER_SUCCESS,
    payload: data,
  }),
  updateObserverError: (errors) => ({
    type: observerListConstant.UPDATE_OBSERVER_ERROR,
    payload: { errors },
  }),

  masterDetailsStart: (data) => ({
    type: observerListConstant.MASTER_DETAILS_START,
    payload: data,
  }),
  masterDetailsSuccess: (data) => ({
    type: observerListConstant.MASTER_DETAILS_SUCCESS,
    payload: data,
  }),
  masterDetailsError: (errors) => ({
    type: observerListConstant.MASTER_DETAILS_ERROR,
    payload: { errors },
  }),

  getAllUsersStart: (data) => ({
    type: observerListConstant.GET_ALL_USERS_START,
    payload: data,
  }),
  getAllUsersSuccess: (data) => ({
    type: observerListConstant.GET_ALL_USERS_SUCCESS,
    payload: data,
  }),
  getAllUsersError: (errors) => ({
    type: observerListConstant.GET_ALL_USERS_ERROR,
    payload: { errors },
  }),

  getObserverListStart: (data) => ({
    type: observerListConstant.GET_OBSERVER_LIST_START,
    payload: data,
  }),
  getObserverListSuccess: (data) => ({
    type: observerListConstant.GET_OBSERVER_LIST_SUCCESS,
    payload: data,
  }),
  getObserverListError: (errors) => ({
    type: observerListConstant.GET_OBSERVER_LIST_ERROR,
    payload: { errors },
  }),

  setObserverBatchNumber: (data) => ({
    type: observerListConstant.SET_OBSERVER_BATCH_NUMBER,
    payload: data,
  }),

  removeObserverStart: (data) => ({
    type: observerListConstant.REMOVE_OBSERVER_START,
    payload: data,
  }),
  removeObserverSuccess: (data) => ({
    type: observerListConstant.REMOVE_OBSERVER_SUCCESS,
    payload: data,
  }),
  removeObserverError: (errors) => ({
    type: observerListConstant.REMOVE_OBSERVER_ERROR,
    payload: { errors },
  }),

  getObserverDetailsStart: (data) => ({
    type: observerListConstant.GET_OBSERVER_DETAILS_START,
    payload: data,
  }),
  getObserverDetailsSuccess: (data) => ({
    type: observerListConstant.GET_OBSERVER_DETAILS_SUCCESS,
    payload: data,
  }),
  getObserverDetailsError: (errors) => ({
    type: observerListConstant.GET_OBSERVER_DETAILS_ERROR,
    payload: { errors },
  }),

  resetObserverDetails: (data) => ({
    type: observerListConstant.RESET_OBSERVER_DETAILS,
    payload: data,
  }),
  resetPaginationCount: (data) => ({
    type: observerListConstant.RESET_PAGINATION_COUNT,
    payload: data,
  }),

  collaboratorRatingStart: (data) => ({
    type: observerListConstant.COLLABORATOR_RATING_START,
    payload: data,
  }),
  collaboratorRatingSuccess: (data) => ({
    type: observerListConstant.COLLABORATOR_RATING_SUCCESS,
    payload: data,
  }),
  collaboratorRatingError: (data) => ({
    type: observerListConstant.COLLABORATOR_RATING_ERROR,
    payload: data,
  }),

  submitCollaboratorRatingStart: (data) => ({
    type: observerListConstant.SUBMIT_COLLABORATOR_RATING_START,
    payload: data,
  }),
  submitCollaboratorRatingSuccess: (data) => ({
    type: observerListConstant.SUBMIT_COLLABORATOR_RATING_SUCCESS,
    payload: data,
  }),
  submitCollaboratorRatingError: (data) => ({
    type: observerListConstant.SUBMIT_COLLABORATOR_RATING_ERROR,
    payload: data,
  }),
};

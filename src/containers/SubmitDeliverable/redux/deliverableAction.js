export const deliverablesMap = {
  GET_DELIVERABLES_TASK_DATA_START: "GET_DELIVERABLES_TASK_DATA_START",
  GET_DELIVERABLES_TASK_DATA_SUCCESS: "GET_DELIVERABLES_TASK_DATA_SUCCESS",
  GET_DELIVERABLES_TASK_DATA_ERROR: "GET_DELIVERABLES_TASK_DATA_ERROR",
  UPLOAD_FILE_START: "UPLOAD_FILE_START",
  UPLOAD_FILE_SUCCESS: "UPLOAD_FILE_SUCCESS",
  UPLOAD_FILE_ERROR: "UPLOAD_FILE_ERROR",
  DELIVERABLES_START: "DELIVERABLES_START",
  DELIVERABLES_SUCCESS: "DELIVERABLES_SUCCESS",
  DELIVERABLES_ERROR: "DELIVERABLES_ERROR",
  GET_DELIVERABLES_LIST_DATA_START: "GET_DELIVERABLES_LIST_DATA_START",
  GET_DELIVERABLES_LIST_DATA_SUCCESS: "GET_DELIVERABLES_LIST_DATA_SUCCESS",
  GET_DELIVERABLES_LIST_DATA_ERROR: "GET_DELIVERABLES_LIST_DATA_ERROR",
  SET_BATCH_NUMBER: "SET_BATCH_NUMBER",
  GET_PACKAGE_COLLABORATOR_START: "GET_PACKAGE_COLLABORATOR_START",
  GET_PACKAGE_COLLABORATOR_SUCCESS: "GET_PACKAGE_COLLABORATOR_SUCCESS",
  GET_PACKAGE_COLLABORATOR_ERROR: "GET_PACKAGE_COLLABORATOR_ERROR",
  RESET_DELIVER_RESPONSE_CODE: "RESET_DELIVER_RESPONSE_CODE"
};

export const deliverableActions = {
  getDeliverableTaskDataStart: (data) => ({
    type: deliverablesMap.GET_DELIVERABLES_TASK_DATA_START,
    payload: data,
  }),
  getDeliverableTaskDataSuccess: (data) => ({
    type: deliverablesMap.GET_DELIVERABLES_TASK_DATA_SUCCESS,
    payload: data,
  }),
  getDeliverableTaskDataError: (data) => ({
    type: deliverablesMap.GET_DELIVERABLES_TASK_DATA_ERROR,
    payload: data,
  }),

  getDeliverableListDataStart: (data) => ({
    type: deliverablesMap.GET_DELIVERABLES_LIST_DATA_START,
    payload: data,
  }),
  getDeliverableListDataSuccess: (data) => ({
    type: deliverablesMap.GET_DELIVERABLES_LIST_DATA_SUCCESS,
    payload: data,
  }),
  getDeliverableListDataError: (data) => ({
    type: deliverablesMap.GET_DELIVERABLES_LIST_DATA_ERROR,
    payload: data,
  }),

  uploadFileStart: (data) => ({
    type: deliverablesMap.UPLOAD_FILE_START,
    payload: data,
  }),
  uploadFileSuccess: (data) => ({
    type: deliverablesMap.UPLOAD_FILE_SUCCESS,
    payload: data,
  }),
  uploadFileError: (data) => ({
    type: deliverablesMap.UPLOAD_FILE_ERROR,
    payload: data,
  }),
  deliverablesStart: (data) => ({
    type: deliverablesMap.DELIVERABLES_START,
    payload: data,
  }),
  deliverablesSuccess: (data) => ({
    type: deliverablesMap.DELIVERABLES_SUCCESS,
    payload: data,
  }),
  deliverablesError: (data) => ({
    type: deliverablesMap.DELIVERABLES_ERROR,
    payload: data,
  }),
  setBatchNumber: (data) => ({
    type: deliverablesMap.SET_BATCH_NUMBER,
    payload: data,
  }),
  getPackageCollaboratorStart: (data) => ({
    type: deliverablesMap.GET_PACKAGE_COLLABORATOR_START,
    payload: data,
  }),
  getPackageCollaboratorSuccess: (data) => ({
    type: deliverablesMap.GET_PACKAGE_COLLABORATOR_SUCCESS,
    payload: data,
  }),
  getPackageCollaboratorError: (data) => ({
    type: deliverablesMap.GET_PACKAGE_COLLABORATOR_ERROR,
    payload: data,
  }),
};

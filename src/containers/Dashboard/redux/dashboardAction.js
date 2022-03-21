export const dashboardMap = {
  GET_AWAITING_APPROVAL_START: "GET_AWAITING_APPROVAL_START",
  GET_AWAITING_APPROVAL_SUCCESS: "GET_AWAITING_APPROVAL_SUCCESS",
  GET_AWAITING_APPROVAL_ERROR: "GET_AWAITING_APPROVAL_ERROR",

  GET_OPEN_PROJECT_START: "GET_OPEN_PROJECT_START",
  GET_OPEN_PROJECT_SUCCESS: "GET_OPEN_PROJECT_SUCCESS",
  GET_OPEN_PROJECT_ERROR: "GET_OPEN_PROJECT_ERROR",

  GET_ALL_PACKAGES_REQUEST_RECEIVED_START:
    "GET_ALL_PACKAGES_REQUEST_RECEIVED_START",
  GET_ALL_PACKAGES_REQUEST_RECEIVED_SUCCESS:
    "GET_ALL_PACKAGES_REQUEST_RECEIVED_SUCCESS",
  GET_ALL_PACKAGES_REQUEST_RECEIVED_ERROR:
    "GET_ALL_PACKAGES_REQUEST_RECEIVED_ERROR",

    GET_ALL_PACKAGES_INPROGRESS_START:
    "GET_ALL_PACKAGES_INPROGRESS_START",
    GET_ALL_PACKAGES_INPROGRESS_SUCCESS:
    "GET_ALL_PACKAGES_INPROGRESS_SUCCESS",
    GET_ALL_PACKAGES_INPROGRESS_ERROR:
    "GET_ALL_PACKAGES_INPROGRESS_ERROR",

    GET_ALL_PACKAGES_SUBMITTED_START:
    "GET_ALL_PACKAGES_SUBMITTED_START",
    GET_ALL_PACKAGES_SUBMITTED_SUCCESS:
    "GET_ALL_PACKAGES_SUBMITTED_SUCCESS",
    GET_ALL_PACKAGES_SUBMITTED_ERROR:
    "GET_ALL_PACKAGES_SUBMITTED_ERROR",

    GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_START:
    "GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_START",
  GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_SUCCESS:
    "GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_SUCCESS",
  GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_ERROR:
    "GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_ERROR",

    GET_ALL_PACKAGES_EXPIRED_START:
    "GET_ALL_PACKAGES_EXPIRED_START",
    GET_ALL_PACKAGES_EXPIRED_SUCCESS:
    "GET_ALL_PACKAGES_EXPIRED_SUCCESS",
    GET_ALL_PACKAGES_EXPIRED_ERROR:
    "GET_ALL_PACKAGES_EXPIRED_ERROR",

  GET_ALL_USER_REQUEST_RECEIVED_START: "GET_ALL_USER_REQUEST_RECEIVED_START",
  GET_ALL_USER_REQUEST_RECEIVED_SUCCESS:
    "GET_ALL_USER_REQUEST_RECEIVED_SUCCESS",
  GET_ALL_USER_REQUEST_RECEIVED_ERROR: "GET_ALL_USER_REQUEST_RECEIVED_ERROR",

  ACCEPT_REJECT_REQUEST_START: "ACCEPT_REJECT_REQUEST_START",
  ACCEPT_REJECT_REQUEST_SUCCESS: "ACCEPT_REJECT_REQUEST_SUCCESS",
  ACCEPT_REJECT_REQUEST_ERROR: "ACCEPT_REJECT_REQUEST_ERROR",

  ACCEPT_REJECT_REQUEST_SC_START: "ACCEPT_REJECT_REQUEST_SC_START",
  ACCEPT_REJECT_REQUEST_SC_SUCCESS: "ACCEPT_REJECT_REQUEST_SC_SUCCESS",

  SET_AWAITING_APPROVAL_BATCH_NUMBER: "SET_AWAITING_APPROVAL_BATCH_NUMBER",
  SET_PACKAGE_BATCH_NUMBER: "SET_PACKAGE_BATCH_NUMBER",

  SET_USER_REQUEST_BATCH_NUMBER: "SET_USER_REQUEST_BATCH_NUMBER",

  GET_APPLICANT_PROFILE_START: "GET_APPLICANT_PROFILE_START",
  GET_APPLICANT_PROFILE_SUCCESS: "GET_APPLICANT_PROFILE_SUCCESS",
  GET_APPLICANT_PROFILE_ERROR: "GET_APPLICANT_PROFILE_ERROR",
  SET_PROJECT_BATCH_NUMBER: "SET_PROJECT_BATCH_NUMBER",

  GET_OPEN_PROJECT_COL_START: "GET_OPEN_PROJECT_COL_START",
  GET_OPEN_PROJECT_COL_SUCCESS: "GET_OPEN_PROJECT_COL_SUCCESS",
  GET_OPEN_PROJECT_COL_ERROR: "GET_OPEN_PROJECT_COL_ERROR",
  SET_PROJECT_COL_BATCH_NUMBER: "SET_PROJECT_COL_BATCH_NUMBER",

  GET_COMPLETED_PROJECT_START: "GET_COMPLETED_PROJECT_START",
  GET_COMPLETED_PROJECT_SUCCESS: "GET_COMPLETED_PROJECT_SUCCESS",
  GET_COMPLETED_PROJECT_ERROR: "GET_COMPLETED_PROJECT_ERROR",

  SET_COMPLETED_PROJECT_BATCH_NUMBER: "SET_COMPLETED_PROJECT_BATCH_NUMBER",

  GET_DELIVERED_PROJECT_START: "GET_DELIVERED_PROJECT_START",
  GET_DELIVERED_PROJECT_SUCCESS: "GET_DELIVERED_PROJECT_SUCCESS",
  GET_DELIVERED_PROJECT_ERROR: "GET_DELIVERED_PROJECT_ERROR",

  DELIVERED_PROJECT_BATCH_NUMBER: "DELIVERED_PROJECT_BATCH_NUMBER",

  GET_EXPIRED_PROJECT_START: "GET_EXPIRED_PROJECT_START",
  GET_EXPIRED_PROJECT_SUCCESS: "GET_EXPIRED_PROJECT_SUCCESS",
  GET_EXPIRED_PROJECT_ERROR: "GET_EXPIRED_PROJECT_ERROR",

  EXPIRED_PROJECT_BATCH_NUMBER: "EXPIRED_PROJECT_BATCH_NUMBER",
};

export const dashboardActions = {
  getAwaitingApprovalStart: (data) => ({
    type: dashboardMap.GET_AWAITING_APPROVAL_START,
    payload: data,
  }),
  getAwaitingApprovalSuccess: (data) => ({
    type: dashboardMap.GET_AWAITING_APPROVAL_SUCCESS,
    payload: data,
  }),
  getAwaitingApprovalError: (data) => ({
    type: dashboardMap.GET_AWAITING_APPROVAL_ERROR,
    payload: data,
  }),

  getAllPackagesRequestReceivedStart: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_START,
    payload: data,
  }),
  getAllPackagesRequestReceivedSuccess: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_SUCCESS,
    payload: data,
  }),
  getAllPackagesRequestReceivedError: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_ERROR,
    payload: data,
  }),

  getAllPackagesRequestReceivedColStart: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_START,
    payload: data,
  }),
  getAllPackagesRequestReceivedColSuccess: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_SUCCESS,
    payload: data,
  }),
  getAllPackagesRequestReceivedColError: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_ERROR,
    payload: data,
  }),

  getAllUserRequestReceivedStart: (data) => ({
    type: dashboardMap.GET_ALL_USER_REQUEST_RECEIVED_START,
    payload: data,
  }),
  getAllUserRequestReceivedSuccess: (data) => ({
    type: dashboardMap.GET_ALL_USER_REQUEST_RECEIVED_SUCCESS,
    payload: data,
  }),
  getAllUserRequestReceivedError: (data) => ({
    type: dashboardMap.GET_ALL_USER_REQUEST_RECEIVED_ERROR,
    payload: data,
  }),

  acceptRejectRequestStart: (data) => ({
    type: dashboardMap.ACCEPT_REJECT_REQUEST_START,
    payload: data,
  }),
  acceptRejectRequestSuccess: (data) => ({
    type: dashboardMap.ACCEPT_REJECT_REQUEST_SUCCESS,
    payload: data,
  }),
  acceptRejectRequestError: (data) => ({
    type: dashboardMap.ACCEPT_REJECT_REQUEST_ERROR,
    payload: data,
  }),
  acceptRejectRequestSCStart: (data) => ({
    type: dashboardMap.ACCEPT_REJECT_REQUEST_SC_START,
    payload: data,
  }),
  acceptRejectRequestSCSuccess: (data) => ({
    type: dashboardMap.ACCEPT_REJECT_REQUEST_SC_SUCCESS,
    payload: data,
  }),

  setAwaitingApprovalBatchNumber: (data) => ({
    type: dashboardMap.SET_AWAITING_APPROVAL_BATCH_NUMBER,
    payload: data,
  }),

  setPackageBatchNumber: (data) => ({
    type: dashboardMap.SET_PACKAGE_BATCH_NUMBER,
    payload: data,
  }),

  setUserRequestBatchNumber: (data) => ({
    type: dashboardMap.SET_USER_REQUEST_BATCH_NUMBER,
    payload: data,
  }),

  setProjectBatchNumber: (data) => ({
    type: dashboardMap.SET_PROJECT_BATCH_NUMBER,
    payload: data,
  }),

  setProjectColBatchNumber: (data) => ({
    type: dashboardMap.SET_PROJECT_BATCH_NUMBER,
    payload: data,
  }),

  getApplicantProfileStart: (data) => ({
    type: dashboardMap.GET_APPLICANT_PROFILE_START,
    payload: data,
  }),
  getApplicantProfileSuccess: (data) => ({
    type: dashboardMap.GET_APPLICANT_PROFILE_SUCCESS,
    payload: data,
  }),
  getApplicantProfileError: (data) => ({
    type: dashboardMap.GET_APPLICANT_PROFILE_ERROR,
    payload: data,
  }),

  getOpenProjectsStart: (data) => ({
    type: dashboardMap.GET_OPEN_PROJECT_START,
    payload: data,
  }),
  getOpenProjectsSuccess: (data, mode) => ({
    type: dashboardMap.GET_OPEN_PROJECT_SUCCESS,
    payload: data,
    mode: mode,
  }),
  getOpenProjectsError: (data) => ({
    type: dashboardMap.GET_OPEN_PROJECT_ERROR,
    payload: data,
  }),

  getOpenProjectsColStart: (data) => ({
    type: dashboardMap.GET_OPEN_PROJECT_COL_START,
    payload: data,
  }),
  getOpenProjectsColSuccess: (data, mode) => ({
    type: dashboardMap.GET_OPEN_PROJECT_COL_SUCCESS,
    payload: data,
    mode: mode,
  }),
  getOpenProjectsColError: (data) => ({
    type: dashboardMap.GET_OPEN_PROJECT_COL_ERROR,
    payload: data,
  }),

  getCompletedProjectsStart: (data) => ({
    type: dashboardMap.GET_COMPLETED_PROJECT_START,
    payload: data,
  }),
  getCompletedProjectsSuccess: (data) => ({
    type: dashboardMap.GET_COMPLETED_PROJECT_SUCCESS,
    payload: data,
  }),
  getCompletedProjectsError: (data) => ({
    type: dashboardMap.GET_COMPLETED_PROJECT_ERROR,
    payload: data,
  }),

  setCompletedProjectBatch: (data) => ({
    type: dashboardMap.SET_COMPLETED_PROJECT_BATCH_NUMBER,
    payload: data,
  }),

  getDeliveredProjectsStart: (data) => ({
    type: dashboardMap.GET_DELIVERED_PROJECT_START,
    payload: data,
  }),
  getDeliveredProjectSuccess: (data) => ({
    type: dashboardMap.GET_DELIVERED_PROJECT_SUCCESS,
    payload: data,
  }),
  getDeliveredProjectError: (data) => ({
    type: dashboardMap.GET_DELIVERED_PROJECT_ERROR,
    payload: data,
  }),

  setDeliveredProjectBatchNumber: (data) => ({
    type: dashboardMap.DELIVERED_PROJECT_BATCH_NUMBER,
    payload: data,
  }),

  getExpiredProjectsStart: (data) => ({
    type: dashboardMap.GET_EXPIRED_PROJECT_START,
    payload: data,
  }),
  getExpiredProjectSuccess: (data) => ({
    type: dashboardMap.GET_EXPIRED_PROJECT_SUCCESS,
    payload: data,
  }),
  getExpiredProjectError: (data) => ({
    type: dashboardMap.GET_EXPIRED_PROJECT_ERROR,
    payload: data,
  }),

  setExpiredProjectBatchNumber: (data) => ({
    type: dashboardMap.EXPIRED_PROJECT_BATCH_NUMBER,
    payload: data,
  }),

  getAllInProgressProjectsColStart: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_INPROGRESS_START,
    payload: data,
  }),
  getAllInProgressProjectsColSuccess: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_INPROGRESS_SUCCESS,
    payload: data,
  }),
  getAllInProgressProjectsColError: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_INPROGRESS_ERROR,
    payload: data,
  }),

  getAllSubmittedProjectsColStart: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_SUBMITTED_START,
    payload: data,
  }),
  getAllSubmittedProjectsColSuccess: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_SUBMITTED_SUCCESS,
    payload: data,
  }),
  getAllSubmittedProjectsColError: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_SUBMITTED_ERROR,
    payload: data,
  }),

  getAllExpiredProjectsColStart: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_EXPIRED_START,
    payload: data,
  }),
  getAllExpiredProjectsColSuccess: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_EXPIRED_SUCCESS,
    payload: data,
  }),
  getAllExpiredProjectsColError: (data) => ({
    type: dashboardMap.GET_ALL_PACKAGES_EXPIRED_ERROR,
    payload: data,
  }),
};

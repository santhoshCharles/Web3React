export const PackageMap = {
  GET_PACKAGE_DETAIL_START: "GET_PACKAGE_DETAIL_START",
  GET_PACKAGE_DETAIL_SUCCESS: "GET_PACKAGE_DETAIL_SUCCESS",
  GET_PACKAGE_DETAIL_ERROR: "GET_PACKAGE_DETAIL_ERROR",

  JOIN_PACKAGE_START: "JOIN_PACKAGE_START",
  JOIN_PACKAGE_SUCCESS: "JOIN_PACKAGE_SUCCESS",
  JOIN_PACKAGE_ERROR: "JOIN_PACKAGE_ERROR",

  RESET_JOIN_PACKAGE_FLAG: "RESET_JOIN_PACKAGE_FLAG",

  WORK_PACKAGE_START: "WORK_PACKAGE_START",
  WORK_PACKAGE_SUCCESS: "WORK_PACKAGE_SUCCESS",
  WORK_PACKAGE_ERROR: "WORK_PACKAGE_ERROR",

  WORK_PACKAGE_SUBMIT_START: "WORK_PACKAGE_SUBMIT_START",
  WORK_PACKAGE_SUBMIT_SUCCESS: "WORK_PACKAGE_SUBMIT_SUCCESS",
  WORK_PACKAGE_SUBMIT_ERROR: "WORK_PACKAGE_SUBMIT_ERROR",

  WITHDRAW_PACKAGE_START: "WITHDRAW_PACKAGE_START",
  WITHDRAW_PACKAGE_SUCCESS: "WITHDRAW_PACKAGE_SUCCESS",
  WITHDRAW_PACKAGE_ERROR: "WITHDRAW_PACKAGE_ERROR", 

  FINISH_PACKAGE_START: "FINISH_PACKAGE_START",
  FINISH_PACKAGE_SUCCESS: "FINISH_PACKAGE_SUCCESS",
  FINISH_PACKAGE_ERROR: "FINISH_PACKAGE_ERROR",

  FINISH_PACKAGE_SC_START: "FINISH_PACKAGE_SC_START",
  FINISH_PACKAGE_SC_SUCCESS: "FINISH_PACKAGE_SC_SUCCESS",

  RESET_JOIN_PACKAGE_INFO: "RESET_JOIN_PACKAGE_INFO"
  
};

export const PackageActions = {
  getProjectDetailStart: (data) => ({
    type: PackageMap.GET_PACKAGE_DETAIL_START,
    payload: data,
  }),
  getProjectDetailSuccess: (data) => ({
    type: PackageMap.GET_PACKAGE_DETAIL_SUCCESS,
    payload: data,
  }),

  getProjectDetailError: (data) => ({
    type: PackageMap.GET_PACKAGE_DETAIL_ERROR,
    payload: data,
  }),

  joinPackageStart: (data) => ({
    type: PackageMap.JOIN_PACKAGE_START,
    payload: data,
  }),
  joinPackageSuccess: (data) => ({
    type: PackageMap.JOIN_PACKAGE_SUCCESS,
    payload: data,
  }),

  joinPackageError: (data) => ({
    type: PackageMap.JOIN_PACKAGE_ERROR,
    payload: data,
  }),

  resetJoinPackageFlag: (data) => ({
    type: PackageMap.RESET_JOIN_PACKAGE_FLAG,
    payload: data,
  }),

  workPackageStart: (data) => ({
    type: PackageMap.WORK_PACKAGE_START,
    payload: data,
  }),
  workPackageSuccess: (data) => ({
    type: PackageMap.WORK_PACKAGE_SUCCESS,
    payload: data,
  }),
  workPackageError: (data) => ({
    type: PackageMap.WORK_PACKAGE_ERROR,
    payload: data,
  }),

  workPackageSubmitStart: (data) => ({
    type: PackageMap.WORK_PACKAGE_SUBMIT_START,
    payload: data,
  }),
  workPackageSubmitSuccess: (data) => ({
    type: PackageMap.WORK_PACKAGE_SUBMIT_SUCCESS,
    payload: data,
  }),
  workPackageSubmitError: (data) => ({
    type: PackageMap.WORK_PACKAGE_SUBMIT_ERROR,
    payload: data,
  }),


  withdrawPackageStart: (data) => ({
    type: PackageMap.WITHDRAW_PACKAGE_START,
    payload: data,
  }),
  withdrawPackageSuccess: (data) => ({
    type: PackageMap.WITHDRAW_PACKAGE_SUCCESS,
    payload: data,
  }),
  withdrawPackageError: (data) => ({
    type: PackageMap.WITHDRAW_PACKAGE_ERROR,
    payload: data,
  }),

  finishPackageStart: (data) => ({
    type: PackageMap.FINISH_PACKAGE_START,
    payload: data,
  }),
  finishPackageSuccess: (data) => ({
    type: PackageMap.FINISH_PACKAGE_SUCCESS,
    payload: data,
  }),
  finishPackageError: (data) => ({
    type: PackageMap.FINISH_PACKAGE_ERROR,
    payload: data,
  }),

  finishPackageSCStart: (data) => ({
    type: PackageMap.FINISH_PACKAGE_SC_START,
    payload: data,
  }),
  finishPackageSCSuccess: (data) => ({
    type: PackageMap.FINISH_PACKAGE_SC_SUCCESS,
    payload: data,
  }),
  
};


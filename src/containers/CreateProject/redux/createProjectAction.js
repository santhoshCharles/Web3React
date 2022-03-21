export const CreateProjectMap = {
  OPEN_CREATE_PROJECT_MODAL: "OPEN_CREATE_PROJECT_MODAL",
  CLOSE_CREATE_PROJECT_MODAL: "CLOSE_CREATE_PROJECT_MODAL",
  CREATE_PROJECT_START: "CREATE_PROJECT_START",
  CREATE_PROJECT_SUCCESS: "CREATE_PROJECT_SUCCESS",
  CREATE_PROJECT_SC_START: "CREATE_PROJECT_SC_START",
  CREATE_PROJECT_SC_SUCCESS: "CREATE_PROJECT_SC_SUCCESS",
  CREATE_PROJECT_ERROR: "CREATE_PROJECT_ERROR",
  UPDATE_PROJECT_START: "UPDATE_PROJECT_START",
  UPDATE_PROJECT_SUCCESS: "UPDATE_PROJECT_SUCCESS",
  UPDATE_PROJECT_ERROR: "UPDATE_PROJECT_ERROR",
  GET_PROJECT_DETAILS_START: "GET_PROJECT_DETAILS_START",
  GET_PROJECT_DETAILS_SUCCESS: "GET_PROJECT_DETAILS_SUCCESS",
  GET_PROJECT_DETAILS_ERROR: "GET_PROJECT_DETAILS_ERROR",
  ADD_PACKAGES_START: "ADD_PACKAGES_START",
  ADD_PACKAGES_SUCCESS: "ADD_PACKAGES_SUCCESS",
  ADD_PACKAGES_ERROR: "ADD_PACKAGES_ERROR",
  ADD_PACKAGES_SC_START: "ADD_PACKAGES_SC_START",
  ADD_PACKAGES_SC_SUCCESS: "ADD_PACKAGES_SC_SUCCESS",
  GET_ALL_PACKAGES_START: "GET_ALL_PACKAGES_START",
  GET_ALL_PACKAGES_SUCCESS: "GET_ALL_PACKAGES_SUCCESS",
  GET_ALL_PACKAGES_ERROR: "GET_ALL_PACKAGES_ERROR",
  UPDATE_PACKAGES_START: "UPDATE_PACKAGES_START",
  UPDATE_PACKAGES_SUCCESS: "UPDATE_PACKAGES_SUCCESS",
  UPDATE_PACKAGES_ERROR: "UPDATE_PACKAGES_ERROR",
  SET_SELECTED_PROJECT: "SET_SELECTED_PROJECT",
  RESET_PROJECT_DETAIL: "RESET_PROJECT_DETAIL",
  GET_ALL_PROJECT_FAQS_START: "GET_ALL_PROJECT_FAQS_START",
  GET_ALL_PROJECT_FAQS_SUCCESS: "GET_ALL_PROJECT_FAQS_SUCCESS",
  GET_ALL_PROJECT_FAQS_ERROR: "GET_ALL_PROJECT_FAQS_ERROR",
  SET_FAQ_BATCH_NUMBER: "SET_FAQ_BATCH_NUMBER",
  FINISH_PROJECT_START: "FINISH_PROJECT_START",
  FINISH_PROJECT_SUCCESS: "FINISH_PROJECT_SUCCESS",
  FINISH_PROJECT_ERROR: "FINISH_PROJECT_ERROR",
  FINISH_PROJECT_SC_START: "FINISH_PROJECT_SC_START",
  FINISH_PROJECT_SC_SUCCESS: "FINISH_PROJECT_SC_SUCCESS",
  MASTER_DETAILS_START: "MASTER_DETAILS_START",
  MASTER_DETAILS_SUCCESS: "MASTER_DETAILS_SUCCESS",
  MASTER_DETAILS_ERROR: "MASTER_DETAILS_ERROR",
  ADD_FAQ_START: "ADD_FAQ_START",
  ADD_FAQ_SUCCESS: "ADD_FAQ_SUCCESS",
  ADD_FAQ_ERROR: "ADD_FAQ_ERROR",
  EDIT_FAQ_START: "EDIT_FAQ_START",
  EDIT_FAQ_SUCCESS: "EDIT_FAQ_SUCCESS",
  EDIT_FAQ_ERROR: "EDIT_FAQ_ERROR",
  GET_COLLABORATOR_LIST_START: "GET_COLLABORATOR_LIST_START",
  GET_COLLABORATOR_LIST_SUCCESS: "GET_COLLABORATOR_LIST_SUCCESS",
  GET_COLLABORATOR_LIST_ERROR: "GET_COLLABORATOR_LIST_ERROR",
  SET_COLLABORATOR_LIST_BATCH_NUMBER: "SET_COLLABORATOR_LIST_BATCH_NUMBER",
  RESET_COLLABORATOR_LIST: "RESET_COLLABORATOR_LIST",
  DELETE_FAQ_START: "DELETE_FAQ_START",
  DELETE_FAQ_SUCCESS: "DELETE_FAQ_SUCCESS",
  DELETE_FAQ_ERROR: "DELETE_FAQ_ERROR",
  REMOVE_COLLABORATOR_START: "REMOVE_COLLABORATOR_START",
  REMOVE_COLLABORATOR_SUCCESS: "REMOVE_COLLABORATOR_SUCCESS",
  REMOVE_COLLABORATOR_ERROR: "REMOVE_COLLABORATOR_ERROR",
  CANCEL_WORKTASK_START: "CANCEL_WORKTASK_START",
  CANCEL_WORKTASK_SUCCESS: "CANCEL_WORKTASK_SUCCESS",
  CANCEL_WORKTASK_ERROR: "CANCEL_WORKTASK_ERROR",
  RESET_REFRESH_PROJECT_DETAILS: "RESET_REFRESH_PROJECT_DETAILS",
  INITIATE_PROJECT_START: "INITIATE_PROJECT_START",
  INITIATE_PROJECT_SUCCESS: "INITIATE_PROJECT_SUCCESS",
  INITIATE_PROJECT_SC_START: "INITIATE_PROJECT_SC_START",
  INITIATE_PROJECT_SC_SUCCESS: "INITIATE_PROJECT_SC_SUCCESS",
  INITIATE_PROJECT_ERROR: "INITIATE_PROJECT_ERROR",
  REVIEW_COLLABORATOR_START: "REVIEW_COLLABORATOR_START",
  REVIEW_COLLABORATOR_SUCCESS: "REVIEW_COLLABORATOR_SUCCESS",
  REVIEW_COLLABORATOR_ERROR: "REVIEW_COLLABORATOR_ERROR",
  GET_PACKAGE_COLLABORATORS_START: "GET_PACKAGE_COLLABORATORS_START",
  GET_PACKAGE_COLLABORATORS_SUCCESS: " GET_PACKAGE_COLLABORATORS_SUCCESS",
  GET_PACKAGE_COLLABORATORS_ERROR: "GET_PACKAGE_COLLABORATORS_ERROR",
  RESET_INITIATOR_FLAG: "RESET_INITIATOR_FLAG",
  DELETE_PROJECT_START: "DELETE_PROJECT_START",
  DELETE_PROJECT_SUCCESS: "DELETE_PROJECT_SUCCESS",
  DELETE_PROJECT_ERROR: "DELETE_PROJECT_ERROR",
};

export const CreateProjectActions = {
  onOpenCreateProject: (data) => ({
    type: CreateProjectMap.OPEN_CREATE_PROJECT_MODAL,
    payload: data,
  }),
  onCloseCreateProject: (data) => ({
    type: CreateProjectMap.CLOSE_CREATE_PROJECT_MODAL,
    payload: data,
  }),

  createProjectStart: (data) => ({
    type: CreateProjectMap.CREATE_PROJECT_START,
    payload: data,
  }),
  createProjectSuccess: (data) => ({
    type: CreateProjectMap.CREATE_PROJECT_SUCCESS,
    payload: data,
  }),
  createProjectError: (errors) => ({
    type: CreateProjectMap.CREATE_PROJECT_ERROR,
    payload: { errors },
  }),
  createProjectSCStart: (data) => ({
    type: CreateProjectMap.CREATE_PROJECT_SC_START,
    payload: data,
  }),
  createProjectSCSuccess: (data) => ({
    type: CreateProjectMap.CREATE_PROJECT_SC_SUCCESS,
    payload: data,
  }),
  updateProjectStart: (data) => ({
    type: CreateProjectMap.UPDATE_PROJECT_START,
    payload: data,
  }),
  updateProjectSuccess: (data) => ({
    type: CreateProjectMap.UPDATE_PROJECT_SUCCESS,
    payload: data,
  }),
  updateProjectError: (errors) => ({
    type: CreateProjectMap.UPDATE_PROJECT_ERROR,
    payload: { errors },
  }),

  getProjectStart: (data) => ({
    type: CreateProjectMap.GET_PROJECT_DETAILS_START,
    payload: data,
  }),
  getProjectSuccess: (data) => ({
    type: CreateProjectMap.GET_PROJECT_DETAILS_SUCCESS,
    payload: data,
  }),
  getProjectError: (errors) => ({
    type: CreateProjectMap.GET_PROJECT_DETAILS_ERROR,
    payload: { errors },
  }),

  addPackageStart: (data) => ({
    type: CreateProjectMap.ADD_PACKAGES_START,
    payload: data,
  }),
  addPackageSuccess: (data) => ({
    type: CreateProjectMap.ADD_PACKAGES_SUCCESS,
    payload: data,
  }),
  addPackageSCStart: (data) => ({
    type: CreateProjectMap.ADD_PACKAGES_SC_START,
    payload: data,
  }),
  addPackageSCSuccess: (data) => ({
    type: CreateProjectMap.ADD_PACKAGES_SC_SUCCESS,
    payload: data,
  }),
  addPackageError: (errors) => ({
    type: CreateProjectMap.ADD_PACKAGES_ERROR,
    payload: { errors },
  }),

  getAllPackagesStart: (data) => ({
    type: CreateProjectMap.GET_ALL_PACKAGES_START,
    payload: data,
  }),
  getAllPackagesSuccess: (data) => ({
    type: CreateProjectMap.GET_ALL_PACKAGES_SUCCESS,
    payload: data,
  }),
  getAllPackagesError: (errors) => ({
    type: CreateProjectMap.GET_ALL_PACKAGES_ERROR,
    payload: { errors },
  }),

  updatePackageStart: (data) => ({
    type: CreateProjectMap.UPDATE_PACKAGES_START,
    payload: data,
  }),
  updatePackageSuccess: (data) => ({
    type: CreateProjectMap.UPDATE_PACKAGES_SUCCESS,
    payload: data,
  }),
  updatePackageError: (errors) => ({
    type: CreateProjectMap.UPDATE_PACKAGES_ERROR,
    payload: { errors },
  }),

  resetProjectDetail: (data) => ({
    type: CreateProjectMap.RESET_PROJECT_DETAIL,
    payload: data,
  }),
  setSelectedProject: (data) => ({
    type: CreateProjectMap.SET_SELECTED_PROJECT,
    payload: data,
  }),

  getProjectFaqsStart: (data) => ({
    type: CreateProjectMap.GET_ALL_PROJECT_FAQS_START,
    payload: data,
  }),
  getProjectFaqsSuccess: (data) => ({
    type: CreateProjectMap.GET_ALL_PROJECT_FAQS_SUCCESS,
    payload: data,
  }),
  getProjectFaqsError: (errors) => ({
    type: CreateProjectMap.GET_ALL_PROJECT_FAQS_ERROR,
    payload: { errors },
  }),
  setFaqBatchNumber: (data) => ({
    type: CreateProjectMap.SET_FAQ_BATCH_NUMBER,
    payload: data,
  }),

  finishProjectStart: (data) => ({
    type: CreateProjectMap.FINISH_PROJECT_START,
    payload: data,
  }),
  finishProjectSuccess: (data) => ({
    type: CreateProjectMap.FINISH_PROJECT_SUCCESS,
    payload: data,
  }),
  finishProjectError: (data) => ({
    type: CreateProjectMap.FINISH_PROJECT_ERROR,
    payload: data,
  }),
  finishProjectSCStart: (data) => ({
    type: CreateProjectMap.FINISH_PROJECT_SC_START,
    payload: data,
  }),
  finishProjectSCSuccess: (data) => ({
    type: CreateProjectMap.FINISH_PROJECT_SC_SUCCESS,
    payload: data,
  }),

  masterDetailsStart: (data) => ({
    type: CreateProjectMap.MASTER_DETAILS_START,
    payload: data,
  }),
  masterDetailsSuccess: (data) => ({
    type: CreateProjectMap.MASTER_DETAILS_SUCCESS,
    payload: data,
  }),
  masterDetailsError: (data) => ({
    type: CreateProjectMap.MASTER_DETAILS_ERROR,
    payload: data,
  }),
  addFaqStart: (data) => ({
    type: CreateProjectMap.ADD_FAQ_START,
    payload: data,
  }),
  addFaqSuccess: (data) => ({
    type: CreateProjectMap.ADD_FAQ_SUCCESS,
    payload: data,
  }),
  addFaqError: (data) => ({
    type: CreateProjectMap.ADD_FAQ_ERROR,
    payload: data,
  }),

  updateFaqStart: (data) => ({
    type: CreateProjectMap.EDIT_FAQ_START,
    payload: data,
  }),
  updateSuccess: (data) => ({
    type: CreateProjectMap.EDIT_FAQ_SUCCESS,
    payload: data,
  }),
  updateError: (data) => ({
    type: CreateProjectMap.EDIT_FAQ_ERROR,
    payload: data,
  }),

  getCollaboratorStart: (data) => ({
    type: CreateProjectMap.GET_COLLABORATOR_LIST_START,
    payload: data,
  }),
  getCollaboratorSuccess: (data) => ({
    type: CreateProjectMap.GET_COLLABORATOR_LIST_SUCCESS,
    payload: data,
  }),
  getCollaboratorError: (data) => ({
    type: CreateProjectMap.GET_COLLABORATOR_LIST_ERROR,
    payload: data,
  }),
  setCollaboratorListBatchNumber: (data) => ({
    type: CreateProjectMap.SET_COLLABORATOR_LIST_BATCH_NUMBER,
    payload: data,
  }),
  resetCollaboratorList: (data) => ({
    type: CreateProjectMap.RESET_COLLABORATOR_LIST,
    payload: data,
  }),
  deleteFaqStart: (data) => ({
    type: CreateProjectMap.DELETE_FAQ_START,
    payload: data,
  }),
  deleteFaqSuccess: (data) => ({
    type: CreateProjectMap.DELETE_FAQ_SUCCESS,
    payload: data,
  }),
  deleteFaqError: (data) => ({
    type: CreateProjectMap.DELETE_FAQ_ERROR,
    payload: data,
  }),
  removeCollboratorStart: (data) => ({
    type: CreateProjectMap.REMOVE_COLLABORATOR_START,
    payload: data,
  }),
  removeCollboratorSuccess: (data) => ({
    type: CreateProjectMap.REMOVE_COLLABORATOR_SUCCESS,
    payload: data,
  }),
  removeCollboratorError: (data) => ({
    type: CreateProjectMap.REMOVE_COLLABORATOR_ERROR,
    payload: data,
  }),

  cancelWorkTaskStart: (data) => ({
    type: CreateProjectMap.CANCEL_WORKTASK_START,
    payload: data,
  }),
  cancelWorkTaskSuccess: (data) => ({
    type: CreateProjectMap.CANCEL_WORKTASK_SUCCESS,
    payload: data,
  }),
  cancelWorkTaskError: (data) => ({
    type: CreateProjectMap.CANCEL_WORKTASK_ERROR,
    payload: data,
  }),
  initiateProjectStart: (data) => ({
    type: CreateProjectMap.INITIATE_PROJECT_START,
    payload: data,
  }),
  initiateProjectSuccess: (data) => ({
    type: CreateProjectMap.INITIATE_PROJECT_SUCCESS,
    payload: data,
  }),
  initiateProjectSCStart: (data) => ({
    type: CreateProjectMap.INITIATE_PROJECT_SC_START,
    payload: data,
  }),
  initiateProjectSCSuccess: (data) => ({
    type: CreateProjectMap.INITIATE_PROJECT_SC_SUCCESS,
    payload: data,
  }),
  initiateProjectError: (data) => ({
    type: CreateProjectMap.INITIATE_PROJECT_ERROR,
    payload: data,
  }),

  reviewCollaboratorStart: (data) => ({
    type: CreateProjectMap.REVIEW_COLLABORATOR_START,
    payload: data,
  }),
  reviewCollaboratorSuccess: (data) => ({
    type: CreateProjectMap.REVIEW_COLLABORATOR_SUCCESS,
    payload: data,
  }),
  reviewCollaboratorError: (data) => ({
    type: CreateProjectMap.REVIEW_COLLABORATOR_ERROR,
    payload: data,
  }),
  getPackageCollboratorStart: (data) => ({
    type: CreateProjectMap.GET_PACKAGE_COLLABORATORS_START,
    payload: data,
  }),
  getPackageCollboratorSuccess: (data) => ({
    type: CreateProjectMap.GET_PACKAGE_COLLABORATORS_SUCCESS,
    payload: data,
  }),
  getPackageCollboratorError: (data) => ({
    type: CreateProjectMap.GET_PACKAGE_COLLABORATORS_ERROR,
    payload: data,
  }),
  deleteProjectStart: (data) => ({
    type: CreateProjectMap.DELETE_PROJECT_START,
    payload: data,
  }),
  deleteProjectSuccess: (data) => ({
    type: CreateProjectMap.DELETE_PROJECT_SUCCESS,
    payload: data,
  }),
  deleteProjectError: (errors) => ({
    type: CreateProjectMap.DELETE_PROJECT_ERROR,
    payload: { errors },
  }),
};

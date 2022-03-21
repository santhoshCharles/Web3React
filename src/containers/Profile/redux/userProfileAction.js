export const UserProfileMap = {
  UPDATE_PROFILE_START: "UPDATE_PROFILE_START",
  UPDATE_PROFILE_SUCCESS: "UPDATE_PROFILE_SUCCESS",
  UPDATE_PROFILE_ERROR: "UPDATE_PROFILE_ERROR",
  GET_PROFILE_START: "GET_PROFILE_START",
  GET_PROFILE_SUCCESS: "GET_PROFILE_SUCCESS",
  GET_PROFILE_ERROR: "GET_PROFILE_ERROR",
  ADD_EMPLOYEEMENT_START: "ADD_EMPLOYEEMENT_START",
  ADD_EMPLOYEEMENT_SUCCESS: "ADD_EMPLOYEEMENT_SUCCESS",
  ADD_EMPLOYEEMENT_ERROR: "ADD_EMPLOYEEMENT_ERROR",
  UPDATE_EMPLOYEEMENT_START: "UPDATE_EMPLOYEEMENT_START",
  UPDATE_EMPLOYEEMENT_SUCCESS: "UPDATE_EMPLOYEEMENT_SUCCESS",
  UPDATE_EMPLOYEEMENT_ERROR: "UPDATE_EMPLOYEEMENT_ERROR",
  DELETE_EMPLOYEEMENT_START: "DELETE_EMPLOYEEMENT_START",
  DELETE_EMPLOYEEMENT_SUCCESS: "DELETE_EMPLOYEEMENT_SUCCESS",
  DELETE_EMPLOYEEMENT_ERROR: "DELETE_EMPLOYEEMENT_ERROR",
  ADD_EDUCATION_START: "ADD_EDUCATION_START",
  ADD_EDUCATION_SUCCESS: "ADD_EDUCATION_SUCCESS",
  ADD_EDUCATION_ERROR: "ADD_EDUCATION_ERROR",
  UPDATE_EDUCATION_START: "UPDATE_EDUCATION_START",
  UPDATE_EDUCATION_SUCCESS: "UPDATE_EDUCATION_SUCCESS",
  UPDATE_EDUCATION_ERROR: "UPDATE_EDUCATION_ERROR",
  DELETE_EDUCATION_START: "DELETE_EDUCATION_START",
  DELETE_EDUCATION_SUCCESS: "DELETE_EDUCATION_SUCCESS",
  DELETE_EDUCATION_ERROR: "DELETE_EDUCATION_ERROR",
  ADD_PORTFOLIO_START: "ADD_PORTFOLIO_START",
  ADD_PORTFOLIO_SUCCESS: "ADD_PORTFOLIO_SUCCESS",
  ADD_PORTFOLIO_ERROR: "ADD_PORTFOLIO_ERROR",
  REMOVE_PORTFOLIO_START: "REMOVE_PORTFOLIO_START",
  REMOVE_PORTFOLIO_SUCCESS: "REMOVE_PORTFOLIO_SUCCESS",
  REMOVE_PORTFOLIO_ERROR: "REMOVE_PORTFOLIO_ERROR",
  GET_SKILLS_START: "GET_SKILLS_START",
  GET_SKILLS_SUCCESS: "GET_SKILLS_SUCCESS",
  GET_SKILLS_ERROR: "GET_SKILLS_ERROR",
  ADD_SKILLS_START: "ADD_SKILLS_START",
  ADD_SKILLS_SUCCESS: "ADD_SKILLS_SUCCESS",
  ADD_SKILLS_ERROR: "ADD_SKILLS_ERROR",
  REMOVE_SKILLS_START: "REMOVE_SKILLS_START",
  REMOVE_SKILLS_SUCCESS: "REMOVE_SKILLS_SUCCESS",
  REMOVE_SKILLS_ERROR: "REMOVE_SKILLS_ERROR",
  SET_SELECTED_EMPLOYEEMENT: "SET_SELECTED_EMPLOYEEMENT",
  SET_SELECTED_EDUCATION: "SET_SELECTED_EDUCATION",
  REFERRAL_START: "REFERRAL_START",
  REFERRAL_SUCCESS: "REFERRAL_SUCCESS",
  REFERRAL_ERROR: "REFERRAL_ERROR",
  GET_MY_PROJECT_LIST_START: "GET_MY_PROJECT_LIST_START",
  GET_MY_PROJECT_LIST_SUCCESS: "GET_MY_PROJECT_LIST_SUCCESS",
  GET_MY_PROJECT_LIST_ERROR: "GET_MY_PROJECT_LIST_ERROR",

  GET_MY_PACKAGE_LIST_START: "GET_MY_PACKAGE_LIST_START",
  GET_MY_PACKAGE_LIST_SUCCESS: "GET_MY_PACKAGE_LIST_SUCCESS",
  GET_MY_PACKAGE_LIST_START_ERROR: "GET_MY_PACKAGE_LIST_START_ERROR",

  GET_MY_COLLOBORATOR_LIST_START: "GET_MY_COLLOBORATOR_LIST_START",
  GET_MY_COLLOBORATOR_LIST_SUCCESS: "GET_MY_COLLOBORATOR_LIST_SUCCESS",
  GET_MY_COLLOBORATOR_LIST_START_ERROR: "GET_MY_COLLOBORATOR_LIST_START_ERROR",

  CREATE_SUPPORT_TICKET_START: "CREATE_SUPPORT_TICKET_START",
  CREATE_SUPPORT_TICKET_SUCCESS: "CREATE_SUPPORT_TICKET_SUCCESS",
  CREATE_SUPPORT_TICKET_ERROR: "CREATE_SUPPORT_TICKET_ERROR",
  GET_ALL_SUPPORT_TICKETS_START: "GET_ALL_SUPPORT_TICKETS_START",
  GET_ALL_SUPPORT_TICKETS_SUCCESS: "GET_ALL_SUPPORT_TICKETS_SUCCESS",
  GET_ALL_SUPPORT_TICKETS_ERROR: "GET_ALL_SUPPORT_TICKETS_ERROR",
  ADD_COMMENT_START: "ADD_COMMENT_START",
  ADD_COMMENT_SUCCESS: "ADD_COMMENT_SUCCESS",
  ADD_COMMENT_ERROR: "ADD_COMMENT_ERROR",
  APPLY_FILTERS: "APPLY_FILTERS",
  SET_SUPPORT_TICKET_BATCH_NUMBER: "SET_SUPPORT_TICKET_BATCH_NUMBER",
  RESET_USER_PROFILE: "RESET_USER_PROFILE",
  REFERRAL_HISTORY_START: "REFERRAL_HISTORY_START",
  REFERRAL_HISTORY_SUCCESS: "REFERRAL_HISTORY_SUCCESS",
  REFERRAL_HISTORY_ERROR: "REFERRAL_HISTORY_ERROR",
  SET_REFERRAL_BATCH_NUMBER: "SET_REFERRAL_BATCH_NUMBER",
  GET_EARNING_LIST_START: "GET_EARNING_LIST_START",
  GET_EARNING_LIST_SUCCESS: "GET_EARNING_LIST_SUCCESS",
  GET_EARNING_LIST_ERROR: "GET_EARNING_LIST_ERROR"
};

export const UserProfileActions = {
  updateProfileStart: (data) => ({
    type: UserProfileMap.UPDATE_PROFILE_START,
    payload: data,
  }),
  updateProfileSuccess: (data) => ({
    type: UserProfileMap.UPDATE_PROFILE_SUCCESS,
    payload: data,
  }),
  updateProfileError: (errors) => ({
    type: UserProfileMap.UPDATE_PROFILE_ERROR,
    payload: { errors },
  }),

  getProfileStart: (data) => ({
    type: UserProfileMap.GET_PROFILE_START,
    payload: data,
  }),
  getProfileSuccess: (data) => ({
    type: UserProfileMap.GET_PROFILE_SUCCESS,
    payload: data,
  }),
  getProfileError: (errors) => ({
    type: UserProfileMap.GET_PROFILE_ERROR,
    payload: { errors },
  }),

  addEmployeementStart: (data) => ({
    type: UserProfileMap.ADD_EMPLOYEEMENT_START,
    payload: data,
  }),
  addEmployeementSuccess: (data) => ({
    type: UserProfileMap.ADD_EMPLOYEEMENT_SUCCESS,
    payload: data,
  }),
  addEmployeementError: (errors) => ({
    type: UserProfileMap.ADD_EMPLOYEEMENT_ERROR,
    payload: { errors },
  }),

  updateEmployeementStart: (data) => ({
    type: UserProfileMap.UPDATE_EMPLOYEEMENT_START,
    payload: data,
  }),
  updateEmployeementSuccess: (data) => ({
    type: UserProfileMap.UPDATE_EMPLOYEEMENT_SUCCESS,
    payload: data,
  }),
  updateEmployeementError: (errors) => ({
    type: UserProfileMap.UPDATE_EMPLOYEEMENT_ERROR,
    payload: { errors },
  }),

  deleteEmployeementStart: (data) => ({
    type: UserProfileMap.DELETE_EMPLOYEEMENT_START,
    payload: data,
  }),
  deleteEmployeementSuccess: (data) => ({
    type: UserProfileMap.DELETE_EMPLOYEEMENT_SUCCESS,
    payload: data,
  }),
  deleteEmployeementError: (errors) => ({
    type: UserProfileMap.DELETE_EMPLOYEEMENT_ERROR,
    payload: { errors },
  }),

  addEducationStart: (data) => ({
    type: UserProfileMap.ADD_EDUCATION_START,
    payload: data,
  }),
  addEducationSuccess: (data) => ({
    type: UserProfileMap.ADD_EDUCATION_SUCCESS,
    payload: data,
  }),
  addEducationError: (errors) => ({
    type: UserProfileMap.ADD_EDUCATION_ERROR,
    payload: { errors },
  }),

  updateEducationStart: (data) => ({
    type: UserProfileMap.UPDATE_EDUCATION_START,
    payload: data,
  }),
  updateEducationSuccess: (data) => ({
    type: UserProfileMap.UPDATE_EDUCATION_SUCCESS,
    payload: data,
  }),
  updateEducationError: (errors) => ({
    type: UserProfileMap.UPDATE_EDUCATION_ERROR,
    payload: { errors },
  }),

  deleteEducationStart: (data) => ({
    type: UserProfileMap.DELETE_EDUCATION_START,
    payload: data,
  }),
  deleteEducationSuccess: (data) => ({
    type: UserProfileMap.DELETE_EDUCATION_SUCCESS,
    payload: data,
  }),
  deleteEducationError: (errors) => ({
    type: UserProfileMap.DELETE_EDUCATION_ERROR,
    payload: { errors },
  }),

  addPortfolioStart: (data) => ({
    type: UserProfileMap.ADD_PORTFOLIO_START,
    payload: data,
  }),
  addPortfolioSuccess: (data) => ({
    type: UserProfileMap.ADD_PORTFOLIO_SUCCESS,
    payload: data,
  }),
  addPortfolioError: (errors) => ({
    type: UserProfileMap.ADD_PORTFOLIO_ERROR,
    payload: { errors },
  }),

  removePortfolioStart: (data) => ({
    type: UserProfileMap.REMOVE_PORTFOLIO_START,
    payload: data,
  }),
  removePortfolioSuccess: (data) => ({
    type: UserProfileMap.REMOVE_PORTFOLIO_SUCCESS,
    payload: data,
  }),
  removePortfolioError: (errors) => ({
    type: UserProfileMap.REMOVE_PORTFOLIO_ERROR,
    payload: { errors },
  }),

  getSkillsStart: (data) => ({
    type: UserProfileMap.GET_SKILLS_START,
    payload: data,
  }),
  getSkillsSuccess: (data) => ({
    type: UserProfileMap.GET_SKILLS_SUCCESS,
    payload: data,
  }),
  getSkillsError: (errors) => ({
    type: UserProfileMap.GET_SKILLS_ERROR,
    payload: { errors },
  }),

  addSkillsStart: (data) => ({
    type: UserProfileMap.ADD_SKILLS_START,
    payload: data,
  }),
  addSkillsSuccess: (data) => ({
    type: UserProfileMap.ADD_SKILLS_SUCCESS,
    payload: data,
  }),
  addSkillsError: (errors) => ({
    type: UserProfileMap.ADD_SKILLS_ERROR,
    payload: { errors },
  }),

  removeSkillsStart: (data) => ({
    type: UserProfileMap.REMOVE_SKILLS_START,
    payload: data,
  }),
  removeSkillsSuccess: (data) => ({
    type: UserProfileMap.REMOVE_SKILLS_SUCCESS,
    payload: data,
  }),
  removeSkillsError: (errors) => ({
    type: UserProfileMap.REMOVE_SKILLS_ERROR,
    payload: { errors },
  }),

  setSelectedEmployeement: (data) => ({
    type: UserProfileMap.SET_SELECTED_EMPLOYEEMENT,
    payload: data,
  }),

  setSelectedEducation: (data) => ({
    type: UserProfileMap.SET_SELECTED_EDUCATION,
    payload: data,
  }),

  referralStart: (data) => ({
    type: UserProfileMap.REFERRAL_START,
    payload: data,
  }),
  referralSuccess: (data) => ({
    type: UserProfileMap.REFERRAL_SUCCESS,
    payload: data,
  }),
  referralError: (data) => ({
    type: UserProfileMap.REFERRAL_ERROR,
    payload: data,
  }),

  referralHistoryStart: (data) => ({
    type: UserProfileMap.REFERRAL_HISTORY_START,
    payload: data,
  }),
  referralHistorySuccess: (data) => ({
    type: UserProfileMap.REFERRAL_HISTORY_SUCCESS,
    payload: data,
  }),
  referralHistoryError: (data) => ({
    type: UserProfileMap.REFERRAL_HISTORY_ERROR,
    payload: data,
  }),

  applyFilters: (data) => ({
    type: UserProfileMap.APPLY_FILTERS,
    payload: data,
  }),
  getMyProjectListStart: (data) => ({
    type: UserProfileMap.GET_MY_PROJECT_LIST_START,
    payload: data,
  }),
  getMyProjectListSuccess: (data) => ({
    type: UserProfileMap.GET_MY_PROJECT_LIST_SUCCESS,
    payload: data,
  }),
  getMyProjectListError: (data) => ({
    type: UserProfileMap.GET_MY_PROJECT_LIST_ERROR,
    payload: data,
  }),

  getMyPackageListStart: (data) => ({
    type: UserProfileMap.GET_MY_PACKAGE_LIST_START,
    payload: data,
  }),
  getMyPackageListSuccess: (data) => ({
    type: UserProfileMap.GET_MY_PACKAGE_LIST_SUCCESS,
    payload: data,
  }),
  getMyPackageListError: (data) => ({
    type: UserProfileMap.GET_MY_PACKAGE_LIST_START_ERROR,
    payload: data,
  }),

  getMyCollaboratorListStart: (data) => ({
    type: UserProfileMap.GET_MY_COLLOBORATOR_LIST_START,
    payload: data,
  }),
  getMyCollaboratorListSuccess: (data) => ({
    type: UserProfileMap.GET_MY_COLLOBORATOR_LIST_SUCCESS,
    payload: data,
  }),
  getMyCollaboratorListError: (data) => ({
    type: UserProfileMap.GET_MY_COLLOBORATOR_LIST_START_ERROR,
    payload: data,
  }),

  createSupportTicketStart: (data) => ({
    type: UserProfileMap.CREATE_SUPPORT_TICKET_START,
    payload: data,
  }),
  createSupportTicketSuccess: (data) => ({
    type: UserProfileMap.CREATE_SUPPORT_TICKET_SUCCESS,
    payload: data,
  }),
  createSupportTicketError: (data) => ({
    type: UserProfileMap.CREATE_SUPPORT_TICKET_ERROR,
    payload: data,
  }),

  getAllSupportTicketsStart: (data) => ({
    type: UserProfileMap.GET_ALL_SUPPORT_TICKETS_START,
    payload: data,
  }),
  getAllSupportTicketsSuccess: (data) => ({
    type: UserProfileMap.GET_ALL_SUPPORT_TICKETS_SUCCESS,
    payload: data,
  }),
  getAllSupportTicketsError: (data) => ({
    type: UserProfileMap.GET_ALL_SUPPORT_TICKETS_ERROR,
    payload: data,
  }),

  addCommentStart: (data) => ({
    type: UserProfileMap.ADD_COMMENT_START,
    payload: data,
  }),
  addCommentSuccess: (data) => ({
    type: UserProfileMap.ADD_COMMENT_SUCCESS,
    payload: data,
  }),
  addCommentError: (data) => ({
    type: UserProfileMap.ADD_COMMENT_ERROR,
    payload: data,
  }),

  setSupportTicketBatchNumber: (data) => ({
    type: UserProfileMap.SET_SUPPORT_TICKET_BATCH_NUMBER,
    payload: data,
  }),
  resetUserProfile: () => ({ type: UserProfileMap.RESET_USER_PROFILE }),
  setReferralBatchNumber: (data) => ({ type: UserProfileMap.SET_REFERRAL_BATCH_NUMBER, payload: data }),

  getEarningListStart: (data) => ({
    type: UserProfileMap.GET_EARNING_LIST_START,
    payload: data,
  }),
  getEarningListSuccess: (data) => ({
    type: UserProfileMap.GET_EARNING_LIST_SUCCESS,
    payload: data,
  }),
  getEarningListError: (data) => ({
    type: UserProfileMap.GET_EARNING_LIST_ERROR,
    payload: data,
  }),
};

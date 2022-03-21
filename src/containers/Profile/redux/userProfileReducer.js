import { UserProfileMap } from "./userProfileAction";

const initialState = {
  isLoading: false,
  supportTicketLoading: false,
  reDirect: false,
  selectedEmployeement: {},
  selectedEducation: {},
  getUserProfile: {},
  refreshProfile: true,
  getSkills: [],
  showLoader: false,
  showResumeLoader: false,
  refreshAllSupportTickets: true,
  showSkillLoader: false,
  refreshSkills: true,
  myProjectList: {},
  allSupportTickets: {},
  addCommentLoader: false,
  //refreshSupportTicketList: false,
  supportTicketListLimit: 5,
  invitationHistory: {},
  referralHistorySkip: 0,
  referralHistoryLimit: 5,
  refreshInvitationHistory: false,
  earningList: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UserProfileMap.GET_PROFILE_START: {
      return {
        ...state,
        isLoading: true,
        //refreshSkills: true,
      };
    }
    case UserProfileMap.GET_PROFILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getUserProfile: action.payload,
        refreshProfile: false,
      };
    }
    case UserProfileMap.GET_PROFILE_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshUserList: false,
      };
    }
    case UserProfileMap.ADD_EMPLOYEEMENT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.ADD_EMPLOYEEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshProfile: true,
      };
    }
    case UserProfileMap.ADD_EMPLOYEEMENT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.UPDATE_EMPLOYEEMENT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.UPDATE_EMPLOYEEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshProfile: true,
        selectedEmployeement: {
          ...state.selectedEmployeement,
          ...action.payload,
        },
        reDirect: true,
      };
    }
    case UserProfileMap.UPDATE_EMPLOYEEMENT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.DELETE_EMPLOYEEMENT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.DELETE_EMPLOYEEMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshProfile: true,
        reDirect: true,
        selectedEmployeement: {},
      };
    }
    case UserProfileMap.DELETE_EMPLOYEEMENT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.ADD_EDUCATION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.ADD_EDUCATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        reDirect: true,
      };
    }
    case UserProfileMap.ADD_EDUCATION_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.UPDATE_EDUCATION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.UPDATE_EDUCATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        selectedEducation: {
          ...state.selectedEducation,
          ...action.payload,
        },
        reDirect: true,
      };
    }
    case UserProfileMap.UPDATE_EDUCATION_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.DELETE_EDUCATION_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.DELETE_EDUCATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        reDirect: true,
        selectedEducation: {},
        refreshProfile: true,
      };
    }
    case UserProfileMap.DELETE_EDUCATION_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.ADD_PORTFOLIO_START: {
      return {
        ...state,
        isLoading: true,
        showLoader: true,
      };
    }
    case UserProfileMap.ADD_PORTFOLIO_SUCCESS: {
      return {
        ...state,
        showLoader: false,
        isLoading: false,
      };
    }
    case UserProfileMap.ADD_PORTFOLIO_ERROR: {
      return {
        ...state,
        showLoader: false,
        isLoading: false,
      };
    }
    case UserProfileMap.REMOVE_PORTFOLIO_START: {
      return {
        ...state,
        isLoading: true,
        showLoader: true,
      };
    }
    case UserProfileMap.REMOVE_PORTFOLIO_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showLoader: false,
      };
    }
    case UserProfileMap.REMOVE_PORTFOLIO_ERROR: {
      return {
        ...state,
        showLoader: false,
        isLoading: false,
      };
    }
    case UserProfileMap.GET_SKILLS_START: {
      return {
        ...state,
        isLoading: true,
        refreshSkills: false,
      };
    }
    case UserProfileMap.GET_SKILLS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getSkills: action.payload,
        refreshSkills: false,
      };
    }
    case UserProfileMap.GET_SKILLS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.ADD_SKILLS_START: {
      return {
        ...state,
        showSkillLoader: true,
        isLoading: true,
      };
    }
    case UserProfileMap.ADD_SKILLS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showSkillLoader: false,
        refreshSkills: true,
      };
    }
    case UserProfileMap.ADD_SKILLS_ERROR: {
      return {
        ...state,
        showSkillLoader: false,
        refreshSkills: false,
        isLoading: false,
      };
    }
    case UserProfileMap.REMOVE_SKILLS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.REMOVE_SKILLS_SUCCESS: {
      return {
        ...state,
        refreshSkills: true,
        isLoading: false,
      };
    }
    case UserProfileMap.REMOVE_SKILLS_ERROR: {
      return {
        ...state,
        refreshSkills: false,
        isLoading: false,
      };
    }
    case UserProfileMap.SET_SELECTED_EMPLOYEEMENT: {
      return {
        ...state,
        selectedEmployeement: action.payload,
        reDirect: false,
      };
    }
    case UserProfileMap.SET_SELECTED_EDUCATION: {
      return {
        ...state,
        selectedEducation: action.payload,
        reDirect: false,
      };
    }
    case UserProfileMap.REFERRAL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.REFERRAL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.REFERRAL_ERROR: {
      return {
        ...state,
        showLoader: true,
        isLoading: false,
      };
    }
    case UserProfileMap.REFERRAL_HISTORY_START: {
      return {
        ...state,
        isLoading: true,
        refreshInvitationHistory: false
      };
    }
    case UserProfileMap.REFERRAL_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        invitationHistory: action.payload
      }
    }
    case UserProfileMap.REFERRAL_HISTORY_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case UserProfileMap.SET_REFERRAL_BATCH_NUMBER: {
      return {
        ...state,
        referralHistorySkip: action.payload,
        refreshInvitationHistory: true,
      };
    }
    case UserProfileMap.UPDATE_PROFILE_START: {
      return {
        ...state,
        showLoader: true,
        showResumeLoader: true,
      };
    }
    case UserProfileMap.UPDATE_PROFILE_SUCCESS: {
      return {
        ...state,
        showLoader: false,
        showResumeLoader: false,
      };
    }
    case UserProfileMap.UPDATE_PROFILE_ERROR: {
      return {
        ...state,
        showResumeLoader: false,
        showLoader: false,
      };
    }
    case UserProfileMap.GET_MY_PROJECT_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.GET_MY_PROJECT_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        myProjectList: action.payload,
      };
    }
    case UserProfileMap.GET_MY_PROJECT_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        myProjectList: {},
      };
    }

    case UserProfileMap.GET_MY_PACKAGE_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.GET_MY_PACKAGE_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        myPackageList: action.payload,
      };
    }
    case UserProfileMap.GET_MY_PACKAGE_LIST_START_ERROR: {
      return {
        ...state,
        isLoading: false,
        myPackageList: {},
      };
    }

    case UserProfileMap.GET_MY_COLLOBORATOR_LIST_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.GET_MY_COLLOBORATOR_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        myColloboratorList: action.payload,
      };
    }
    case UserProfileMap.GET_MY_COLLOBORATOR_LIST_START_ERROR: {
      return {
        ...state,
        isLoading: false,
        myColloboratorList: {},
      };
    }

    case UserProfileMap.CREATE_SUPPORT_TICKET_START: {
      return {
        ...state,
        supportTicketLoading: true,
      };
    }
    case UserProfileMap.CREATE_SUPPORT_TICKET_SUCCESS: {
      return {
        ...state,
        supportTicketLoading: false,
        refreshAllSupportTickets: true,
      };
    }
    case UserProfileMap.CREATE_SUPPORT_TICKET_ERROR: {
      return {
        ...state,
        supportTicketLoading: false,
      };
    }

    case UserProfileMap.GET_ALL_SUPPORT_TICKETS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case UserProfileMap.GET_ALL_SUPPORT_TICKETS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshAllSupportTickets: false,
        allSupportTickets: action.payload,
        //refreshSupportTicketList: false
      };
    }
    case UserProfileMap.GET_ALL_SUPPORT_TICKETS_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshAllSupportTickets: false,
        allSupportTickets: {},
        //refreshSupportTicketList: false
      };
    }

    case UserProfileMap.ADD_COMMENT_START: {
      return {
        ...state,
        isLoading: true,
        addCommentLoader: true,
      };
    }
    case UserProfileMap.ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        addCommentLoader: false,
        refreshAllSupportTickets: true,
      };
    }
    case UserProfileMap.ADD_COMMENT_ERROR: {
      return {
        ...state,
        isLoading: false,
        addCommentLoader: false,
        refreshAllSupportTickets: false,
      };
    }
    case UserProfileMap.SET_SUPPORT_TICKET_BATCH_NUMBER: {
      return {
        ...state,
        supportTicketListLimit: action.payload,
        refreshAllSupportTickets: true,
      };
    }
    case UserProfileMap.RESET_USER_PROFILE: {
      return {
        ...initialState,
      };
    }
    case UserProfileMap.GET_EARNING_LIST_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case UserProfileMap.GET_EARNING_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        earningList: action.payload
      };
    }
    case UserProfileMap.GET_EARNING_LIST_ERROR: {
      return {
        ...state,
        isLoading: false
      };
    }
    default:
      return { ...state };
  }
};

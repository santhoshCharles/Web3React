import { dashboardMap } from "./dashboardAction";

const initialState = {
  awaitingApprovalRequests: [],
  packageRequestReceived: [],
  packageRequestReceivedCol: [],
  userRequestReceived: [],
  isLoading: false,
  isRequestAccepted: false,
  refreshAwaitingList: true,
  refreshPackageList: false,
  refreshPackageListCol: false,
  refreshProjectList: true,
  awaitingListLimit: 2,
  completedProjectLimit: 2,
  openProjectLimit: 2,
  openProjectColLimit: 2,
  deliveredProjectLimit: 2,
  refreshdeliveredProjectList: true,
  packageListLimit: 2,
  requestListSkip: 0,
  expiredProjectLimit: 2,
  refreshExpiredProjectList: true,
  requestListLimit: 2,
  refreshRequestList: false,
  refreshOpenProjectList: true,
  refreshOpenProjectColList: true,
  refreshCompletedProjectList: true,
  applicantProfile: {},
  projectsCompleted: [],
  projectsDelievered: [],
  projectsExpired: [],
  projectsOpen: [],
  projectsOpenCol: [],
  inprogressCol: [],
  submittedCol: [],
  expiredCol: []
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardMap.GET_AWAITING_APPROVAL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_AWAITING_APPROVAL_SUCCESS: {
      return {
        ...state,
        awaitingApprovalRequests: action.payload,
        isLoading: false,
        refreshAwaitingList: false,
      };
    }
    case dashboardMap.GET_AWAITING_APPROVAL_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshAwaitingList: false,
      };
    }

    case dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_SUCCESS: {
      return {
        ...state,
        packageRequestReceived: action.payload,
        isLoading: false,
        refreshPackageList: false,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshPackageList: false,
      };
    }

    case dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_SUCCESS: {
      return {
        ...state,
        packageRequestReceivedCol: action.payload,
        isLoading: false,
        refreshPackageListCol: false,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_REQUEST_RECEIVED_COL_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshPackageListCol: false,
      };
    }

    case dashboardMap.GET_ALL_USER_REQUEST_RECEIVED_START: {
      return {
        ...state,
        userRequestReceived: [],
        isLoading: true,
        refreshRequestList: false,
      };
    }
    case dashboardMap.GET_ALL_USER_REQUEST_RECEIVED_SUCCESS: {
      return {
        ...state,
        userRequestReceived: action.payload,
        isLoading: false,
      };
    }
    case dashboardMap.GET_ALL_USER_REQUEST_RECEIVED_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case dashboardMap.ACCEPT_REJECT_REQUEST_START: {
      return {
        ...state,
        //isLoading: true,
        isRequestAccepted: true,
      };
    }
    case dashboardMap.ACCEPT_REJECT_REQUEST_SUCCESS: {
      return {
        ...state,
        //isLoading: false,
        isRequestAccepted: false,
      };
    }
    case dashboardMap.ACCEPT_REJECT_REQUEST_ERROR: {
      return {
        ...state,
        //isLoading: false,
        isRequestAccepted: false,
      };
    }
    case dashboardMap.ACCEPT_REJECT_REQUEST_SC_START: {
      return {
        ...state,
        //isLoading: true,
        isRequestAccepted: true,
      };
    }
    case dashboardMap.ACCEPT_REJECT_REQUEST_SC_SUCCESS: {
      return {
        ...state,
        //isLoading: false,
        isRequestAccepted: false,
      };
    }

    case dashboardMap.SET_AWAITING_APPROVAL_BATCH_NUMBER: {
      return {
        ...state,
        //isLoading: true,
        awaitingListLimit: action.payload,
        refreshAwaitingList: true,
      };
    }
    case dashboardMap.SET_PROJECT_BATCH_NUMBER: {
      return {
        ...state,
        openProjectLimit: action.payload,
        refreshOpenProjectList: true,
      };
    }

    case dashboardMap.SET_PROJECT_COL_BATCH_NUMBER: {
      return {
        ...state,
        openProjectColLimit: action.payload,
        refreshOpenProjectColList: true,
      };
    }

    case dashboardMap.SET_PACKAGE_BATCH_NUMBER: {
      return {
        ...state,
        //isLoading: true,
        packageListLimit: action.payload,
        refreshPackageList: true,
      };
    }

    case dashboardMap.SET_USER_REQUEST_BATCH_NUMBER: {
      return {
        ...state,
        //isLoading: true,
        requestListSkip: action.payload,
        refreshRequestList: true,
      };
    }

    case dashboardMap.GET_APPLICANT_PROFILE_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_APPLICANT_PROFILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        applicantProfile: action.payload,
      };
    }
    case dashboardMap.GET_APPLICANT_PROFILE_ERROR: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case dashboardMap.GET_OPEN_PROJECT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_OPEN_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: true,
        refreshOpenProjectList: false,
        projectsOpen: action.payload,
      };
    }
    case dashboardMap.GET_OPEN_PROJECT_ERROR: {
      return {
        ...state,
        refreshOpenProjectList: false,
        isLoading: true,
      };
    }

    case dashboardMap.GET_OPEN_PROJECT_COL_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_OPEN_PROJECT_COL_SUCCESS: {
      return {
        ...state,
        isLoading: true,
        refreshOpenProjectColList: false,
        projectsOpenCol: action.payload,
      };
    }
    case dashboardMap.GET_OPEN_PROJECT_COL_ERROR: {
      return {
        ...state,
        refreshOpenProjectColList: false,
        isLoading: true,
      };
    }

    case dashboardMap.GET_COMPLETED_PROJECT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_COMPLETED_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshCompletedProjectList: false,
        projectsCompleted: action.payload,
      };
    }
    case dashboardMap.GET_COMPLETED_PROJECT_ERROR: {
      return {
        ...state,
        refreshCompletedProjectList: false,
        isLoading: false,
      };
    }

    case dashboardMap.SET_COMPLETED_PROJECT_BATCH_NUMBER: {
      return {
        ...state,
        completedProjectLimit: action.payload,
        refreshCompletedProjectList: true,
      };
    }

    case dashboardMap.GET_DELIVERED_PROJECT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_DELIVERED_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshdeliveredProjectList: false,
        projectsDelievered: action.payload,
      };
    }
    case dashboardMap.GET_DELIVERED_PROJECT_ERROR: {
      return {
        ...state,
        refreshdeliveredProjectList: false,
        isLoading: false,
      };
    }

    case dashboardMap.DELIVERED_PROJECT_BATCH_NUMBER: {
      return {
        ...state,
        deliveredProjectLimit: action.payload,
        refreshdeliveredProjectList: true,
      };
    }

    case dashboardMap.GET_EXPIRED_PROJECT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_EXPIRED_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshExpiredProjectList: false,
        projectsExpired: action.payload,
      };
    }
    case dashboardMap.GET_EXPIRED_PROJECT_ERROR: {
      return {
        ...state,
        refreshExpiredProjectList: false,
        isLoading: false,
      };
    }

    case dashboardMap.EXPIRED_PROJECT_BATCH_NUMBER: {
      return {
        ...state,
        expiredProjectLimit: action.payload,
        refreshExpiredProjectList: true,
      };
    }

    case dashboardMap.GET_ALL_PACKAGES_INPROGRESS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_INPROGRESS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        //refreshExpiredProjectList: false,
        inprogressCol: action.payload,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_INPROGRESS_ERROR: {
      return {
        ...state,
        //refreshExpiredProjectList: false,
        isLoading: false,
      };
    }

    case dashboardMap.GET_ALL_PACKAGES_SUBMITTED_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_SUBMITTED_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        //refreshExpiredProjectList: false,
        submittedCol: action.payload,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_SUBMITTED_ERROR: {
      return {
        ...state,
        //refreshExpiredProjectList: false,
        isLoading: false,
      };
    }

    case dashboardMap.GET_ALL_PACKAGES_EXPIRED_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_EXPIRED_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        //refreshExpiredProjectList: false,
        expiredCol: action.payload,
      };
    }
    case dashboardMap.GET_ALL_PACKAGES_EXPIRED_ERROR: {
      return {
        ...state,
        //refreshExpiredProjectList: false,
        isLoading: false,
      };
    }

    default:
      return { ...state };
  }
};

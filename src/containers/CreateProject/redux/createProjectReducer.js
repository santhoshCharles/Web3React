import { CreateProjectMap } from "./createProjectAction";
import { observerListConstant } from "../../ProjectDetails/redux/observerListAction";

const initialState = {
  createProjectModal: false,
  isLoading: false,
  isSaving: false,
  projectDetail: {},
  reDirect: false,
  getAllPackages: [],
  refreshGetAllPackages: true,
  selectedProject: {},
  refreshFaqList: true,
  getAllFaqs: {},
  skip: 0,
  limit: 5,
  finishProjectLoading: false,
  deleteProjectLoading: false,
  finishProjectResponse: {},
  refreshProjectDetail: false,
  masterData: [],
  collaboratorSkip: 0,
  collaboratorLimit: 5,
  collaboratorListData: [],
  refreshCollaboratorList: true,
  projectInitiated: false,
  packageCollaborators: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CreateProjectMap.OPEN_CREATE_PROJECT_MODAL: {
      return {
        ...state,
        createProjectModal: true,
      };
    }
    case CreateProjectMap.CLOSE_CREATE_PROJECT_MODAL: {
      return {
        ...state,
        createProjectModal: false,
      };
    }
    case CreateProjectMap.CREATE_PROJECT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CreateProjectMap.CREATE_PROJECT_SUCCESS: {
      return {
        ...state,
        createProjectModal: true,
        isLoading: false,
        selectedProject: {
          ...state.selectedProject,
          ...action.payload,
        },
      };
    }
    case CreateProjectMap.CREATE_PROJECT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CreateProjectMap.CREATE_PROJECT_SC_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CreateProjectMap.CREATE_PROJECT_SC_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CreateProjectMap.GET_PROJECT_DETAILS_START: {
      return {
        ...state,
        //isLoading: true,
        getAllPackages: [],
      };
    }
    case CreateProjectMap.GET_PROJECT_DETAILS_SUCCESS: {
      return {
        ...state,
        projectDetail: action.payload,
        isLoading: false,
        refreshGetAllPackages: true,
      };
    }
    case CreateProjectMap.GET_PROJECT_DETAILS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CreateProjectMap.UPDATE_PROJECT_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CreateProjectMap.UPDATE_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        projectDetail: action.payload,
        selectedProject: {
          ...state.selectedProject,
          ...action.payload,
        },
        refreshGetAllPackages: true,
      };
    }
    case CreateProjectMap.UPDATE_PROJECT_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CreateProjectMap.ADD_PACKAGES_START: {
      return {
        ...state,
        isSaving: true,
      };
    }
    case CreateProjectMap.ADD_PACKAGES_SUCCESS: {
      return {
        ...state,
        isSaving: false,
        redirect: true,
        refreshGetAllPackages: true,
        createProjectModal: false,
        refreshProjectDetail: true,
      };
    }
    case CreateProjectMap.ADD_PACKAGES_SC_START: {
      return {
        ...state,
        isSaving: true,
      };
    }
    case CreateProjectMap.ADD_PACKAGES_SC_SUCCESS: {
      return {
        ...state,
        isSaving: false
      };
    }
    case CreateProjectMap.ADD_PACKAGES_ERROR: {
      return {
        ...state,
        isSaving: false,
      };
    }
    case CreateProjectMap.GET_ALL_PACKAGES_START: {
      return {
        ...state,
        refreshGetAllPackages: true,
        isLoading: true,
      };
    }
    case CreateProjectMap.GET_ALL_PACKAGES_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getAllPackages: action.payload,
        refreshGetAllPackages: false,
      };
    }
    case CreateProjectMap.GET_ALL_PACKAGES_ERROR: {
      return {
        ...state,
        isLoading: false,
        refreshGetAllPackages: false,
      };
    }
    case CreateProjectMap.SET_SELECTED_PROJECT: {
      return {
        ...state,
        selectedProject: action.payload,
      };
    }
    case CreateProjectMap.RESET_PROJECT_DETAIL: {
      return {
        ...state,
        projectDetail: {},
      };
    }
    case CreateProjectMap.GET_ALL_PROJECT_FAQS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CreateProjectMap.GET_ALL_PROJECT_FAQS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        getAllFaqs: action.payload,
        refreshFaqList: false,
      };
    }
    case CreateProjectMap.GET_ALL_PROJECT_FAQS_ERROR: {
      return {
        ...state,
        isLoading: false,
        getAllFaqs: {},
      };
    }
    case CreateProjectMap.SET_FAQ_BATCH_NUMBER: {
      return {
        ...state,
        //isLoading: false,
        skip: action.payload,
        refreshFaqList: true,
      };
    }
    case CreateProjectMap.FINISH_PROJECT_START: {
      return {
        ...state,
        finishProjectLoading: true,
        refreshProjectDetail: false,
      };
    }
    case CreateProjectMap.FINISH_PROJECT_SUCCESS: {
      return {
        ...state,
        finishProjectLoading: false,
        refreshProjectDetail: true,
        finishProjectResponse: action.payload,
      };
    }
    case CreateProjectMap.FINISH_PROJECT_ERROR: {
      return {
        ...state,
        finishProjectLoading: false,
        refreshProjectDetail: true,
        finishProjectResponse: action.payload,
      };
    }
    case CreateProjectMap.DELETE_PROJECT_START: {
      return {
        ...state,
        deleteProjectLoading: true,
        refreshProjectDetail: false,
      };
    }
    case CreateProjectMap.DELETE_PROJECT_SUCCESS: {
      return {
        ...state,
        deleteProjectLoading: false,
        refreshProjectDetail: true,
        deleteProjectResponse: action.payload,
      };
    }
    case CreateProjectMap.DELETE_PROJECT_ERROR: {
      return {
        ...state,
        deleteProjectLoading: false,
        refreshProjectDetail: true,
        deleteProjectResponse: action.payload,
      };
    }
    case CreateProjectMap.FINISH_PROJECT_SC_START: {
      return {
        ...state,
        finishProjectLoading: true
      };
    }
    case CreateProjectMap.FINISH_PROJECT_SC_SUCCESS: {
      return {
        ...state,
        finishProjectLoading: false
      };
    }
    case CreateProjectMap.MASTER_DETAILS_START: {
      return {
        ...state,
        // isLoading: true
      };
    }
    case CreateProjectMap.MASTER_DETAILS_SUCCESS: {
      return {
        ...state,
        //isLoading: false,
        masterData: action.payload,
      };
    }
    case CreateProjectMap.MASTER_DETAILS_ERROR: {
      return {
        ...state,
        //isLoading: false,
      };
    }
    case CreateProjectMap.ADD_FAQ_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CreateProjectMap.ADD_FAQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshFaqList: true,
      };
    }
    case CreateProjectMap.ADD_FAQ_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CreateProjectMap.EDIT_FAQ_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CreateProjectMap.EDIT_FAQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshFaqList: true,
      };
    }
    case CreateProjectMap.EDIT_FAQ_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CreateProjectMap.DELETE_FAQ_START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CreateProjectMap.DELETE_FAQ_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshFaqList: true,
      };
    }
    case CreateProjectMap.DELETE_FAQ_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CreateProjectMap.GET_COLLABORATOR_LIST_START: {
      return {
        ...state,
        isCollaboratorListLoading: true,
      };
    }
    case CreateProjectMap.GET_COLLABORATOR_LIST_SUCCESS: {
      return {
        ...state,
        isCollaboratorListLoading: false,
        collaboratorListData: action.payload,
        refreshCollaboratorList: false,
      };
    }
    case CreateProjectMap.GET_COLLABORATOR_LIST_ERROR: {
      return {
        ...state,
        isCollaboratorListLoading: false,
      };
    }

    case CreateProjectMap.SET_COLLABORATOR_LIST_BATCH_NUMBER: {
      return {
        ...state,
        //isLoading: false,
        collaboratorSkip: action.payload,
        refreshCollaboratorList: true,
      };
    }
    case CreateProjectMap.RESET_COLLABORATOR_LIST: {
      return {
        ...state,
        collaboratorListData: [],
        refreshCollaboratorList: true,
      };
    }

    case CreateProjectMap.UPDATE_PACKAGES_START: {
      return {
        ...state,
        isLoading: true,
        isSaving: true,
      };
    }
    case CreateProjectMap.UPDATE_PACKAGES_SUCCESS: {
      return {
        ...state,
        isSaving: false,
        isLoading: false,
        refreshGetAllPackages: true,
        refreshCollaboratorList: true,
      };
    }
    case CreateProjectMap.UPDATE_PACKAGES_ERROR: {
      return {
        ...state,
        isSaving: false,
        isLoading: false,
        isCollaboratorListLoading: true,
      };
    }

    case CreateProjectMap.REMOVE_COLLABORATOR_START: {
      return {
        ...state,
        isCollaboratorListLoading: true,
      };
    }

    case CreateProjectMap.REMOVE_COLLABORATOR_SUCCESS: {
      return {
        ...state,
        isCollaboratorListLoading: false,
        refreshCollaboratorList: true,
      };
    }
    case CreateProjectMap.REMOVE_COLLABORATOR_ERROR: {
      return {
        ...state,
        isCollaboratorListLoading: false,
      };
    }

    case CreateProjectMap.CANCEL_WORKTASK_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CreateProjectMap.CANCEL_WORKTASK_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        refreshGetAllPackages: true,
      };
    }
    case CreateProjectMap.CANCEL_WORKTASK_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CreateProjectMap.RESET_REFRESH_PROJECT_DETAILS: {
      return {
        ...state,
        isLoading: false,
        refreshProjectDetail: false,
      };
    }
    case CreateProjectMap.INITIATE_PROJECT_START: {
      return {
        ...state,
        isLoading: true,
        projectInitiated: true,
      };
    }

    case CreateProjectMap.INITIATE_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        projectInitiated: false,
      };
    }
    case CreateProjectMap.INITIATE_PROJECT_SC_START: {
      return {
        ...state,
        isLoading: true,
        projectInitiated: true,
      };
    }

    case CreateProjectMap.INITIATE_PROJECT_SC_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        projectInitiated: false,
      };
    }
    case CreateProjectMap.INITIATE_PROJECT_ERROR: {
      return {
        ...state,
        isLoading: false,
        projectInitiated: false,
      };
    }

    case CreateProjectMap.RESET_INITIATOR_FLAG: {
      return {
        ...state,
        projectInitiated: false,
      };
    }

    case CreateProjectMap.REVIEW_COLLABORATOR_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CreateProjectMap.REVIEW_COLLABORATOR_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case CreateProjectMap.REVIEW_COLLABORATOR_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case observerListConstant.ADD_OBSERVER_SUCCESS: {
      return {
        ...state,
        projectDetail: {
          ...state.projectDetail,
          totalTeamMembers: state.projectDetail.totalTeamMembers.concat([
            action.payload,
          ]),
        },
      };
    }
    case observerListConstant.REMOVE_OBSERVER_SUCCESS: {
      return {
        ...state,
        projectDetail: {
          ...state.projectDetail,
          totalTeamMembers: state.projectDetail.totalTeamMembers.filter(
            ({ _id }) => _id !== action.payload
          ),
        },
      };
    }

    case CreateProjectMap.GET_PACKAGE_COLLABORATORS_START: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CreateProjectMap.GET_PACKAGE_COLLABORATORS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        packageCollaborators: action.payload,
      };
    }
    case CreateProjectMap.GET_PACKAGE_COLLABORATORS_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return { ...state };
  }
};

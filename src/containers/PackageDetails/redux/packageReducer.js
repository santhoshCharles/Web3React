import { PackageMap } from "./packageAction";

const initialState = {
  packageDetail: {},
  isLoading: false,
  packageJoined: false,
  joinPackage: {},
  requestLoading: false,
  workStartLoading: false,
  workSubmitLoading: false,
  refreshPackageDetail: true,
  withdrawPackageLoading: false,
  finishPackageLoading: false,
  finishpackageResponse: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PackageMap.GET_PACKAGE_DETAIL_START: {
      return {
        ...state,
        isLoading: true
      };
    }
    case PackageMap.GET_PACKAGE_DETAIL_SUCCESS: {
      return {
        ...state,
        packageDetail: action.payload,
        isLoading: false,
      };
    }
    case PackageMap.GET_PACKAGE_DETAIL_ERROR: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case PackageMap.JOIN_PACKAGE_START: {
      return {
        ...state,
        requestLoading: true
      };
    }
    case PackageMap.JOIN_PACKAGE_SUCCESS: {
      return {
        ...state,
        packageJoined: true,
        joinPackage: action.payload,
        requestLoading: false
      };
    }
    case PackageMap.JOIN_PACKAGE_ERROR: {
      return {
        ...state,
        requestLoading: false
      };
    }
    case PackageMap.RESET_JOIN_PACKAGE_INFO: {
      return {
        ...state,
        joinPackage: {}
      };
    }

    case PackageMap.RESET_JOIN_PACKAGE_FLAG: {
      return {
        ...state,
        packageJoined: false,
        finishpackageResponse: {}
      };
    }

    case PackageMap.WORK_PACKAGE_START: {
      return {
        ...state,
        workStartLoading: true,
        refreshPackageDetail: false,
      };
    }
    case PackageMap.WORK_PACKAGE_SUCCESS: {
      return {
        ...state,
        workStartLoading: false,
        refreshPackageDetail: true,
      };
    }
    case PackageMap.WORK_PACKAGE_ERROR: {
      return {
        ...state,
        workStartLoading: false,
        refreshPackageDetail: true,
      };
    }

    case PackageMap.WORK_PACKAGE_SUBMIT_START: {
      return {
        ...state,
        workSubmitLoading: true,
        refreshPackageDetail: false,
      };
    }
    case PackageMap.WORK_PACKAGE_SUBMIT_SUCCESS: {
      return {
        ...state,
        workSubmitLoading: false,
        refreshPackageDetail: true,
      };
    }
    case PackageMap.WORK_PACKAGE_SUBMIT_ERROR: {
      return {
        ...state,
        workSubmitLoading: false,
        refreshPackageDetail: true,
      };
    }

    case PackageMap.WITHDRAW_PACKAGE_START: {
      return {
        ...state,
        withdrawPackageLoading: true,
        refreshPackageDetail: false
      };
    }
    case PackageMap.WITHDRAW_PACKAGE_SUCCESS: {
      return {
        ...state,
        withdrawPackageLoading: false,
        refreshPackageDetail: true
      };
    }
    case PackageMap.WITHDRAW_PACKAGE_ERROR: {
      return {
        ...state,
        withdrawPackageLoading: false,
        refreshPackageDetail: true
      };
    }

    case PackageMap.FINISH_PACKAGE_START: {
      return {
        ...state,
        finishPackageLoading: true,
        refreshPackageDetail: false
      };
    }
    case PackageMap.FINISH_PACKAGE_SUCCESS: {
      return {
        ...state,
        finishPackageLoading: false,
        refreshPackageDetail: true,
        finishpackageResponse: action.payload
      };
    }
    case PackageMap.FINISH_PACKAGE_ERROR: {
      return {
        ...state,
        finishPackageLoading: false,
        refreshPackageDetail: true,
        finishpackageResponse: action.payload
      };
    }

    case PackageMap.FINISH_PACKAGE_SC_START: {
      return {
        ...state,
        finishPackageLoading: true
      };
    }
    case PackageMap.FINISH_PACKAGE_SC_SUCCESS: {
      return {
        ...state,
        finishPackageLoading: false
      };
    }
    

    default:
      return { ...state };
  }
};

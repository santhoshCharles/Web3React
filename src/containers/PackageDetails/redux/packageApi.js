import axios from "axios";
import { PackageActions } from "./packageAction";
import { toast } from "react-toastify";

// const getUserURL = (state) => {
//   return state.environnment.environmentLists.userBaseURL;
// };

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

export const getPackageAsync = (projectId, PackageId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(PackageActions.getProjectDetailStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getPackageDetails/${_id}/${projectId}/${PackageId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          PackageActions.getProjectDetailSuccess(data.responseData)
        );
      }
      dispatch(PackageActions.getProjectDetailError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PackageActions.getProjectDetailError());
      return toast.error(
        " Error while fetching package. Please try again after sometime."
      );
    }
  };
};

export const joinPackageAsync = (projectId, PackageId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(PackageActions.joinPackageStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/joinPackage/${_id}/${projectId}/${PackageId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          PackageActions.joinPackageSuccess(data.responseData)
        );
      }
      dispatch(PackageActions.joinPackageError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PackageActions.joinPackageError());
      return toast.error(
        " Error while joining package. Please try again after sometime."
      );
    }
  };
};

export const workPackageStartAsync = (projectId, PackageId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(PackageActions.workPackageStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/startWork/${_id}/${projectId}/${PackageId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(
          PackageActions.workPackageSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }
      dispatch(PackageActions.workPackageError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PackageActions.workPackageError());
      return toast.error(
        "Getting Error while starting the package work. Please try again after sometime."
      );
    }
  };
};

export const workPackageSubmitAsync = (projectId, PackageId, workId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(PackageActions.workPackageSubmitStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/submitWork/${_id}/${projectId}/${PackageId}/${workId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(
          PackageActions.workPackageSubmitSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }
      dispatch(PackageActions.workPackageSubmitError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PackageActions.workPackageSubmitError());
      return toast.error(
        "Getting Error while submitting the package work. Please try again after sometime."
      );
    }
  };
};

export const finishPackageAsync = (projectId, packageId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(PackageActions.finishPackageStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/finishPackage/${_id}/${projectId}/${packageId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          PackageActions.finishPackageSuccess(data)
        );
        toast.success(data.responseMessage);
      }
      dispatch(PackageActions.finishPackageError(data));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PackageActions.finishPackageError());
      return toast.error(
        "Getting Error while finish package. Please try again after sometime."
      );
    }
  }
}

export const updateFinishStatusAsync = (projectId, packageId, status) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/updateFinishStatus/${_id}/${projectId}/${packageId}/${status}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return true
    } catch (error) {
      return false
    }
  }
}

export const withdrawPackageAsync = (projectId, packageId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(PackageActions.withdrawPackageStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/withdrawPackage/${_id}/${projectId}/${packageId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(
          PackageActions.withdrawPackageSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }
      dispatch(PackageActions.withdrawPackageError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PackageActions.withdrawPackageError());
      return toast.error(
        "Getting Error while cancel application. Please try again after sometime."
      );
    }
  }
}

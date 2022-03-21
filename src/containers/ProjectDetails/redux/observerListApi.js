import axios from "axios";
import { observerListActions } from "./observerListAction";
import { getUserURL, getCommonBaseURL, getMasterData } from "../../../utils";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API;

export const addObserver = (projectId, dataObj, user) => {
  console.log({projectId, dataObj, user})
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(observerListActions.addObserverStart());

      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/addObserver/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: dataObj,
      });

      if (data.responseCode === 200) {
        dispatch(observerListActions.addObserverSuccess(user));
        toast.success(data.responseMessage);
        return data;
      }

      dispatch(observerListActions.addObserverError(data.responseMessage));
      toast.error(data.responseMessage);
      return data;
    } catch (error) {
      dispatch(observerListActions.addObserverError(error));
    }
  };
};

export const updateObserver = (projectId, dataObj) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(observerListActions.updateObserverStart());

      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/updateObserver/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: dataObj,
      });

      if (data.responseCode === 200) {
        dispatch(observerListActions.updateObserverSuccess());
        return toast.success(data.responseMessage);
      }

      dispatch(observerListActions.updateObserverError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(observerListActions.updateObserverError(error));
    }
  };
};

export const getAllusers = () => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(observerListActions.getAllUsersStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/getAllusers/${_id}?search=`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          observerListActions.getAllUsersSuccess(data.responseData)
        );
      }

      dispatch(observerListActions.getAllUsersError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(observerListActions.getAllUsersError(error));
    }
  };
};

export const getMasterDetails = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      dispatch(observerListActions.masterDetailsStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/getMasterDetails?id=${_id}`,
      });
      if (data.responseCode === 200) {
        const observerRoles = getMasterData(
          "Observers Roles",
          data.responseData
        );
        const skills = getMasterData("Skills", data.responseData);

        return dispatch(
          observerListActions.masterDetailsSuccess({
            observerRoles,
            skills,
          })
        );
      }
      return dispatch(observerListActions.masterDetailsError());
    } catch (error) {
      dispatch(observerListActions.masterDetailsError());
      return toast.error(
        " Error while fetching observer roles. Please try again after sometime."
      );
    }
  };
};

export const getObserverList = (projectId) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};
      let { observerSkip, observerLimit } = getState().projectList;

      dispatch(observerListActions.getObserverListStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/getObserverList/${_id}/${projectId}?skip=${observerSkip}&limit=${observerLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          observerListActions.getObserverListSuccess(data.responseData)
        );
      }

      dispatch(observerListActions.getObserverListError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(observerListActions.getObserverListError(error));
    }
  };
};

export const removeObserver = (projectId, userId) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(observerListActions.removeObserverStart());

      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/removeObserver/${_id}/${projectId}/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(observerListActions.removeObserverSuccess(userId));
        return toast.success(data.responseMessage);
      }

      dispatch(observerListActions.removeObserverError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(observerListActions.removeObserverError(error));
    }
  };
};

export const getObserverDetails = (projectId, userId) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(observerListActions.getObserverDetailsStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/getObserverDetails/${_id}/${projectId}/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          observerListActions.getObserverDetailsSuccess(data.responseData)
        );
      }

      dispatch(
        observerListActions.getObserverDetailsError(data.responseMessage)
      );
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(observerListActions.getObserverDetailsError(error));
    }
  };
};

export const collaboratorsList = (projectId, packageId, colaboratorsId) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(observerListActions.collaboratorRatingStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${
          process.env.REACT_APP_USER_BASE_URL
        }/getPackageCollaborators/${_id}/${projectId}/${packageId}?colaboratorsId=${
          colaboratorsId ? _id : ""
        }`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          observerListActions.collaboratorRatingSuccess(data.responseData)
        );
      }

      dispatch(
        observerListActions.collaboratorRatingError(data.responseMessage)
      );
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(observerListActions.collaboratorRatingError(error));
    }
  };
};

export const submitCollaboratorRatingAsync = (
  dataObj,
  projectId,
  packageId
) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(observerListActions.submitCollaboratorRatingStart());

      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/submitCollaboratorRating/${_id}/${projectId}/${packageId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: dataObj,
      });

      if (data.responseCode === 200) {
        dispatch(observerListActions.submitCollaboratorRatingSuccess());

        toast.success(data.responseMessage);
        return data;
      }

      dispatch(
        observerListActions.submitCollaboratorRatingError(data.responseMessage)
      );
      toast.error(data.responseMessage);
      return data;
    } catch (error) {
      dispatch(observerListActions.submitCollaboratorRatingError(error));
    }
  };
};

import axios from "axios";
import { deliverableActions } from "./deliverableAction";
import { toast } from "react-toastify";

const getCommonBaseURL = (state) => {
  return state.environnment.environmentLists.commonBaseURL;
};
const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

export const getDeliverableTaskDataAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(deliverableActions.getDeliverableTaskDataStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getTaskList/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          deliverableActions.getDeliverableTaskDataSuccess(data.responseData)
        );
      }
      dispatch(deliverableActions.getDeliverableTaskDataError(data));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(deliverableActions.getDeliverableTaskDataError());
      return toast.error(
        " Error while fetching Task list. Please try again after sometime."
      );
    }
  };
};

export const uploadFileToS3 = (formData) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(deliverableActions.uploadFileStart());
      let { _id } = getState().auth.user;

      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
        data: formData,
      });
      if (data.responseCode === 200) {
        dispatch(deliverableActions.uploadFileSuccess(data));
        return data;
      }
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(deliverableActions.uploadFileError());
      return toast.error(
        " Error while uploading file. Please try again after sometime."
      );
    }
  };
};

export const submitDeliverablesAsync = (projectId, deliverables) => {
  console.log({deliverables})
  return async (dispatch, getState) => {
    try {
      dispatch(deliverableActions.deliverablesStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/submitDeliverable/${_id}/${projectId}/${deliverables.selectTask}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: deliverables,
      });

      if (data.responseCode === 200) {
        dispatch(deliverableActions.deliverablesSuccess(data));
        //toast.success(data.responseMessage);
        return data;
      }
      dispatch(deliverableActions.deliverablesError());
      toast.error(data.responseMessage);
      return data;
    } catch (error) {
      console.log(error, "error");
      dispatch(deliverableActions.deliverablesError());
      return toast.error(
        " Error while posting  deliverables. Please try again after sometime."
      );
    }
  };
};

export const getDeliverableListDataAsync = (params) => {
  return async (dispatch, getState) => {
    try {
      dispatch(deliverableActions.getDeliverableListDataStart());
      let { _id } = getState().auth.user;
      let { skip, limit } = getState().deliverables;

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllDeliverables/${_id}?packageId=${params.packageId}&skip=${skip}&limit=${limit}&view=${params.view}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          deliverableActions.getDeliverableListDataSuccess(data.responseData)
        );
      }
      dispatch(deliverableActions.getDeliverableListDataError(data));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(deliverableActions.getDeliverableListDataError());
      return toast.error(
        " Error while fetching deliverables list. Please try again after sometime."
      );
    }
  };
};

export const getPackageCollaborators = (projectId, packageId, colaboratorsId) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(deliverableActions.getPackageCollaboratorStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL
          }/getPackageCollaborators/${_id}/${projectId}/${packageId}?colaboratorsId=${colaboratorsId ? _id : ""
          }`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          deliverableActions.getPackageCollaboratorSuccess(data.responseData)
        );
      }

      dispatch(
        deliverableActions.getPackageCollaboratorError(data.responseMessage)
      );
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(deliverableActions.getPackageCollaboratorError(error));
    }
  };
};

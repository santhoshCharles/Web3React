import axios from "axios";
import { dashboardActions } from "./dashboardAction";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

export const getAwaitingApprovalAsync = () => {
  
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getAwaitingApprovalStart());
      let { _id } = getState().auth.user;
      let { awaitingListLimit } = getState().dashboardDetail;
      
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllProjectRequestReceived/${_id}?skip=0&limit=${awaitingListLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getAwaitingApprovalSuccess(data.responseData)
        );
      }
      dispatch(dashboardActions.getAwaitingApprovalError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getAwaitingApprovalError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};

export const getAllPackagesRequestReceived = (projectId, mode) => {
  
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getAllPackagesRequestReceivedStart());
      let { _id } = getState().auth.user;
      let { packageListLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllPackageRequestReceived/${_id}/${projectId}?skip=0&limit=${packageListLimit}&mode=${mode}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getAllPackagesRequestReceivedSuccess(
            data.responseData
          )
        );
      }
      dispatch(dashboardActions.getAllPackagesRequestReceivedError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getAllPackagesRequestReceivedError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};

export const getAllPackagesRequestReceivedCol = (projectId, mode) => {
  
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getAllPackagesRequestReceivedStart());
      let { _id } = getState().auth.user;
      let { packageListLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllPackageRequestReceivedCol/${_id}/${projectId}?skip=0&limit=${packageListLimit}&mode=${mode}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getAllPackagesRequestReceivedSuccess(
            data.responseData
          )
        );
      }
      dispatch(dashboardActions.getAllPackagesRequestReceivedError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getAllPackagesRequestReceivedError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};

export const getAllUserRequestReceived = (projectId, packageId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getAllUserRequestReceivedStart());
      let { _id } = getState().auth.user;
      let { requestListSkip, requestListLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getUserRequestReceived/${_id}/${projectId}/${packageId}?skip=${requestListSkip}&limit=${requestListLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getAllUserRequestReceivedSuccess(data.responseData)
        );
      }
      dispatch(dashboardActions.getAllUserRequestReceivedError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getAllUserRequestReceivedError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};

export const acceptRejectRequest = (projectId, packageId, userId, status) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.acceptRejectRequestStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/updateJoinRequest/${_id}/${projectId}/${packageId}/${userId}/${status}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(
          dashboardActions.acceptRejectRequestSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }
      dispatch(dashboardActions.acceptRejectRequestError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.acceptRejectRequestError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};

export const getAplicantProfileAsync = (applicantId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getApplicantProfileStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getProfileDetails/${_id}/${applicantId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getApplicantProfileSuccess(data.responseData)
        );
      }
      dispatch(dashboardActions.getApplicantProfileError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getApplicantProfileError());
      return toast.error(
        " Error while fetching applicant profile. Please try again after sometime."
      );
    }
  };
};

export const getOpenProjectsAsync = (mode) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getOpenProjectsStart());
      let { _id } = getState().auth.user;
      let { openProjectLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllOpenProject/${_id}?skip=0&limit=${openProjectLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getOpenProjectsSuccess(data.responseData, mode)
        );
      }
      dispatch(dashboardActions.getOpenProjectsError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getOpenProjectsError());
      return toast.error(
        " Error while fetching Open projects. Please try again after sometime."
      );
    }
  };
};

export const getCompletedProjectsAsync = (mode) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getCompletedProjectsStart());
      let { _id } = getState().auth.user;
      let { completedProjectLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllCompletedProject/${_id}?skip=0&limit=${completedProjectLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getCompletedProjectsSuccess(data.responseData, mode)
        );
      }
      dispatch(dashboardActions.getCompletedProjectsError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getCompletedProjectsError());
      return toast.error(
        " Error while fetching completed projects. Please try again after sometime."
      );
    }
  };
};

export const getdeliveredProjectsAsync = (mode) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getDeliveredProjectsStart());
      let { _id } = getState().auth.user;
      let { deliveredProjectLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllDeliveredProject/${_id}?skip=0&limit=${deliveredProjectLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getDeliveredProjectSuccess(data.responseData, mode)
        );
      }
      dispatch(dashboardActions.getDeliveredProjectError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getDeliveredProjectError());
      return toast.error(
        " Error while fetching delivered projects. Please try again after sometime."
      );
    }
  };
};

export const getExpiredProjectsAsync = (mode) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getExpiredProjectsStart());
      let { _id } = getState().auth.user;
      let { expiredProjectLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllExpiredProject/${_id}?skip=0&limit=${expiredProjectLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getExpiredProjectSuccess(data.responseData, mode)
        );
      }
      dispatch(dashboardActions.getExpiredProjectError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getExpiredProjectError());
      return toast.error(
        " Error while fetching expired projects. Please try again after sometime."
      );
    }
  };
};


export const getOpenProjectsColAsync = (mode) => {
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getOpenProjectsColStart());
      let { _id } = getState().auth.user;
      let { openProjectColLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllOpenProjectsCol/${_id}?skip=0&limit=10`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getOpenProjectsColSuccess(data.responseData, mode)
        );
      }
      dispatch(dashboardActions.getOpenProjectsColError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getOpenProjectsColError());
      return toast.error(
        " Error while fetching Open projects. Please try again after sometime."
      );
    }
  };
};


export const getAllInProgressProjectsColAsync = (mode) => {
  
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getAllInProgressProjectsColStart());
      let { _id } = getState().auth.user;
      let { packageListLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllInProgressProjectsCol/${_id}?skip=0&limit=10`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getAllInProgressProjectsColSuccess(
            data.responseData
          )
        );
      }
      dispatch(dashboardActions.getAllInProgressProjectsColError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getAllInProgressProjectsColError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};

export const getAllSubmittedProjectsColAsync = (mode) => {
  
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getAllSubmittedProjectsColStart());
      let { _id } = getState().auth.user;
      let { packageListLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllSubmittedProjectsCol/${_id}?skip=0&limit=10`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getAllSubmittedProjectsColSuccess(
            data.responseData
          )
        );
      }
      dispatch(dashboardActions.getAllSubmittedProjectsColError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getAllSubmittedProjectsColError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};

export const getAllExpiredProjectsColAsync = (mode) => {
  
  return async (dispatch, getState) => {
    try {
      dispatch(dashboardActions.getAllExpiredProjectsColStart());
      let { _id } = getState().auth.user;
      let { packageListLimit } = getState().dashboardDetail;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllExpiredProjectsCol/${_id}?skip=0&limit=10`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          dashboardActions.getAllExpiredProjectsColSuccess(
            data.responseData
          )
        );
      }
      dispatch(dashboardActions.getAllExpiredProjectsColError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(dashboardActions.getAllExpiredProjectsColError());
      return toast.error(
        " Error while fetching requests. Please try again after sometime."
      );
    }
  };
};
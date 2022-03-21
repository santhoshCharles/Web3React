import axios from "axios";
import { PaymentDashboardActions } from "./paymentDashboardAction";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

export const getCurrentWorkTaskAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(PaymentDashboardActions.getCurrentWorkTaskStart());
      let { _id } = getState().auth.user;
      let { worktaskSkip, workTasksLimit } = getState().paymentDashboard;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getCurrentWorkTask/${_id}?skip=${worktaskSkip}&limit=${workTasksLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          PaymentDashboardActions.getCurrentWorkTaskSuccess(data.responseData)
        );
      }
      dispatch(PaymentDashboardActions.getCurrentWorkTaskError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PaymentDashboardActions.getCurrentWorkTaskError());
      return toast.error(
        "Getting Error while getting current workTask. Please try again after sometime."
      );
    }
  };
};

export const getTransactionHistoryAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(PaymentDashboardActions.getTransactionHistoryStart());
      let { _id } = getState().auth.user;
      let { transactionSkip, transactionLimit } = getState().paymentDashboard;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getTransactionHistory/${_id}?skip=${transactionSkip}&limit=${transactionLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          PaymentDashboardActions.getTransactionHistorySuccess(
            data.responseData
          )
        );
      }
      dispatch(PaymentDashboardActions.getTransactionHistoryError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PaymentDashboardActions.getTransactionHistoryError());
      return toast.error(
        "Getting Error while getting transaction history. Please try again after sometime."
      );
    }
  };
};

export const getCurrentWorkTaskInitiatorAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(PaymentDashboardActions.getCurrentWorkTaskInitiatorStart());
      let { _id } = getState().auth.user;
      let { worktaskSkipIn, workTasksLimitIn } = getState().paymentDashboard;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getCurrentWorkTaskInitiator/${_id}?skip=${worktaskSkipIn}&limit=${workTasksLimitIn}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          PaymentDashboardActions.getCurrentWorkTaskInitiatorSuccess(data.responseData)
        );
      }
      dispatch(PaymentDashboardActions.getCurrentWorkTaskInitiatorError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PaymentDashboardActions.getCurrentWorkTaskInitiatorError());
      return toast.error(
        "Getting Error while getting current workTask. Please try again after sometime."
      );
    }
  };
};

export const getDeliveredWorkTaskInitiatorAsync = () => {
  return async (dispatch, getState) => {
    try {
      dispatch(PaymentDashboardActions.getDeliveredWorkTaskStart());
      let { _id } = getState().auth.user;
      let { deliveredworktaskSkipIn, deliveredworkTasksLimitIn } = getState().paymentDashboard;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getDeliveredWorkTaskInitiator/${_id}?skip=${deliveredworktaskSkipIn}&limit=${deliveredworkTasksLimitIn}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          PaymentDashboardActions.getDeliveredWorkTaskSuccess(data.responseData)
        );
      }
      dispatch(PaymentDashboardActions.getDeliveredWorkTaskError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(PaymentDashboardActions.getDeliveredWorkTaskError());
      return toast.error(
        "Getting Error while getting delivered workTask. Please try again after sometime."
      );
    }
  };
};
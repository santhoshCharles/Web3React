import axios from "axios";
import { AuthActions } from "./authAction";
import { addUserDetails } from "./userInformation";
import { toast } from "react-toastify";
import socket from "../../../components/Socket/Socket";
import { UserProfileActions } from "../../Profile/redux/userProfileAction";

// const getUserURL = (state) => {
//   return state.environnment.environmentLists.userBaseURL;
// };
const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

const getErrorMsg = (data) => {
  if (data.response) {
    return data.response.responseMessage || data.response.message;
  }
  if (data.responseMessage) {
    return data.responseMessage;
  }
  if (data.error) {
    return data.error.errors[0].message;
  }
  return "Login Error.";
};

export const loginAsync = (user) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.loginStart());
      const newUserDetails = await addUserDetails(user);
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/login`,
        data: newUserDetails,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(AuthActions.loginSuccess(data.responseData));
      }
      dispatch(AuthActions.loginError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      console.log(error, "error");
      dispatch(AuthActions.loginError());
      return toast.error("Error while login in.");
    }
  };
};

export const logoutAsync = (callback) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.logoutStart());
      let { _id, loginActivity } = getState().auth.user;
      const loginActivityID = loginActivity[loginActivity.length - 1]._id;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/logout/${_id}/${loginActivityID}`,
      });
      if (data.responseCode === 200) {
        localStorage.clear();
        dispatch(AuthActions.logout());
        dispatch(UserProfileActions.resetUserProfile());
        callback()
        return toast.success(data.responseMessage);
      }
      dispatch(AuthActions.logoutError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      return dispatch(AuthActions.logout());
      /* return toast.error(
        "Error while logout. Please try again after sometime."
      ); */
    }
  };
};

export const forgotPasswordAsync = (emailId, handleCloseForgot) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.forgotPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/forgotPassword`,
        data: emailId,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.forgotPasswordSuccess(data.responseData));
        handleCloseForgot();
        return toast.success(data.responseMessage);
      }
      toast.error(data.responseMessage);
      return dispatch(AuthActions.forgotPasswordError(getErrorMsg(data)));
    } catch (error) {
      dispatch(AuthActions.forgotPasswordError());
      return toast.error("Error while sending link to your e-mail id.");
    }
  };
};

export const setNewPasswordAsync = ({ resetToken, password }) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.setNewPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/setNewPassword/${resetToken}`,
        data: { password },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(AuthActions.setNewPasswordSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      return dispatch(AuthActions.setNewPasswordError(getErrorMsg(data)));
    } catch (error) {
      return dispatch(AuthActions.setNewPasswordError());
    }
  };
};

export const resetPasswordAsync = ({ oldPassword, newPassword }) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(AuthActions.resetPasswordStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/resetPassword/${_id}`,
        data: { oldPassword, newPassword },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(AuthActions.resetPasswordSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      toast.error(getErrorMsg(data));
      return dispatch(AuthActions.resetPasswordError(getErrorMsg(data)));
    } catch (error) {
      toast.error("Error while reseting password.");
      return dispatch(AuthActions.resetPasswordError());
    }
  };
};

export const verifyLoginSecurityCodeAsync = (
  code,
  firstTimeLoginMessage,
  referralId
) => {
  return async (dispatch, getState) => {
    try {
      let { _id, firstName, lastName, emailId } = getState().auth.user;

      dispatch(AuthActions.verifyLoginSecurityCodeStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/verifySecurityCode/${_id}`,
        data: { code: code },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(AuthActions.verifyLoginSecurityCodeSuccess(data.responseData));
        if (!firstTimeLoginMessage) {
          return toast.success("Logged in successfully!");
        } else {
          //Add participant in viral loop
          const { referralCode } = await addReferralParticipant({
            firstName,
            lastName,
            emailId,
            referralId,
          });
          //Add participant in viral loop

          await dispatch(setReferrals(referralCode, referralId));

          return toast.success("Welcome to reBaked!");
        }
      }
      dispatch(AuthActions.verifyLoginSecurityCodeError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      console.log({ error })
      dispatch(
        AuthActions.verifyLoginSecurityCodeError(
          "Error while sending otp. Please try again later"
        )
      );
      return toast.error("Error while adding participants in viral loop. Please try again later");
    }
  };
};

export const checkDuplicateAccount = (userDetail) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.duplicateAccountStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/firstStepRegister`,
        data: userDetail,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(AuthActions.duplicateAccountSuccess(data));
      }

      dispatch(AuthActions.duplicateAccountError(getErrorMsg(data)));
      return toast.error(getErrorMsg(data));
    } catch (error) {
      dispatch(AuthActions.duplicateAccountError());
      return toast.error(
        "Error while changing password. Please try again later"
      );
    }
  };
};

export const register = (userDetail, resetForm, referral) => {
  return async (dispatch, getState) => {
    try {
      const { referralId } = referral;

      dispatch(AuthActions.registrationStart());
      const EditedUserInfo = {
        emailId: userDetail.emailId,
        contactNumber: userDetail.contactNumber,
        fullName: `${userDetail.firstName + " " + userDetail.lastName}`,
        password: userDetail.password,
      };
      const newUserDetails = await addUserDetails(EditedUserInfo);
      
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/secondStepRegister`,
        data: { ...newUserDetails },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        resetForm();
        return dispatch(AuthActions.registrationSuccess(data.responseData));
      }
      dispatch(AuthActions.registrationError(getErrorMsg(data)));
      return toast.error(getErrorMsg(data));
    } catch (error) {
      dispatch(AuthActions.registrationError());
      return toast.error(
        "Error while registering user. Please try again later"
      );
    }
  };
};

export const resendOtp = (email) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.resendOtpStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "POST",
        data: email,
        url: `${apiUrl}${userBaseURL}/resendCode/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(AuthActions.resendOtpSuccess());
        return toast.success(data.responseMessage);
      }
      dispatch(AuthActions.resendOtpError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(AuthActions.resendOtpError());
      return toast.error(
        "Error while resending otp. Please try again after sometime."
      );
    }
  };
};

const setReferrals = (referralCode, referralId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.setReferralStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "POST",
        data: { myReferralCode: referralCode, referredBy: referralId },
        url: `${apiUrl}${userBaseURL}/setReferrals/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(AuthActions.setReferralSuccess(data.responseData));
        //return toast.success(data.responseMessage);
      }
      dispatch(AuthActions.setReferralError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(AuthActions.setReferralError());
      return toast.error(
        "Error while adding participant in viral loop. Please try again after sometime."
      );
    }
  };
};

const addReferralParticipant = async ({
  firstName,
  lastName,
  emailId,
  referralId,
}) => {
  const postJson = {
    apiToken: process.env.REACT_APP_REFERRAL_API_TOKEN,
    params: {
      event: "registration",
      user: {
        firstname: firstName,
        lastname: lastName,
        email: emailId,
        extraData: {
          internalID: " ",
        },
        consents: {
          2: true,
        },
      },
      referrer: {
        referralCode: referralId,
      },
      refSource: "email",
    },
  };

  const { data, status } = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_REFERRAL_API_BASE_URL}/v2/events`,
    data: postJson,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (status === 200) {
    return data;
  }

  return toast.error("Error occurs while adding referral participant");
};

export const getUserRating = (userId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(AuthActions.getUserRatingStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        //data: { myReferralCode: referralCode, referredBy: referralId },
        url: `${apiUrl}${userBaseURL}/getCollaboratorRating/${_id}/${userId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(AuthActions.getUserRatingSuccess(data.responseData));
        //return toast.success(data.responseMessage);
      }
      dispatch(AuthActions.getUserRatingError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(AuthActions.getUserRatingError());
      return toast.error(
        "Error while fetching rating. Please try again after sometime."
      );
    }
  };
};

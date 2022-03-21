export const AuthMap = {
  LOGIN_START: "LOGIN_START",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_ERROR: "LOGIN_ERROR",
  LOGOUT_START: "LOGOUT_START",
  LOGOUT_ERROR: "LOGOUT_ERROR",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  FORGOT_PASSWORD_START: "FORGOT_PASSWORD_START",
  FORGOT_PASSWORD_SUCCESS: "FORGOT_PASSWORD_SUCCESS",
  FORGOT_PASSWORD_ERROR: "FORGOT_PASSWORD_ERROR",
  SET_NEW_PASSWORD_START: "SET_NEW_PASSWORD_START",
  SET_NEW_PASSWORD_SUCCESS: "SET_NEW_PASSWORD_SUCCESS",
  SET_NEW_PASSWORD_ERROR: "SET_NEW_PASSWORD_ERROR",
  RESET_PASSWORD_START: "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  RESET_PASSWORD_ERROR: "RESET_PASSWORD_ERROR",
  VERIFY_LOGIN_SECURITY_CODE_START: "VERIFY_LOGIN_SECURITY_CODE_START",
  VERIFY_LOGIN_SECURITY_CODE_SUCCESS: "VERIFY_LOGIN_SECURITY_CODE_SUCCESS",
  VERIFY_LOGIN_SECURITY_CODE_ERROR: "VERIFY_LOGIN_SECURITY_CODE_ERROR",
  VERIFY_AUTH_TOKEN_START: "VERIFY_AUTH_TOKEN_START",
  VERIFY_AUTH_TOKEN_SUCCESS: "VERIFY_AUTH_TOKEN_SUCCESS",
  VERIFY_AUTH_TOKEN_ERROR: "VERIFY_AUTH_TOKEN_ERROR",
  CHECKING_DUPLICATE_ACCOUNT_START: "CHECKING_DUPLICATE_ACCOUNT_START",
  CHECKING_DUPLICATE_ACCOUNT_SUCCESS: "CHECKING_DUPLICATE_ACCOUNT_SUCCESS",
  CHECKING_DUPLICATE_ACCOUNT_ERROR: "CHECKING_DUPLICATE_ACCOUNT_ERROR",
  REGISTRATION_START: "REGISTRATION_START",
  REGISTRATION_SUCCESS: "REGISTRATION_SUCCESS",
  REGISTRATION_ERROR: "REGISTRATION_ERROR",
  RESEND_OTP_START: "RESEND_OTP_START",
  RESEND_OTP_SUCCESS: "RESEND_OTP_SUCCESS",
  RESEND_OTP_ERROR: "RESEND_OTP_ERROR",
  RESET_AUTH: "RESET_AUTH",
  UPDATE_NOTIFICATION_STATUS: "UPDATE_NOTIFICATION_STATUS",
  UPDATE_LOGOUT_STATUS: "UPDATE_LOGOUT_STATUS",
  SET_REFERRAL_START: "SET_REFERRAL_START",
  SET_REFERRAL_SUCCESS: "SET_REFERRAL_SUCCESS",
  SET_REFERRAL_ERROR: "SET_REFERRAL_ERROR",
  GET_USER_RATING_START: "GET_USER_RATING_START",
  GET_USER_RATING_SUCCESS: "GET_USER_RATING_SUCCESS",
  GET_USER_RATING_ERROR: "GET_USER_RATING_ERROR",
};

export const AuthActions = {
  loginStart: () => ({ type: AuthMap.LOGIN_START }),
  loginSuccess: (data) => ({ type: AuthMap.LOGIN_SUCCESS, payload: data }),
  loginError: (errors) => ({ type: AuthMap.LOGIN_ERROR, payload: errors }),

  registrationStart: () => ({ type: AuthMap.REGISTRATION_START }),
  registrationSuccess: (data) => ({
    type: AuthMap.REGISTRATION_SUCCESS,
    payload: data,
  }),
  registrationError: (errors) => ({
    type: AuthMap.REGISTRATION_ERROR,
    payload: errors,
  }),

  logoutStart: () => ({ type: AuthMap.LOGOUT_START }),
  logoutError: (err) => ({ type: AuthMap.LOGOUT_ERROR, payload: err }),
  logout: () => ({ type: AuthMap.LOGOUT_SUCCESS }),

  duplicateAccountStart: () => ({
    type: AuthMap.CHECKING_DUPLICATE_ACCOUNT_START,
  }),
  duplicateAccountSuccess: (data) => ({
    type: AuthMap.CHECKING_DUPLICATE_ACCOUNT_SUCCESS,
    payload: data,
  }),
  duplicateAccountError: (err) => ({
    type: AuthMap.CHECKING_DUPLICATE_ACCOUNT_ERROR,
    payload: err,
  }),

  forgotPasswordStart: (email) => ({
    type: AuthMap.FORGOT_PASSWORD_START,
    payload: email,
  }),
  forgotPasswordSuccess: (data) => ({
    type: AuthMap.FORGOT_PASSWORD_SUCCESS,
    payload: data,
  }),
  forgotPasswordError: (errors) => ({
    type: AuthMap.FORGOT_PASSWORD_ERROR,
    payload: { errors },
  }),

  setNewPasswordStart: (data) => ({
    type: AuthMap.SET_NEW_PASSWORD_START,
    payload: data,
  }),
  setNewPasswordSuccess: (data) => ({
    type: AuthMap.SET_NEW_PASSWORD_SUCCESS,
    payload: data,
  }),
  setNewPasswordError: (errors) => ({
    type: AuthMap.SET_NEW_PASSWORD_ERROR,
    payload: { errors },
  }),

  verifyLoginSecurityCodeStart: () => ({
    type: AuthMap.VERIFY_LOGIN_SECURITY_CODE_START,
  }),
  verifyLoginSecurityCodeSuccess: (data) => ({
    type: AuthMap.VERIFY_LOGIN_SECURITY_CODE_SUCCESS,
    payload: data,
  }),
  verifyLoginSecurityCodeError: (errors) => ({
    type: AuthMap.VERIFY_LOGIN_SECURITY_CODE_ERROR,
    payload: errors,
  }),

  verifyAuthTokenStart: () => ({ type: AuthMap.VERIFY_AUTH_TOKEN_START }),
  verifyAuthTokenSuccess: (data) => ({
    type: AuthMap.VERIFY_AUTH_TOKEN_SUCCESS,
    payload: data,
  }),
  verifyAuthTokenError: (err) => ({
    type: AuthMap.VERIFY_AUTH_TOKEN_ERROR,
    payload: err,
  }),
  resendOtpStart: () => ({ type: AuthMap.RESEND_OTP_START }),
  resendOtpSuccess: (data) => ({
    type: AuthMap.RESEND_OTP_SUCCESS,
    payload: data,
  }),
  resendOtpError: (err) => ({
    type: AuthMap.RESEND_OTP_ERROR,
    payload: err,
  }),
  resetPasswordStart: (data) => ({
    type: AuthMap.RESET_PASSWORD_START,
    payload: data,
  }),
  resetPasswordSuccess: (data) => ({
    type: AuthMap.RESET_PASSWORD_SUCCESS,
    payload: data,
  }),
  resetPasswordError: (errors) => ({
    type: AuthMap.RESET_PASSWORD_ERROR,
    payload: { errors },
  }),

  setReferralStart: (data) => ({
    type: AuthMap.SET_REFERRAL_START,
    payload: data,
  }),
  setReferralSuccess: (data) => ({
    type: AuthMap.SET_REFERRAL_SUCCESS,
    payload: data,
  }),
  setReferralError: (errors) => ({
    type: AuthMap.SET_REFERRAL_ERROR,
    payload: { errors },
  }),
  getUserRatingStart: (data) => ({
    type: AuthMap.GET_USER_RATING_START,
    payload: data,
  }),
  getUserRatingSuccess: (data) => ({
    type: AuthMap.GET_USER_RATING_SUCCESS,
    payload: data,
  }),
  getUserRatingError: (errors) => ({
    type: AuthMap.GET_USER_RATING_ERROR,
    payload: { errors },
  }),

  resetAuth: () => ({ type: AuthMap.RESET_AUTH }),


};

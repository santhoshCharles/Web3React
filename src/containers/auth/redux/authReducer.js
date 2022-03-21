import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { AuthMap } from "./authAction";
import { UserProfileMap } from "../../Profile/redux/userProfileAction";

const initialState = {
  user: null,
  authToken: null,
  isLoading: false,
  redirectLogin: false,
  message: "",
  errors: "",
  isOtpVerified: null,
  newPasswordSet: false,
  flashMessage: "",
  showOtpModal: false,
  tokenVerified: false,
  shouldRegister: "",
  isPasswordReset: null,
  isOtpLoading: false,
  isAutoLogout: false,
  refreshRating: true,
  userRating: {}
};

const persistConfig = {
  storage,
  key: "v706-demo1-auth",
  whitelist: ["user", "authToken", "isPasswordReset"],
};

export const reducer = persistReducer(
  persistConfig,
  (state = initialState, action) => {
    switch (action.type) {
      case AuthMap.LOGIN_START: {
        return {
          ...state,
          isLoading: true,
          flashMessage: "",
        };
      }
      case AuthMap.LOGIN_SUCCESS: {
        return {
          ...state,
          user: action.payload,
          shouldRegister: false,
          showOtpModal: false,
          authToken: action.payload.token,
          isPasswordReset: action.payload.isPasswordReset,
          isLoading: false,
          isOtpVerified: action.payload.isOTPVerified,
          flashMessage: "",
        };
      }
      case AuthMap.LOGIN_ERROR: {
        return {
          ...state,
          isLoading: false,
          flashMessage: action.payload,
        };
      }
      case AuthMap.LOGOUT_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.LOGOUT_ERROR: {
        return {
          ...initialState,
          isLoading: false,
        };
      }
      case AuthMap.LOGOUT_SUCCESS: {
        return {
          ...initialState,
          user: null,
          isLoading: false,
        };
      }
      case AuthMap.FORGOT_PASSWORD_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.FORGOT_PASSWORD_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          message: action.payload,
          redirectLogin: true,
          errors: "",
        };
      }
      case AuthMap.FORGOT_PASSWORD_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.SET_NEW_PASSWORD_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.SET_NEW_PASSWORD_SUCCESS: {
        return {
          ...state,
          newPasswordSet: true,
          isLoading: false,
        };
      }
      case AuthMap.SET_NEW_PASSWORD_ERROR: {
        return {
          ...state,
          newPasswordSet: false,
          isLoading: false,
        };
      }
      case AuthMap.VERIFY_LOGIN_SECURITY_CODE_START: {
        return {
          ...state,
          isOtpLoading: true,
          flashMessage: "",
        };
      }
      case AuthMap.VERIFY_LOGIN_SECURITY_CODE_SUCCESS: {
        return {
          ...state,
          isOtpLoading: false,
          user: action.payload,
          isPasswordReset: action.payload.isPasswordReset,
          isOtpVerified: true,
          authToken: action.payload.token,
          flashMessage: "",
        };
      }
      case AuthMap.VERIFY_LOGIN_SECURITY_CODE_ERROR: {
        return {
          ...state,
          isOtpLoading: false,
          isOtpVerified: false,
          flashMessage: action.payload,
        };
      }
      case AuthMap.VERIFY_AUTH_TOKEN_SUCCESS: {
        return {
          ...state,
          tokenVerified: true,
          authToken: action.payload,
          user: {
            ...state.user,
            token: action.payload,
          },
        };
      }
      case AuthMap.VERIFY_AUTH_TOKEN_ERROR: {
        return {
          ...initialState,
          tokenVerified: false,
        };
      }
      case AuthMap.CHECKING_DUPLICATE_ACCOUNT_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.CHECKING_DUPLICATE_ACCOUNT_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          shouldRegister: action.payload.responseCode === 200 ? true : false,
          flashMessage: action.payload.responseMessage,
        };
      }
      case AuthMap.CHECKING_DUPLICATE_ACCOUNT_ERROR: {
        return {
          ...state,
          isLoading: false,
          shouldRegister: false,
          flashMessage: "",
        };
      }
      case AuthMap.REGISTRATION_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.REGISTRATION_SUCCESS: {
        return {
          ...state,
          user: action.payload,
          authToken: action.payload.token,
          isLoading: false,
          showOtpModal: true,
          isOtpVerified: action.payload.isOTPVerified,
        };
      }
      case AuthMap.REGISTRATION_ERROR: {
        return {
          ...state,
          isLoading: false,
          showOtpModal: false,
          flashMessage: action.payload,
        };
      }
      case AuthMap.RESET_AUTH: {
        return {
          ...initialState,
        };
      }
      case AuthMap.RESEND_OTP_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.RESEND_OTP_SUCCESS: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.RESEND_OTP_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.RESET_PASSWORD_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.RESET_PASSWORD_SUCCESS: {
        return {
          ...state,
          isPasswordReset: true,
          isLoading: false,
        };
      }
      case AuthMap.RESET_PASSWORD_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      // case UserProfileMap.GET_PROFILE_SUCCESS: {
      //   return {
      //     ...state,
      //     user: action.payload
      //   }
      // }
      case UserProfileMap.UPDATE_PROFILE_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case UserProfileMap.UPDATE_PROFILE_SUCCESS: {
    
        return {
          ...state,
          isLoading: false,
          user: { ...state.user, ...action.payload },
        };
      }
      case UserProfileMap.UPDATE_PROFILE_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.UPDATE_NOTIFICATION_STATUS: {
        return {
          ...state,
          user: { ...state.user, isNotification: action.payload },
        };
      }
      case AuthMap.UPDATE_LOGOUT_STATUS: {
        return initialState;
      }
      case AuthMap.SET_REFERRAL_START: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case AuthMap.SET_REFERRAL_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          user: { ...state.user, myReferralCode: action.payload.myReferralCode },
        };
      }
      case AuthMap.SET_REFERRAL_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      case AuthMap.GET_USER_RATING_START: {
        return {
          ...state,
          isLoading: true,
          refreshRating: false,
        };
      }
      case AuthMap.GET_USER_RATING_SUCCESS: {
        return {
          ...state,
          isLoading: false,
          refreshRating: false,
          userRating: action.payload
        };
      }
      case AuthMap.GET_USER_RATING_ERROR: {
        return {
          ...state,
          isLoading: false,
        };
      }
      default:
        return { ...state };
    }
  }
);

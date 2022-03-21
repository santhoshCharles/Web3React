import axios from "axios";
import { UserProfileActions } from "./userProfileAction";
import { toast } from "react-toastify";

const getCommonBaseURL = (state) => {
  return state.environnment.environmentLists.commonBaseURL;
};

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;

const uploadImageFunc = async (Url, formData) => {
  if (formData) {
    try {
      const { data } = await axios({
        method: "POST",
        url: Url,
        data: formData,
      });
      if (data.responseCode !== 200) {
        toast.error(`${data.responseMessage}`);
        return data;
      } else {
        // toast.success(`${data.responseMessage}`);
        return data;
      }
    } catch (err) {
      toast.error(
        " Error while uploading resume. Please try again after sometime."
      );
      return err;
    }
  }
};

export const updateProfileAsync = (user, formData, uploadTitle, isUpload) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.updateProfileStart());
      let finalUserDetails = user;
      if (isUpload) {
        const fileResponse = await uploadImageFunc(
          `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
          formData
        );
        if (fileResponse.responseCode === 200) {
          if (uploadTitle === "resume") {
            finalUserDetails = {
              ...finalUserDetails,
              resumePicture: fileResponse.responseData[0],
            };
          }
          if (uploadTitle === "profilepic") {
            finalUserDetails = {
              ...user,
              profilePicture: fileResponse.responseData[0],
            };
          }
        } else {
          return dispatch(
            UserProfileActions.updateProfileError(fileResponse.responseMessage)
          );
        }
      }
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateProfile/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: finalUserDetails,
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          ...data.responseData,
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(UserProfileActions.updateProfileSuccess(data.responseData));
        toast.success(data.responseMessage);
        return data;
      }
      dispatch(UserProfileActions.updateProfileError());
      toast.error(data.responseMessage);
      return data;
    } catch (error) {
      dispatch(UserProfileActions.updateProfileError());
      toast.error(
        " Error while updating profile. Please try again after sometime."
      );
      return error;
    }
  };
};

export const getProfileAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.getProfileStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getProfile/${_id}`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserProfileActions.getProfileSuccess(data.responseData)
        );
      }
      dispatch(UserProfileActions.getProfileError());
    } catch (error) {
      dispatch(UserProfileActions.getProfileError());
    }
  };
};

export const addEmployeementAsync = (addEmployeement) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.addEmployeementStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/addEmploymentHistory/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: addEmployeement,
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          employmentHistory: data.responseData,
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(UserProfileActions.addEmployeementSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.addEmployeementError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.addEmployeementError());
      return toast.error(
        " Error while adding employeement. Please try again after sometime."
      );
    }
  };
};

export const updateEmployeementAsync = (updateEmployeement, userID) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;

      dispatch(UserProfileActions.updateEmployeementStart());
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateEmploymentDetails/${_id}/${userID}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: updateEmployeement,
      });

      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          employmentHistory: data.responseData,
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(
          UserProfileActions.updateEmployeementSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }

      dispatch(UserProfileActions.updateEmployeementError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.updateEmployeementError());
      return toast.error(
        " Error while updating employeement. Please try again after sometime."
      );
    }
  };
};

export const deleteEmployeementAsync = (itemId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.deleteEmployeementStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/deleteEmploymentHistory/${_id}/${itemId}`,
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          employmentHistory: data.responseData,
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(
          UserProfileActions.deleteEmployeementSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.deleteEmployeementError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.deleteEmployeementError());
      return toast.error(
        " Error while deleting employeement. Please try again after sometime."
      );
    }
  };
};

export const addEducationAsync = (addEducation) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.addEducationStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/addEducation/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: addEducation,
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          education: data.responseData,
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(UserProfileActions.addEducationSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.addEducationError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.addEducationError());
      return toast.error(
        " Error while adding education. Please try again after sometime."
      );
    }
  };
};

export const updateEducationAsync = (updateEducation, userID) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.updateEducationStart());
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateEducationDetails/${_id}/${userID}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: updateEducation,
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          education: data.responseData,
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(UserProfileActions.updateEducationSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.updateEducationError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.updateEducationError());
      return toast.error(
        " Error while updating education. Please try again after sometime."
      );
    }
  };
};

export const deleteEducationAsync = (userID) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.deleteEducationStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/deleteEducation/${_id}/${userID}`,
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          education: data.responseData,
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(UserProfileActions.deleteEducationSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.deleteEducationError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.deleteEducationError());
      return toast.error(
        " Error while deleting education. Please try again after sometime."
      );
    }
  };
};

export const addPortfolioAsync = (requestData, formdata) => {
  return async (dispatch, getState) => {
    try {
      let finalData = {};
      let { _id } = getState().auth.user;
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(UserProfileActions.addPortfolioStart());
      const fileResponse = await uploadImageFunc(
        `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
        formdata
      );
      if (fileResponse.responseCode === 200) {
        finalData = { ...requestData, image: fileResponse.responseData[0] };
        const { data } = await axios({
          method: "POST",
          url: `${apiUrl}${userBaseURL}/addPortfolio/${_id}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: finalData,
        });

        if (data.responseCode === 200) {
          const payload = {
            ...getState().auth.user,
            portfolio: data.responseData,
          };
          dispatch(UserProfileActions.updateProfileSuccess(payload));
          dispatch(UserProfileActions.addPortfolioSuccess(data.responseData));
          return toast.success(data.responseMessage);
        }
        dispatch(UserProfileActions.addPortfolioError(data.responseMessage));
        toast.error(data.responseMessage);
        return data;
      } else {
        dispatch(UserProfileActions.addPortfolioError());
        toast.error(
          "Error while uploading project logo. Please try again after sometime"
        );
      }
    } catch (error) {
      dispatch(UserProfileActions.addPortfolioError());
      toast.error(
        " Error while adding portfolio. Please try again after sometime."
      );
      return error;
    }
  };
};

export const removeportfolioAsync = (portfolioId) => {
  return async (dispatch, getState) => {
    try {
      let { _id, portfolio } = getState().auth.user;
      dispatch(UserProfileActions.removePortfolioStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/removeportfolioProject/${_id}/${portfolioId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        const payload = {
          ...getState().auth.user,
          portfolio: portfolio.filter((f) => f._id !== portfolioId),
        };
        dispatch(UserProfileActions.updateProfileSuccess(payload));
        dispatch(UserProfileActions.removePortfolioSuccess(data.responseData));
        toast.success(data.responseMessage);
        return data;
      }
      dispatch(UserProfileActions.removePortfolioError());
      toast.error(data.responseMessage);
      return data;
    } catch (error) {
      dispatch(UserProfileActions.removePortfolioError());
      return toast.error(
        " Error while removing portfolio. Please try again after sometime."
      );
    }
  };
};

export const getSkillsAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.getSkillsStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getSkills/${_id}`,
      });
      if (data.responseCode === 200) {
        return dispatch(UserProfileActions.getSkillsSuccess(data.responseData));
      }
      return dispatch(UserProfileActions.getSkillsError());
    } catch (error) {
      dispatch(UserProfileActions.getSkillsError());
      return toast.error(
        " Error while adding skills. Please try again after sometime."
      );
    }
  };
};

export const addSkillsAsync = (addSkills, handleSkillEdit) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.addSkillsStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/addSkills/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: addSkills,
      });
      if (data.responseCode === 200) {
        dispatch(UserProfileActions.addSkillsSuccess(data.responseData));
        if (handleSkillEdit) {
          handleSkillEdit();
        }
        return toast.success(data.responseMessage);
      }

      dispatch(UserProfileActions.addSkillsError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.addSkillsError());
      return toast.error(
        " Error while adding skills. Please try again after sometime."
      );
    }
  };
};

export const removeSkillsAsync = (userID) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.removeSkillsStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/removeSkills/${_id}/${userID}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(UserProfileActions.removeSkillsSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.removeSkillsError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.removeSkillsError());
      return toast.error(
        " Error while removing skills. Please try again after sometime."
      );
    }
  };
};

export const inviteFriendAsync = (email) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.referralStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/inviteFriends/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { userEmails: email },
      });
      if (data.responseCode === 200) {
        dispatch(UserProfileActions.referralSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.referralError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.referralError());
      return toast.error(
        " Error while inviting friend. Please try again after sometime."
      );
    }
  };
};

export const inviteFriendsHistoryAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      let { referralHistorySkip, referralHistoryLimit } =
        getState().userProfile;
      dispatch(UserProfileActions.referralHistoryStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getInvitationHistory/${_id}?skip=${referralHistorySkip}&limit=${referralHistoryLimit}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserProfileActions.referralHistorySuccess(data.responseData)
        );
      }
      dispatch(UserProfileActions.referralHistoryError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.referralHistoryError());
      return toast.error(
        " Error while retriving the history. Please try again after sometime."
      );
    }
  };
};

export const getMyProjectListsAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.getMyProjectListStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getMyProjectList/${_id}`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserProfileActions.getMyProjectListSuccess(data.responseData)
        );
      }
      return dispatch(UserProfileActions.getMyProjectListError());
    } catch (error) {
      dispatch(UserProfileActions.getMyProjectListError());
      return toast.error(
        " Error while fetching projects list. Please try again after sometime."
      );
    }
  };
};


export const getMyPackageListsAsync = (projectId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.getMyPackageListStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getPackagesByProjectId/${_id}/${projectId}`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserProfileActions.getMyPackageListSuccess(data.responseData)
        );
      }
      return dispatch(UserProfileActions.getMyPackageListError());
    } catch (error) {
      dispatch(UserProfileActions.getMyPackageListError());
      return toast.error(
        " Error while fetching package list. Please try again after sometime."
      );
    }
  };
};

export const getMyCollaboratorListsAsync = (projectId, packageId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.getMyCollaboratorListStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getCollaboratorsByPackageId/${_id}/${projectId}/${packageId}`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserProfileActions.getMyCollaboratorListSuccess(data.responseData)
        );
      }
      return dispatch(UserProfileActions.getMyCollaboratorListError());
    } catch (error) {
      dispatch(UserProfileActions.getMyCollaboratorListError());
      return toast.error(
        " Error while fetching colloborater list. Please try again after sometime."
      );
    }
  };
};

export const createSupportTicketAsync = (supportTicket) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.createSupportTicketStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/createSupportTicket/${_id}/${supportTicket.myProject}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: supportTicket,
      });
      if (data.responseCode === 200) {
        dispatch(
          UserProfileActions.createSupportTicketSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.createSupportTicketError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.createSupportTicketError());
      return toast.error(
        " Error while creating support ticket. Please try again after sometime."
      );
    }
  };
};

export const getAllSupportTicketsAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      let { supportTicketListLimit } = getState().userProfile;
      dispatch(UserProfileActions.getAllSupportTicketsStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getAllSupportTicket/${_id}?skip=0&limit=${supportTicketListLimit}`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserProfileActions.getAllSupportTicketsSuccess(data.responseData)
        );
      }
      return dispatch(UserProfileActions.getAllSupportTicketsError());
    } catch (error) {
      dispatch(UserProfileActions.getAllSupportTicketsError());
      return toast.error(
        " Error while fetching support tickets. Please try again after sometime."
      );
    }
  };
};

export const addCommentAsync = (comments, ticketId, closeReply) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.addCommentStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/addComment/${_id}/${ticketId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: { comments },
      });
      if (data.responseCode === 200) {
        dispatch(UserProfileActions.addCommentSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(UserProfileActions.addCommentError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(UserProfileActions.addCommentError());
      return toast.error(
        " Error while adding comment. Please try again after sometime."
      );
    }
  };
};

export const getEarningListAsync = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(UserProfileActions.getEarningListStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getEarningList/${_id}`,
      });
      if (data.responseCode === 200) {
        return dispatch(
          UserProfileActions.getEarningListSuccess(data.responseData)
        );
      }
      return dispatch(UserProfileActions.getEarningListError());
    } catch (error) {
      dispatch(UserProfileActions.getEarningListError());
      return toast.error(
        " Error while fetching earning details. Please try again after sometime."
      );
    }
  };
};
import axios from "axios";
import { ProjectCardActions } from "./projectBoardAction";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API;
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;
const commonBaseURL = process.env.REACT_APP_COMMON_BASE_URL;

export const addCardAsync = (values, projectId, packageId, onCancel) => {
  return async (dispatch, getState) => {
    try {
      dispatch(ProjectCardActions.addCardStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/addCard/${_id}/${projectId}/${packageId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        onCancel();
        dispatch(ProjectCardActions.addCardSuccess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(ProjectCardActions.addCardError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.addCardError());
      return toast.error(
        "Error while adding card. Please try again after sometime."
      );
    }
  };
};

export const getProjectBoardDetails = (projectId, packageId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProjectCardActions.getProjectDetailsStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getProjectBoardDetails/${_id}/${projectId}/${packageId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(
          ProjectCardActions.getProjectDetailsSuccess(data.responseData)
        );
      }
      dispatch(ProjectCardActions.getProjectDetailsError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.getProjectDetailsError());
      return toast.error(
        " Error while getting project board details. Please try again after sometime."
      );
    }
  };
};

export const updateCardAsync = (values, projectId, packageId, cardId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(ProjectCardActions.updateCardStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateCard/${_id}/${projectId}/${packageId}/${cardId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(ProjectCardActions.updateCardSuccess(data.responseData));
        toast.success(data.responseMessage);
        return data;
      }
      dispatch(ProjectCardActions.updateCardError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.updateCardError());
      return toast.error(
        "Error while updating card. Please try again after sometime."
      );
    }
  };
};

export const deleteCard = (projectId, packageId, cardId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProjectCardActions.deleteCardStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/deleteCard/${_id}/${projectId}/${packageId}/${cardId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(ProjectCardActions.deleteCardSucess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(ProjectCardActions.deleteCardError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.deleteCardError());
      return toast.error(
        " Error while delete card . Please try again after sometime."
      );
    }
  };
};

export const uploadImageFunc = async (formData) => {
  if (formData) {
    try {
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
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
      console.log(err, "err");
      toast.error(
        " Error while uploading file. Please try again after sometime."
      );
      return err;
    }
  }
};

export const deleteCardComment = (projectId, packageId, cardId, commentId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProjectCardActions.deleteCardCommentStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/deleteCardComment/${_id}/${projectId}/${packageId}/${cardId}/${commentId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(ProjectCardActions.deleteCardCommentSucess(data.responseData));
        return toast.success(data.responseMessage);
      }
      dispatch(ProjectCardActions.deleteCardCommentError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.deleteCardCommentError());
      return toast.error(
        " Error while delete comment . Please try again after sometime."
      );
    }
  };
};

export const updateCardCommentAsync = (
  values,
  projectId,
  packageId,
  cardId,
  commentId
) => {
  return async (dispatch, getState) => {
    try {
      dispatch(ProjectCardActions.updateCardStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateCardComment/${_id}/${projectId}/${packageId}/${cardId}/${commentId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(ProjectCardActions.updateCardSuccess(data.responseData));
        toast.success(data.responseMessage);
        return data;
      }
      dispatch(ProjectCardActions.updateCardError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.updateCardError());
      return toast.error(
        "Error while updating comment. Please try again after sometime."
      );
    }
  };
};

export const deleteCardCommentAttachment = (
  projectId,
  packageId,
  cardId,
  attachId
) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProjectCardActions.deleteCardCommentAttachmentStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/deleteCardAttachment/${_id}/${projectId}/${packageId}/${cardId}/${attachId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(
          ProjectCardActions.deleteCardCommentAttachmentSucess(
            data.responseData
          )
        );
        return toast.success(data.responseMessage);
      }
      dispatch(
        ProjectCardActions.deleteCardCommentAttachmentError(
          data.responseMessage
        )
      );
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.deleteCardCommentAttachmentError());
      return toast.error(
        " Error while delete attchment. Please try again after sometime."
      );
    }
  };
};

export const handleCardDragAsync = (values, projectId, packageId, cardId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(ProjectCardActions.handleCardDragStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/dragdropCard/${_id}/${projectId}/${packageId}/${cardId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(ProjectCardActions.handleCardDragSuccess(data.responseData));
        toast.success(data.responseMessage);
        return data;
      }
      dispatch(ProjectCardActions.handleCardDragError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.handleCardDragError());
      return toast.error(
        "Error while updating project board. Please try again after sometime."
      );
    }
  };
};

export const markAsComplete = (projectId, packageId, cardId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProjectCardActions.markAsCompleteStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/cardMarkAsComplete/${_id}/${projectId}/${packageId}/${cardId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        toast.success(data.responseMessage);
        return dispatch(
          ProjectCardActions.markAsCompleteSuccess(data.responseData)
        );
      }
      dispatch(ProjectCardActions.markAsCompleteError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.markAsCompleteError());
      return toast.error(
        " Error while marking card as complete. Please try again after sometime."
      );
    }
  };
};



export const getCardDetails = (projectId, packageId, cardId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(ProjectCardActions.getCardDetailStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getCardDetails/${_id}/${projectId}/${packageId}/${cardId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        return dispatch(
          ProjectCardActions.getCardDetailSuccess(data.responseData)
        );
      }
      dispatch(ProjectCardActions.getCardDetailError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(ProjectCardActions.getCardDetailError());
      return toast.error(
        " Error while getting card details. Please try again after sometime."
      );
    }
  };
};
import axios from "axios";
import { CreateProjectActions } from "./createProjectAction";
import { getMasterData } from "../../../utils";
import { toast } from "react-toastify";

const getCommonBaseURL = (state) => {
  return state.environnment.environmentLists.commonBaseURL;
};
const userBaseURL = process.env.REACT_APP_USER_BASE_URL;
const apiUrl = process.env.REACT_APP_API;

export const createProjectAsync = (user, formData, profileCoverImage) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(CreateProjectActions.createProjectStart());
      let { _id } = getState().auth.user;
      let logo;
      let CoverImage;
      if (formData) {
        const { data } = await axios({
          method: "POST",
          url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
          data: formData,
        });
        logo = data;
      }
      if (profileCoverImage) {
        const { data } = await axios({
          method: "POST",
          url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
          data: profileCoverImage,
        });
        CoverImage = data;
      }
      let finalUserDetails = user;
      if (formData && logo && logo.responseCode === 200) {
        finalUserDetails = {
          ...finalUserDetails,
          logo: logo.responseData[0],
        };
      }
      if (profileCoverImage && CoverImage && CoverImage.responseCode === 200) {
        finalUserDetails = {
          ...finalUserDetails,
          projectCoverImage: CoverImage.responseData[0],
        };
      }
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/createProject/${_id}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: finalUserDetails,
      });

      if (data.responseCode === 200) {
        return dispatch(
          CreateProjectActions.createProjectSuccess(data.responseData)
        );
      }
      dispatch(CreateProjectActions.createProjectError());
      return toast.error(data.responseMessage);
    } catch (error) {
      console.log(error, "errorr-------=-========");
      dispatch(CreateProjectActions.createProjectError());
      return toast.error(
        " Error while creating project. Please try again after sometime."
      );
    }
  };
};
export const updateProjectLogo = (projectLogo, projectId) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      dispatch(CreateProjectActions.updateProjectStart());
      let { _id } = getState().auth.user;
      let logo;
      if (projectLogo) {
        const { data } = await axios({
          method: "POST",
          url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
          data: projectLogo,
        });
        logo = data;
      }
      if (logo && logo.responseCode === 200) {
        logo = logo.responseData[0];

        const { data } = await axios({
          method: "PUT",
          url: `${apiUrl}${userBaseURL}/updateProject/${_id}/${projectId}`,
          headers: {
            "Content-Type": "application/json",
          },
          data: { logo },
        });
        if (data.responseCode === 200) {
          dispatch(
            CreateProjectActions.updateProjectSuccess(data.responseData)
          );
          return toast.success(data.responseMessage);
        } else {
          dispatch(CreateProjectActions.updateProjectError());
          return toast.error(data.responseMessage);
        }
      } else {
        dispatch(CreateProjectActions.updateProjectError());
        return toast.error(logo.responseMessage);
      }
    } catch (error) {
      dispatch(CreateProjectActions.updateProjectError());
      return toast.error(
        " Error while updating project logo. Please try again after sometime."
      );
    }
  };
};

export const updateProjectAsync = (
  projectId,
  updateProjectData,
  formData,
  goBack,
  coverImageFormdata,
  profileCoverImage
) => {
  return async (dispatch, getState) => {
    if ("blockchainNetwork" in updateProjectData) {
      delete updateProjectData.blockchainNetwork;
    }
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.updateProjectStart());
      let logo;
      let coverImage;
      let projectCover;
      if (formData && formData !== null) {
        try {
          const { data } = await axios({
            method: "POST",
            url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
            data: formData,
          });
          logo = data;
        } catch (err) {
          console.log(err, "err");
        }
      }
      if (coverImageFormdata && coverImageFormdata !== null) {
        try {
          const { data } = await axios({
            method: "POST",
            url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
            data: coverImageFormdata,
          });

          coverImage = data;
        } catch (err) {
          console.log(err, "err");
        }
      }
      if (profileCoverImage && profileCoverImage !== null) {
        try {
          const { data } = await axios({
            method: "POST",
            url: `${apiUrl}${commonBaseURL}/uploadMultipalFile`,
            data: profileCoverImage,
          });

          projectCover = data;
        } catch (err) {
          console.log(err, "err");
        }
      }
      let finalUserDetails = updateProjectData;
      if (formData && logo && logo.responseCode === 200) {
        finalUserDetails = {
          ...finalUserDetails,
          logo: logo.responseData[0],
        };
      }
      if (coverImageFormdata && coverImage && coverImage.responseCode === 200) {
        finalUserDetails = {
          ...finalUserDetails,
          coverImage: coverImage.responseData[0],
        };
      }
      if (
        profileCoverImage &&
        projectCover &&
        projectCover.responseCode === 200
      ) {
        finalUserDetails = {
          ...finalUserDetails,
          projectCoverImage: projectCover.responseData[0],
        };
      }
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateProject/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: finalUserDetails,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.updateProjectSuccess(data.responseData));
        if (goBack && goBack !== null) {
          goBack();
        }

        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.updateProjectError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.updateProjectError(error));
      return toast.error(
        " Error while updating project. Please try again after sometime."
      );
    }
  };
};

export const removeCoverImageAsync = (projectId, updateProjectData) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.updateProjectStart()); 
      let finalUserDetails = updateProjectData;
      finalUserDetails = {
        ...finalUserDetails,
        coverImage: null,
      };
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateProject/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: finalUserDetails,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.updateProjectSuccess(data.responseData));

        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.updateProjectError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.updateProjectError(error));
      return toast.error(
        " Error while updating project. Please try again after sometime."
      );
    }
  };
};

export const getProjectDetailsAsync = (projectId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      dispatch(CreateProjectActions.getProjectStart());

      //Checked whether user is logged in
      let url = `${apiUrl}${userBaseURL}/getProjectDetails/${projectId}`;
      if (_id) {
        url = `${apiUrl}${userBaseURL}/getProjectDetails/${projectId}?id=${_id}`;
      }
      //Checked whether user is logged in

      const { data } = await axios({
        method: "GET",
        url: url,
      });
      if (data.responseCode === 200) {
        return dispatch(
          CreateProjectActions.getProjectSuccess(data.responseData)
        );
      }
      return dispatch(CreateProjectActions.getProjectError());
    } catch (error) {
      dispatch(CreateProjectActions.getProjectError());
      return toast.error(
        " Error while fetching project. Please try again after sometime."
      );
    }
  };
};

export const getMasterDetails = () => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      dispatch(CreateProjectActions.masterDetailsStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/getMasterDetails?id=${_id}`,
      });
      if (data.responseCode === 200) {
        const projectCategories = getMasterData(
          "Project Categories",
          data.responseData
        );
        const blockchainNetwork = getMasterData(
          "Blockchain Networks",
          data.responseData
        );

        return dispatch(
          CreateProjectActions.masterDetailsSuccess({
            projectCategories,
            blockchainNetwork,
          })
        );
      }
      return dispatch(CreateProjectActions.masterDetailsError());
    } catch (error) {
      dispatch(CreateProjectActions.masterDetailsError());
      return toast.error(
        " Error while fetching project categories. Please try again after sometime."
      );
    }
  };
};

export const addPackageAsync = (addPackageDetails, projectId, onCloseModal) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.addPackageStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/addPackage/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: addPackageDetails,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.addPackageSuccess(data.responseData));
        onCloseModal();
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.addPackageError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.addPackageError());
      return toast.error(
        " Error while adding package. Please try again after sometime."
      );
    }
  };
};

export const getAllPackagesAsync = (projectId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      dispatch(CreateProjectActions.getAllPackagesStart());

      //Checked whether user is logged in
      let url = `${apiUrl}${userBaseURL}/getAllPackages/${projectId}`;
      if (_id) {
        url = `${apiUrl}${userBaseURL}/getAllPackages/${projectId}?id=${_id}`;
      }
      //Checked whether user is logged in

      const { data } = await axios({
        method: "GET",
        url: url,
      });
      if (data.responseCode === 200) {
        return dispatch(
          CreateProjectActions.getAllPackagesSuccess(data.responseData)
        );
      }
      return dispatch(CreateProjectActions.getAllPackagesError());
    } catch (error) {
      dispatch(CreateProjectActions.getAllPackagesError());
      return toast.error(
        " Error while fetching packages. Please try again after sometime."
      );
    }
  };
};

export const getAllFaqsAsync = (projectId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      let { skip, limit } = getState().createProject;
      dispatch(CreateProjectActions.getProjectFaqsStart());

      //Checked whether user is logged in
      let url = `${apiUrl}${userBaseURL}/getAllFAQs/${projectId}?skip=${skip}&limit=${limit}`;
      if (_id) {
        url = `${apiUrl}${userBaseURL}/getAllFAQs/${projectId}?id=${_id}&skip=${skip}&limit=${limit}`;
      }
      //Checked whether user is logged in

      const { data } = await axios({
        method: "GET",
        url: url,
      });
      if (data.responseCode === 200) {
        return dispatch(
          CreateProjectActions.getProjectFaqsSuccess(data.responseData)
        );
      }
      return dispatch(CreateProjectActions.getProjectFaqsError());
    } catch (error) {
      console.log(error, "error------");
      dispatch(CreateProjectActions.getProjectFaqsError());
      return toast.error(
        " Error while fetching FAQs. Please try again after sometime."
      );
    }
  };
};

export const updatePackageAsync = (
  values,
  projectId,
  packageId,
  onCloseModal
) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.updatePackageStart());
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updatePackage/${_id}/${projectId}/${packageId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.updatePackageSuccess(data.responseData));
        onCloseModal();
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.updatePackageError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.updatePackageError());
      return toast.error(
        " Error while updating package. Please try again after sometime."
      );
    }
  };
};

export const finishProjectAsync = (projectId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(CreateProjectActions.finishProjectStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/finishProject/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(CreateProjectActions.finishProjectSuccess(data));
        //return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.finishProjectError(data));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.finishProjectError());
      return toast.error(
        "Getting Error while finish project. Please try again after sometime."
      );
    }
  };
};

export const addFAQAsync = (values, projectId, resetForm, onCloseFaq) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.addFaqStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/addFAQ/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.addFaqSuccess(data.responseData));
        resetForm();
        onCloseFaq();
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.addFaqError(data.responseMessage));
      resetForm();
      onCloseFaq();
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.addFaqError());
      resetForm();
      onCloseFaq();
      return toast.error(
        " Error while adding FAQ. Please try again after sometime."
      );
    }
  };
};

export const updateFAQAsync = (
  values,
  projectId,
  resetForm,
  onCloseFaq,
  faqId
) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.addFaqStart());
      const { data } = await axios({
        method: "PUT",
        url: `${apiUrl}${userBaseURL}/updateFAQ/${_id}/${projectId}/${faqId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.addFaqSuccess(data.responseData));
        resetForm();
        onCloseFaq();
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.addFaqError(data.responseMessage));
      resetForm();
      onCloseFaq();
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.addFaqError());
      resetForm();
      onCloseFaq();
      return toast.error(
        " Error while updating FAQ. Please try again after sometime."
      );
    }
  };
};

export const getCollaboratorList = (projectId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      let { collaboratorSkip, collaboratorLimit } = getState().createProject;
      dispatch(CreateProjectActions.getCollaboratorStart());

      let url = `${apiUrl}${userBaseURL}/getCollaboratorList/${_id}/${projectId}?skip=${collaboratorSkip}&limit=${collaboratorLimit}`;

      const { data } = await axios({
        method: "GET",
        url: url,
      });
      if (data.responseCode === 200) {
        return dispatch(
          CreateProjectActions.getCollaboratorSuccess(data.responseData)
        );
      }
      return dispatch(CreateProjectActions.getCollaboratorError());
    } catch (error) {
      dispatch(CreateProjectActions.getCollaboratorError());
      return toast.error(
        " Error while fetching Collaborator list. Please try again after sometime."
      );
    }
  };
};

export const deleteFaq = (projectId, faqId, onCloseFaq) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.deleteFaqStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/deleteFAQ/${_id}/${projectId}/${faqId}`,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.deleteFaqSuccess());
        onCloseFaq();
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.deleteFaqError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.deleteFaqError());
      return toast.error(
        " Error while deleting Faq. Please try again after sometime."
      );
    }
  };
};

export const removeCollaborator = (projectId, packageId, collaboratorId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.removeCollboratorStart());
      const { data } = await axios({
        method: "DELETE",
        url: `${apiUrl}${userBaseURL}/removeCollaborator/${_id}/${projectId}/${packageId}/${collaboratorId}`,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.removeCollboratorSuccess());
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.removeCollboratorError());
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.removeCollboratorError());
      return toast.error(
        " Error while removing collaborator. Please try again after sometime."
      );
    }
  };
};

export const cancelWorkTask = (projectId, packageId, handleClose) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};
      dispatch(CreateProjectActions.cancelWorkTaskStart());

      let url = `${apiUrl}${userBaseURL}/cancelPackage/${_id}/${projectId}/${packageId}`;

      const { data } = await axios({
        method: "GET",
        url: url,
      });
      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.cancelWorkTaskSuccess(data.responseData));
        handleClose();
        return toast.success(data.responseMessage);
      }
      handleClose();
      return dispatch(CreateProjectActions.cancelWorkTaskError());
    } catch (error) {
      dispatch(CreateProjectActions.cancelWorkTaskError());
      return toast.error(
        " Error while cancelling workTask. Please try again after sometime."
      );
    }
  };
};

export const initiateProjectAsync = (projectId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.initiateProjectStart());
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/startProjectInitiator/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.responseCode === 200) {
        dispatch(
          CreateProjectActions.initiateProjectSuccess(data.responseData)
        );
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.initiateProjectError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.initiateProjectError());
      return toast.error(
        " Error while initiating project. Please try again after sometime."
      );
    }
  };
};

export const giveCollaboratorReviewAsync = (
  values,
  projectId,
  packageId,
  resetForm
) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      dispatch(CreateProjectActions.reviewCollaboratorStart());
      const { data } = await axios({
        method: "POST",
        url: `${apiUrl}${userBaseURL}/submitCollaboratorReview/${_id}/${projectId}/${packageId}`,
        headers: {
          "Content-Type": "application/json",
        },
        data: values,
      });
      if (data.responseCode === 200) {
        dispatch(
          CreateProjectActions.reviewCollaboratorSuccess(data.responseData)
        );
        resetForm();
        toast.success(data.responseMessage);
        return data;
      }
      dispatch(
        CreateProjectActions.reviewCollaboratorError(data.responseMessage)
      );
      resetForm();

      toast.error(data.responseMessage);
      return data;
    } catch (error) {
      dispatch(CreateProjectActions.reviewCollaboratorError());
      resetForm();

      return toast.error(
        " Error while giving review. Please try again after sometime."
      );
    }
  };
};

export const getPackageCollaboratorsList = (projectId, packageId) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user || {};

      dispatch(CreateProjectActions.getPackageCollboratorStart());

      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/getPackageCollaborators/${_id}/${projectId}/${packageId}`,
        params: {
          colaboratorsId: "",
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          CreateProjectActions.getPackageCollboratorSuccess(data.responseData)
        );
      }

      dispatch(
        CreateProjectActions.getPackageCollboratorError(data.responseMessage)
      );
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.getPackageCollboratorError(error));
    }
  };
};

export const deleteProjectAsync = (projectId) => {
  return async (dispatch, getState) => {
    try {
      dispatch(CreateProjectActions.deleteProjectStart());
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/deleteProject/${_id}/${projectId}`,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        dispatch(CreateProjectActions.deleteProjectSuccess(data));
        return toast.success(data.responseMessage);
      }
      dispatch(CreateProjectActions.deleteProjectError(data));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(CreateProjectActions.deleteProjectError());
      return toast.error(
        "Getting Error while delete project. Please try again after sometime."
      );
    }
  };
};

export const updateFinishProjectStatusAsync = (projectId, status) => {
  return async (dispatch, getState) => {
    try {
      let { _id } = getState().auth.user;
      const { data } = await axios({
        method: "GET",
        url: `${apiUrl}${userBaseURL}/updateFinishProjectStatus/${_id}/${projectId}/${status}`,
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

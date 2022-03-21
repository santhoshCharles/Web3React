import axios from "axios";
import { projectListActions } from "./projectListAction";
import { getUserURL, getCommonBaseURL, getMasterData } from "../../../utils";
import { CreateProjectActions } from "../../CreateProject/redux/createProjectAction";
import { toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API;

export const projectList = (changeObj, clickObj, mode, limitRecords) => {
  return async (dispatch, getState) => {
    try {
      const jsonData = JSON.stringify(changeObj);

      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};
      let { skip, limit } = getState().projectList;
      dispatch(CreateProjectActions.resetProjectDetail());
      dispatch(projectListActions.projectListStart());

      const projectType =
        mode == "exploreProjects"
          ? `exploreProjects`
          : `getMyInitiatedProjects`;

      const limitCount = limitRecords ? limitRecords : limit;

      //Checked whether user is logged in 
      let url = `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/${projectType}?skip=${skip}&limit=${limitCount}&column=&dir=&search=${clickObj.search}`;
      if (_id) {
        if(mode === "exploreProjects"){
          url = `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/${projectType}?id=${_id}&skip=${skip}&limit=${limitCount}&column=&dir=&search=${clickObj.search}`;
        }else{
          url = `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/${projectType}/${_id}?skip=${skip}&limit=${limitCount}&column=&dir=&search=${clickObj.search}`;
        }
      }
      //Checked whether user is logged in 

      const { data } = await axios({
        method: "POST",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
        data: jsonData,
      });

      if (data.responseCode === 200) {
        return dispatch(
          projectListActions.projectListSuccess(data.responseData)
        );
      }

      dispatch(projectListActions.projectListError(data.responseMessage));
      return toast.error(data.responseMessage);
    } catch (error) {
      dispatch(projectListActions.projectListError(error));
    }
  };
};

export const collaboratorList = () => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(projectListActions.collaboratorListStart());

      //Checked whether user is logged in 
      let url = `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/getMasterDetails`;
      if (_id) {
        url = `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/getMasterDetails?id=${_id}`;
      }
      //Checked whether user is logged in 

      const { data } = await axios({
        method: "GET",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {

        const collaboratorLevels = getMasterData("Collaborator Levels", data.responseData);
                
        return dispatch(
          projectListActions.collaboratorListSuccess(
            collaboratorLevels
          )
        );
      }

      dispatch(projectListActions.collaboratorListError());
    } catch (error) {
      dispatch(projectListActions.collaboratorListError(error));
    }
  };
};

export const budgetRange = (mode) => {
  return async (dispatch, getState) => {
    try {
      const commonBaseURL = getCommonBaseURL(getState());
      let { _id } = getState().auth.user || {};

      dispatch(projectListActions.budgetRangeStart());

      const projectType =
        mode == "myProjects"
          ? `getMyProjectsBudgetRange/${_id}`
          : `getExploreBudgetRange`;

      //Checked whether user is logged in 
      let url = `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/${projectType}`;
      if (_id) {
        url = `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/${projectType}?id=${_id}`;
      }
      //Checked whether user is logged in 

      const { data } = await axios({
        method: "GET",
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (data.responseCode === 200) {
        return dispatch(
          projectListActions.budgetRangeSuccess(data.responseData)
        );
      }

      dispatch(projectListActions.budgetRangeError());
    } catch (error) {
      dispatch(projectListActions.budgetRangeError(error));
    }
  };
};

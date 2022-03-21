import { combineReducers } from "redux";
import * as auth from "../containers/auth/redux/authReducer";
import * as environnment from "../containers/GetEnvironment/getEnvironmentReducer";
import * as createProject from "../containers/CreateProject/redux/createProjectReducer";
import * as userProfile from "../containers/Profile/redux/userProfileReducer";
import * as masterDetails from "../containers/GetMasterDetailRedux/getMasterDetailReducer";
import * as projectList from "../containers/ProjectList/redux/projectListReducer";
import * as packageDetail from "../containers/PackageDetails/redux/packageReducer";
import * as cms from "../containers/AboutUs/redux/cmsReducer";
import * as dashboardDetail from "../containers/Dashboard/redux/dashboardReducer";
import * as notification from "../containers/Notification/redux/notificationReducer";
import * as chat from "../containers/Chat/redux/chatReducer";
import * as profile from "../containers/Settings/pages/redux/profileReducer";
import * as deliverables from "../containers/SubmitDeliverable/redux/deliverableReducer";
import * as paymentDashboard from "../containers/PaymentDashboardCollaborator/redux/paymentDashboardReducer";
import * as projectBoard from "../containers/Deliverables/redux/projectBoardReducer";
export const rootReducer = combineReducers({
  auth: auth.reducer,
  chat: chat.reducer,
  profile: profile.reducer,
  environnment: environnment.reducer,
  createProject: createProject.reducer,
  userProfile: userProfile.reducer,
  masterDetails: masterDetails.reducer,
  projectList: projectList.reducer,
  packageDetail: packageDetail.reducer,
  cms: cms.reducer,
  dashboardDetail: dashboardDetail.reducer,
  notification: notification.reducer,
  deliverables: deliverables.reducer,
  paymentDashboard: paymentDashboard.reducer,
  projectBoard: projectBoard.reducer,
});

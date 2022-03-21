import React, { Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import Header from "../containers/Header/Header";
import Footer from "../containers/Footer/Footer";
import HomePage from "../containers/Home/Home";
import RegisterPage from "../containers/auth/pages/Register";
import CreatePassword from "../containers/auth/pages/CreatePassword";
import ProfilePage from "../containers/Profile/pages/Profile";
import { getEnvironmentsAsync } from "../containers/GetEnvironment/getEnvironmentApi";
import Explore from "../containers/Explore/pages/Explore";
import ProjectDetails from "../containers/ProjectDetails/pages/ProjectDetails";
import PackageDetails from "../containers/PackageDetails/PackageDetails";
import CreateProject from "../containers/CreateProject/CreateProject";
import Settings from "../containers/Settings/pages/Settings";
import AboutUs from "../containers/AboutUs/AboutUs";
import Team from "../containers/Team/Team";
import Features from "../containers/Features/Features";
import ContactUs from "../containers/ContactUs/ContactUs";
import FAQ from "../containers/FAQ/FAQ";
import Roadmap from "../containers/Roadmap/Roadmap";
import SplashScreen from "../components/SplashScreen/SplashScreen";
import Dashboard from "../containers/Dashboard/pages/Dashboard";
import Packages from "../containers/Dashboard/pages/Packages";
import PrivacyPolicy from "../containers/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "../containers/TermsConditions/TermsConditions";
import Request from "../containers/Dashboard/pages/Request";
import Notification from "../containers/Notification/Notification";
import Error from "../containers/Error/Error";
import Chat from "../containers/Chat/Chat";
import Referrals from "../containers/Referrals/pages/Referrals";
import SubmitDeliverable from "../containers/SubmitDeliverable/pages/SubmitDeliverable";
import PaymentDashboardCollaborator from "../containers/PaymentDashboardCollaborator/PaymentDashboardCollaborator";
import ExpensesDashBoardInitiator from "../containers/ExpensesDashBoardInitiator/ExpensesDashBoardInitiator";
import Deliverables from "../containers/Deliverables/Deliverables";
import Review from "../containers/ProjectDetails/pages/Review";
import { getMasterDetailsAsync } from "../containers/GetMasterDetailRedux/getMasterDetailApi";
import AplicantProfile from "../containers/Dashboard/pages/AplicantProfile";
import {Web3Context} from '../web3/contexts/web3Context';
//import socket from "../components/Socket/Socket";
//import { getNotificationListAsync } from "../containers/Notification/redux/notificationApi";

export function Routes() {
  const {handleConnect} = React.useContext(Web3Context);
  const history = useHistory();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { masterDetails, refreshMasterDetails } = useSelector(
    (state) => state.masterDetails,
    shallowEqual
  );
  const dispatch = useDispatch();
  /* useEffect(() => {
    return () => {
      console.log("socket Disconnected");
      socket.disconnect();
    };
  }, []); */
  const { isAuthorized, tokenVerified, isOtpVerified } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken && auth.user,
      tokenVerified: auth.tokenVerified,
      isOtpVerified: auth.isOtpVerified
    }),
    shallowEqual
  );

  useEffect(() => {
    if (refreshMasterDetails) {
      dispatch(getMasterDetailsAsync());
    }
  }, [refreshMasterDetails]);
  
  useEffect(() => {
    if(isOtpVerified) {
      handleConnect()
    }
  }, [isOtpVerified])
  
  useEffect(() => {
    dispatch(getEnvironmentsAsync());
  }, []);

  // useEffect(() => {
  //   console.log("isAuthorized", this);
  //   // if(isAuthorized===undefined) {
  //   //   history.push('/');
  //   // }

  // }, [isAuthorized])

  /* useEffect(() => {
    if (user !== null) {
      dispatch(getNotificationListAsync());
    }
  }, [user]); */

  const PrivateRoute = ({ children, ...rest }) => {
    return (
      <Route
        {...rest}
        render={() => {
          return isAuthorized ? children : <Redirect to="/" />;
        }}
      />
    );
  };
  
  return (
    <Router>
      <Header />
      <Suspense fallback={<SplashScreen />}>
        <Switch>
          <Route exact path="/" component={Explore} />
          <Route exact path="/aboutus" component={AboutUs} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/features" component={Features} />
          <Route exact path="/faq" component={FAQ} />
          <Route exact path="/contactus" component={ContactUs} />
          <Route exact path="/roadmap" component={Roadmap} />
          <Route exact path="/privacy-policy" component={PrivacyPolicy} />
          <Route exact path="/terms-conditions" component={TermsConditions} />
          <Route
            exact
            path="/resetPassword/:resetCode"
            component={CreatePassword}
          />
          <Route exact path="/register" component={RegisterPage} />
          <Route path="/explore" component={Explore} />
          <Route
            path="/project-details/:projectId"
            component={ProjectDetails}
          />
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          {/* <PrivateRoute path="/explore">
            <Explore />
          </PrivateRoute> */}
          <PrivateRoute path="/profile">
            <ProfilePage />
          </PrivateRoute>
          <PrivateRoute path="/package-details">
            <PackageDetails />
          </PrivateRoute>
          <PrivateRoute exact path="/create-project">
            <CreateProject />
          </PrivateRoute>
          <PrivateRoute path="/edit-project/:projectId">
            <CreateProject />
          </PrivateRoute>
          {/* <PrivateRoute path="/project-details/:projectId">
            <ProjectDetails />
          </PrivateRoute> */}
          <PrivateRoute path="/settings">
            <Settings />
          </PrivateRoute>
          <PrivateRoute path="/package-list/:projectId">
            <Packages />
          </PrivateRoute>
          <PrivateRoute path="/request">
            <Request />
          </PrivateRoute>
          <PrivateRoute path="/notification">
            <Notification />
          </PrivateRoute>
          <PrivateRoute path="/chat">
            <Chat />
          </PrivateRoute>
          <PrivateRoute path="/referrals">
            <Referrals />
          </PrivateRoute>
          <PrivateRoute path="/submit-deliverable">
            <SubmitDeliverable />
          </PrivateRoute>
          <PrivateRoute path="/paymentdashboardcollaborator">
            <PaymentDashboardCollaborator />
          </PrivateRoute>
          <PrivateRoute path="/expensesdashBoardinitiator">
            <ExpensesDashBoardInitiator />
          </PrivateRoute>
          <PrivateRoute path="/deliverables">
            <Deliverables />
          </PrivateRoute>
          <PrivateRoute path="/review">
            <Review />
          </PrivateRoute>
          <Route path="/aplicant-profile">
            <AplicantProfile />
          </Route>
          <Route path="/**" component={Error} />
        </Switch>
      </Suspense>
      <Footer />
    </Router>
  );
}

import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getMasterDetailsAsync } from "../../GetMasterDetailRedux/getMasterDetailApi";
import {
  cancelWorkTask,
  getAllPackagesAsync,
  getPackageCollaboratorsList,
} from "../../CreateProject/redux/createProjectApi";
import Alert from "react-bootstrap/Alert";
import { Link, useParams, useHistory } from "react-router-dom";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import Forgot from "../../auth/pages/Forgot";
import Login from "../../auth/pages/Login";
import AddWorkTask from "./AddEditWorkTask";
import moment from "moment";
import ModalYesNo from "../../../components/Modal/ModalYesNo";
import ReviewModal from "../../../components/ReviewModal/ReviewModal";
import info from "../../../assets/images/info.svg";
import PencilWhite from "../../../assets/images/PencilWhite.svg";
import starwhite from "../../../assets/images/starwhite.svg";
import ArrowRight from "../../../assets/images/ArrowRight.svg";

const Packages = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [selectedPackageData, setSelectedPackageData] = useState({});
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();

  const { masterDetails, refreshMasterDetails } = useSelector(
    (state) => state.masterDetails,
    shallowEqual
  );
  const [AddWorkTaskShow, setAddWorkTaskShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const onCloseAddWorkTask = () => {
    setAddWorkTaskShow(false);
  };
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);

  const handleClose = () => {
    setSelectedPackageData({});
    setShow(false);
  };

  const [showForgot, setShowForgot] = useState(false);
  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = () => {
    setShowLogin(false);
    setShowForgot(true);
  };

  //Modal
  const [showReviewModal, setShowReviewModal] = useState(false);
  const handleCloseReview = () => {
    setSelectedPackageData({});
    setShowReviewModal(false);
  };
  const handleShowReview = (packageData) => {
    setSelectedPackageData(packageData);
    setShowReviewModal(true);
  };

  const {
    getAllPackages,
    projectDetail,
    refreshGetAllPackages,
    isLoading,
    packageCollaborators,
  } = useSelector((state) => state.createProject, shallowEqual);

  // const handleOk = async () => {
  //   const response = await dispatch(removeportfolioAsync(portfolioDeleteId));
  //   // if (response.responseCode === 200) {
  //   //   handleClose();
  //   // }
  // };

  const { user, isOtpVerified } = useSelector(
    (state) => state.auth,
    shallowEqual
  );
  const getClassName = (status) => {
    switch (status) {
      case "OPEN": {
        return "lbl-grey";
      }
      case "COMPLETED": {
        return "lbl-green";
      }
      case "DELIVERED": {
        return "lbl-blue";
      }
      case "INPROGRESS": {
        return "lbl-yellow";
      }
      default:
        return "lbl-yellow";
    }
  };

  // useEffect(() => {
  //   if (refreshMasterDetails) {
  //     dispatch(getMasterDetailsAsync());
  //   }
  // }, [refreshMasterDetails]);

  useEffect(() => {
    if (refreshGetAllPackages) {
      dispatch(getAllPackagesAsync(params && params.projectId));
    }
  }, [refreshGetAllPackages, params && params.projectId]);

  const handleEdit = (data) => {
    setEditData(data);
    setIsEditMode(true);
    setAddWorkTaskShow(true);
  };
  const handleOpenPop = (packageData) => {
    setShow(true);
    setSelectedPackageData(packageData);
  };
  const handleCancelWorkTask = () => {
    //console.log(packageData)
    // setShow(true);

    dispatch(
      cancelWorkTask(
        params && params.projectId,
        selectedPackageData && selectedPackageData._id,
        handleClose
      )
    );
    // setSelectedPackageData({});
  };
  const redirectToPackageDetails = (packageData) => {
    history.push({
      pathname: `/package-details/?projectId=${
        params && params.projectId
      }&packageId=${packageData._id}`,
    });
  };

  const redirecToReviewDeliverables = (packageId) => {
    return history.push({
      pathname: `/submit-deliverable/?projectId=${projectDetail._id}&packageId=${packageId}&view=initiator`,
    });
  };

  const collboratorExists = (collaborators) => {
    let flag = false;
    const response = collaborators.filter(
      (collaborator) => collaborator._id === user._id
    );
    if (response.length > 0) {
      flag = true;
    } else {
      flag = false;
    }
    return flag;
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      {/* {user && user.isOTPVerified && ( */}
      <Container className="bg-white shadowBox radius-top-0">
        {projectDetail.adminVerification === "ACCEPTED" ? (
          <>
            {user === null && (
              <Alert variant="danger">
                You need to login or signup to view the tasks.
              </Alert>
            )}

            <Row>
              <Col md={4}>
                <div className="h2 pb-3">WorkTasks</div>
              </Col>
              {user &&
                user.isOTPVerified &&
                projectDetail.initiator === user._id &&
                projectDetail.projectStatus !== "COMPLETED" && (
                  <Col md={8}>
                    <div className="d-flex align-items-center justify-content-md-end">
                      <button
                        className="btn btn-blue mb-2 mr-3"
                        onClick={() => setAddWorkTaskShow(true)}
                      >
                        Add a New WorkTask
                      </button>
                      {/* <div>
                       <input
                         placeholder="Search"
                         type="text"
                         className="Re_ChatSearch re_inputRouded mb-2"
                       />
                     </div> */}
                    </div>
                  </Col>
                )}
            </Row>

            {getAllPackages && getAllPackages.length > 0 ? (
              <Table responsive>
                <thead>
                  <tr>
                    <th className="p4 color_gray font-weight-400">
                      INITIATED BY
                    </th>
                    <th className="p4 color_gray font-weight-400">PROJECT</th>
                    <th className="p4 color_gray font-weight-400">DEADLINE</th>
                    <th className="p4 color_gray font-weight-400">
                      COLLABORATORS
                    </th>
                    <th className="p4 color_gray font-weight-400">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {getAllPackages.map((packageData, index) => (
                    <>
                      <tr key={packageData._id}>
                        <td>
                          <div className="p2">{packageData.name}</div>
                          <div className="d-flex align-items-center p4 color_gray">
                            By<span className="re_dot mx-2"></span>
                            {packageData.initiatorDetails
                              ? packageData.initiatorDetails.fullName
                              : ""}
                          </div>
                        </td>
                        <td>
                          <div className="p2 re_ellips re_width-370px">
                            {projectDetail.title}
                          </div>

                          <div className="d-flex align-items-center p4 color_gray">
                            {projectDetail.totalBudget
                              ? `${
                                  projectDetail.tokenName !== null
                                    ? projectDetail.tokenName
                                    : "$"
                                } ${projectDetail.totalBudget}`
                              : `${
                                  projectDetail.tokenName !== null
                                    ? projectDetail.tokenName
                                    : "$"
                                } ${0}`}{" "}
                            Total Budget
                          </div>
                        </td>
                        <td>
                          <div className="p2">
                            {moment(packageData.endDate).format(" DD MMM YY")}
                          </div>
                        </td>
                        <td>
                          <div className="p2">
                            {packageData.collaborators
                              ? packageData.collaborators.length
                              : ""}{" "}
                            {/* {packageData.collaborators.length
                                ? packageData.collaborators.length
                                : 0}{" "} */}
                            Approved
                          </div>
                        </td>
                        <td width="120px">
                          <label
                            className={getClassName(packageData.workStatus)}
                          >
                            {packageData.workStatus}
                            <OverlayTrigger
                              placement="bottom"
                              delay={{ show: 250, hide: 400 }}
                              overlay={
                                <Tooltip className="re_tooltip">
                                  {packageData.name}
                                </Tooltip>
                              }
                            >
                              <img
                                src={info}
                                alt="info"
                                width="12px"
                                height="12px"
                                className="ml-2"
                              />
                            </OverlayTrigger>
                          </label>
                        </td>
                      </tr>

                      <tr>
                        <td colSpan="5" className="border-0">
                          {user && user.isOTPVerified && (
                            <div className="d-flex align-items-center justify-content-between">
                              <div className="d-flex align-items-center">
                                {user &&
                                  projectDetail.initiator === user._id &&
                                  (packageData.workStatus === "OPEN" ||
                                    packageData.workStatus === "INPROGRESS" ||
                                    packageData.workStatus === "DELIVERED") &&
                                  projectDetail.projectStatus !==
                                    "COMPLETED" && (
                                    <Button
                                      variant="blue"
                                      onClick={() => handleEdit(packageData)}
                                      className="mr-2"
                                    >
                                      <img
                                        src={PencilWhite}
                                        alt="edit"
                                        className="mr-2"
                                      />
                                      Edit
                                    </Button>
                                  )}
                                {user && (
                                  <Button
                                    variant="blue"
                                    onClick={() =>
                                      redirectToPackageDetails(packageData)
                                    }
                                    className="mr-2"
                                  >
                                    View the WorkTask
                                  </Button>
                                )}

                                {user &&
                                  (packageData.initiatorDetails._id ===
                                    user._id || packageData.observersIds.includes(user._id)) &&
                                  packageData.workStatus === "DELIVERED" && (
                                    <Button
                                      variant="green"
                                      onClick={() =>
                                        redirecToReviewDeliverables(packageData._id)
                                      }
                                      className="mr-2"
                                    >
                                      Review the Deliverables
                                    </Button>
                                  )}
                                {user &&
                                  projectDetail.initiator === user._id &&
                                  (packageData.workStatus === "OPEN" ||
                                    packageData.workStatus === "DELIVERED" ||
                                    packageData.workStatus ===
                                      "INPROGRESS") && (
                                    <Button
                                      variant="outline-black"
                                      onClick={() => handleOpenPop(packageData)}
                                      className="mr-2"
                                    >
                                      Cancel the workTask
                                    </Button>
                                  )}
                              </div>

                              {user &&
                                packageData.initiatorDetails._id === user._id &&
                                packageData.workStatus === "DELIVERED" && (
                                  <Button
                                    variant="red"
                                    onClick={() =>
                                      handleShowReview(packageData)
                                    }
                                  >
                                    <img
                                      src={starwhite}
                                      alt=""
                                      className="mr-2"
                                    />
                                    Post a Review
                                    <img
                                      src={ArrowRight}
                                      alt=""
                                      className="ml-2"
                                    />
                                  </Button>
                                )}
                            </div>
                          )}
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center p3 color_gray ">
                No worktask added
              </div>
            )}
          </>
        ) : (
          <div className="text-center p3 color_gray ">
            Wait for approval from admin
          </div>
        )}
      </Container>
      {/* // )} */}
      <AddWorkTask
        onAddWorkTaskShow={AddWorkTaskShow}
        onCloseAddWorkTask={onCloseAddWorkTask}
        projectDetail={projectDetail}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        editData={editData}
        setEditData={setEditData}
      />
      <ReviewModal
        showReviewModal={showReviewModal}
        projectDetail={projectDetail}
        selectedPackageData={selectedPackageData}
        handleCloseReview={handleCloseReview}
      />
      <ModalYesNo
        show={!!show}
        handleClose={handleClose}
        handleOk={handleCancelWorkTask}
        // showLoader={false}
        selectedPackageData={selectedPackageData}
        // showLoaderText="Cancelling..."
        text="Are you sure want to Cancel ?"
        subText="Please confirm with us to continue"
      />
      {!isOtpVerified && (
        <Login
          showLogin={showLogin}
          handleCloseLogin={handleCloseLogin}
          link={true}
          handleShowForgot={handleShowForgot}
        />
      )}
      <Forgot showForgot={showForgot} handleCloseForgot={handleCloseForgot} />
    </>
  );
};
export default Packages;

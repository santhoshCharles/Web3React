import React, { useState, useEffect, useContext } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import Modal1 from "../../components/Modal/Modal";
import RatingModal from "../../components/RatingModal/RatingModal";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import queryString from "query-string";
import {
  getPackageAsync,
  joinPackageAsync,
  workPackageStartAsync,
  workPackageSubmitAsync,
  withdrawPackageAsync,
  finishPackageAsync,
  updateFinishStatusAsync
} from "./redux/packageApi";

import { PackageMap } from "./redux/packageAction";

import prologo from "../../assets/images/prologo.svg";
import info from "../../assets/images/info.svg";
import ModalYesNo from "../../components/Modal/ModalYesNo";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import { PackageActions } from "./redux/packageAction";
import rightmark from "../../assets/images/rightmark.svg";
import packagecompleted from "../../assets/images/packagecompleted.svg";
import { useHistory, Link } from "react-router-dom";
import { Web3Context } from "../../web3/contexts/web3Context";
import { poolMethods } from '../../web3/functions/factory'
import { toast } from "react-toastify";
import Profile from "../../assets/images/Profile.png";
import CollaboratorModal from "../../components/ProjectList/CollaboratorModal";

const PackageDetails = () => {
  const { networkDetails, handleConnect } = useContext(Web3Context);
  const [getInstance, setInstance] = useState();
  const [ShowRequestsModel, setShowRequestsModel] = useState(false);
  const [projectCollaborators, setProjectCollaborators] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    packageDetail,
    isLoading,
    packageJoined,
    requestLoading,
    joinPackage,
    workStartLoading,
    workSubmitLoading,
    refreshPackageDetail,
    withdrawPackageLoading,
    finishPackageLoading,
    finishpackageResponse,
  } = useSelector((state) => state.packageDetail, shallowEqual);

  const { projectDetail } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );

  const { _id } = useSelector((state) => state.auth.user, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);

  const queryParams = queryString.parse(window.location.search);

  //range slider
  const [state, setState] = useState({
    values: "",
    update: "",
  });
  const handleChangeBudget = (values) => {
    setState({ values });
  };
  const handleUpdateBudget = (values) => {
    setState({ values });
  };

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleJoinRequest = async () => {
    if (queryParams && queryParams.projectId && queryParams.packageId) {
      //SC OBJECT
      /* const addCollaboratorObj = {
        projectId: queryParams.projectId,
        packageId: queryParams.packageId,
        collaborator: networkDetails.address,
        mgp: packageDetail.minimumCost
      }; */
      //SC OBJECT

      dispatch(joinPackageAsync(queryParams.projectId, queryParams.packageId));
      /* if(getInstance){
        await poolMethods.addCollaborator(getInstance, networkDetails.address, addCollaboratorObj)
      } */
    }
  };

  useEffect(() => {
    (async () => {
      const instance = await poolMethods.getInstance(networkDetails.web3)
      if (instance) {
        setInstance(instance);
      }
    })()
  }, [networkDetails.web3])

  useEffect(() => {
    return () => {
      dispatch({ type: PackageMap.RESET_JOIN_PACKAGE_INFO });
    };
  }, [])


  /* useEffect(async () => {
    if (finishpackageResponse.responseData) {
      const collaboratorWalletAddress = finishpackageResponse.responseData && Array.from(finishpackageResponse.responseData.collaborators, ({ walletAddress }) => walletAddress);
      const collaboratorScores = finishpackageResponse.responseData && Array.from(finishpackageResponse.responseData.collaborators, ({ payableAmount }) => Number(payableAmount));

      const setBonusScoresObj = {
        projectId: packageDetail.scProjectId,
        packageId: packageDetail.scPackageId,
        collaborators: collaboratorWalletAddress,
        scores: collaboratorScores
      }

      const getMgpBonusObj = {
        projectId: packageDetail.scProjectId,
        packageId: packageDetail.scPackageId
      }
      try {
        await poolMethods.setBonusScores(getInstance, networkDetails.address, setBonusScoresObj)
        await poolMethods.getMgp(getInstance, networkDetails.address, getMgpBonusObj)
        await poolMethods.getBonus(getInstance, networkDetails.address, getMgpBonusObj)
      } catch (err) {
        console.log('err', err)
      }
    }

  }, [finishpackageResponse]) */

  const handleStartWork = () => {

    dispatch(
      workPackageStartAsync(queryParams.projectId, queryParams.packageId)
    );
  };

  const handleSubmitWork = () => {
    /* dispatch(
      workPackageSubmitAsync(
        queryParams.projectId,
        queryParams.packageId,
        packageDetail.workProgress[0]._id
      )
    ); */
    history.push(
      `/submit-deliverable?projectId=${queryParams.projectId}&packageId=${queryParams.packageId}&view=collaborator`
    );
  };
  //Modal
  const [showFinishPackage, setShowFinishPackage] = useState(false);
  const handleCloseFinish = () => setShowFinishPackage(false);
  const handleShowFinish = () => setShowFinishPackage(true);

  //Modal
  const [showRating, setShowRating] = useState(false);
  const handleCloseRating = () => setShowRating(false);
  const handleShowRating = () => setShowRating(true);

  //Modal
  const [showWithdraw, setShowWithdraw] = useState(false);
  const handleCloseWithdraw = () => setShowWithdraw(false);
  const handleShowWithdraw = () => setShowWithdraw(true);

  const handleWithdraw = () => {
    if (queryParams && queryParams.projectId && queryParams.packageId) {
      dispatch(
        withdrawPackageAsync(queryParams.projectId, queryParams.packageId)
      );
      setShowWithdraw(false);
    }
  };
  const handleFinishPackage = async () => {
    if (queryParams && queryParams.projectId && queryParams.packageId) {
      //SC OBJECT
      const finishPackageObj = {
        projectId: packageDetail.scProjectId,
        packageId: packageDetail.scPackageId
      };
      //SC OBJECT


      if (getInstance) {
        if (packageDetail.finishStatus === "OPEN") {
          try {
            dispatch(PackageActions.finishPackageSCStart());

            const finishPackage = await poolMethods.finishPackage(getInstance, networkDetails.address, finishPackageObj)
            setShowFinishPackage(false)
            console.log({ "blockHash": finishPackage.blockHash })
            if (finishPackage && finishPackage.blockHash) {
              console.log("in")
              await dispatch(updateFinishStatusAsync(queryParams.projectId, queryParams.packageId, "SC_SUCCESS"))
              await dispatch(
                finishPackageAsync(queryParams.projectId, queryParams.packageId)
              );
            }
            dispatch(PackageActions.finishPackageSCSuccess());
          } catch (err) {
            toast.error(err)
            dispatch(PackageActions.finishPackageError());
          }
        } else {
          setShowFinishPackage(false)
          await dispatch(
            finishPackageAsync(queryParams.projectId, queryParams.packageId)
          );
        }
      } else {
        handleConnect()
      }
    }
  };

  const handlecloseRequestsModel = () => {
    setShowRequestsModel(false);
  };

  const openRequestsModel = (event) => {
    event.preventDefault();
    const projectIndex = event.target.alt ? event.target.alt : event.target.id;
    const totalTeamMembers = packageDetail.totalTeamMembers.filter(
      (e) => e !== undefined
    );
    setProjectCollaborators(totalTeamMembers);
    setShowRequestsModel(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //calling api to fetch package detail
  useEffect(() => {
    if (
      queryParams &&
      queryParams.projectId &&
      queryParams.packageId &&
      refreshPackageDetail
    ) {
      dispatch(getPackageAsync(queryParams.projectId, queryParams.packageId));
    }
  }, [refreshPackageDetail]);

  useEffect(() => {
    if (packageJoined === true) setShow(true);
    /* return () => {
      dispatch(PackageActions.resetJoinPackageFlag());
    }; */
  }, [packageJoined]);

  /* useEffect(() => {
    if (finishpackageResponse.responseCode === 200) {
      setShowFinishPackage(true);
    }
  }, [finishpackageResponse]); */

  useEffect(() => {
    return () => {
      dispatch(PackageActions.resetJoinPackageFlag());
    };
  }, []);

  return (
    <>
      {isLoading && <SplashScreen />}
      <section className="re_titleMain">
        <Container>
          <Row className="align-items-end">
            <Col lg={8}>
              <div className="mb-0 d-flex align-items-center re_detailsHdr">
                <div className="re_picon re_lg mr-3">
                  <img
                    src={
                      projectDetail && projectDetail.logo
                        ? projectDetail.logo
                        : prologo
                    }
                    alt="icon"
                    className="mw-100 mh-100"
                  />
                </div>
                <div>
                  <div className="p3 text-white pb-3">
                    {packageDetail && packageDetail.title}
                  </div>
                  <div className="h1 text-white pb-3">
                    {packageDetail && packageDetail.name}
                    <img src={rightmark} alt="rightmark" className="ml-2" />
                  </div>
                  <div className="d-flex align-items-center">
                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip className="re_tooltip">
                          Minimum Guaranteed Payment
                        </Tooltip>
                      }
                    >
                      <div className="re_blueGradiant re_lbl mr-2">
                        {packageDetail && packageDetail.minimumCost}{" "}
                        {packageDetail.tokenName !== null &&
                          packageDetail.tokenName !== undefined
                          ? packageDetail.tokenName
                          : "USD"}

                        <img src={info} alt="info" className="ml-2" />

                      </div>
                    </OverlayTrigger>

                    <OverlayTrigger
                      placement="bottom"
                      delay={{ show: 250, hide: 400 }}
                      overlay={
                        <Tooltip className="re_tooltip">Bonus</Tooltip>
                      }
                    >
                      <div className="re_greenGradiant re_lbl">
                        {packageDetail && packageDetail.bonus !== ""
                          ? packageDetail.bonus
                          : 0}{" "}
                        {packageDetail.tokenName !== null &&
                          packageDetail.tokenName !== undefined
                          ? packageDetail.tokenName
                          : "USD"}{" "}

                        <img src={info} alt="info" className="ml-2" />

                      </div>
                    </OverlayTrigger>
                  </div>
                </div>
              </div>
            </Col>
            <Col
              lg={4}
              className="d-flex align-items-end justify-content-md-end pt-3"
            >
              {packageDetail &&
                packageDetail.initiator == _id &&
                packageDetail.adminVerification == "ACCEPTED" ? (
                packageDetail.workStatus !== "COMPLETED" && packageDetail.workStatus !== "SUBMITTED" && packageDetail.finishStatus !== "SUCCESS" ? (
                  <Button
                    variant="blue"
                    onClick={() => setShowFinishPackage(true)}
                    disabled={finishPackageLoading}
                  >
                    {finishPackageLoading ? (
                      <>
                        Finishing...
                        <img
                          src={LoadingImage}
                          alt="LoadingImage"
                          width="20px"
                          className="ml-2"
                        />
                      </>
                    ) : (
                      "Finish Package"
                    )}
                  </Button>
                ) : (
                  packageDetail.workStatus === "COMPLETED" ? <img src={packagecompleted} alt="packagecompleted" /> : "Your request has been processed for finish the package, ReBakedDAO will approve it soon."
                )
              ) : null}
            </Col>
          </Row>
        </Container>
      </section>

      <section className="pt-80 pb-80">
        <Container className="bg-white shadowBox">
          <Container>
            <Row className="align-items-center py-3 py-md-4">
              <Col md={6}>
                {user && (
                  <div className="d-flex align-items-center re_imageUsers">
                    <Link
                      to="/"
                      className="re_imgGrroup h-35px"
                      onClick={openRequestsModel}
                    >
                      {packageDetail &&
                        packageDetail.totalTeamMembers &&
                        packageDetail.totalTeamMembers.map((member, index) => {
                          if (index <= 2 && member !== undefined) {
                            return (
                              <img
                                key={member && member._id}
                                src={
                                  member && member.profilePicture
                                    ? member.profilePicture
                                    : Profile
                                }
                                alt="team"
                              />
                            );
                          }
                        })}
                      {packageDetail.totalTeamMembers &&
                        packageDetail.totalTeamMembers.length > 3 && (
                          <div className="re_more">
                            {packageDetail.totalTeamMembers.length - 3}
                          </div>
                        )}
                      {packageDetail.totalTeamMembers &&
                        packageDetail.totalTeamMembers.length === 0 && (
                          // <div className="f16-700 opacity50 ">
                          //   No member are present currently
                          // </div>
                          <div className="color_blue p4">Looking Team Members</div>
                        )}
                    </Link>
                  </div>
                )}
              </Col>

              {packageDetail.packageMembers && (packageDetail.packageMembers.includes(_id) || packageDetail.initiator === _id) &&
                <Col md={6}>
                  <div className="d-flex flex-wrap align-items-center py-4 justify-content-end">
                    <Link
                      to={{
                        pathname: `/deliverables`,
                        search: `?projectId=${queryParams && queryParams.projectId
                          }&packageId=${queryParams && queryParams.packageId}`,
                      }}
                      className="btn re_greenGradiant re_lbl"
                    >
                      Project Board
                    </Link>
                  </div>
                </Col>
              }
            </Row>
          </Container>
          <div className="p-4 re_EarningsList">
            <div className="h2 pb-4">{packageDetail.workStatus}</div>
            <Row>
              <Col xl={12}>
                <Row>
                  <Col lg={4} md={6} className="pb-2">
                    <Row>
                      <Col sm={4}>
                        <div className="color_gray p4">Package Link</div>
                      </Col>
                      <Col sm={8}>
                        <div className="color_black opacity70 p4 text-break font-weight-bold">
                          {packageDetail && packageDetail.link}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={6} className="pb-2">
                    <Row>
                      <Col sm={4}>
                        <div className="color_gray p4">Opened</div>
                      </Col>
                      <Col sm={8}>
                        <div className="color_black opacity70 p4 font-weight-bold">
                          {packageDetail &&
                            packageDetail.startDate &&
                            formatDistance(
                              subDays(new Date(packageDetail.startDate), 0),
                              new Date(),
                              { addSuffix: true }
                            )}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={6} className="pb-2">
                    <Row>
                      <Col sm={4}>
                        <div className="color_gray p4">Type of Task</div>
                      </Col>
                      <Col sm={8}>
                        <div className="color_black opacity70 p4 font-weight-bold">
                          {packageDetail && packageDetail.issueType}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={6} className="pb-2">
                    <Row>
                      <Col sm={4}>
                        <div className="color_gray p4">Project Type</div>
                      </Col>
                      <Col sm={8}>
                        <div className="color_black opacity70 p4 font-weight-bold">
                          {packageDetail && packageDetail.projectType}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={6} className="pb-2">
                    <Row>
                      <Col sm={4}>
                        <div className="color_gray p4">Time Commitment</div>
                      </Col>
                      <Col sm={8}>
                        <div className="color_black opacity70 p4 font-weight-bold">
                          {packageDetail &&
                            packageDetail.startDate &&
                            format(
                              new Date(packageDetail.startDate),
                              "dd  MMM yyyy"
                            )}{" "}
                          -{" "}
                          {packageDetail &&
                            packageDetail.endDate &&
                            format(
                              new Date(packageDetail.endDate),
                              "dd  MMM yyyy"
                            )}
                          {/* 21 Mar - 27 Apr, 2021 */}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col lg={4} md={6} className="pb-2">
                    <Row>
                      <Col sm={4}>
                        <div className="color_gray p4">Experience Level</div>
                      </Col>
                      <Col sm={8}>
                        <div className="color_black opacity70 p4 font-weight-bold">
                          {packageDetail && packageDetail.expertiseLevel}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
            </Row>
            {_id && packageDetail.initiator && (
              <div className="d-flex flex-wrap align-items-center py-4">
                {packageDetail.initiator && packageDetail.initiator !== _id ? (
                  packageDetail.collaborators &&
                    !packageDetail.collaborators.includes(_id) ? (
                    (packageDetail.requests &&
                      packageDetail.requests.includes(_id)) ||
                      (joinPackage.requests &&
                        joinPackage.requests.includes(_id)) ? (
                      <>
                        <Button
                          variant="blue"
                          className="mr-3 mt-2 mt-md-0"
                          disabled={true}
                        >
                          Already Requested
                        </Button>
                      </>
                    ) : packageDetail.workStatus !== "COMPLETED" &&
                      packageDetail.workStatus !== "EXPIRED" &&
                      packageDetail.workStatus !== "DELIVERED" &&
                      !packageDetail.observers.includes(_id) &&
                      packageDetail.endDate >= new Date().getTime() &&
                      packageDetail.isEligibleToSendRequestAgain ? (
                      <>
                        <Button
                          variant="blue"
                          className="mr-3 mt-2 mt-md-0"
                          onClick={handleJoinRequest}
                          disabled={requestLoading}
                        >
                          {requestLoading ? (
                            <>
                              Requesting...
                              <img
                                src={LoadingImage}
                                alt="LoadingImage"
                                width="20px"
                                className="ml-2"
                              />
                            </>
                          ) : (
                            "Request to join"
                          )}
                        </Button>
                      </>
                    ) : null
                  ) : (
                    <>
                      {packageDetail && Date.now() >= packageDetail.startDate ? (
                        packageDetail.workStatus === "OPEN" ||
                          packageDetail.workStatus === "INPROGRESS" ? (
                          <Button
                            variant="blue"
                            className="mr-3 mt-2 mt-md-0"
                            onClick={
                              !packageDetail.progressHistory.inProgressUsers.includes(_id.toString()) && !packageDetail.progressHistory.submittedUsers.includes(_id.toString())
                                ? handleStartWork
                                : handleSubmitWork
                            }
                            disabled={
                              !packageDetail.progressHistory.inProgressUsers.includes(_id.toString()) && !packageDetail.progressHistory.submittedUsers.includes(_id.toString())
                                ? workStartLoading
                                : workSubmitLoading
                            }
                          >
                            {!packageDetail.progressHistory.inProgressUsers.includes(_id.toString()) && !packageDetail.progressHistory.submittedUsers.includes(_id.toString()) ? (
                              workStartLoading ? (
                                <>
                                  Starting...
                                  <img
                                    src={LoadingImage}
                                    alt="LoadingImage"
                                    width="20px"
                                    className="ml-2"
                                  />
                                </>
                              ) : (
                                "Start Work"
                              )
                            ) : workSubmitLoading ? (
                              <>
                                Submitting...
                                <img
                                  src={LoadingImage}
                                  alt="LoadingImage"
                                  width="20px"
                                  className="ml-2"
                                />
                              </>
                            ) : (
                              "Deliver Work"
                            )}
                          </Button>
                        ) : null
                      ) : null}

                      {packageDetail.workStatus !== "COMPLETED" &&
                        <Button
                          variant="outline-black"
                          className="mr-3 mt-2 mt-md-0"
                          onClick={handleShowWithdraw}
                        >
                          Cancel Application
                        </Button>}

                      {console.log(packageDetail, "details-")}
                      {packageDetail.workStatus === "DELIVERED" &&
                        !packageDetail.isSubmittedRatings && (
                          <button
                            type="button"
                            className="btn btn-link-md mt-2 mt-md-0"
                            onClick={handleShowRating}
                          >
                            Rate your Collaborator
                          </button>
                        )}
                    </>
                  )
                ) : null}
              </div>
            )}
          </div>
          <div className="h3 pb-3">Description</div>
          <div className="p3 opacity70 pb-4">
            {packageDetail && packageDetail.description}
          </div>
          <div className="h3 pb-3">Context</div>
          <div className="p3 opacity70 pb-4">
            {packageDetail && packageDetail.context}
          </div>
          <div className="h3 pb-3">Acceptance Criteria</div>
          <div className="p3 opacity70 pb-4">
            {packageDetail && packageDetail.acceptanceCriteria}
          </div>
          <div className="h3 pb-3">Reference</div>
          <div className="p3 opacity70 pb-4">
            {packageDetail && packageDetail.reference}
          </div>
        </Container>
      </section>
      <Modal1
        show={show}
        handleClose={handleClose}
        text="Your request to join package has been submitted."
        subtext="Wait for approval from Initiator"
      />
      {/* <Modal1
        show={showFinishPackage}
        handleClose={handleCloseFinish}
        text="Your work task has been submitted."
        subtext="The project initiator will review, and validate if the submission meets the Minimum Acceptance Criteria."
      /> */}
      <RatingModal
        showRating={showRating}
        handleCloseRating={handleCloseRating}
        title="Rate Collaborator"
        handleChangeBudget={handleChangeBudget}
        handleUpdateBudget={handleUpdateBudget}
      />
      <ModalYesNo
        show={showWithdraw}
        handleClose={handleCloseWithdraw}
        handleOk={handleWithdraw}
        showLoader={withdrawPackageLoading}
        showLoaderText="Withdrawing..."
        text="Are you sure want to Cancel Application ?"
        subText="Your Minimum Guaranteed Remuneration will be recalled."
      />
      <ModalYesNo
        show={showFinishPackage}
        handleClose={handleCloseFinish}
        handleOk={handleFinishPackage}
        showLoader={finishPackageLoading}
        showLoaderText="Finishing..."
        text="Are you sure want to finish package ?"
        subText="Your request would be submitted to ReBakedDAO for approval."
      />
      <CollaboratorModal
        handleCloseRequest={handlecloseRequestsModel}
        showRequest={ShowRequestsModel}
        projectCollaborators={projectCollaborators}
      />
    </>
  );
};
export default PackageDetails;

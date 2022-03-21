import React, { useEffect, useRef, useState, useContext } from "react";
import { Col, Container, Row, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useHistory } from "react-router";
import queryString from "query-string";
import Summary from "./Summary";
import Packages from "./Packages";
import info from "../../../assets/images/info.svg";
import FAQ from "./FAQ";
import Modal1 from "../../../components/Modal/Modal";
import Profile from "../../../assets/images/Profile.png";
import titlebg from "../../../assets/images/titlebg.svg";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  getProjectDetailsAsync,
  updateProjectAsync,
  removeCoverImageAsync,
  finishProjectAsync,
  deleteProjectAsync,
  updateFinishProjectStatusAsync
} from "../../CreateProject/redux/createProjectApi";
import { CreateProjectMap } from "../../CreateProject/redux/createProjectAction";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import ProjectHeader from "../../../components/ProjectHeader/projectHeader";
import CollaboratorModal from "../../../components/ProjectList/CollaboratorModal";
import { Observers } from "./Observers";
import { Collaborators } from "./Collaborators";
import Review from "./Review";
import { Web3Context } from "../../../web3/contexts/web3Context";
import { poolMethods } from '../../../web3/functions/factory'
import { CreateProjectActions } from "../../CreateProject/redux/createProjectAction"
import { toast } from "react-toastify";

const ProjectDetails = () => {
  const { networkDetails, handleConnect } = useContext(Web3Context);
  const [getInstance, setInstance] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const [file, setFile] = useState({ file: null, url: "" });
  const params = useParams();
  const inputRef = useRef(null);
  const { user } = useSelector((state) => state.auth, shallowEqual);

  const {
    projectDetail,
    isLoading,
    finishProjectResponse,
    refreshProjectDetail,
  } = useSelector((state) => state.createProject, shallowEqual);

  let coverImage = projectDetail.coverImage
    ? `url(${projectDetail.coverImage})no-repeat scroll center center/ cover`
    : `url(${titlebg})no-repeat scroll center center/ cover`;

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const instance = await poolMethods.getInstance(networkDetails.web3);
      if (instance) {
        setInstance(instance);
      }
    })();
  }, [networkDetails.web3]);

  const [showStep, setShowStep] = useState(1);

  const [ShowRequestsModel, setShowRequestsModel] = useState(false);
  const [projectCollaborators, setProjectCollaborators] = useState([]);

  const handleStep = (e) => {
    history.push(`/project-details/${params && params.projectId}?tab=${e}`);
    setShowStep(e);
    localStorage.setItem("project_step", e);
  };

  useEffect(() => {
    const params = queryString.parse(history.location.search).tab;
    if (params) {
      setShowStep(Number(params));
    } else {
      setShowStep(1);
    }
  }, [showStep]);

  useEffect(() => {
    if (params && params.projectId)
      dispatch(getProjectDetailsAsync(params.projectId));
  }, [params && params.projectId]);

  useEffect(() => {
    if (refreshProjectDetail)
      dispatch(getProjectDetailsAsync(params.projectId));

    return () =>
      dispatch({ type: CreateProjectMap.RESET_REFRESH_PROJECT_DETAILS });
  }, [refreshProjectDetail]);

  const { projectId } = useParams();

  const [showFinish, setShowFinish] = useState(false);
  const handleCloseFinish = () => setShowFinish(false);
  const handleShowFinish = async () => {
    if (params && params.projectId) {
      //SC OBJECT
      const finishProjectObj = {
        projectId: projectDetail.scProjectId
      };
      //SC OBJECT

      if (getInstance) {
        if (projectDetail.finishStatus === "OPEN") {
          try {
            dispatch(CreateProjectActions.finishProjectSCStart());

            const finishProject = await poolMethods.finishProject(getInstance, networkDetails.address, finishProjectObj)

            if (finishProject && finishProject.blockHash) {
              await dispatch(updateFinishProjectStatusAsync(params.projectId, "SC_SUCCESS"))
              await dispatch(finishProjectAsync(params.projectId));
            }
            dispatch(CreateProjectActions.finishProjectSCSuccess());
          } catch (err) {
            toast.error(err)
            dispatch(CreateProjectActions.finishProjectError());
          }
        } else {

          await dispatch(
            finishProjectAsync(params.projectId)
          );
        }
      } else {
        handleConnect()
      }
    }
  };

  const handleDeleteProject = async () => {
    if (params && params.projectId) {
      await dispatch(deleteProjectAsync(params.projectId))
      history.push(`/profile?tab=5`)
    }
  }

  useEffect(() => {
    if (finishProjectResponse && finishProjectResponse.responseCode === 200) {
      setShowFinish(true);
    }
  }, [finishProjectResponse]);

  const [coverPic, setcoverPic] = useState({ file: null, url: "" });
  const handlecoverPic = (e) => {
    // setcoverPic({
    //   url: URL.createObjectURL(e.target.files[0]),
    //   file: e.target.files[0],
    // });

    if (e.target.files[0]) {
      let data = null;
      data = new FormData();
      data.append("img", e.target.files[0]);
      if (inputRef) {
        inputRef.current.value = "";
      }

      dispatch(
        updateProjectAsync(projectDetail._id, projectDetail, null, null, data)
      );
    }
  };

  const removeCoverPic = () => {
    dispatch(removeCoverImageAsync(projectDetail._id, projectDetail));
  };
  useEffect(() => {
    coverImage = projectDetail.coverImage
      ? `url(${projectDetail.coverImage})no-repeat scroll center center/ cover`
      : `url(${titlebg})no-repeat scroll center center/ cover`;
  }, [projectDetail]);

  const handlecloseRequestsModel = () => {
    setShowRequestsModel(false);
  };

  const openRequestsModel = (event) => {
    event.preventDefault();
    const projectIndex = event.target.alt ? event.target.alt : event.target.id;
    const totalTeamMembers = projectDetail.totalTeamMembers.filter(
      (e) => e !== undefined
    );
    setProjectCollaborators(totalTeamMembers);
    setShowRequestsModel(true);
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      <section className="re_titleMain" style={{ background: coverImage }}>
        <ProjectHeader
          logo={projectDetail && projectDetail.logo}
          title={projectDetail && projectDetail.title}
          tokenName={projectDetail && projectDetail.tokenName}
          githubURL={projectDetail && projectDetail.githubURL}
          totalBudget={projectDetail && projectDetail.totalBudget}
          handleShowFinish={handleShowFinish}
          handleDeleteProject={handleDeleteProject}
          finishButton={
            projectDetail && projectDetail.adminVerification === "ACCEPTED"
          }
          showUploadButton={true}
        />
      </section>
      <Container>
        <Row className="align-items-center py-3 py-md-4">
          <Col md={6}>
            {/* {user && (
              <div className="d-flex align-items-center re_imageUsers">
                <Link
                  to="/"
                  className="re_imgGrroup h-35px"
                  onClick={openRequestsModel}
                >
                  {projectDetail &&
                    projectDetail.totalTeamMembers &&
                    projectDetail.totalTeamMembers.map((member, index) => {
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
                  {projectDetail.totalTeamMembers &&
                    projectDetail.totalTeamMembers.length > 3 && (
                      <div className="re_more">
                        {projectDetail.totalTeamMembers.length - 3}
                      </div>
                    )}
                  {projectDetail.totalTeamMembers &&
                    projectDetail.totalTeamMembers.length === 0 && (
                      // <div className="f16-700 opacity50 ">
                      //   No member are present currently
                      // </div>
                      <div className="color_blue p4">Looking Team Members</div>
                    )}
                </Link>
              </div>
            )} */}
          </Col>
          {user && projectDetail && projectDetail.initiator === user._id && (
            <Col md={6} className="text-md-right">
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip className="re_tooltip">
                    Please Select Image Resolution of 1920*270 For Best View.
                  </Tooltip>
                }
              >
                <div className="re_uploadCoverBtn btn btn-blue mr-3 mb-2">
                  <input
                    title=" "
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    ref={inputRef}
                    onChange={(e) => handlecoverPic(e)}
                  />
                  {projectDetail.coverImage === null &&
                    projectDetail.coverImage !== ""
                    ? `Add Cover Image${" "}`
                    : `Edit Cover Image${" "}`}

                  <img src={info} alt="info" className="ml-2" />
                </div>
              </OverlayTrigger>
              {projectDetail.coverImage !== null &&
                projectDetail.coverImage !== "" && (
                  <button
                    className="btn btn-blue mb-2"
                    onClick={removeCoverPic}
                  >
                    Remove Cover Image
                  </button>
                )}

              {projectDetail &&
                projectDetail.adminVerification === "ACCEPTED" ? (
                <Link
                  to={`/edit-project/${projectId}`}
                  className="btn btn-blue ml-2 mb-2"
                >
                  Edit Project
                </Link>
              ) : null}
            </Col>
          )}
        </Row>
      </Container>
      <section className="pb-80 ">
        <Container className="bg-white shadowBox radius-bottom-0 pb-0">
          {/* <Row className="pt-4 align-items-center">
            <Col md={6}>
              <div className="f16-700 opacity50 text-uppercase pb-3 ">
                Team Members
              </div>
              <div className="re_imgGrroup">
                {projectDetail &&
                  projectDetail.totalTeamMembers &&
                  projectDetail.totalTeamMembers.map((member, index) => {
                    if (index <= 2) {
                      return (
                        <img
                          src={
                            member.profilePicture
                              ? member.profilePicture
                              : Profile
                          }
                          alt="team"
                        />
                      );
                    }
                  })}
                {projectDetail.totalTeamMembers &&
                  projectDetail.totalTeamMembers.length > 3 && (
                    <div className="re_more">
                      {projectDetail.totalTeamMembers.length - 3}
                    </div>
                  )}
                {projectDetail.totalTeamMembers &&
                  projectDetail.totalTeamMembers.length === 0 && (
                    <div className="f16-700 opacity50 ">
                      No member are present currently
                    </div>
                  )}
              </div>
            </Col>
            <Col md={6} className="text-md-right">
              <div className="re_uploadCoverBtn btn btn-black mr-3">
                <input type="file" onChange={handlecoverPic} />
                Edit Cover Image
              </div>
              <Link to={`/edit-project/${projectId}`} className="btn btn-black">Edit Project</Link>
            </Col>
          </Row> */}
          <div className="re_Profiletabs ">
            <button
              type="button"
              className={showStep === 1 ? "active" : ""}
              onClick={() => handleStep(1)}
            >
              Summary
            </button>
            {projectDetail &&
              projectDetail.statusApprovedByInitiator !== "PENDING" &&
              projectDetail.adminVerification !== "REJECTED" &&
              projectDetail.isExistingToken == true && (
                <button
                  type="button"
                  className={showStep === 2 ? "active" : ""}
                  onClick={() => handleStep(2)}
                >
                  {user && projectDetail && projectDetail.initiator === user._id
                    ? "Manage WorkTasks"
                    : "View WorkTasks"}
                </button>
              )}

            {projectDetail &&
              projectDetail.statusApprovedByInitiator !== "PENDING" &&
              projectDetail.isExistingToken == true && (
                <button
                  type="button"
                  className={showStep === 3 ? "active" : ""}
                  onClick={() => handleStep(3)}
                >
                  FAQs
                </button>
              )}

            {user &&
              projectDetail.statusApprovedByInitiator !== "PENDING" &&
              projectDetail.initiator == user._id &&
              projectDetail.adminVerification === "ACCEPTED" &&
              projectDetail.isExistingToken == true ? (
              <button
                type="button"
                className={showStep === 4 ? "active" : ""}
                onClick={() => handleStep(4)}
              >
                Observers
              </button>
            ) : null}
            {user &&
              projectDetail.statusApprovedByInitiator !== "PENDING" &&
              projectDetail.initiator == user._id &&
              projectDetail.adminVerification === "ACCEPTED" &&
              projectDetail.isExistingToken == true ? (
              <button
                type="button"
                className={showStep === 5 ? "active" : ""}
                onClick={() => handleStep(5)}
              >
                Collaborators
              </button>
            ) : null}
            {/* {projectDetail && projectDetail.statusApprovedByInitiator !== 'PENDING' &&
              <button
                type="button"
                className={showStep === 6 ? "active" : ""}
                onClick={() => handleStep(6)}
              >
                Review
              </button>} */}
          </div>
        </Container>

        {showStep === 1 && <Summary />}
        {showStep === 2 && <Packages projectDetails={projectDetail} />}
        {showStep === 3 && <FAQ />}
        {showStep === 4 && <Observers />}
        {showStep === 5 && <Collaborators />}
        {/* {showStep === 6 && <Review />} */}
      </section>
      <Modal1
        show={showFinish}
        handleClose={handleCloseFinish}
        text="Your project has been successfully submitted."
        subtext="Please wait for approval from the RBKD DAO."
        subtext2="Until then, make sure to join our community channels."
      />
      <CollaboratorModal
        handleCloseRequest={handlecloseRequestsModel}
        showRequest={ShowRequestsModel}
        projectCollaborators={projectCollaborators}
      />
    </>
  );
};
export default ProjectDetails;

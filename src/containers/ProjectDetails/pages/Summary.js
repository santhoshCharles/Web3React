import React, { useEffect, useContext, useState } from "react";
import { Container, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import info from "../../../assets/images/info.svg";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { formatDistance, subDays } from "date-fns";
import { useParams } from "react-router-dom";
import {
  initiateProjectAsync,
  getProjectDetailsAsync,
} from "../../CreateProject/redux/createProjectApi";

import { CreateProjectMap } from "../../CreateProject/redux/createProjectAction";

import Target from "../../../assets/images/Target.svg";
import non_photo from "../../../assets/images/non_photo.svg";
import TargetRed from "../../../assets/images/TargetRed.svg";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import { Web3Context } from "../../../web3/contexts/web3Context";
import { poolMethods } from '../../../web3/functions/factory'
import { CreateProjectActions } from "../../CreateProject/redux/createProjectAction"
import { toast } from "react-toastify";

const Summary = () => {
  const { networkDetails, handleConnect } = useContext(Web3Context);
  const [getInstance, setInstance] = useState();
  const dispatch = useDispatch();
  const params = useParams();

  const { projectDetail, isLoading, projectInitiated } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );

  const { user } = useSelector((state) => state.auth, shallowEqual);

  useEffect(() => {

    window.scrollTo(0, 0);
    dispatch({ type: CreateProjectMap.RESET_INITIATOR_FLAG });

  }, []);

  useEffect(() => {
    (async () => {
      const instance = await poolMethods.getInstance(networkDetails.web3)
      if (instance) {
        setInstance(instance);
        //await poolMethods.getProjectData(instance, networkDetails.address)
      }
    })()
  }, [networkDetails.web3]);

  const initiateProject = async () => {

    //SC Object
    const startProjectObj = {
      projectId: projectDetail.scProjectId
    }
    //SC Object
    if (getInstance) {
      
      try {
        dispatch(CreateProjectActions.initiateProjectSCStart())
        const startProject = await poolMethods.startProject(getInstance, networkDetails.address, startProjectObj)
        console.log({startProjectObj})
        dispatch(CreateProjectActions.initiateProjectSCSuccess())

        if (startProject && startProject.blockHash) {
          await dispatch(initiateProjectAsync(params.projectId));
          await dispatch(getProjectDetailsAsync(params.projectId));
        }
      } catch (err) {
        toast.error(err)
        dispatch(CreateProjectActions.initiateProjectError())
      }
    } else {
      handleConnect()
    }
  };

  return (
    <>
      <Container className="bg-white shadowBox radius-top-0">
        {projectDetail &&
          user &&
          projectDetail.initiator === user._id &&
          projectDetail.adminVerification === "ACCEPTED" &&
          projectDetail.statusApprovedByInitiator === "PENDING" && 
          projectDetail.isExistingToken.toString() === "true" && (
            <Button
              type="button"
              variant="blue"
              className="mb-3"
              onClick={initiateProject}
              disabled={projectInitiated}
            >
              {projectInitiated ? (
                <>
                  Initiating...
                  <img
                    src={LoadingImage}
                    alt="LoadingImage"
                    width="20px"
                    className="ml-2"
                  />
                </>
              ) : (
                "Initiate Project"
              )}
            </Button>
          )}
        <div className="row justify-content-between pb-md-5 pb-3">
          <div className="col-xl-8 d-flex align-items-center">
            <div className="re_picon">
              <img
                src={
                  projectDetail && projectDetail.logo !== null
                    ? projectDetail.logo
                    : non_photo
                }
                alt="icon"
                className="mw-100 mh-100"
              />
            </div>
            <div className="pl-3">
              <div className="h4 pb-2">
                {projectDetail && projectDetail.title}
              </div>
              <div className="p3 d-flex flex-wrap align-items-center">
                {projectDetail.adminVerification !== "REJECTED" ? (
                  <span className="d-flex text-nowrap align-items-center color_green">
                    <img src={Target} alt="Target" className="mr-1" />
                    {projectDetail && projectDetail.projectStatus}
                  </span>
                ) : (
                  <span className="d-flex text-nowrap align-items-center color_red">
                    <img src={TargetRed} alt="Target" className="mr-1" />
                    {projectDetail && projectDetail.adminVerification}
                  </span>
                )}

                <span className="color_gray d-flex flex-wrap text-nowrap align-items-center pt-2 pt-md-0">
                  {/* <span className="re_dot d-none d-md-block mx-3"></span>{" "} */}
                  {/* {projectDetail && projectDetail.category} */}
                  {/* <span className="re_dot mx-3"></span> Intermediate */}
                  <span className="re_dot mx-3"></span> Opened{" "}
                  {projectDetail &&
                    projectDetail.createdAt &&
                    formatDistance(
                      subDays(new Date(projectDetail.createdAt), 0),
                      new Date(),
                      { addSuffix: true }
                    )}{" "}
                </span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 d-flex align-items-center justify-content-xl-end pt-2 pt-xl-0">
            {/* <div className="re_blueGradiant re_lbl mr-2">
              {projectDetail && projectDetail.projectCost} USD
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip className="re_tooltip">
                    Minimum Guaranteed Payment
                  </Tooltip>
                }
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div> */}

            <div className="re_blueGradiant re_lbl">
              Total Project Budget:{" "}
              {projectDetail.totalBudget &&
                projectDetail.totalBudget.toFixed(2)}{" "}
              {projectDetail.tokenName !== null
                ? projectDetail.tokenName
                : "USD"}
              {/* USD{" "} */}
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="re_tooltip">Total Budget</Tooltip>}
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div>
          </div>
        </div>
        <div className="h3 pb-3">Description</div>
        <div className="p3 color_gray text-pre-wrap">
          <p>{projectDetail && projectDetail.description}</p>
        </div>
      </Container>
    </>
  );
};
export default Summary;
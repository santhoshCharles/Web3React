import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { ListItems3 } from "../../../components/PackagesList/ListItems";
import { ListItemsProject } from "../../../components/PackagesList/ListItemsProject";
import {
  getAwaitingApprovalAsync,
  getOpenProjectsAsync,
  getCompletedProjectsAsync,
  getdeliveredProjectsAsync,
  getExpiredProjectsAsync,
} from "../redux/dashboardApi";
import { dashboardActions } from "../redux/dashboardAction";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import in1 from "../../../assets/images/in1.svg";
import in2 from "../../../assets/images/in2.svg";
import in3 from "../../../assets/images/in3.svg";
import in4 from "../../../assets/images/in4.svg";
import in5 from "../../../assets/images/in5.svg";
import buttonShow from "../../../assets/images/buttonShow.svg";
import empltyFile from "../../../assets/images/empltyFile.svg";

const Initiator = () => {
  const dispatch = useDispatch();

  const {
    awaitingApprovalRequests,
    isLoading,
    refreshAwaitingList,
    awaitingListLimit,
    refreshProjectList,
    refreshCompletedProjectList,
    projectsOpen,
    completedProjectLimit,
    openProjectLimit,
    projectsCompleted,
    projectsDelievered,
    projectsExpired,
    refreshExpiredProjectList,
    expiredProjectLimit,
    refreshOpenProjectList,
    refreshdeliveredProjectList,
    deliveredProjectLimit,
  } = useSelector((state) => state.dashboardDetail);

  useEffect(() => {
    if (refreshAwaitingList) {
      dispatch(getAwaitingApprovalAsync());
    }
  }, [refreshAwaitingList]);

  useEffect(() => {
    if (refreshOpenProjectList) {
      dispatch(getOpenProjectsAsync());
    }
  }, [refreshOpenProjectList]);

  useEffect(() => {
    if (refreshCompletedProjectList) {
      dispatch(getCompletedProjectsAsync());
    }
  }, [refreshCompletedProjectList]);

  useEffect(() => {
    if (refreshdeliveredProjectList) {
    dispatch(getExpiredProjectsAsync());
    }
  }, [refreshdeliveredProjectList]);

  useEffect(() => {
    //if (refreshdeliveredProjectList) {
      dispatch(getdeliveredProjectsAsync());
    //}
  }, []); 


  const setBatchNumber = () => {
    dispatch(
      dashboardActions.setAwaitingApprovalBatchNumber(awaitingListLimit + 2)
    );
  };
  const setProjectBatchNumber = () => {
    dispatch(dashboardActions.setProjectBatchNumber(openProjectLimit + 2));
  };
  const setCompletedProjectBatchNumber = () => {
    dispatch(
      dashboardActions.setCompletedProjectBatch(completedProjectLimit + 2)
    );
  };
  const setDeliveredProjectBatchNumber = () => {
    dispatch(
      dashboardActions.setDeliveredProjectBatchNumber(deliveredProjectLimit + 2)
    );
  };
  const setExpiredProjectBatchNumber = () => {
    dispatch(
      dashboardActions.setExpiredProjectBatchNumber(expiredProjectLimit + 2)
    );
  };
  const [showTab, setShowTab] = useState(0);
  const handleChangeTab = (e) => {
    setShowTab(e);
    if (
      (showTab === 1 && e === 1) ||
      (showTab === 2 && e === 2) ||
      (showTab === 3 && e === 3) ||
      (showTab === 4 && e === 4) ||
      (showTab === 5 && e === 5)
    ) {
      setShowTab(0);
    }
  };
  return (
    <>
      <Container className="shadowBox radius-top-0 bg-white">
        <div className="re_dashboardBoxInitiator">
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={in1} alt={in1} />
            <div className="p4 pt-3 pb-1">Awaiting</div>
            <div className="h1">
              {awaitingApprovalRequests
                ? awaitingApprovalRequests.requestsCount
                : 0}
            </div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={in2} alt={in2} />
            <div className="p4 pt-3 pb-1">Open</div>
            <div className="h1">
              {projectsOpen ? projectsOpen.packagesCount : 0}
            </div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={in3} alt={in3} />
            <div className="p4 pt-3 pb-1">Completed</div>
            <div className="h1">
              {" "}
              {projectsCompleted
                ? projectsCompleted.completedCount
                : 0}
            </div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={in4} alt={in4} />
            <div className="p4 pt-3 pb-1">Under Approval</div>
            <div className="h1">
              {" "}
              {projectsDelievered
                ? projectsDelievered.deliveredCount
                : 0}
            </div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={in5} alt={in5} />
            <div className="p4 pt-3 pb-1">Expired</div>
            <div className="h1">
              {projectsExpired ? projectsExpired.expiredPackages : 0}
            </div>
          </div>
        </div>
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">
            Open packages{" "}
            <span className="color_gray">
              ({projectsOpen && projectsOpen.packagesCount})
            </span>
          </div>
          <button
            type="button"
            className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`}
            onClick={() => handleChangeTab(1)}
          >
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 1 && (
          <>
            <div className=" pt-3">
              {console.log(awaitingApprovalRequests, "projectDetails")}
              {projectsOpen.records &&
                projectsOpen.records.map((projectDetails, index) => {
                  return (
                    <ListItemsProject
                      viewDetail={true}
                      viewDetailLink={`/package-list/${projectDetails._id}?mode=OPEN&type=ini`}
                      title={projectDetails.title}
                      linkText="Project link"
                      link={`/project-details/${projectDetails._id}`}
                      bonus={
                        projectDetails.totalBudget
                          ? projectDetails.totalBudget.toFixed(2)
                          : 0
                      }
                      tokenName={projectDetails.tokenName}
                      text={projectDetails.description}
                      key={projectDetails._id}
                    />
                  );
                })}
            </div>
            {projectsOpen && projectsOpen.recordsTotal === 0 ? (
              <>
                <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                  <img src={empltyFile} alt="empltyFile" className="mb-3" />
                  You have no pending requests yet.
                </div>
              </>
            ) : projectsOpen &&
              projectsOpen.recordsFiltered < projectsOpen.recordsTotal ? (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-black px-4"
                  onClick={setProjectBatchNumber}
                  disabled={refreshOpenProjectList}
                >
                  {refreshOpenProjectList ? (
                    <>
                      Loading...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Show More"
                  )}
                </button>
              </div>
            ) : null}
          </>
        )}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">
            Awaiting approval{" "}
            <span className="color_gray">
              (
              {awaitingApprovalRequests &&
                awaitingApprovalRequests.requestsCount}
              )
            </span>
          </div>
          <button
            type="button"
            className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`}
            onClick={() => handleChangeTab(2)}
          >
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 2 && (
          <>
            <div className=" pt-3">
              {awaitingApprovalRequests.records &&
                awaitingApprovalRequests.records.map(
                  (projectDetails, index) => {
                    return (
                      <ListItemsProject
                        viewDetail={true}
                        viewDetailLink={`/package-list/${projectDetails._id}?mode=awaiting&type=ini`}
                        title={projectDetails.title}
                        linkText="Project link"
                        link={`/project-details/${projectDetails._id}`}
                        bonus={
                          projectDetails.totalBudget
                            ? projectDetails.totalBudget.toFixed(2)
                            : 0
                        }
                        tokenName={projectDetails.tokenName}
                        text={projectDetails.description}
                        key={projectDetails._id}
                      />
                    );
                  }
                )}
            </div>
            {awaitingApprovalRequests &&
              awaitingApprovalRequests.recordsTotal === 0 ? (
              <>
                <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                  <img src={empltyFile} alt="empltyFile" className="mb-3" />
                  You have no pending requests yet.
                </div>
              </>
            ) : awaitingApprovalRequests &&
              awaitingApprovalRequests.recordsFiltered <
              awaitingApprovalRequests.recordsTotal ? (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-black px-4"
                  onClick={setBatchNumber}
                  disabled={refreshAwaitingList}
                >
                  {refreshAwaitingList ? (
                    <>
                      Loading...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Show More"
                  )}
                </button>
              </div>
            ) : null}
          </>
        )}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">
            Completed{" "}
            <span className="color_gray">
              ({projectsCompleted && projectsCompleted.completedCount})
            </span>
          </div>
          <button
            type="button"
            className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`}
            onClick={() => handleChangeTab(3)}
          >
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 3 && (
          <>
            <div className=" pt-3">
              {console.log(projectsCompleted, "projectDetails")}
              {projectsCompleted.records &&
                projectsCompleted.records.map((projectDetails, index) => {
                  return (
                    <ListItemsProject
                      viewDetail={true}
                      viewDetailLink={`/package-list/${projectDetails._id}?mode=COMPLETED&type=ini`}
                      title={projectDetails.title}
                      linkText="Project link"
                      link={`/project-details/${projectDetails._id}`}
                      bonus={
                        projectDetails.totalBudget
                          ? projectDetails.totalBudget.toFixed(2)
                          : 0
                      }
                      tokenName={projectDetails.tokenName}
                      text={projectDetails.description}
                      key={projectDetails._id}
                    />
                  );
                })}
            </div>
            {projectsCompleted && projectsCompleted.recordsTotal === 0 ? (
              <>
                <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                  <img src={empltyFile} alt="empltyFile" className="mb-3" />
                  You have no completed projects yet.
                </div>
              </>
            ) : projectsCompleted &&
              projectsCompleted.recordsFiltered <
              projectsCompleted.recordsTotal ? (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-black px-4"
                  onClick={setCompletedProjectBatchNumber}
                  disabled={refreshCompletedProjectList}
                >
                  {refreshCompletedProjectList ? (
                    <>
                      Loading...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Show More"
                  )}
                </button>
              </div>
            ) : null}
          </>
        )}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">
            Under approval for completion{" "}
            <span className="color_gray">
              {" "}
              ({projectsDelievered && projectsDelievered.deliveredCount})
            </span>
          </div>
          <button
            type="button"
            className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`}
            onClick={() => handleChangeTab(4)}
          >
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 4 && (
          <>
            <div className=" pt-3">
              {console.log(projectsDelievered, "projectDetails")}
              {projectsDelievered.records &&
                projectsDelievered.records.map((projectDetails, index) => {
                  return (
                    <ListItemsProject
                      viewDetail={true}
                      viewDetailLink={`/package-list/${projectDetails._id}?mode=DELIVERED&type=ini`}
                      title={projectDetails.title}
                      linkText="Project link"
                      link={`/project-details/${projectDetails._id}`}
                      bonus={
                        projectDetails.totalBudget
                          ? projectDetails.totalBudget.toFixed(2)
                          : 0
                      }
                      tokenName={projectDetails.tokenName}
                      text={projectDetails.description}
                      key={projectDetails._id}
                    />
                  );
                })}
            </div>
            {projectsDelievered && projectsDelievered.recordsTotal === 0 ? (
              <>
                <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                  <img src={empltyFile} alt="empltyFile" className="mb-3" />
                  You have no pending projects under approval.
                </div>
              </>
            ) : projectsDelievered &&
              projectsDelievered.recordsFiltered <
              projectsDelievered.recordsTotal ? (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-black px-4"
                  onClick={setDeliveredProjectBatchNumber}
                  disabled={refreshdeliveredProjectList}
                >
                  {refreshdeliveredProjectList ? (
                    <>
                      Loading...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Show More"
                  )}
                </button>
              </div>
            ) : null}
          </>
        )}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">
            Expired{" "}
            <span className="color_gray">
              ({projectsExpired && projectsExpired.expiredPackages})
            </span>
          </div>
          <button
            type="button"
            className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`}
            onClick={() => handleChangeTab(5)}
          >
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 5 && (
          <>
            <div className=" pt-3">
              {console.log(projectsExpired, "projectDetails")}
              {projectsExpired.records &&
                projectsExpired.records.map((projectDetails, index) => {
                  return (
                    <ListItemsProject
                      viewDetail={true}
                      viewDetailLink={`/package-list/${projectDetails._id}?mode=EXPIRED&type=ini`}
                      title={projectDetails.title}
                      linkText="Project link"
                      link={`/project-details/${projectDetails._id}`}
                      bonus={
                        projectDetails.totalBudget
                          ? projectDetails.totalBudget.toFixed(2)
                          : 0
                      }
                      tokenName={projectDetails.tokenName}
                      text={projectDetails.description}
                      key={projectDetails._id}
                    />
                  );
                })}
            </div>
            {projectsExpired && projectsExpired.recordsTotal === 0 ? (
              <>
                <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                  <img src={empltyFile} alt="empltyFile" className="mb-3" />
                  You have no expired packages.
                </div>
              </>
            ) : projectsExpired &&
              projectsExpired.recordsFiltered < projectsExpired.recordsTotal ? (
              <div className="d-flex justify-content-center">
                <button
                  type="button"
                  className="btn btn-outline-black px-4"
                  onClick={setExpiredProjectBatchNumber}
                  disabled={refreshExpiredProjectList}
                >
                  {refreshExpiredProjectList ? (
                    <>
                      Loading...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Show More"
                  )}
                </button>
              </div>
            ) : null}
          </>
        )}
      </Container>
    </>
  );
};
export default Initiator;

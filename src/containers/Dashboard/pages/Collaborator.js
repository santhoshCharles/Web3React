import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { ListItems, ListItems3 } from "../../../components/PackagesList/ListItems";
import in2 from "../../../assets/images/in2.svg";
import in5 from "../../../assets/images/in5.svg";
import col2 from "../../../assets/images/col2.svg";
import col3 from "../../../assets/images/col3.svg";
import buttonShow from "../../../assets/images/buttonShow.svg"
import empltyFile from "../../../assets/images/empltyFile.svg"
import {
  getOpenProjectsColAsync,
  getAllInProgressProjectsColAsync,
  getAllSubmittedProjectsColAsync,
  getAllExpiredProjectsColAsync
} from "../redux/dashboardApi";
import { useDispatch, useSelector } from "react-redux";
import { ListItemsProject } from "../../../components/PackagesList/ListItemsProject";
import { dashboardActions } from "../redux/dashboardAction";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";

const Collaborator = () => {
  const dispatch = useDispatch();

  const {
    refreshOpenProjectColList,
    projectsOpenCol,
    openProjectLimit,
    inprogressCol,
    submittedCol,
    expiredCol
  } = useSelector((state) => state.dashboardDetail);

  const [showTab, setShowTab] = useState(0)
  const handleChangeTab = (e) => {
    setShowTab(e)
    if (showTab === 1 && e === 1 || showTab === 2 && e === 2 || showTab === 3 && e === 3 || showTab === 4 && e === 4) {
      setShowTab(0)
    }
  }

  useEffect(() => {
    dispatch(getOpenProjectsColAsync());
    dispatch(getAllInProgressProjectsColAsync());
    dispatch(getAllSubmittedProjectsColAsync());
    dispatch(getAllExpiredProjectsColAsync());
  }, []);

  const setProjectColBatchNumber = () => {
    dispatch(dashboardActions.setProjectColBatchNumber(openProjectLimit + 2));
  };

  return (
    <>
      <Container className="shadowBox radius-top-0 bg-white">
        <div className="re_dashboardBoxInitiator">
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={in2} alt={in2} />
            <div className="p4 pt-3 pb-1">Open</div>
            <div className="h1">
              {projectsOpenCol
                ? projectsOpenCol.openPackagesCount
                : 0}
            </div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={col2} alt={col2} />
            <div className="p4 pt-3 pb-1">
              In Progress
            </div>
            <div className="h1">
              {inprogressCol
                ? inprogressCol.inprogressPackagesCount
                : 0}
            </div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={col3} alt={col3} />
            <div className="p4 pt-3 pb-1">
              Submitted
            </div>
            <div className="h1">{submittedCol && submittedCol.submittedPackagesCount}</div>
          </div>
          <div className="text-center re_dashboardBoxInitiatorItem">
            <img src={in5} alt={in5} />
            <div className="p4 pt-3 pb-1">Expired</div>
            <div className="h1">{expiredCol && expiredCol.expiredPackagesCount}</div>
          </div>
        </div>
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">Open packages <span className="color_gray">({projectsOpenCol && projectsOpenCol.openPackagesCount})</span></div>
          <button type="button" className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`} onClick={() => handleChangeTab(1)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 1 && <>
          <div className=" pt-3">
            {projectsOpenCol.records &&
              projectsOpenCol.records.map((projectDetails, index) => {
                return (
                  <ListItemsProject
                    viewDetail={true}
                    viewDetailLink={`/package-list/${projectDetails._id}?mode=OPEN&type=col`}
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

          {projectsOpenCol && projectsOpenCol.recordsTotal === 0 ? (
            <>
              <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                <img src={empltyFile} alt="empltyFile" className="mb-3" />
                You have no open packages.
              </div>
            </>
          ) : projectsOpenCol &&
            projectsOpenCol.recordsFiltered < projectsOpenCol.recordsTotal ? (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-outline-black px-4"
                onClick={setProjectColBatchNumber}
                disabled={refreshOpenProjectColList}
              >
                {refreshOpenProjectColList ? (
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

        </>}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">In Progress <span className="color_gray">({inprogressCol && inprogressCol.inprogressPackagesCount})</span></div>
          <button type="button" className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`} onClick={() => handleChangeTab(2)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 2 && <>

          <div className=" pt-3">
            {inprogressCol.records &&
              inprogressCol.records.map((projectDetails, index) => {
                return (
                  <ListItemsProject
                    viewDetail={true}
                    viewDetailLink={`/package-list/${projectDetails._id}?mode=INPROGRESS&type=col`}
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


          {inprogressCol && inprogressCol.recordsTotal === 0 ? (
            <>
              <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                <img src={empltyFile} alt="empltyFile" className="mb-3" />
                You have no in progress packages.
              </div>
            </>
          ) : inprogressCol &&
            inprogressCol.recordsFiltered < inprogressCol.recordsTotal ? (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-outline-black px-4"
                onClick={setProjectColBatchNumber}
                disabled={refreshOpenProjectColList}
              >
                {refreshOpenProjectColList ? (
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


        </>}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">Submitted <span className="color_gray">({submittedCol && submittedCol.submittedPackagesCount})</span></div>
          <button type="button" className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`} onClick={() => handleChangeTab(3)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 3 && <>

          <div className=" pt-3">
            {submittedCol.records &&
              submittedCol.records.map((projectDetails, index) => {
                return (
                  <ListItemsProject
                    viewDetail={true}
                    viewDetailLink={`/package-list/${projectDetails._id}?mode=DELIVERED&type=col`}
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


          {submittedCol && submittedCol.recordsTotal === 0 ? (
            <>
              <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                <img src={empltyFile} alt="empltyFile" className="mb-3" />
                You have no submitted packages.
              </div>
            </>
          ) : submittedCol &&
            submittedCol.recordsFiltered < submittedCol.recordsTotal ? (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-outline-black px-4"
                onClick={setProjectColBatchNumber}
                disabled={refreshOpenProjectColList}
              >
                {refreshOpenProjectColList ? (
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


        </>}
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h3">Expired <span className="color_gray">({expiredCol && expiredCol.expiredPackagesCount})</span></div>
          <button type="button" className={`btn btn-link ${showTab === 1 ? "rotate180" : ""}`} onClick={() => handleChangeTab(4)}>
            <img src={buttonShow} alt="Show" />
          </button>
        </div>
        {showTab === 4 && <>
          <div className=" pt-3">
            {expiredCol.records &&
              expiredCol.records.map((projectDetails, index) => {
                return (
                  <ListItemsProject
                    viewDetail={true}
                    viewDetailLink={`/package-list/${projectDetails._id}?mode=EXPIRED&type=col`}
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


          {expiredCol && expiredCol.recordsTotal === 0 ? (
            <>
              <div className="p3 color_gray text-center py-4 my-md-4 d-flex flex-column align-items-center">
                <img src={empltyFile} alt="empltyFile" className="mb-3" />
                You have no expired packages.
              </div>
            </>
          ) : expiredCol &&
            expiredCol.recordsFiltered < expiredCol.recordsTotal ? (
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-outline-black px-4"
                onClick={setProjectColBatchNumber}
                disabled={refreshOpenProjectColList}
              >
                {refreshOpenProjectColList ? (
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
        </>}
      </Container>
    </>
  );
};
export default Collaborator;

import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import PackageList from "./PackageList";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getAllPackagesRequestReceived,
  getAllPackagesRequestReceivedCol,
  getAllUserRequestReceived,
  getAllInProgressProjectsCol
} from "../redux/dashboardApi";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
//import RequestModal from "../../../components/PackagesList/RequestModal";
//import NoData from "../../../components/NoData/NoData";
import ProjectHeader from "../../../components/ProjectHeader/projectHeader";
import { getProjectDetailsAsync } from "../../CreateProject/redux/createProjectApi";
import { dashboardActions } from "../redux/dashboardAction";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import queryString from "query-string";

const Packages = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const queryParams = queryString.parse(window.location.search);
  //const [ShowRequestsModel, setShowRequestsModel] = useState(false);
  //const [isClicked, setClicked] = useState(false);
  //const [packageId, setPackageId] = useState("");

  const { projectDetail } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );

  const {
    packageRequestReceived,
    isLoading,
    userRequestReceived,
    refreshPackageList,
    packageListLimit,
  } = useSelector((state) => state.dashboardDetail);

  /* const handlecloseRequestsModel = () => {
    setShowRequestsModel(false);
  } */

  const { projectId } = useParams();

  const setBatchNumber = () => {
    dispatch(dashboardActions.setPackageBatchNumber(packageListLimit + 4));
  };

  useEffect(() => {

    dispatch(getProjectDetailsAsync(projectId));
    if(queryParams.type == "ini"){
      dispatch(getAllPackagesRequestReceived(projectId, queryParams.mode));
    }
    if(queryParams.type == "col"){
      dispatch(getAllPackagesRequestReceivedCol(projectId, queryParams.mode));
    }
  }, [projectId]);

  /* useEffect(() => {
    if (ShowRequestsModel === false)
      dispatch(getAllPackagesRequestReceived(projectId));
  }, [ShowRequestsModel]); */

  /* useEffect(() => {
    if (
      packageRequestReceived.records &&
      packageRequestReceived.recordsTotal === 0
    ) {
      history.push("/dashboard");
    }
  }, [packageRequestReceived]); */

  useEffect(() => {
    if (refreshPackageList === true)
      dispatch(getAllPackagesRequestReceived(projectId));
  }, [refreshPackageList]);

  /* useEffect(() => {
    if (isClicked && userRequestReceived.length > 0) setShowRequestsModel(true);
  }, [userRequestReceived]); */

  return (
    <>
      {/* {packageRequestReceived && packageRequestReceived.recordsTotal === 0 ? (
        <Redirect to="/dashboard" />
      ) : null} */}
      {isLoading && <SplashScreen />}
      <section className="re_titleMain re_ts_bg">
        <ProjectHeader
          logo={projectDetail && projectDetail.logo}
          totalBudget={projectDetail && projectDetail.totalBudget}
          projectId={projectDetail && projectDetail._id}
          title={projectDetail && projectDetail.title}
          githubURL={projectDetail && projectDetail.githubURL}
          tokenName={projectDetail && projectDetail.tokenName}
          bonus={projectDetail && projectDetail.bonus}
          finishButton={false}
          showUploadButton={false}
        />
      </section>

      <section className="pt-80 pb-80 min-height-50vh">
        <Container className="bg-white shadowBox py-0">
          <div>
            {/* {(packageRequestReceived.records && packageRequestReceived.recordsTotal === 0 && history.push('/dashboard'))} */}
            {packageRequestReceived.records
              ? packageRequestReceived.records.map((packageRequest, index) => {
                  //if (packageRequest.requests.length > 0) {
                    return (
                      <PackageList
                        {...packageRequest}
                        key={packageRequest._id}
                        tokenName={projectDetail.tokenName}
                        projectId={projectId}
                        handleshowRequestsModel={() => {
                          dispatch(
                            getAllUserRequestReceived(
                              projectId,
                              packageRequest._id
                            )
                          );
                        }}
                        requestLink={`/request?projectId=${projectId}&packageId=${packageRequest._id}&packageName=${packageRequest.name}`}
                        mode={queryParams.mode}
                      />
                    );
                  //}
                })
              : null}
          </div>
          {packageRequestReceived &&
          packageRequestReceived.recordsFiltered <
            packageRequestReceived.recordsTotal ? (
            <button
              type="button"
              className="btn btn-gray btn-sm"
              onClick={setBatchNumber}
              disabled={refreshPackageList}
            >
              {refreshPackageList ? (
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
          ) : null}
        </Container>
      </section>
      {/* <RequestModal
        handleCloseRequest={handlecloseRequestsModel}
        showRequest={ShowRequestsModel}
        projectId={projectId}
        packageId={packageId}
      /> */}
    </>
  );
};
export default Packages;

import React, { useState, useEffect, useRef } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import prologo from "../../assets/images/prologo.svg";
import non_photo from "../../assets/images/non_photo.svg";
import Linkwhite from "../../assets/images/Linkwhite.svg";
import CurrencyCircleDollarwhite from "../../assets/images/CurrencyCircleDollarwhite.svg";
import { updateProjectLogo } from "../../containers/CreateProject/redux/createProjectApi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import rightmark from "../../assets/images/rightmark.svg";
import projectCompleted from "../../assets/images/projectCompleted.svg";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";

const ProjectHeader = (props) => {
  const [file, setFile] = useState({ file: null, url: "" });

  const { projectDetail, finishProjectLoading, finishProjectResponse, deleteProjectLoading } =
    useSelector((state) => state.createProject, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const { projectId } = useParams();
  useEffect(() => {
    if (file && file.file) {
      let data = null;
      data = new FormData();
      data.append("img", file.file);
      dispatch(updateProjectLogo(data, projectId));

      setFile({ file: null, url: "" });
    }
  }, [file]);
  const uploadImage = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };
  return (
    <>
      <Container className="h-100">
        <Row className="align-items-end h-100">
          <Col lg={8}>
            <div className="d-flex align-items-center re_detailsHdr">
              <div className="re_picon re_lg mr-3">
                <img
                  src={props.logo ? props.logo : non_photo}
                  alt="icon"
                  className="mw-100 mh-100"
                />
              </div>
              {/* {props.showUploadButton ? (
                <img
                  src={file.url ? file.url : props.logo ? props.logo : prologo}
                  alt="prologo"
                  className="re_prologo"
                />
              ) : (
                <img
                  src={props.logo ? props.logo : prologo}
                  alt="prologo"
                  className="re_prologo"
                />
              )}

              {props.showUploadButton &&
                projectDetail &&
                projectDetail.initiator === user._id && (
                  <div className="re_uploadBtn">
                    <input
                      type="file"
                      ref={inputRef}
                      accept=".png, .jpg, .jpeg"
                      onChange={uploadImage}
                    />
                  </div>
                )} */}
              {props.totalBudget &&
                <div className="re_blueGradiant rounded-lg p-4">
                  <div className="h1 text-white pb-3">
                    {props && props.title}
                    <img src={rightmark} alt="rightmark" className="ml-2" />
                  </div>
                  <div className="d-flex align-items-center pb-3">
                    <img src={Linkwhite} alt="Linkwhite" width="24px" />
                    <div className="text-white p3 pl-1">
                      {props && props.githubURL}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {/* <img
                    src={CurrencyCircleDollarwhite}
                    alt="dollarsymbol"
                    width="24px"
                  /> */}
                    <div className="text-white p3 pl-1">
                      Total Budget:{" "}
                      {props.totalBudget && props.totalBudget.toFixed(2)}{" "}
                      {props.tokenName !== null ? props.tokenName : "$"}
                    </div>
                  </div>
                </div>}
            </div>
          </Col>
          {projectDetail &&
            (projectDetail.projectStatus === "OPEN" || projectDetail.projectStatus === "COMPLETED") &&
            user && projectDetail.initiator === user._id &&
            projectDetail.status === "ACTIVE" &&
            (
              <Col
                lg={4}
                className="d-flex align-items-end justify-content-md-end "
              >
                <Button
                  variant="blue"
                  onClick={props && props.handleDeleteProject}
                  disabled={deleteProjectLoading}
                >
                  {deleteProjectLoading ? (
                    <>
                      Deleting...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Delete Project"
                  )}
                </Button>
              </Col>
            )}

          {props &&
            props.finishButton &&
            projectDetail &&
            projectDetail.timeTable &&
            Date.now() >= projectDetail.timeTable && (
              <Col
                lg={4}
                className="d-flex align-items-end justify-content-md-end "
              >
                {user && projectDetail.initiator === user._id ? (
                  projectDetail.projectStatus !== "COMPLETED" ? (
                    <Button
                      variant="blue"
                      onClick={props && props.handleShowFinish}
                      disabled={finishProjectLoading}
                    >
                      {finishProjectLoading ? (
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
                        "Finish Project"
                      )}
                    </Button>
                  ) : (
                    <img src={projectCompleted} alt="projectcompleted" />
                  )
                ) : null}
              </Col>
            )}
        </Row>
      </Container>
    </>
  );
};
export default ProjectHeader;

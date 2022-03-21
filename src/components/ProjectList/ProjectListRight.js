import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
/* import Modal1 from "../Modal/Modal"; */
import ProjectListItem from "./ProjectListItem";
import SplashScreen from "../SplashScreen/SplashScreen";
import NoData from "../NoData/NoData";

const ProjectListRight = (props) => {

  const projectList = useSelector(
    (state) => state.projectList.projectList.records
  );
  const isLoading = useSelector((state) => state.projectList.isLoading);
  const { user } = useSelector(
    (state) => state.auth
  );

  return !isLoading && projectList ? (
    <div className="re_ProjectListMain">
      <Row>
        {projectList.length > 0 ? (
          projectList.map((project, index) => {
            const redirectionLink = `/project-details/${project._id}`
            return (
              <Col lg={6} md={6} key={project._id}>
                <ProjectListItem
                  Link={redirectionLink}
                  //Join={handleShow}
                  {...project}
                  mode={props.mode}
                  openRequestsModel={props.openRequestsModel}
                  projectIndex={index}
                  showCollaborators={user ? true : false}
                />
              </Col>
            );
          })
        ) : (
            <NoData />
          )}
      </Row>
      {/* <Modal1
        show={show}
        handleClose={handleClose}
        text="Your request to join package has been submitted."
        subtext="Wait for approval from admin"
      /> */}
    </div>
  ) : (
      <SplashScreen />
    );
};
export default ProjectListRight;

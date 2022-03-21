import React from "react";
import { Container } from "react-bootstrap";
import ProjectList from "../../../components/ProjectList/ProjectList";

const MyProjects = () => {

  return (
    <>
      <Container className="bg-white shadowBox radius-top-0">
        <div className="re_myproList">
          <ProjectList CreateBtn={true} mode="myProjects" />
        </div>
      </Container>
    </>
  );
};
export default MyProjects;

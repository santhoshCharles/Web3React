import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import ProjectList from "../../../components/ProjectList/ProjectList";

const Explore = () => {

  const { user } = useSelector((state) => state.auth, shallowEqual);

  useEffect(() => {
    window.scroll(0, 0)
  })
  return (
    <>
      <section className="re_titleMain">
        <Container className="d-flex align-items-center justify-content-between">
          <div className="h1 text-white">Explore</div>
          {user &&
            <Link
              to="/create-project"
              className="btn btn-blue"
            >
              Create Project
          </Link>}
        </Container>
      </section>
      {/* <section className="re_profileHdr">
        <Container className="h-100 position-relative">
          <Row className="align-items-center h-100">
            <Col>
              <div className="f72-700 color_blue">Explore</div>
            </Col>
          </Row>

        </Container>
      </section> */}
      <section className="pt-80 pb-80">
        <Container>
          <ProjectList mode="exploreProjects" />
        </Container>
      </section>
    </>
  );
};
export default Explore;

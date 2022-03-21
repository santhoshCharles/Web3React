import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

import subscribe from "../../assets/images/subscribe.svg";
import logo from "../../assets/images/bigLogo.svg";

const Subscribe = () => {
  return (
    <>
      <section className="mt-0 mt-md-3 bg-white re_subscribeSec">
        <Container>
          <Row className="justify-content-between align-items-center">
            <Col lg={6} md={12}>
              <img src={logo} alt="logo" className="pb-3 mb-md-3 re_subscrieLogo" />
              <div className="p3 pb-3 color_gray mb-md-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </div>
              <form className="row">
                <Col lg={8} md={7}>
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="form-control re_inputRouded"
                    />
                  </div>
                </Col>
                <Col lg={4} md={5}>
                  <Button type="submit" variant="blue" className="px-4">
                    Subscribe
                  </Button>
                </Col>
              </form>
            </Col>
            <Col lg={6} md={12}>
              <img src={subscribe} alt="subscribe" className="mw-100" />
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export default Subscribe;

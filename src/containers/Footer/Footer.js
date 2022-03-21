import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

import logo from "./../../assets/images/logo.svg";
import facebook from "./../../assets/images/facebook.svg";
import instagram from "./../../assets/images/instagram.svg";
import linkedin from "./../../assets/images/linkedin.svg";
import twitter from "./../../assets/images/twitter.svg";
import youtube from "./../../assets/images/youtube.svg";

const Footer = () => {
  return (
    <>
      <footer>
        <Container>
          <Nav className="align-items-center pb-3 pb-md-5">
            <Nav.Link as={Link} to="/">
              <img src={logo} width="150px" alt="Logo" />
            </Nav.Link>
            {/* <Nav.Link as={Link} to="/aboutus">
              About Us
            </Nav.Link> */}
            {/* <Nav.Link as={Link} to="/features">
              Features
            </Nav.Link>
            <Nav.Link as={Link} to="/roadmap">
              Roadmap
            </Nav.Link>
            <Nav.Link as={Link} to="/team">
              Team
            </Nav.Link> */}
            {/* <Nav.Link as={Link} to="/faq">
              FAQ
            </Nav.Link> */}

            <Nav.Link
              href="https://t.me/rebaked"
              target="_blank"
              rel="noreferrer"
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Row>
            <Col>
              <div className="re_copy">
                © 2021 ReBacked. All Rights Reserved.
              </div>
              <div className="d-flex">
                <Link as={Link} to="/privacy-policy" className="re_copy_link">
                  Privacy Policy
                </Link>
                <span className="color_gray">|</span>
                <Link as={Link} to="/terms-conditions" className="re_copy_link">
                  Terms & Conditions
                </Link>
              </div>
            </Col>
            <Col>
              <div className="re_social">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebook} alt="facebook" />
                </a>
                <a
                  href="https://twitter.com/?lang=en"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={twitter} alt="twitter" />
                </a>
                <a
                  href="https://in.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={linkedin} alt="linkedin" />
                </a>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={instagram} alt="instagram" />
                </a>
                <a
                  href="https://www.youtube.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={youtube} alt="youtube" />
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};
export default Footer;

import React from "react";
import { Col, Row } from "react-bootstrap";

import Search from "./../../assets/images/Search.svg"
import Scroll from "./../../assets/images/Scroll.svg"
import Puzzle from "./../../assets/images/Puzzle.svg"
import Toolbox from "./../../assets/images/Toolbox.svg"
import Services from "./../../assets/images/Services.svg"
import Edit from "./../../assets/images/Edit.svg"
import Checked from "./../../assets/images/Checked.svg"

const Benefits = (props) => {
  return (
    <>
      <Row>
        <Col xs={4}>
          <div className="reImageBg" style={{ backgroundImage: `url(${props.image1})` }}></div>
        </Col>
        <Col xs={8}>
          <div className="reImageBg" style={{ backgroundImage: `url(${props.image2})` }}></div>
        </Col>
      </Row>
      <Row className="re_benefitSec">
        <Col md={12} className="pb-md-5 pb-3 pt-60">
          <div className="h1 pb-3">Benefits of Joining US</div>
        </Col>
        <Col md={6} lg={3} className="pb-md-5 pb-3">
          <img src={Search} alt="Search" className="mb-3 mb-md-4" />
          <div className="p3 color_gray pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus.
          </div>
        </Col>
        <Col md={6} lg={3} className="pb-md-5 pb-3">
          <img src={Scroll} alt="Scroll" className="mb-3 mb-md-4" />
          <div className="p3 color_gray pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus.
          </div>
        </Col>
        <Col md={6} lg={3} className="pb-md-5 pb-3">
          <img src={Puzzle} alt="Puzzle" className="mb-3 mb-md-4" />
          <div className="p3 color_gray pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus.
          </div>
        </Col>
        <Col md={6} lg={3} className="pb-md-5 pb-3">
          <img src={Toolbox} alt="Toolbox" className="mb-3 mb-md-4" />
          <div className="p3 color_gray pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus.
          </div>
        </Col>
        <Col md={6} lg={3} className="pb-md-5 pb-3">
          <img src={Services} alt="Services" className="mb-3 mb-md-4" />
          <div className="p3 color_gray pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus.
          </div>
        </Col>
        <Col md={6} lg={3} className="pb-md-5 pb-3">
          <img src={Edit} alt="Edit" className="mb-3 mb-md-4" />
          <div className="p3 color_gray pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus.
          </div>
        </Col>
        <Col md={6} lg={3} className="pb-md-5 pb-3">
          <img src={Checked} alt="Checked" className="mb-3 mb-md-4" />
          <div className="p3 color_gray pb-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus euismod semper sed lacus.
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Benefits;

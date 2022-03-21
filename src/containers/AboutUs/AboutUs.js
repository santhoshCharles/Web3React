import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Benefits from "../../components/Benefits/Benefits";
import Subscribe from "../../components/Subscribe/Subscribe";
import aboutimg from "./../../assets/images/about-img.svg";
import a1 from "./../../assets/images/a1.png";
import { getCMSDetailsAsync } from '../AboutUs/redux/cmsApi'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import { renderHTML } from "../../utils";
import about1 from "./../../assets/images/about1.svg";
import about2 from "./../../assets/images/about2.svg";
import about3 from "./../../assets/images/about3.svg";
import how from "./../../assets/images/how.svg";

const AboutUs = () => {

  const dispatch = useDispatch()

  const { CMS, refreshCMS, isLoading } = useSelector(state => state.cms, shallowEqual)

  useEffect(() => {
    if (refreshCMS) {
      dispatch(getCMSDetailsAsync("ABOUTUS"))
    }
  }, [refreshCMS])
  useEffect(() => {
    window.scroll(0, 0)
  })
  return (
    <>
      {isLoading && <SplashScreen />}
      <section className="re_aboutHdr">
        <Container className="h-100 position-relative">
          <Row className="justify-content-between align-items-end">
            <Col lg={6} xl={5}>
              <div className="f40-700 color_black pb-3 pb-xl-5">
                Who We Are?
              </div>
              <hr className="mb-xl-5 mb-4" />
              <div className="p2 color_gray pb-3 pb-xl-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus cursus condimentum malesuada. Quis proin sed arcu, metus, donec posuere eu rutrum. Blandit semper nisl bibendum et. Orci aliquet in libero pulvinar massa ut. Sapien pharetra malesuada.
              </div>
              <div className="h3 color_black pb-3 pb-xl-5">
                Blandit semper nisl bibendum et. Orci aliquet in libero pulvinar massa ut. Sapien pharetra malesuada.
              </div>
            </Col>
            <Col lg={6} className="text-md-center text-lg-left">
              <img src={how} alt="how" className="mw-100" />
            </Col>
          </Row>
          <Row className="pt-80">
            <Col lg={4}>
              <div className="re_aboutItemsBox border">
                <div className="d-flex align-items-center justify-content-between pb-3">
                  <div className="h3">Open</div>
                  <img src={about1} alt="Open" />
                </div>
                <div className="p4 color_gray">
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs. Lorem ipsum,
                  or lipsum as it is sometimes known.
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="re_aboutItemsBox border">
                <div className="d-flex align-items-center justify-content-between pb-3">
                  <div className="h3">Empowering</div>
                  <img src={about2} alt="Empowering" />
                </div>
                <div className="p4 color_gray">
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs. Lorem ipsum,
                  or lipsum as it is sometimes known.
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className="re_aboutItemsBox border">
                <div className="d-flex align-items-center justify-content-between pb-3">
                  <div className="h3">Collaborative</div>
                  <img src={about3} alt="Collaborative" />
                </div>
                <div className="p4 color_gray">
                  Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                  used in laying out print, graphic or web designs. Lorem ipsum,
                  or lipsum as it is sometimes known.
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* <section className="pt-80 pb-80 bg-white">
        <Container>
          {CMS.CMSPageDetails && renderHTML(CMS.CMSPageDetails)}
        </Container>
      </section> */}
      <div className="re_banefitSubscribe pb-60">
        <Container>
          <Benefits image1={a1} image2={a1} />
          <Subscribe />
        </Container>
      </div>
    </>
  );
};
export default AboutUs;

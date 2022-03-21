import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Benefits from "../../components/Benefits/Benefits";
import Subscribe from "../../components/Subscribe/Subscribe";
import stacked from "./../../assets/images/stacked-files2.svg";
import surface from "./../../assets/images/surface2.svg";
import user from "./../../assets/images/user2.svg";
import mouse2 from "./../../assets/images/mouse2.svg";
import { getCMSDetailsAsync } from '../AboutUs/redux/cmsApi'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import { renderHTML } from "../../utils";
import a1 from "./../../assets/images/a1.png";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import f1 from "./../../assets/images/f1.svg";
import f2 from "./../../assets/images/f2.svg";

const Features = () => {

  const dispatch = useDispatch()

  const { CMS, refreshCMS, isLoading } = useSelector(state => state.cms, shallowEqual)

  useEffect(() => {
    if (refreshCMS) {
      dispatch(getCMSDetailsAsync("FEATURES"))
    }
  }, [refreshCMS])
  useEffect(() => {
    window.scroll(0, 0)
  })
  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="Features" />
      <div className="pt-80 bg-white">
        <Container>
          <div className="h1 color_black pb-3 pb-md-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus cursus condimentum malesuada.
          </div>
          <Row className="justify-content-center pb-60">
            <Col md={6} xl={5}>
              <div className="d-flex align-items-start">
                <img src={stacked} alt="stacked" />
                <div className="pl-2 pl-md-4 pl-lg-5">
                  <div className="h5 pb-2">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="p4 color_gray pb-3 pb-md-4">
                    Egestas vel nam diam in sit ut condimentum venena tis turpis nunc aenean tempus aenean.
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} xl={5}>
              <div className="d-flex align-items-start">
                <img src={surface} alt="surface" />
                <div className="pl-2 pl-md-4 pl-lg-5">
                  <div className="h5 pb-2">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="p4 color_gray pb-3 pb-md-4">
                    Egestas vel nam diam in sit ut condimentum venena tis turpis nunc aenean tempus aenean.
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} xl={5}>
              <div className="d-flex align-items-start">
                <img src={mouse2} alt="mouse2" />
                <div className="pl-2 pl-md-4 pl-lg-5">
                  <div className="h5 pb-2">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="p4 color_gray pb-3 pb-md-4">
                    Egestas vel nam diam in sit ut condimentum venena tis turpis nunc aenean tempus aenean.
                  </div>
                </div>
              </div>
            </Col>
            <Col md={6} xl={5}>
              <div className="d-flex align-items-start">
                <img src={user} alt="user" />
                <div className="pl-2 pl-md-4 pl-lg-5">
                  <div className="h5 pb-2">
                    Lorem ipsum dolor sit amet.
                  </div>
                  <div className="p4 color_gray pb-3 pb-md-4">
                    Egestas vel nam diam in sit ut condimentum venena tis turpis nunc aenean tempus aenean.
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="flex-row-reverse align-items-center pb-80">
            <Col md={12} lg={6} className="text-lg-right text-center">
              <img src={f1} alt="subscribe" className="mw-100" />
            </Col>
            <Col md={12} lg={6}>
              <div className="f40-700 color_black pb-3 pb-xl-5">
                Why Rebaked?
              </div>
              <hr className="mb-xl-5 mb-4" />
              <div className="h3 color_black pb-3 pb-xl-5">
                Blandit semper nisl bibendum et.
              </div>
              <div className="p2 color_gray pb-3 pb-xl-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus cursus condimentum malesuada. Quis proin sed arcu, metus, donec posuere eu rutrum. Blandit semper nisl bibendum et. Orci aliquet in libero pulvinar massa ut. Sapien pharetra malesuada.
              </div>
              <Button type="button" variant="blue" className="px-4">
                Get Started
              </Button>
            </Col>
          </Row>
          <Row className="align-items-center pb-80">
            <Col md={12} lg={6} className="text-lg-left text-center">
              <img src={f2} alt="subscribe" className="mw-100" />
            </Col>
            <Col md={12} lg={6} className="text-lg-right">
              <div className="f40-700 color_black pb-3 pb-xl-5">
                Easy to implement
              </div>
              <hr className="mb-xl-5 mb-4" />
              <div className="h3 color_black pb-3 pb-xl-5">
                Blandit semper nisl bibendum et.
              </div>
              <div className="p2 color_gray pb-3 pb-xl-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus cursus condimentum malesuada. Quis proin sed arcu, metus, donec posuere eu rutrum. Blandit semper nisl bibendum et. Orci aliquet in libero pulvinar massa ut. Sapien pharetra malesuada.
              </div>
              <Button type="button" variant="blue" className="px-4">
                Get Started
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
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
export default Features;

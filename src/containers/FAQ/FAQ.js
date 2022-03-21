import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Benefits from "../../components/Benefits/Benefits";
import { FAQAccordion } from "../../components/FAQ/FAQAccordion";
import Subscribe from "../../components/Subscribe/Subscribe";
import { getCMSDetailsAsync } from "../AboutUs/redux/cmsApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { renderHTML } from "../../utils";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import a1 from "./../../assets/images/a1.png";

const list = [
  {
    title: "Lorem ipsum",
    text: "Lorem ipsum",
  },
];

const FAQ = () => {
  const dispatch = useDispatch();

  const { CMS, refreshCMS, isLoading } = useSelector(
    (state) => state.cms,
    shallowEqual
  );
  const { user } = useSelector((state) => state.auth, shallowEqual);
  useEffect(() => {
    if (refreshCMS) {
      dispatch(getCMSDetailsAsync("FAQ"));
    }
  }, [refreshCMS]);
  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="FAQ" />
      <div className="bg-white">
        <Container className="pt-100">
          <div className="h1 pb-3 pb-md-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus
            cursus condimentum malesuada.
          </div>
          <div className="re_accordion">
            <FAQAccordion data={list} user={user} />
          </div>
        </Container>
      </div>
      <div className="pt-80 pb-80 bg-white">
        <div className="bg-light-green">
          <Container className="pt-60 pb-60">
            <Row>
              <Col lg={6}>
                <div className="h3 pb-2">Blandit semper nisl bibendum et.</div>
                <div className="p3 color_gray text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor feugiat diam vitae turpis ac, iaculis tellus orci erat.
                  Aliquet faucibus est, tincidunt cras. In vitae cursus
                  adipiscing pharetra, nec mauris facilisi. Ac pretium fringilla
                  nisi volutpat rutrum. Amet nullam accumsan u eleifend pulvinar
                  enim dolor at. Malesuada cras erat dui ullamcorper lectus
                  donec turpis tempus, tempus. Posuere tincidunt iaculis velit
                  ac ligula. Diam elementum augue maecenas sed at vel. Nisl
                  mattis imperdiet sit quam enim at.
                </div>
              </Col>
              <Col lg={6}>
                <div className="h3 pb-2 pt-3 pt-lg-0">
                  Blandit semper nisl bibendum et.
                </div>
                <div className="p3 color_gray  text-justify">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Tortor feugiat diam vitae turpis ac, iaculis tellus orci erat.
                  Aliquet faucibus est, tincidunt cras. In vitae cursus
                  adipiscing pharetra, nec mauris facilisi. Ac pretium fringilla
                  nisi volutpat rutrum. Amet nullam accumsan u eleifend pulvinar
                  enim dolor at. Malesuada cras erat dui ullamcorper lectus
                  donec turpis tempus, tempus. Posuere tincidunt iaculis velit
                  ac ligula. Diam elementum augue maecenas sed at vel. Nisl
                  mattis imperdiet sit quam enim at.
                </div>
              </Col>
            </Row>
          </Container>
        </div>
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
export default FAQ;

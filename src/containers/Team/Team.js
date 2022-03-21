import React, { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Benefits from "../../components/Benefits/Benefits";
import Subscribe from "../../components/Subscribe/Subscribe";
import img from "../../assets/images/img.png";
import logoicon128 from "../../assets/images/LogoIcon.svg";
import { getCMSDetailsAsync } from '../AboutUs/redux/cmsApi'
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { renderHTML } from "../../utils";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import a1 from "./../../assets/images/a1.png";

const Team = () => {

  const dispatch = useDispatch()

  const { CMS, refreshCMS, isLoading } = useSelector(state => state.cms, shallowEqual)

  useEffect(() => {
    if (refreshCMS) {
      dispatch(getCMSDetailsAsync("TEAM"))
    }
  }, [refreshCMS])
  useEffect(() => {
    window.scroll(0, 0)
  })
  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="Our Squad" />
      <div className="bg-white">
        <Container className="pt-80 pb-50">
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <div className='re_teamItem'>
                <div
                  className="re_teamImg"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
                <div className="px-4 h3 pt-3 pb-2">Emily</div>
                <div className="px-4 pb-4 p4 color_gray">CEO & Founder</div>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className='re_teamItem'>
                <div
                  className="re_teamImg"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
                <div className="px-4 h3 pt-3 pb-2">Emily</div>
                <div className="px-4 pb-4 p4 color_gray">CEO & Founder</div>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className='re_teamItem'>
                <div
                  className="re_teamImg"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
                <div className="px-4 h3 pt-3 pb-2">Emily</div>
                <div className="px-4 pb-4 p4 color_gray">CEO & Founder</div>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className='re_teamItem'>
                <div
                  className="re_teamImg"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
                <div className="px-4 h3 pt-3 pb-2">Emily</div>
                <div className="px-4 pb-4 p4 color_gray">CEO & Founder</div>
              </div>
            </Col>
            <Col lg={4} md={6} className="mb-4">
              <div className='re_teamItem'>
                <div
                  className="re_teamImg"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
                <div className="px-4 h3 pt-3 pb-2">Emily</div>
                <div className="px-4 pb-4 p4 color_gray">CEO & Founder</div>
              </div>
            </Col>
            <Col lg={4} md={6} className="re_shareCV ">
              <div className="text-center">
                <img src={logoicon128} alt="Logo" />
                <div className="p4 color_gray pt-4">
                  You could be next on this list!
                </div>
                <div className="h2 pt-3 pb-4">
                  Share your
                  <br />
                  latest CV here.
                </div>
                <Button type="button" variant="blue">
                  Share Now
                </Button>
              </div>
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
export default Team;

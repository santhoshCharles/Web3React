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
import { PageTitle } from "../../components/PageTitle/PageTitle";

const TermsConditions = () => {

  const dispatch = useDispatch()

  const { CMS, refreshCMS, isLoading } = useSelector(state => state.cms, shallowEqual)

  useEffect(() => {
    if (refreshCMS) {
      dispatch(getCMSDetailsAsync("TERMSANDCONDITIONS"))
    }
  }, [refreshCMS])
  useEffect(() => {
    window.scroll(0, 0)
  })
  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="Terms & Conditions" />
      <div className="bg-white min-height-100vh">
        <Container className="pt-80 pb-80">
          {CMS.CMSPageDetails && renderHTML(CMS.CMSPageDetails)}
        </Container>
      </div>
    </>
  );
};
export default TermsConditions;

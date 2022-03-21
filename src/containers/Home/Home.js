import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Forgot from "../auth/pages/Forgot";
import Login from "../auth/pages/Login";
import { useHistory } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Modal1 from "../../components/Modal/Modal";
import ProjectListItem from "../../components/ProjectList/ProjectListItem";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import img from "./../../assets/images/hero.svg";
import ResetPassword from "../auth/pages/ResetPassword";
import about1 from "./../../assets/images/about1.svg";
import about2 from "./../../assets/images/about2.svg";
import about3 from "./../../assets/images/about3.svg";
import stacked from "./../../assets/images/stacked-files.svg";
import surface from "./../../assets/images/surface.svg";
import user from "./../../assets/images/user.svg";
import mouse from "./../../assets/images/mouse.svg";
import Macbook from "./../../assets/images/Macbook.png";
import { projectList } from "../../containers/ProjectList/redux/projectListApi";
import { projectListActions } from "../../containers/ProjectList/redux/projectListAction";

const Home = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthorized, isPasswordReset, isLoading } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken && auth.user,
      isPasswordReset: auth.isPasswordReset,
      isLoading: auth.isLoading,
    }),
    shallowEqual
  );
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    const referralCode = params.get("referralCode");
    if (referralCode && !isAuthorized) {
      history.push(`/register?referralCode=${referralCode}`);
    }
  }, []);
  const projectListRecords = useSelector(
    (state) => state.projectList.projectList.records
  );

  const projectListTotalCount = useSelector(
    (state) => state.projectList.projectList.recordsTotal
  );

  //const isLoading = useSelector((state) => state.projectList.isLoading);

  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showForgot, setShowForgot] = useState(false);
  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = () => {
    setShowLogin(false);
    setShowForgot(true);
  };

  //Modal
  const [showJoin, setShowJoin] = useState(false);
  const handleCloseJoin = () => setShowJoin(false);
  const handleShowJoin = () => setShowJoin(true);

  useEffect(() => {
    window.scroll(0, 0);
  });

  useEffect(() => {
    const changeObj = {
      minPrice: "",
      maxPrice: "",
      projectStatus: "",
      collaboratorLevel: "",
      deliveryDate: "",
      membersRange: [],
    };

    const clickObj = {
      column: "",
      dir: "",
      search: "",
    };

    dispatch(projectList(changeObj, clickObj, "exploreProjects", 6));

    return () => {
      dispatch(projectListActions.cleanUpProjectList());
    };
  }, []);

  return (
    <>
      {isLoading && <SplashScreen />}
      <section className="re_bnr re_homeBnr">
        <Container>
          <Row className="align-items-center justify-content-between">
            <Col lg={5} md={6}>
              <div className="f40-700 color_black pb-4">
                Lorem ipsum dolor sit amet, consectetur
              </div>
              <div className="p2 color_gray pb-4">
                Sodales vel venenatis amet, et duis non ac odio. Duis risus,
                volutpat nulla tempus.
              </div>

              <div className="d-flex align-items-center">
                {!isAuthorized && (
                  <>
                    <Button
                      variant="outline-black btn-lg"
                      onClick={handleShowLogin}
                      className="mr-3"
                    >
                      Login
                    </Button>
                    <Login
                      showLogin={showLogin}
                      handleCloseLogin={handleCloseLogin}
                      link={true}
                      handleShowForgot={handleShowForgot}
                    />
                    <Link to="/register" className="btn btn-green btn-lg">
                      Register
                    </Link>
                  </>
                )}

                <Forgot
                  showForgot={showForgot}
                  handleCloseForgot={handleCloseForgot}
                />
              </div>
              <hr className="w-335px ml-0 my-md-4" />
              <div className="h4 d-flex align-items-center">
                Want to check projects?
                <Link
                  //type="button"
                  to="/explore"
                  className="ml-md-2 btn btn-link-lg color_blue arrow_right pr-3"
                >
                  Explore Now
                </Link>
              </div>
              {isPasswordReset === false && isAuthorized && <ResetPassword />}
            </Col>
            <Col lg={5} md={6}>
              <div className="re_bnrRrightImg">
                <img src={img} alt="img" className="w-100" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="re_aboutSec">
        <Container>
          <div className="h1 pb-3">About us</div>
          <div className="p3 pb-3 pb-md-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus
            cursus condimentum malesuada. Quis proin sed arcu, metus, donec
            posuere eu rutrum. Blandit semper nisl bibendum et. Orci aliquet in
            libero pulvinar massa ut. Sapien pharetra malesuada.
          </div>
          <Row>
            <Col lg={4}>
              <div className="re_aboutItemsBox">
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
              <div className="re_aboutItemsBox">
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
              <div className="re_aboutItemsBox">
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
      <section className="re_projectSec re_bgWhiteGray">
        <Container>
          <div className="h1 pb-3 pb-md-4">Projects</div>
          <Row>
            {projectListRecords
              ? projectListRecords.map((project, index) => {
                  const redirectionLink = `/project-details/${project._id}`;
                  return (
                    <Col xl={4} md={6} key={project._id}>
                      <ProjectListItem
                        Link={redirectionLink}
                        //Join={handleShow}
                        {...project}
                        mode="exploreProjects"
                        limit={6}
                        //openRequestsModel={props.openRequestsModel}
                        projectIndex={index}
                        showCollaborators={false}
                      />
                    </Col>
                  );
                })
              : null}
          </Row>
          {projectListTotalCount > 6 && (
            <div className="d-flex justify-content-center">
              <Link to="/explore" className="btn btn-outline-black w-335px">
                See all
              </Link>
            </div>
          )}
        </Container>
        <Modal1
          show={showJoin}
          handleClose={handleCloseJoin}
          text="Your request to join package has been submitted."
          subtext="Wait for approval from admin"
        />
      </section>
      <section className="re_featureSec">
        <Container>
          <div className="h1 pb-3 pb-md-4">Platform feature</div>
        </Container>
        <div className="PlatformIMG">
          <Container>
            <Row>
              <Col lg={5}>
                <div className="p2 color_gray pb-3 pb-md-5">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  cursus cursus condimentum malesuada. Quis proin sed arcu,
                  metus, donec posuere eu rutrum.
                </div>

                <div className="d-flex align-items-start">
                  <img src={user} alt="user" />
                  <div className="pl-2 pl-md-4">
                    <div className="h5 pb-1">Lorem ipsum dolor.</div>
                    <div className="p4 color_gray pb-3 pb-md-4">
                      Egestas vel nam diam in sit ut condimentum venena tis
                      turpis nunc aenean tempus aenean.
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <img src={surface} alt="surface" />
                  <div className="pl-2 pl-md-4">
                    <div className="h5 pb-1">
                      Lorem ipsum dolor sit amet consectet.
                    </div>
                    <div className="p4 color_gray pb-3 pb-md-4">
                      Egestas vel nam diam in sit ut condimentum venena tis
                      turpis nunc aenean tempus aenean.
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <img src={stacked} alt="stacked" />
                  <div className="pl-2 pl-md-4">
                    <div className="h5 pb-1">
                      Lorem ipsum dolor sit amet consectet.
                    </div>
                    <div className="p4 color_gray pb-3 pb-md-4">
                      Egestas vel nam diam in sit ut condimentum venena tis
                      turpis nunc aenean tempus aenean.
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-start">
                  <img src={mouse} alt="mouse" />
                  <div className="pl-2 pl-md-4">
                    <div className="h5 pb-1">
                      Lorem ipsum dolor sit amet consectet.
                    </div>
                    <div className="p4 color_gray pb-3 pb-md-4">
                      Egestas vel nam diam in sit ut condimentum venena tis
                      turpis nunc aenean tempus aenean.
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center pt-3 pt-md-4">
                  <button
                    type="button"
                    className="btn btn-blue btn-lg mr-3 mr-md-4"
                  >
                    Get Started
                  </button>
                  <Link to="/features" className="btn btn-link-md f18-700">
                    Learn more
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
          <div className="MacbookImg">
            <img src={Macbook} alt="Macbook" className="h-100" />
          </div>
        </div>
      </section>
    </>
  );
};
export default Home;

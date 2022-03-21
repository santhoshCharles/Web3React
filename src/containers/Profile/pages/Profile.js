import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Introduction from "./Introduction";
import Earnings from "./Earnings";
import Resume from "./Resume";
import Portfolio from "./Portfolio";
import SupportTicket from "./SupportTicket";
import Referrals from "./Referrals";
import MyProjects from "./MyProjects";
import uploadbtnnew1 from "../../../assets/images/uploadbtnnew1.svg";
import userImg from "../../../assets/images/userImg.svg";
import star from "../../../assets/images/star.svg";
import facebook from "../../../assets/images/facebook2.png";
import linkedin from "../../../assets/images/linkedin2.png";
import twitter from "../../../assets/images/twitterwhite.svg";
import rightmark from "../../../assets/images/rightmark.svg";
import github from "../../../assets/images/github2.png";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { updateProfileAsync } from "../redux/userProfileApi";
import { useHistory } from "react-router";
import queryString from "query-string";
import Account from "./Account";
import { getUserRating } from "../../auth/redux/authApi";

const Profile = () => {
  const history = useHistory();
  const [file, setFile] = useState({ file: null, url: "" });
  const params = queryString.parse(history.location.search).tab;
  const { profilePicture } = useSelector((state) => state.auth.user);
  const [profileUrl, setProfileUrl] = useState();
  
  const handleProfilePic = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
    
    let fileData = e.target.files.length ? e.target.files[0] : "";
    if (fileData !== "") {
      let data = new FormData();
      data.append("img", fileData);
      dispatch(
        updateProfileAsync({ profilePicture: "" }, data, "profilepic", true)
      );
    }
  };

  const [showStep, setShowStep] = useState(1);
  const handleStep = (step) => {
    history.push(`/profile?tab=${step}`);
    setShowStep(step);
  };

  const dispatch = useDispatch();

  const { user, refreshRating, userRating } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken && auth.user,
      user: auth.user,
      refreshRating: auth.refreshRating,
      userRating: auth.userRating,
    }),
    shallowEqual
  );
  
  useEffect(() => {
    if (params) {
      setShowStep(Number(params));
    } else {
      setShowStep(1);
    }
  }, [showStep, params]);

  useEffect(() => {
    setProfileUrl(profilePicture);
  }, [profilePicture]);
  
  useEffect(() => {
    window.scroll(0, 0);
  });

  useEffect(() => {
    if (refreshRating) {
      dispatch(getUserRating(user._id));
    }
  }, [refreshRating]);

  return (
    <>
      <section className="re_titleMain">
        <Container>
          <div className="d-flex align-items-center re_profileBox">
            <div
              className="re_profileUpload"
              style={{
                backgroundImage: `url(${
                  file.url
                    ? file.url
                    : user.profilePicture
                    ? user.profilePicture
                    : userImg
                })`,
              }}
            >
              <div className="re_uploadBtn">
                <input
                  type="file"
                  onChange={handleProfilePic}
                  accept=".png, .jpg, .jpeg"
                  name="profilePicture"
                />
                <img src={uploadbtnnew1} alt="updatebtn" />
              </div>
            </div>
            <div className="pl-3">
              {userRating.isCollaborator && (
                <div className="re_starlbl">
                  <img src={star} alt="star" />
                  {userRating.avgRating}
                </div>
              )}
              <div className="h1 text-white">
                {user?.fullName}
                <img src={rightmark} alt="rightmark" className="ml-2" />
              </div>
              <div className="re_social re_social_profile justify-content-start pt-2 pt-md-4">
                {/* <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebook} alt="facebook" />
                </a> */}
                {user.twitterURL ? (
                  <a href={user.twitterURL} target="_blank" rel="noreferrer">
                    <img src={twitter} alt="twitter" />
                  </a>
                ) : null}

                {user.linkedIn ? (
                  <a href={user.linkedIn} target="_blank" rel="noreferrer">
                    <img src={linkedin} alt="linkedin" />
                  </a>
                ) : null}

                {user.githubURL ? (
                  <a href={user.githubURL} target="_blank" rel="noreferrer">
                    <img src={github} alt="github" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>
      <section className="pt-80 pb-80">
        <Container className="bg-white shadowBox pb-0 radius-bottom-0">
          <Row>
            <Col md={6}></Col>
          </Row>
          <div className="re_Profiletabs ">
            <button
              type="button"
              className={showStep === 1 ? "active" : ""}
              onClick={() => {
                history.push("/profile?tab=INTRODUCTION");
                return handleStep(1);
              }}
            >
              Introduction
            </button>
            <button
              type="button"
              className={showStep === 2 ? "active" : ""}
              onClick={() => handleStep(2)}
            >
              Earnings
            </button>
            <button
              type="button"
              className={showStep === 3 ? "active" : ""}
              onClick={() => handleStep(3)}
            >
              Resume
            </button>
            <button
              type="button"
              className={showStep === 4 ? "active" : ""}
              onClick={() => handleStep(4)}
            >
              Portfolio
            </button>
            <button
              type="button"
              className={showStep === 5 ? "active" : ""}
              onClick={() => handleStep(5)}
            >
              My projects
            </button>
            <button
              type="button"
              className={showStep === 6 ? "active" : ""}
              onClick={() => handleStep(6)}
            >
              Support ticket
            </button>
            <button
              type="button"
              className={showStep === 7 ? "active" : ""}
              onClick={() => handleStep(7)}
            >
              Referrals
            </button>
            <button
              type="button"
              className={showStep === 8 ? "active" : ""}
              onClick={() => handleStep(8)}
            >
              Account
            </button>
          </div>
        </Container>

        {showStep === 1 && <Introduction />}
        {showStep === 2 && <Earnings />}
        {showStep === 3 && <Resume />}
        {showStep === 4 && <Portfolio />}
        {showStep === 5 && <MyProjects />}
        {showStep === 6 && <SupportTicket />}
        {showStep === 7 && <Referrals />}
        {showStep === 8 && <Account />}
      </section>
    </>
  );
};
export default Profile;

import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import queryString from "query-string";
import moment from "moment";
import { Rattings } from "../../../components/Rattings";
import Stars from "react-stars-display";
import aplicantbg from "./../../../assets/images/aplicantbg.png";
import aplicant from "./../../../assets/images/img.png";
import star from "../../../assets/images/star.svg";
import rightmark from "../../../assets/images/rightmark.svg";
import ChatCircleDots from "../../../assets/images/ChatCircleDots.svg";
import onlineLBL from "../../../assets/images/online.svg";
import offlineLBL from "../../../assets/images/offline.svg";
import MapPinLine from "../../../assets/images/MapPinLine.svg";
import { getAplicantProfileAsync } from "../redux/dashboardApi";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import ChatModal from "../../../components/Chat/chatModal";

const AplicantProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { applicantProfile } = useSelector((state) => state.dashboardDetail);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [ShowProfile, setShowProfile] = useState(true);

  const [showChatModal, setshowChatModal] = useState(false);
  const handleCloseChatModal = () => {
    setshowChatModal(false);
  };
  const queryParams = queryString.parse(window.location.search);
  useEffect(() => {
    if (
      (queryParams && queryParams.aplicantId === "") ||
      queryParams.aplicantId === undefined
    ) {
      history.push("/");
    } else {
      dispatch(getAplicantProfileAsync(queryParams.aplicantId));
    }
  }, []);
  const handleCloseProfile = () => {
    history.goBack();
    setShowProfile(false);
  };
  const [showStep, setShowStep] = useState(1);
  const handleStep = (step) => setShowStep(step);
  return (
    <>
      <Modal
        show={ShowProfile}
        onHide={handleCloseProfile}
        centered
        size="xl"
        className="re_xlModal re_aplicantProfileModal"
      >
        <Modal.Header className="p-0 border-0" closeButton>
          <img src={aplicantbg} alt="Aplicant BG" className="re_aplicantbg" />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xl={8}>
              <div className="bg-white shadowBox p-0">
                <div className="p-4">
                  <div className="row">
                    <div className="col-auto d-flex flex-column">
                      <img
                        src={
                          applicantProfile && applicantProfile.profilePicture
                        }
                        alt=""
                        className="re_aplicantIMG"
                      />
                      <Button
                        variant="green"
                        onClick={() => setshowChatModal(true)}
                        className="text-uppercase mt-3"
                      >
                        <img src={ChatCircleDots} alt="" className="mr-2" />
                        Inbox Now
                      </Button>
                    </div>
                    <div className="col-auto re_aplicantDetails">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="h1 text-">
                          {applicantProfile && applicantProfile.fullName}
                          <img
                            src={rightmark}
                            alt="rightmark"
                            className="ml-2"
                          />
                        </div>
                        <img src={applicantProfile.userStatus ? onlineLBL : offlineLBL} alt="" />
                      </div>
                      <div className="p1 pb-4">
                        {applicantProfile.skills && applicantProfile.skills.join("|")}
                      </div>
                      <div className="p4 color_gray">
                        {applicantProfile && applicantProfile.basicInfo}
                      </div>
                      <div className="d-flex flex-wrap pt-3">
                        {/* <div className="pr-3">
                          <div className="p1">$255k+</div>
                          <div className="p4 color_gray">Total Earning</div>
                        </div> 
                        <div className="pr-3">
                          <div className="p1">$155k+</div>
                          <div className="p4 color_gray">Total Bonus</div>
                        </div>*/}
                        <div className="pr-3">
                          <div className="p1">
                            {applicantProfile.totalProjects
                              ? applicantProfile.totalProjects
                              : 0}
                          </div>
                          <div className="p4 color_gray">Total Projects</div>
                        </div>
                        <div className="pr-3">
                          <div className="p1">{applicantProfile.jobCompletedPer ? applicantProfile.jobCompletedPer : 0}%</div>
                          <div className="p4 color_gray">Job Complete</div>
                        </div>
                      </div>
                      <div className="d-flex flex-wrap align-items-center pt-4">
                        <div className="d-flex align-items-center pr-3">
                          {/* <img src={star} alt="star" />
                          <img src={star} alt="star" />
                          <img src={star} alt="star" />
                          <img src={star} alt="star" />
                          <img src={star} alt="star" /> */}
                          <Stars
                            stars={
                              applicantProfile.rating
                                ? applicantProfile.rating
                                : 0
                            }
                            size={35} //optional
                            spacing={1} //optional
                            fill="#FFB800" //optional
                          />

                          {/* <Rattings name="skills" value={4} /> */}
                        </div>
                        <div className="p2 pr-1">
                          {applicantProfile && applicantProfile.rating}
                        </div>
                        <div className="p4 color_gray pr-3">
                          ({applicantProfile && applicantProfile.review}{" "}
                          reviews)
                        </div>
                        <div className="p2 d-flex align-items-center">
                          <img src={MapPinLine} alt="" />
                          {applicantProfile && applicantProfile.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="border-top">
                  <Row>
                    <Col lg={4}>
                      <div className="p-4">
                        {applicantProfile.skills && applicantProfile.skills.length > 0 ?
                          <>
                            <div className="p4 color_gray">Skills</div>
                            <div className="pb-4 d-flex flex-wrap">
                              {applicantProfile &&
                                applicantProfile.skills &&
                                applicantProfile.skills.length > 0 &&
                                applicantProfile.skills.map((skill) => (
                                  <div className="re_skillItem">{skill}</div>
                                ))}
                            </div></> : null}

                        {/* <div className="p4 color_gray">Availability</div>
                        <div className="p4 pb-4">
                          More than 30 hrs/week &#60; 24 hrs response time{" "}
                        </div> */}
                        {applicantProfile && applicantProfile.languages ?
                          <>
                            <div className="p4 color_gray">Languages</div>
                            <div className="p4 pb-4">
                              {applicantProfile.languages}
                            </div></> : null}

                        {applicantProfile &&
                          applicantProfile.education &&
                          applicantProfile.education.length > 0 &&
                          <div className="p4 color_gray">Education</div> &&
                          applicantProfile.education.map((education) => (
                            <div className="p4 pb-4">{education.degree}</div>
                          ))}



                        {/* <div className="p4 color_gray">Other Experiences</div>
                        <div className="p4 pb-4">
                          <b>Rocket Build 2019</b>
                          <br />I participated with the "SB/XA Intelligence
                          Services" project in the local Rocket Build in Minsk
                          and global Rocket Build in Boston in 2019.
                        </div>
                        <div className="p4 pb-4">
                          <b>Overkill Ventures</b>
                          <br />I got training in the 4th batch of the Overkill
                          Ventures accelerator program in 2020.
                        </div>
                        <div className="p4 pb-4">
                          <b>Demium Startups</b>
                          <br />I got training in the 2nd batch of the Demium
                          Startups accelerator program in 2020.
                        </div> */}
                        <div className="p4 color_gray">Member Since</div>
                        <div className="p4 pb-4">
                          {moment(
                            applicantProfile && applicantProfile.createdAt
                          ).format(`DD MMM YYYY`)}
                        </div>
                      </div>
                    </Col>
                    <Col lg={8} className="border-left pl-lg-0">
                      {applicantProfile && applicantProfile.portfolio && applicantProfile.portfolio.length > 0 ?
                        applicantProfile.portfolio.map((portf, ind) => {
                          return (<div className="p-4 border-bottom">
                            <div className="p1">{portf.projectTitle}</div>
                            <div className="p4 color_gray py-3">
                              {portf.description}
                            </div>
                            <div className="re_ProjectListItem h-auto">
                              <div
                                className="img_cover"
                                style={{ backgroundImage: `url(${portf.image})` }}
                              ></div>
                              <div className="px-4 py-3">
                                {/* <div className="h3">Catalysing Open Commerce</div> */}
                                <Link to="/profile?tab=4" variant="link" className="p-0">
                                  View More...
                                </Link>
                              </div>
                            </div>
                          </div>)
                        })
                        : null}

                      {/* <div className="p-4">
                        <div className="re_ProjectListItem h-auto">
                          <div
                            className="img_cover"
                            style={{ backgroundImage: `url(${aplicantbg})` }}
                          ></div>
                          <div className="px-4 py-3">
                            <div className="h3">Catalysing Open Commerce</div>
                            <Button variant="link" className="p-0">
                              View More...
                            </Button>
                          </div>
                        </div>
                        <div className="re_ProjectListItem h-auto">
                          <div
                            className="img_cover"
                            style={{ backgroundImage: `url(${aplicantbg})` }}
                          ></div>
                          <div className="px-4 py-3">
                            <div className="h3">Catalysing Open Commerce</div>
                            <Button variant="link" className="p-0">
                              View More...
                            </Button>
                          </div>
                        </div>
                      </div> */}
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            <Col xl={4}>
              {/* <div className="bg-white shadowBox mt-4 mt-xl-0">
                <div className="text-center p1">
                  Contact <b>Nikos Kostopoulos</b> to discuss any details over
                  chat about your job.
                </div>
                <Button variant="primary" className="w-100 mt-3">
                  Accept Applicant Request
                </Button>
                <Button variant="outline-black" className="w-100 mt-3">
                  Reject Applicant Request
                </Button>
              </div> */}
              <div className="bg-white shadowBox px-0 mt-4">
                <div className="p2 pb-3 px-4">Work History</div>
                <div className="re_Profiletabs re_aplicant px-4">
                  <button
                    type="button"
                    className={showStep === 1 ? "active" : ""}
                    onClick={() => handleStep(1)}
                  >
                    Completed (
                    {applicantProfile &&
                      applicantProfile.completedProjects &&
                      applicantProfile.completedProjects.length}
                    )
                  </button>
                  {/* <button
                    type="button"
                    className={showStep === 2 ? "active" : ""}
                    onClick={() => handleStep(2)}
                  >
                    In progress (
                    {applicantProfile &&
                      applicantProfile.inprogressProjects &&
                      applicantProfile.inprogressProjects.length}
                    )
                  </button> */}
                </div>
                {showStep === 1 && (
                  <>
                    {applicantProfile.completedProjects &&
                      applicantProfile.completedProjects.length > 0 &&
                      applicantProfile.completedProjects.map((project) => (
                        <div className="px-4 py-3 border-bottom">
                          <div className="h5">
                            <Link to={`/package-details/?projectId=${project.projectId}&packageId=${project.packageId}`}>
                              {project.name && project.name}
                            </Link>
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="p4 color_gray">
                              {/* 20 Aug 2021 to 10 Oct 2021 */}
                              {moment(project.startDate).format(
                                `DD MMM YYYY`
                              )}{" "}
                              to {moment(project.endDate).format(`DD MMM YYYY`)}
                            </div>
                            <div className="p3 d-flex align-items-center">
                              <img src={star} alt="star" className="mx-2" />
                              {project.packageRate}
                            </div>
                          </div>
                          <div className="p4 color_gray py-3">
                            {project.description}
                          </div>
                          <div className="row">
                            <div className="p3 col">{project.tokenName ? project.tokenName : '$'}{project.minimumCost}</div>
                            {/* <div className="p3 col">$49.70 /hr</div>
                            <div className="p3 col">35 Hours</div> */}
                          </div>
                        </div>
                      ))}
                  </>
                )}
                {showStep === 2 && (
                  <>
                    {applicantProfile.inprogressProjects &&
                      applicantProfile.inprogressProjects.length > 0 &&
                      applicantProfile.inprogressProjects.map((project) => (
                        <div className="px-4 py-3 border-bottom">
                          <div className="h5">
                            {project.name ? project.name : ""}
                          </div>
                          <div className="d-flex align-items-center">
                            <div className="p4 color_gray">
                              {/* 20 Aug 2021 to 10 Oct 2021 */}
                              {moment(project.startDate).format(
                                `DD MMM YYYY`
                              )}{" "}
                              to {moment(project.endDate).format(`DD MMM YYYY`)}
                            </div>
                            <div className="p3 d-flex align-items-center">
                              <img src={star} alt="star" className="mx-2" />
                              5.0
                            </div>
                          </div>
                          <div className="p4 color_gray py-3">
                            {project.description}
                          </div>
                          <div className="row">
                            <div className="p3 col">$1590.00</div>
                            {/* <div className="p3 col">$49.70 /hr</div>
                            <div className="p3 col">35 Hours</div> */}
                          </div>
                        </div>
                      ))}
                  </>
                )}
              </div>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal show={showChatModal} onHide={handleCloseChatModal} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">
            {applicantProfile && applicantProfile.fullName}
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <ChatModal
            recieverId={applicantProfile && applicantProfile._id}
            senderId={user._id}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AplicantProfile;

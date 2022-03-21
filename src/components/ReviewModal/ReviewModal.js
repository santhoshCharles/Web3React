import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Profile from "../../assets/images/Profile.png";

import chat from "../../assets/images/chat.svg";
import logo from "../../assets/images/logo.svg";
import { getPackageCollaboratorsList } from "../../containers/CreateProject/redux/createProjectApi";
import SplashScreen from "../SplashScreen/SplashScreen";

const ReviewModal = (props) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { isLoading, packageCollaborators } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );
  const [showChatModal, setshowChatModal] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const handleCloseChatModal = () => {
    setshowChatModal(false);
  };

  const { selectedPackageData, projectDetail } = props;
  const handleChatbutton = (userInfo) => {
    setshowChatModal(true);
    setSelectedUserInfo(userInfo);
  };

  useEffect(() => {
    if (
      selectedPackageData &&
      Object.keys(selectedPackageData).length > 0 &&
      projectDetail
    ) {
      dispatch(
        getPackageCollaboratorsList(projectDetail._id, selectedPackageData._id)
      );
    }
  }, [selectedPackageData, projectDetail]);

  return (
    <>
      <Modal
        show={props.showReviewModal}
        onHide={props.handleCloseReview}
        centered
      >
        <Modal.Header className="pb-0 border-0" closeButton>
          <div className="d-flex justify-content-center w-100">
            <img src={logo} width="150px" alt="Logo Icon" className="" />
          </div>
        </Modal.Header>
        {isLoading ? (
          <div className="text-center p1 color_gray mt-3 mb-3 ">Loading...</div>
        ) : (
          <Modal.Body className="p-4">
            <Form>
              {packageCollaborators && packageCollaborators.length > 0 ? (
                packageCollaborators.map((userInfo, index) => {
                  return (
                    <Row className=" pt-3" key={userInfo._id}>
                      <Col md={5}>
                        <Link className="d-flex align-items-center">
                          <img
                            src={userInfo.profilePicture}
                            alt="Profile"
                            className="re_img_46_rounded"
                          />
                          <div className="f16-400 color_black pl-2">
                            {userInfo.fullName}
                          </div>
                        </Link>
                      </Col>
                      {userInfo.isReviewed === false ? (
                        <Col md={7}>
                          <div className="d-flex align-items-center justify-content-md-end ">
                            <Link
                              to={{
                                pathname: `/review`,
                                search: `?projectId=${
                                  projectDetail && projectDetail._id
                                }&packageId=${
                                  selectedPackageData && selectedPackageData._id
                                }`,
                                state: { userInfo },
                              }}
                              className="btn btn-blue"
                            >
                              Review
                            </Link>
                          </div>
                        </Col>
                      ) : (
                        <Col md={7}>
                          <div className="text-right  rated-padding text-primary">
                            Rated
                          </div>
                        </Col>
                      )}
                    </Row>
                  );
                })
              ) : (
                <div className="text-center p3 color_gray ">
                  No members present
                </div>
              )}
            </Form>
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};
export default ReviewModal;

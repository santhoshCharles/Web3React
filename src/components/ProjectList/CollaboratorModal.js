import React, { useState, useEffect } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import Profile from "../../assets/images/Profile.png";
//import logoIcon from "../../assets/images/logo-icon.png";
import { acceptRejectRequest } from "../../containers/Dashboard/redux/dashboardApi";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import chat from "../../assets/images/chat.svg";
import logo from "../../assets/images/logo.svg";
import ChatModal from "../../components/Chat/chatModal";

const CollaboratorModal = (props) => {
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [showChatModal, setshowChatModal] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const handleCloseChatModal = () => {
    setshowChatModal(false);
  };

  const { selectedProjectDetails } = props;
  const handleChatbutton = async (userInfo) => {
    typeof props.handleCloseRequest === "function" &&
      (await props.handleCloseRequest());
    setshowChatModal(true);
    setSelectedUserInfo(userInfo);
  };
  const checkInitiator = () => {
    if (
      selectedProjectDetails &&
      selectedProjectDetails.initiatorDetails &&
      selectedProjectDetails.initiatorDetails._id === user._id
    ) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <>
      <Modal
        show={props.showRequest}
        onHide={props.handleCloseRequest}
        centered
      >
        <Modal.Header className="pb-0 border-0" closeButton>
          <div className="d-flex justify-content-center w-100">
            <img src={logo} width="150px" alt="Logo Icon" className="" />
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            {checkInitiator() && props && props.mode === "myProjects" && (
              <Row className=" pt-3" key="key">
                <Col md={5}>
                  <Link className="d-flex align-items-center">
                    <img
                      src="https://res.cloudinary.com/dizkwji5k/image/upload/v1561362114/nbgeugd7hviq8kgjuacr.jpg"
                      alt="Profile"
                      className="re_img_46_rounded"
                    />
                    <div className="f16-400 color_black pl-2">Inititator</div>
                  </Link>
                </Col>
                <Col md={7}>
                  <div className="d-flex align-items-center justify-content-md-end ">
                    <button
                      type="button"
                      className="btn btn-link p-0 mr-2"
                      onClick={() =>
                        handleChatbutton(
                          selectedProjectDetails.initiatorDetails
                        )
                      }
                    >
                      <img src={chat} alt="chat" />
                    </button>
                  </div>
                </Col>
              </Row>
            )}

            {props.projectCollaborators &&
            props.projectCollaborators.length > 0 ? (
              props.projectCollaborators.map((userInfo, index) => {
                return (
                  <Row className=" pt-3" key={userInfo._id}>
                    <Col md={5}>
                      <Link
                        to={`/aplicant-profile?aplicantId=${userInfo._id}`}
                        className="d-flex align-items-center"
                      >
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

                    {props &&
                      props.mode === "myProjects" &&
                      userInfo._id !==
                        user._id &&
                        <Col md={7}>
                          <div className="d-flex align-items-center justify-content-md-end ">
                            <button
                              type="button"
                              onClick={() => handleChatbutton(userInfo)}
                              className="btn btn-link p-0 mr-2"
                            >
                              <img src={chat} alt="chat" />
                            </button>
                          </div>
                        </Col>}
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
      </Modal>
      <Modal show={showChatModal} onHide={handleCloseChatModal} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">{selectedUserInfo.fullName}</div>
        </Modal.Header>
        {user && (
          <Modal.Body className="p-4">
            <ChatModal recieverId={selectedUserInfo._id} senderId={user._id} />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};
export default CollaboratorModal;

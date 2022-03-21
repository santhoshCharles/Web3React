import React, { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Profile from "../../assets/images/Profile.png";
import logoIcon from "../../assets/images/logo-icon.png";
import { acceptRejectRequest } from "../../containers/Dashboard/redux/dashboardApi";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import { useEffect } from "react";

const RequestModal = (props) => {

  const [isAccepted, setAccepted] = useState([]);
  const [isRejected, setRejected] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    setAccepted([]);
    setRejected([]);
  }, [props.showRequest])

  const { userRequestReceived, isRequestAccepted } = useSelector(state => state.dashboardDetail);
  return (
    <>
      <Modal
        show={props.showRequest}
        onHide={props.handleCloseRequest}
        centered
      >
        <Modal.Header className="pb-0 border-0" closeButton>
          <div className="d-flex justify-content-center w-100">
            <img src={logoIcon} alt="Logo Icon" className="" />
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form>
            <Row>
              <Col md={12}>
                <div className="f24-400 pb-3">Requests</div>
              </Col>
            </Row>
            {userRequestReceived.map((userInfo, index) => {
              return (
                <Row className=" pt-3" key={userInfo._id}>
                  <Col md={5}>
                    <Link to="/profile" className="d-flex align-items-center">
                      <img
                        src={userInfo.profilePicture}
                        alt="Profile"
                        className="re_img_46_rounded"
                      />
                      <div className="f16-400 color_black pl-2">{userInfo.fullName}</div>
                    </Link>
                  </Col>
                  <Col md={7}>
                    <div className="d-flex align-items-center justify-content-md-end ">
                      {(!isRejected.includes(userInfo._id)) && <Button variant="black" className="mr-3 btn-sm w-110px" disabled={isRequestAccepted || isAccepted.includes(userInfo._id)} onClick={() => {
                        dispatch(acceptRejectRequest(props.projectId, props.packageId, userInfo._id, "ACCEPTED"))
                        setAccepted([...isAccepted, userInfo._id])
                      }}>
                        {/* {isRequestAccepted && isAccepted.includes(userInfo._id) ? (
                          <>
                            Accepting...
                          <img
                              src={LoadingImage}
                              alt="LoadingImage"
                              width="20px"
                              className="ml-2"
                            />
                          </>
                        ) : ( */}
                        {isAccepted.includes(userInfo._id) ? "Accepted" : "Accept"}
                        {/* )} */}

                      </Button>}
                      {(!isAccepted.includes(userInfo._id)) && <Button variant="outline-black" className="btn-sm w-110px" disabled={isRequestAccepted || isRejected.includes(userInfo._id)} onClick={() => {
                        dispatch(acceptRejectRequest(props.projectId, props.packageId, userInfo._id, "REJECTED"))
                        setRejected([...isRejected, userInfo._id])
                      }}>
                        {/* {isRequestAccepted && isRejected.includes(userInfo._id) ? (
                          <>
                            Rejecting...
                          <img
                              src={LoadingImage}
                              alt="LoadingImage"
                              width="20px"
                              className="ml-2"
                            />
                          </>
                        ) : ( */}
                        {isRejected.includes(userInfo._id) ? "Rejected" : "Reject"}
                        {/* )} */}
                      </Button>}

                    </div>
                  </Col>
                </Row>
              );
            })}

            {/* <div className="d-flex justify-content-center pt-4">
              <Button
                variant="black"
                type="button"
                onClick={props.handleCloseRequest}
              >
                Submit
              </Button>
            </div> */}
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default RequestModal;

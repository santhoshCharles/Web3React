import React from "react";
import ToggleSwitch from "../../../components/ToggleSwitch/ToggleSwitch";

import notificationbg from "../../../assets/images/notification-bg.svg";
import { Container } from "react-bootstrap";

const Notifications = () => {
  return (
    <>
      <Container className="shadowBox radius-top-0 bg-white">
        <div className="d-flex align-items-center pb-4">
          <ToggleSwitch />
          <div className="p3 pl-3">Send Notifications</div>
        </div>
        <div className="d-flex justify-content-center">
          <img src={notificationbg} alt="notification" className="mw-100" />
        </div>
      </Container>
    </>
  );
};
export default Notifications;

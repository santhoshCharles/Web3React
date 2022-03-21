import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AccountSettings from "./AccountSettings";
import Email from "./Email";
import Notifications from "./Notifications";
import Payments from "./Payments";
import Privacy from "./Privacy";
import queryString from "query-string";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import { useHistory } from "react-router-dom";

const Settings = () => {
  const history = useHistory();
  const [showStep, setShowStep] = useState(4);
  const handleStep = (e) => {
    history.push(`/settings?tab=${e}`);
    setShowStep(e);
  };

  useEffect(() => {
    const params = queryString.parse(history.location.search).tab;
    if (params) {
      setShowStep(Number(params));
    } else {
      setShowStep(4);
    }
  }, [showStep]);
  return (
    <>
      <PageTitle title="Settings" />
      <section className="pt-80 pb-80">
        <Container className="bg-white shadowBox radius-bottom-0 pb-0">
          <div className="re_Profiletabs">
            {/* <button
              type="button"
              className={showStep === 1 ? "active" : ""}
              onClick={() => handleStep(1)}
            >
              Email
            </button> */}
            {/* <button
              type="button"
              className={showStep === 2 ? "active" : ""}
              onClick={() => handleStep(2)}
            >
              Notifications
            </button> */}
            {/* <button
              type="button"
              className={showStep === 3 ? "active" : ""}
              onClick={() => handleStep(3)}
            >
              Privacy
            </button> */}
            <button
              type="button"
              className={showStep === 4 ? "active" : ""}
              onClick={() => handleStep(4)}
            >
              Account settings
            </button>
            {/* <button
              type="button"
              className={showStep === 5 ? "active" : ""}
              onClick={() => handleStep(5)}
            >
              Payments
            </button> */}
          </div>
        </Container>

        {showStep === 1 && <Email />}
        {showStep === 2 && <Notifications />}
        {showStep === 3 && <Privacy />}
        {showStep === 4 && <AccountSettings />}
        {showStep === 5 && <Payments />}
      </section>
    </>
  );
};
export default Settings;

import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import Invite from "./Invite";
import ReferralLink from "./ReferralLink";

const Referrals = () => {
  const [showStep, setShowStep] = useState(1);
  const handleStep = (e) => setShowStep(e);
  return (
    <>
      <PageTitle title="Referrals" />
      <section className="pt-80 pb-80">
        <Container className="bg-white shadowBox pb-0 radius-bottom-0">
          <div className="re_Profiletabs mt-0">
            <button
              type="button"
              className={showStep === 1 ? "active" : ""}
              onClick={() => handleStep(1)}
            >
              Invite
            </button>
            <button
              type="button"
              className={showStep === 2 ? "active" : ""}
              onClick={() => handleStep(2)}
            >
              Referral link
            </button>
          </div>
        </Container>
        {showStep === 1 && <Invite />}
        {showStep === 2 && <ReferralLink />}
      </section>
    </>
  );
};
export default Referrals;

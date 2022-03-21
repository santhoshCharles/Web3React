import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Initiator from "./Initiator";
import Collaborator from "./Collaborator";
import { PageTitle } from "../../../components/PageTitle/PageTitle";

const Dashboard = () => {
  const [showStep, setShowStep] = useState(1);
  const handleStep = (e) => setShowStep(e);
  return (
    <>
      <PageTitle title="Dashboard" />
      <section className="pt-80 pb-80">
        <Container className="bg-white shadowBox pb-0 radius-bottom-0">
          <div className="re_Profiletabs mt-0">
            <button
              type="button"
              className={showStep === 1 ? "active" : ""}
              onClick={() => handleStep(1)}
            >
              Initiator
            </button>
            <button
              type="button"
              className={showStep === 2 ? "active" : ""}
              onClick={() => handleStep(2)}
            >
              Collaborator
            </button>
          </div>
        </Container>
        {showStep === 1 && <Initiator />}
        {showStep === 2 && <Collaborator />}
      </section>
    </>
  );
};
export default Dashboard;

import React from "react";
import { Col, Form, Button, Container } from "react-bootstrap";
import { Checkbox } from "../../../components/Checkbox/Checkbox";

const Privacy = () => {
  return (
    <>
      <Container className="shadowBox radius-top-0 bg-white">
        <Form className="row">
          <Col md={6}>
            <div className="p2 pb-3">Profile Privacy</div>
            <div className="pb-2">
              <Checkbox
                small={true}
                text="Don't auto-follow users you do business with"
              />
            </div>
            <div className="pb-2">
              <Checkbox
                small={true}
                text="Hide my profile from the leaderboard"
              />
            </div>
            <div className="pb-2">
              <Checkbox small={true} text="Hide my profile altogether" />
            </div>
            <div className="pb-4">
              <Checkbox
                small={true}
                text="Anonymize my gitcoin Grants contributions"
              />
            </div>
            <div className="p2 pb-3">Account Privacy</div>
            <div className="pb-4">
              <Checkbox small={true} text="Do not Track" />
            </div>
            <div className="p2 pb-3">Wallet Privacy</div>
            <div className="pb-2">
              <Checkbox
                small={true}
                text="Hide my wallet address whereever PIA is shown."
              />
            </div>
            <div className="">
              <Checkbox
                small={true}
                text="Hide my wallet address, even when it's anonymized."
              />
            </div>
          </Col>
          <Col
            md={6}
            className="d-flex align-items-start justify-content-md-end "
          >
            <Button variant="blue" className="w-124px">
              Save
            </Button>
          </Col>
        </Form>
      </Container>
    </>
  );
};
export default Privacy;

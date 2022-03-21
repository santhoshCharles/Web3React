import React from "react";
import { Col, Form, Button, Container } from "react-bootstrap";
import { Checkbox } from "../../../components/Checkbox/Checkbox";

const Email = () => {
  return (
    <>
      <Container className="shadowBox radius-top-0 bg-white">
        <Form className="row">
          <Col md={6}>
            <div className="p3 pb-3">Email Preferences</div>
            <div className="pb-3">
              <input
                type="email"
                placeholder="abc@xyz.com"
                className="form-control re_input re_maxW340"
              />
            </div>
            <div className="pb-2">
              <Checkbox small={true} text="Select All" />
            </div>
            <div className="pb-2">
              <Checkbox small={true} text="Don't send me Daily Emails" />
            </div>
            <div className="pb-2">
              <Checkbox small={true} text="Don't send me Welcome Emails" />
            </div>
            <div className="pb-2">
              <Checkbox small={true} text="Don't send me Roundup Emails" />
            </div>
            <div className="pb-2">
              <Checkbox
                small={true}
                text="Don't send me Product Update Emails"
              />
            </div>
            <div className="pb-2">
              <Checkbox
                small={true}
                text="Don't send me General Email Updates"
              />
            </div>
            <div className="pb-2">
              <Checkbox
                small={true}
                text="Don't send me Quarterly Email Updates"
              />
            </div>
            <div className="pb-2">
              <Checkbox small={true} text="Don't send me Tip Emails" />
            </div>
            <div className="pb-2">
              <Checkbox
                small={true}
                text="Don't send me Faucet Notification Emails"
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
export default Email;

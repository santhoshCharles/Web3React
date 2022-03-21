import React, { useEffect, useState } from "react";
import { Button, Form, Container, Col, Row, Table } from "react-bootstrap";
import CopySimple from "./../../../assets/images/CopySimple.svg";
import plusRound from "./../../../assets/images/plusRound.svg";
import col3 from "./../../../assets/images/col3.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  inviteFriendAsync,
  inviteFriendsHistoryAsync,
} from "../redux/userProfileApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { toast } from "react-toastify";
import { getDateMonthYear } from "../../../utils";
import BasicPagination from "../../../components/Pagination/BasicPagination";
import { UserProfileActions } from "../redux/userProfileAction";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import MultiEmail from "../MultiEmail";

const Referrals = () => {
  const Emailregex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const { _id, myReferralCode } = useSelector((state) => state.auth.user);
  const {
    isLoading,
    invitationHistory,
    referralHistorySkip,
    referralHistoryLimit,
    refreshInvitationHistory,
  } = useSelector((state) => state.userProfile, shallowEqual);
  const [refferalLink, setRefferalLink] = useState();
  const [invitationEmailId, setInvitationEmailId] = useState([]);
  const [emails, setEmails] = useState([]);
  const [isValidEmail, setValidEmail] = useState(true);
  const dispatch = useDispatch();
  const initialValues = {
    emailId: "",
  };

  const RefferealSchema = Yup.object().shape({
    emailId: Yup.string()
      .matches(Emailregex, "Please enter valid email")
      .trim()
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    //validationSchema: RefferealSchema,
    onSubmit: (values, { resetForm }) => {
      if (emails.length > 0) {
        resetForm();
        dispatch(inviteFriendAsync(emails));
        setEmails([]);
      }
    },
  });

  useEffect(() => {
    const refCode =
      myReferralCode !== undefined ? `?referralCode=${myReferralCode}` : "";
    const link = `${window.location.origin}${refCode}`;
    setRefferalLink(link);
  }, []);

  const onCopy = () => {
    toast.success("Succesfully copied");
  };
  const [showStep, setShowStep] = useState(1);
  const handleStep = (e) => setShowStep(e);

  useEffect(() => {
    if (showStep === 2) dispatch(inviteFriendsHistoryAsync());
  }, [showStep]);

  useEffect(() => {
    if (refreshInvitationHistory) dispatch(inviteFriendsHistoryAsync());
  }, [refreshInvitationHistory]);

  useEffect(() => {
    if (invitationEmailId.length > 0)
      dispatch(inviteFriendAsync(invitationEmailId));
  }, [invitationEmailId]);

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : referralHistorySkip;
    dispatch(UserProfileActions.setReferralBatchNumber(count));
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      <Container className="bg-white shadowBox radius-top-0 ReferralsPage">
        <div className="re_Profiletabs justify-content-center d-flex border-0 mt-0">
          <button
            type="button"
            className={showStep === 1 ? "active" : ""}
            onClick={() => handleStep(1)}
          >
            Invite Friends
          </button>
          <button
            type="button"
            className={showStep === 2 ? "active" : ""}
            onClick={() => handleStep(2)}
          >
            Invitation History
          </button>
        </div>
        {showStep === 1 && (
          <>
            <Row className="pt-4">
              <Col lg={4}>
                <div className="h1">Share your Invite Link</div>
              </Col>
              <Col lg={4}>
                {" "}
                <input
                  type="text"
                  readOnly
                  value={refferalLink}
                  className="form-control re_input h-42"
                />
              </Col>
              <Col lg={4}>
                <CopyToClipboard text={refferalLink} onCopy={onCopy}>
                  <button type="button" className="btn-link btn px-1">
                    <img src={CopySimple} alt="CopySimple" />
                  </button>
                </CopyToClipboard>
              </Col>
            </Row>
            <Form className="row pt-4" onSubmit={formik.handleSubmit}>
              <Col lg={4}>
                <div className="h1">Invite your friends by Email</div>
              </Col>

              <Col lg={4}>
                <MultiEmail
                  placeholder="Enter email address"
                  emails={emails}
                  setEmails={setEmails}
                  setValidEmail={setValidEmail}
                />
                {/* <input
                type="text"
                name="emailId"
                placeholder="Enter email address"
                className="form-control re_input h-42"
                {...formik.getFieldProps("emailId")}
              /> */}
                {!isValidEmail ? (
                  <div className="fv-plugins-message-container text-left">
                    <div className="fv-help-block">
                      Please enter valid email
                    </div>
                  </div>
                ) : null}
              </Col>
              <Col lg={4}>
                <Button
                  type="submit"
                  variant="link"
                  className="p-0 mt-2 m-lg-0"
                >
                  <img src={col3} alt="" width="36" />
                </Button>
              </Col>
            </Form>
          </>
        )}
        {showStep === 2 && (
          <>
            <Table responsive hover className="mt-4">
              <thead>
                <tr>
                  <th>Invitation Date</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Reinvite</th>
                </tr>
              </thead>
              <tbody>
                {invitationHistory.data &&
                  invitationHistory.data.map((history) => {
                    return (
                      <tr key={history._id}>
                        <td>{getDateMonthYear(new Date(history.invitedAt))}</td>
                        <td>{history.emailId}</td>
                        <td>{`${history.isUsed ? "Signed Up" : "Invited"}`}</td>
                        <td>
                          {!history.isUsed && (
                            <Button
                              type="submit"
                              onClick={() =>
                                setInvitationEmailId([history.emailId])
                              }
                              variant="link"
                              className="p-0"
                            >
                              <img src={col3} alt="" width="36" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
            {invitationHistory.recordsTotal > 0 && (
              <div className="row d-flex align-items-center mt-3">
                <div className="col-md-12 aspgntn">
                  <BasicPagination
                    totalRecords={invitationHistory.recordsTotal}
                    filteredRecords={invitationHistory.recordsFiltered}
                    limit={referralHistoryLimit}
                    batch={referralHistorySkip + 1}
                    onBatchChange={onPageChange}
                  />
                </div>
              </div>
            )}
          </>
        )}
        {/* <div className="mw-450 text-center d-table mx-auto py-md-4">
          <div className="re_ReferralsBox">
            <Form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="emailId"
                  placeholder="Enter email address"
                  className="form-control re_input h-42"
                  {...formik.getFieldProps("emailId")}
                />
                {formik.touched.emailId && formik.errors.emailId ? (
                  <div className="fv-plugins-message-container text-left">
                    <div className="fv-help-block">{formik.errors.emailId}</div>
                  </div>
                ) : null}
              </div>
              <Button type="submit" variant="link" className="p-0">
                <img src={plusRound} alt="" />
              </Button>
            </Form>
          </div>
          <div className="p3 opacity50 py-4">OR</div>
        </div> */}
      </Container>
    </>
  );
};

export default Referrals;

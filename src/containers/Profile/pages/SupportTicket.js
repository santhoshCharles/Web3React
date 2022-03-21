import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Col,
  Container,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import { ReactTimeAgoC } from "../../../components/utils/ReactTimeAgoC";
import {
  addCommentAsync,
  createSupportTicketAsync,
  getAllSupportTicketsAsync,
  getMyProjectListsAsync,
  getMyPackageListsAsync,
  getMyCollaboratorListsAsync
} from "../redux/userProfileApi";
import { UserProfileActions } from "../redux/userProfileAction";
import { useFormik } from "formik";
import * as Yup from "yup";
import PerfectScrollbar from "react-perfect-scrollbar";

import info from "../../../assets/images/infoblack.svg";
import Open from "../../../assets/images/Open.svg";
import Completed from "../../../assets/images/Completed.svg";
import Progress from "../../../assets/images/Progress.svg";

const perfectScrollbarOptions = {
  wheelSpeed: 1,
  wheelPropagation: false,
};

const SupportTicket = () => {
  const [scrollEl, setScrollEl] = useState();
  useEffect(() => {
    setTimeout(() => {
      if (scrollEl) {
        scrollEl.scrollTop = scrollEl.scrollHeight;
      }
    }, 200);
  }, [scrollEl]);

  const [isColloborator, setIsColloborator] = useState(false);
  const [comment, setComment] = useState([]);
  const [commentError, setCommentError] = useState([]);
  const dispatch = useDispatch();

  const {
    myProjectList,
    myPackageList,
    myColloboratorList,
    supportTicketLoading,
    allSupportTickets,
    refreshAllSupportTickets,
    addCommentLoader,
    supportTicketListLimit,
    isLoading,
  } = useSelector((state) => state.userProfile, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const handleReply = (id, index) => {
    if (comment[index] !== undefined && comment[index] !== "") {
      dispatch(addCommentAsync(comment[index], id));
      setComment([]);
    } else {
      let newarray = [...commentError];
      newarray[index] = "Comment is required";
      setCommentError(newarray);
      setComment([]);
    }
  };
  const handleComment = (e, index) => {
    if (commentError[index] !== undefined) {
      delete commentError[index];
    }
    let newarray = [...comment];
    newarray[index] = e.target.value;
    setComment(newarray);
  };

  useEffect(() => {
    dispatch(getMyProjectListsAsync());
  }, []);

  useEffect(() => {
    if (refreshAllSupportTickets) {
      dispatch(getAllSupportTicketsAsync());
    }
  }, [refreshAllSupportTickets]);

  const initialValues = {
    myProject: "",
    myPackage: "",
    myColloborator: "",
    subject: "",
    details: "",
    reason: "",
  };

  const supportTicketSchema = Yup.object().shape({
    subject: Yup.string()
      .trim()
      .min(3, "Please enter valid subject")
      .required("Subject is required"),
    details: Yup.string()
      .trim()
      .min(3, "Please enter valid details")
      .required("Details is required"),
    reason: Yup.string()
      .trim()
      .min(3, "Please enter valid reason")
      .required("Reason is required"),
    myProject: Yup.string().trim().required(" Select Project List"),
    myPackage: Yup.string().trim().required(" Select Package List"),
    myColloborator: Yup
      .string()
      .trim()
      .when("myPackage", (myPackage) => {
        if(isColloborator)
          return Yup.string().required(" Select Colloborator List")
      })
      
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: supportTicketSchema,
    onSubmit: (values, { resetForm }) => {
      const { subject, details, reason, myColloborator, myPackage, myProject } = values
      const obj = {
        subject,
        details,
        reason,
        packageId: myPackage,
        userId: myColloborator,
        myProject
      }
      dispatch(createSupportTicketAsync(obj));
      resetForm();
    },
  });

  const setBatchNumber = () => {
    dispatch(
      UserProfileActions.setSupportTicketBatchNumber(supportTicketListLimit + 5)
    );
  };
  const sortedComments = (comments) => {
    let sortedArray = comments.sort((a, b) => a.createdAt - b.createdAt);
    return (
      <>
        {sortedArray &&
          sortedArray.length > 0 &&
          sortedArray.map((comment) => (
            <div
              key={comment._id}
              className={
                comment.senderDetails
                  ? comment.senderDetails._id === user._id
                    ? "pl-4"
                    : ""
                  : ""
              }
            >
              <div className="d-flex align-items-center flex-wrap">
                <div
                  className={
                    comment.senderDetails
                      ? comment.senderDetails._id === user._id
                        ? "re_userReply"
                        : "re_adminReply"
                      : "re_adminReply"
                  }
                >
                  {comment.senderDetails && comment.senderDetails.fullName
                    ? comment.senderDetails.fullName
                    : "Admin"}
                </div>
                <span className="color_gray p4 pl-2">
                  {ReactTimeAgoC({ date: comment.createdAt })}
                </span>
              </div>
              <div className="pb-3 p3">{comment.msg}</div>
            </div>
          ))}
      </>
    );
  };
  return (
    <>
      <Container className="bg-white shadowBox radius-top-0">
        <div className="bg-light-blue p-4 mb-4 rounded-lg">
          <Form className="row" onSubmit={formik.handleSubmit}>
            <Col md={4}>
              <Form.Group>
                <input
                  type="text"
                  placeholder="Subject"
                  name="subject"
                  className="form-control re_input"
                  {...formik.getFieldProps("subject")}
                />
                {formik.touched.subject && formik.errors.subject ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.subject}</div>
                  </div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <select
                  name="myProject"
                  className="form-control re_input"
                  {...formik.getFieldProps("myProject")}
                  onChange={(e) => {
                    formik.setFieldValue('myProject', e.target.value)
                    formik.setFieldValue('myPackage', '')
                    setIsColloborator(false)
                    dispatch(getMyPackageListsAsync(e.target.value))
                  }}
                >
                  <option value="" disabled selected hidden>
                    Project List
                  </option>
                  {myProjectList &&
                    myProjectList.length > 0 &&
                    myProjectList.map((item) => (
                      <option key={item.title} value={item._id}>
                        {item.title}
                      </option>
                    ))}
                </select>
                {formik.touched.myProject && formik.errors.myProject ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.myProject}
                    </div>
                  </div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <select
                  name="myPackage"
                  className="form-control re_input"
                  {...formik.getFieldProps("myPackage")}
                  onChange={(e) => {
                    const projectId = formik.values.myProject;
                    formik.setFieldValue('myPackage', e.target.value)
                    formik.setFieldValue('myColloborator', '')
                    dispatch(getMyCollaboratorListsAsync(projectId, e.target.value))
                    const role = myPackageList.find((r => (r._id === e.target.value)))
                    //console.log({role})
                    if(role.userRole !== "collaborator") {
                      setIsColloborator(true)
                    } else {
                      setIsColloborator(false)
                    }
                  }}
                >
                  <option value="" disabled selected hidden>
                    Package List
                  </option>
                  {myPackageList &&
                    myPackageList.length > 0 &&
                    myPackageList.map((item) => (
                      <option key={item.name} value={item._id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                {formik.touched.myProject && formik.errors.myProject ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.myProject}
                    </div>
                  </div>
                ) : null}
              </Form.Group>
            </Col>
            {isColloborator && <Col md={4}>
              <Form.Group>
                <select
                  name="myColloborator"
                  className="form-control re_input"
                  {...formik.getFieldProps("myColloborator")}
                >
                  <option value="" disabled selected hidden>
                    Collaborator List
                  </option>
                  {myColloboratorList &&
                    myColloboratorList.length > 0 &&
                    myColloboratorList.map((item) => (
                      <option key={item.fullName} value={item._id}>
                        {item.fullName}
                      </option>
                    ))}
                </select>
                {formik.touched.myProject && formik.errors.myProject ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.myProject}
                    </div>
                  </div>
                ) : null}
              </Form.Group>
            </Col>}
            <Col md={4}>
              <Form.Group>
                <input
                  type="text"
                  placeholder="Reason"
                  name="reason"
                  className="form-control re_input"
                  {...formik.getFieldProps("reason")}
                />
                {formik.touched.reason && formik.errors.reason ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.reason}</div>
                  </div>
                ) : null}
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="position-relative">
                <textarea
                  rows={7}
                  placeholder="Details"
                  name="details"
                  className="form-control re_input"
                  {...formik.getFieldProps("details")}
                ></textarea>
                {formik.touched.details && formik.errors.details ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.details}</div>
                  </div>
                ) : null}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  type="submit"
                  variant="blue"
                  className="w-124px"
                  disabled={supportTicketLoading}
                >
                  {supportTicketLoading ? (
                    <>
                      Saving...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Send"
                  )}
                </Button>
              </div>
            </Col>
          </Form>
        </div>
        {allSupportTickets.records &&
          allSupportTickets.records.length > 0 &&
          allSupportTickets.records.map((supportTicket, index) => (
            <div
              key={supportTicket._id}
              className="re_activityList re_EarningsList"
            >
              <div className="d-flex flex-md-row flex-column align-items-center justify-content-between px-3 pb-3">
                <div className="d-flex align-items-center re_support_left">
                  <img
                    src={
                      supportTicket.projectDetails &&
                      supportTicket.projectDetails.logo
                    }
                    alt="Profile"
                    className="re_w44Rounded"
                  />
                  <div className="pl-3 re_support_left2">
                    <div className="d-flex flex-wrap align-items-center">
                      <div className="p3 pr-3 d-flex align-items-center position-relative">
                        <span className="color_gray pr-2">Subject:</span>

                        <span className="subjectDisplay">
                          {supportTicket && supportTicket.subject}
                        </span>

                        {supportTicket && supportTicket.subject.length >= 23 && (
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                              <Tooltip className="re_tooltip">
                                {supportTicket.subject}
                              </Tooltip>
                            }
                          >
                            <img src={info} alt="info" className="ml-2" />
                          </OverlayTrigger>
                        )}
                      </div>
                      <div className="p3 pr-3 d-flex align-items-center">
                        <span className="color_gray pr-2">Project:</span>
                        {supportTicket.projectDetails.title}
                      </div>
                      <div className="p3 d-flex align-items-center">
                        <span className="color_gray pr-2">Reason:</span>
                        <span className="subjectDisplay">
                          {supportTicket && supportTicket.reason}
                        </span>
                        {supportTicket && supportTicket.reason.length >= 23 && (
                          <OverlayTrigger
                            placement="bottom"
                            delay={{ show: 250, hide: 400 }}
                            overlay={
                              <Tooltip className="re_tooltip">
                                {supportTicket.reason}
                              </Tooltip>
                            }
                          >
                            <img src={info} alt="info" className="ml-2" />
                          </OverlayTrigger>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="re_support_right">
                  <img
                    src={
                      supportTicket &&
                      supportTicket.projectDetails &&
                      supportTicket.projectDetails.projectStatus === "OPEN"
                        ? Open
                        : supportTicket.ticketStatus === "Completed"
                        ? Completed
                        : supportTicket.ticketStatus === "IN-PROGRESS"
                        ? Progress
                        : Completed
                    }
                    alt="Status"
                  />
                </div>
              </div>
              <div className="p3 p-3 color_gray border-top">
                {supportTicket && supportTicket.details}
              </div>
              <div className="re_replySection px-3">
                <hr className="mt-0" />
                <PerfectScrollbar
                  className="scroll"
                  options={perfectScrollbarOptions}
                  style={{ maxHeight: "35vh", position: "relative" }}
                  containerRef={(ref) => {
                    setScrollEl(ref);
                  }}
                >
                  {sortedComments(supportTicket.comments)}
                </PerfectScrollbar>
                {supportTicket.ticketStatus === "OPEN" && (
                  <Form className="re_replyForm">
                    {addCommentLoader && <SplashScreen />}
                    <input
                      type="text"
                      placeholder="Write here"
                      name="comments"
                      value={comment[index] ? comment[index] : ""}
                      onChange={(e) => handleComment(e, index)}
                      className="form-control re_input"
                    />
                    <Button
                      type="button"
                      variant="blue"
                      onClick={() =>
                        handleReply(supportTicket && supportTicket._id, index)
                      }
                      disabled={addCommentLoader}
                    >
                      Reply
                    </Button>
                  </Form>
                )}

                {commentError[index] !== "" ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{commentError[index]}</div>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        {allSupportTickets &&
        allSupportTickets.recordsFiltered < allSupportTickets.recordsTotal ? (
          <button
            type="button"
            className="btn btn-gray btn-sm"
            onClick={setBatchNumber}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Loading...
                <img
                  src={LoadingImage}
                  alt="LoadingImage"
                  width="20px"
                  className="ml-2"
                />
              </>
            ) : (
              "Show More"
            )}
          </button>
        ) : null}
      </Container>
    </>
  );
};

export default SupportTicket;

import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useLocation } from "react-router";
import { useFormik } from "formik";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import * as Yup from "yup";
import { ReadMore2 } from "../../../components/ReadMore";
import a1 from "./../../../assets/images/a1.png";
import { Rattings } from "../../../components/Rattings";
import queryString from "query-string";
import { giveCollaboratorReviewAsync } from "../../CreateProject/redux/createProjectApi";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";

const Review = (props) => {
  const location = useLocation();
  const { userInfo } = location.state;
  const history = useHistory();
  const { isLoading } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const queryParams = queryString.parse(window.location.search);
  const ratingSchema = Yup.object().shape({
    description: Yup.string().trim().required("required"),
  });
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const initialValues = {
    skills: "",
    workQuality: "",
    adherenceSchedule: "",
    communication: "",
    cooperation: "",
    description: "",
  };

  useEffect(() => {
    if (
      !queryParams.projectId ||
      !queryParams.packageId ||
      Object.keys(userInfo).length === 0
    ) {
      history.push("/");
    }
  }, [queryParams]);

  const formik = useFormik({
    initialValues,
    validationSchema: ratingSchema,
    onSubmit: async (values, { resetForm }) => {
      if (
        queryParams &&
        queryParams.projectId &&
        queryParams.packageId &&
        Object.keys(userInfo).length > 0
      ) {
        let updatedValues = {}
        updatedValues.user = userInfo._id;
        updatedValues.adherenceSchedule = values.adherenceSchedule ? values.adherenceSchedule : 0
        updatedValues.communication = values.communication ? values.communication : 0
        updatedValues.cooperation = values.cooperation ? values.cooperation : 0
        updatedValues.description = values.description 
        updatedValues.skills = values.skills ? values.skills : 0
        updatedValues.workQuality = values.workQuality ? values.workQuality : 0
        const data = await dispatch(
          giveCollaboratorReviewAsync(
            updatedValues,
            queryParams.projectId,
            queryParams.packageId,
            resetForm
          )
        );

        if (data.responseCode === 200) {
          history.goBack();
        }
      }
    },
  });

  const handleReviewChange = (value, name) => {
    formik.setFieldValue(name, value);
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="Review" />
      <section className="pt-80 pb-80 min-height-50vh">
        <Container className={`bg-white shadowBox `}>
          <div className="pb-2 p1 d-flex align-items-center flex-wrap">
            Public Feedback for{" "}
            <div
              className="re_picon wh-36px mx-2"
              style={{
                background: `url(${
                  userInfo && userInfo.profilePicture
                })no-repeat scroll center center / cover`,
              }}
            ></div>{" "}
            {userInfo && userInfo.fullName}
          </div>
          <ReadMore2>
            This feedback will be shared on your freelancer’s profile only after
            they’ve left feedback for you. This feedback will be shared on your
            freelancer’s profile only after they’ve left feedback for you.
          </ReadMore2>
          <hr />
          <div className="p4 pb-3">Feedback to freelancer</div>
          <Row>
            <Col md={4} className="pb-3 pb-md-4">
              <div className="p3">Skills</div>
              <Rattings
                name="skills"
                value={formik.values.skills}
                onChange={handleReviewChange}
              />
              {formik.errors.skills ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.skills}</div>
                </div>
              ) : null}
            </Col>
            <Col md={4} className="pb-3 pb-md-4">
              <div className="p3">Quality of Work</div>
              <Rattings
                name="workQuality"
                value={formik.values.workQuality}
                onChange={handleReviewChange}
              />
              {formik.errors.workQuality ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.workQuality}
                  </div>
                </div>
              ) : null}
            </Col>
          </Row>
          <Row className="pb-4">
            <Col md={4} className="pb-3 pb-md-4">
              <div className="p3">Adherence to Schedule</div>
              <Rattings
                name="adherenceSchedule"
                value={formik.values.adherenceSchedule}
                onChange={handleReviewChange}
              />
              {formik.errors.adherenceSchedule ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.adherenceSchedule}
                  </div>
                </div>
              ) : null}
            </Col>
            <Col md={4} className="pb-3 pb-md-4">
              <div className="p3">Communication</div>
              <Rattings
                name="communication"
                value={formik.values.communication}
                onChange={handleReviewChange}
              />
              {formik.errors.communication ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.communication}
                  </div>
                </div>
              ) : null}
            </Col>
            <Col md={4} className="pb-3 pb-md-4">
              <div className="p3">Cooperation</div>
              <Rattings
                name="cooperation"
                value={formik.values.cooperation}
                onChange={handleReviewChange}
              />
              {formik.errors.cooperation ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {formik.errors.cooperation}
                  </div>
                </div>
              ) : null}
            </Col>
          </Row>
          <div className="pb-2 p1 d-flex align-items-center flex-=wrap">
            Total Score:{" "}
            {(
              formik.values.skills * 0.2 +
              formik.values.workQuality * 0.2 +
              formik.values.adherenceSchedule * 0.2 +
              formik.values.communication * 0.2 +
              formik.values.cooperation * 0.2
            ).toFixed(2)}
          </div>
          <div className="pb-3 p3 opacity50">
            Share your experience with this freelancer to the Upwork community
          </div>
          <textarea
            className="form-control re_inputRouded"
            maxLength="1000"
            name="description"
            rows="4"
            value={formik.values.description}
            onChange={({ target: { value, name } }) =>
              handleReviewChange(value, name)
            }
          ></textarea>
          <div className="pb-3 p3 opacity50">
            {1000 - formik.values.description.length} Characters left
          </div>
          {formik.errors.description && formik.touched.description ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.description}</div>
            </div>
          ) : null}
          <div className="text-right">
            <Button className="blue" onClick={formik.handleSubmit}>
              Post Review
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
};
export default Review;

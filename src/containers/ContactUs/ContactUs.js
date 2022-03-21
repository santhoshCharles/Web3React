import React, { useEffect, useReducer } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";

import img from "../../assets/images/img.png";
import { getCMSDetailsAsync } from "../AboutUs/redux/cmsApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";

const contactActions = {
  ADD_CONTACT_START: "ADD_CONTACT_START",
  ADD_CONTACT_SUCCESS: "ADD_CONTACT_SUCCESS",
  ADD_CONTACT_ERROR: "ADD_CONTACT_ERROR",
};

const contactReducer = (state, action) => {
  switch (action.type) {
    case contactActions.ADD_CONTACT_START:
      return {
        ...state,
        isLoading: true,
      };

    case contactActions.ADD_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case contactActions.ADD_CONTACT_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return { ...state };
  }
};

const initialState = {
  isLoading: false,
};

const apiUrl = process.env.REACT_APP_API;

const addContactUsDetails = async (dispatch, contactDetails, resetForm) => {
  dispatch({ type: contactActions.ADD_CONTACT_START });
  const { data } = await axios({
    method: "POST",
    url: `${apiUrl}${process.env.REACT_APP_USER_BASE_URL}/contactUs`,
    headers: {
      "Content-Type": "application/json",
    },
    data: contactDetails,
  });

  if (data.responseCode === 200) {
    dispatch({ type: contactActions.ADD_CONTACT_SUCCESS });
    resetForm();
    return toast.success(data.responseMessage);
  }

  dispatch({ type: contactActions.ADD_CONTACT_ERROR });
  return toast.error(data.responseMessage);
};

const ContactUs = () => {
  const [state, dispatch] = useReducer(contactReducer, initialState);
  const { isLoading } = state;

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const Emailregex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const initialValues = {
    name: "",
    emailId: "",
    contactNumber: "",
    message: "",
  };

  const contactUsSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .max(50, "Please enter less than 50 characters")
      .required("Name is required"),
    emailId: Yup.string()
      .trim()
      .matches(Emailregex, "Please enter valid email address")
      .min(3, "Please enter at least 3 characters")
      .max(64, "Please enter less than 64 characters")
      .required("Email is required"),
    contactNumber: Yup.string()
      .trim()
      .matches(phoneRegExp, "Please enter valid mobile number"),
    message: Yup.string().trim().required("Description is required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: contactUsSchema,
    onSubmit: async (values, { resetForm }) => {
      // API CALL
      addContactUsDetails(dispatch, values, resetForm);
      // API CALL
    },
  });

  useEffect(() => {
    window.scroll(0, 0);
  });
  return (
    <>
      <PageTitle title="Contact Us" />
      <div className="bg-white">
        <Container className="pt-80 pb-80">
          <div className="h1 pb-3 pb-md-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut cursus
            cursus condimentum malesuada.
          </div>
          <Row>
            <Col md={6}>
              <Form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <input
                    name="name"
                    type="text"
                    placeholder="Enter your name"
                    className="form-control re_inputRouded"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.name}</div>
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    name="emailId"
                    type="text"
                    placeholder="Enter your e-mail"
                    className="form-control re_inputRouded"
                    {...formik.getFieldProps("emailId")}
                  />
                  {formik.touched.emailId && formik.errors.emailId ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.emailId}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <input
                    name="contactNumber"
                    type="number"
                    placeholder="Enter your contact"
                    className="form-control re_inputRouded"
                    {...formik.getFieldProps("contactNumber")}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    placeholder="Write here something"
                    rows="7"
                    className="form-control re_inputRouded"
                    {...formik.getFieldProps("message")}
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.message}
                      </div>
                    </div>
                  ) : null}
                </div>
                <Button
                  type="submit"
                  variant="blue"
                  className="px-4"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      Submitting...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Form>
            </Col>
            <Col md={6}>
              <div
                className="re_contactImg"
                style={{ backgroundImage: `url(${img})` }}
              ></div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
export default ContactUs;

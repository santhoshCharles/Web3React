import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { Formik, Field, Form } from "formik";
import { Link, useHistory } from "react-router-dom";
import Login from "./Login";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { OtpModal } from "../../../components/otp-modal";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";

import {
  checkDuplicateAccount,
  register,
  verifyLoginSecurityCodeAsync,
  resendOtp,
} from "../redux/authApi";
import Forgot from "../pages/Forgot";

import img from "../../../assets/images/register.svg";
import Eye from "../../../assets/images/Eye.svg";
import EyeSlash from "../../../assets/images/EyeSlash.svg";

// const addBodyClass = (className) =>
//   document.body.classList.add("hideHeaderFooter");
// const removeBodyClass = (className) =>
//   document.body.classList.remove("hideHeaderFooter");

const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const Emailregex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/;

const Register = () => {
  const [referralId, setReferralId] = useState("");
  const [contactInputType, setContactInputType] = useState("mobile");
  useEffect(() => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    setReferralId(params.get("referralCode"));
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();
  //otp modal open
  const [showOtpPop, setShowOtpPop] = useState(false);
  const handleCloseOtp = () => setShowOtpPop(false);
  //login modal open
  const [showLogin, setShowLogin] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showForgot, setShowForgot] = useState(false);
  const handleCloseForgot = () => setShowForgot(false);
  const handleShowForgot = () => {
    setShowLogin(false);
    setShowForgot(true);
  };
  const { isLoading, isOtpVerified, showOtpModal } = useSelector(
    (state) => state.auth,
    shallowEqual
  );
  const { isAuthorized } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken && auth.user,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (isAuthorized && isOtpVerified) {
      history.push("/");
    }
  }, [isOtpVerified, isAuthorized]);

  const [formDetails, setFormDetails] = useState({
    contactNumber: "",
    emailId: "",
    password: "",
    firstName: "",
    confirmPassword: "",
    lastName: "",
    country: ""
  });
  const initialValues = {
    emailId: "",
    contactNumber: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    country: ""
  };
  //step
  const [showStep, setShowStep] = useState(1);

  const handleStep = (e) => setShowStep(e);
  useEffect(() => {
    if (showOtpModal && !isOtpVerified) {
      handleStep(4);
      setShowOtpPop(true);
    }
  }, [showOtpModal]);

  const step1Schema = Yup.object().shape({
    emailId: Yup.string()
      .matches(Emailregex, "Please enter valid email address")
      .min(3, "Minimum 3 symbols")
      .max(64, "Maximum 64 symbols")
      .required("Please enter email."),
    firstName: Yup.string().trim().required("Please enter first name."),
    lastName: Yup.string().trim().required("Please enter last name."),
    password: Yup.string()
      .trim()
      .matches(
        passwordRegex,
        "Password should contain min 6 and max 32 characters with atleast one Alphanumeric and special character."
      )
      .required("Please enter password."),
    confirmPassword: Yup.string()
      .trim()
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password didn't match."
      )
      .required("Please enter confirm password."),
    contactNumber: Yup.string()
      .matches(phoneRegExp, "Please enter valid mobile number.")
      .required("Please enter mobile number."),
    country: Yup.string()
      .trim()
      .min(3, "Minimum 3 symbols")
      .max(64, "Maximum 64 symbols")
      .required("Please enter country."),
  });

  const handleform1 = async (values, setErrors, resetForm) => {
    try {
      if (isValidPhoneNumber(values && values.contactNumber)) {
        setFormDetails({
          contactNumber: values.contactNumber,
          emailId: values.emailId,
        });
        dispatch(register(values, resetForm, { referralId: referralId }));
      } else {
        setErrors({ contactNumber: "Invalid contact number" });
      }
    } catch (err) {
      resetForm();
    }
  };

  const handleResendOtp = () => {
    dispatch(
      resendOtp({
        emailId: formDetails && formDetails.emailId && formDetails.emailId,
      })
    );
  };

  const handleContactNumber = (e, setFieldValue, setFieldTouched) => {
    return new Promise(async (resolve, reject) => {
      try {
        await resolve(setFieldValue("contactNumber", e));
        await resolve(setFieldTouched("contactNumber", true));
      } catch (err) {
        reject(err);
      }
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setResetPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowResetPassword = () => setResetPassword(!showResetPassword);
  return (
    <>
      <div className="bg-white">
        <Container>
          <Row className="align-items-center h-100vh pt-80 pb-80">
            <Col lg={7}>
              <img src={img} alt="img" className="w-100" />
            </Col>
            <Col lg={5} xl={4}>
              <div className="re_registerBox">
                <div className="h2 pb-4">Register</div>
                {/* <div className="re_registertabs mb-3 mb-md-4">
                  <button
                    type="button"
                    className={showStep === 1 ? "active" : ""}
                    onClick={() => handleStep(1)}
                  >
                    Email
                  </button>
                  <button
                    type="button"
                    className={showStep === 2 ? "active" : ""}
                    onClick={() => handleStep(2)}
                  >
                    Mobile
                  </button>
                </div> */}

                <Formik
                  initialValues={initialValues}
                  validationSchema={step1Schema}
                  onSubmit={(values, { setErrors, resetForm }) =>
                    handleform1(values, setErrors, resetForm)
                  }
                >
                  {({
                    handleChange,
                    touched,
                    handleBlur,
                    values,
                    errors,
                    setFieldValue,
                    setFieldTouched,
                  }) => (
                    <Form>
                      <div className="form-group">
                        <div className="p3 mb-2">First Name</div>
                        <div className="position-relative">
                          <Field
                            type="text"
                            placeholder="First Name"
                            className={
                              errors.firstName && touched.firstName
                                ? "form-control re_inputRouded is-invalid"
                                : "form-control re_inputRouded"
                            }
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                          />
                          {touched.firstName && errors.firstName ? (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block text-danger">
                                {errors.firstName}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="p3 mb-2">Last Name</div>
                        <div className="position-relative">
                          <Field
                            type="text"
                            placeholder="Last Name"
                            className={
                              errors.lastName && touched.lastName
                                ? "form-control re_inputRouded is-invalid"
                                : "form-control re_inputRouded "
                            }
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                          />
                          {touched.lastName && errors.lastName ? (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block text-danger">
                                {errors.lastName}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="p3 mb-2">Enter email</div>
                        <Field
                          type="text"
                          placeholder="Enter your email"
                          className={
                            errors.emailId && touched.emailId
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded "
                          }
                          name="emailId"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.emailId}
                        />
                        {touched.emailId && errors.emailId ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">
                              {errors.emailId}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <div className="p3 mb-2">Enter mobile</div>
                        <PhoneInput
                          placeholder="Enter your mobile"
                          className="form-control d-flex re_inputRouded"
                          // defaultCountry="US"
                          value={values && values.contactNumber}
                          onKeyDown={(e) => {
                            if (
                              (e.key.length === 1 &&
                                e.key.match(
                                  /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/
                                ) !== false) ||
                              null
                            ) {
                              setContactInputType("email");
                            }
                          }}
                          onChange={(e) => {
                            handleContactNumber(
                              e,
                              setFieldValue,
                              setFieldTouched
                            );
                          }}
                          error={
                            values && values.contactNumber
                              ? isValidPhoneNumber(values.contactNumber)
                                ? undefined
                                : "Invalid phone number"
                              : "Phone number required"
                          }
                        />

                        {touched &&
                          touched.contactNumber &&
                          errors.contactNumber ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {errors.contactNumber}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <div className="p3 mb-2">Create Password</div>
                        <div className="position-relative">
                          <Field
                            type={showPassword ? "text" : "password"}
                            placeholder="Create Password"
                            className={
                              errors.password && touched.password
                                ? "form-control re_inputRouded "
                                : "form-control re_inputRouded"
                            }
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <button
                            type="button"
                            className="btn btn-link re_passwordShow p-0"
                            onClick={handleShowPassword}
                          >
                            <img
                              src={showPassword ? Eye : EyeSlash}
                              alt="Eye"
                            />
                          </button>
                        </div>
                        {touched.password && errors.password ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">
                              {errors.password}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <div className="form-group">
                        <div className="p3 mb-2">Confirm Password</div>
                        <div className="position-relative">
                          <Field
                            type={showResetPassword ? "text" : "password"}
                            placeholder="Confirm password"
                            className={
                              errors.confirmPassword && touched.confirmPassword
                                ? "form-control re_inputRouded"
                                : "form-control re_inputRouded "
                            }
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                          />
                          <button
                            type="button"
                            className="btn btn-link re_passwordShow p-0"
                            onClick={handleShowResetPassword}
                          >
                            <img
                              src={showResetPassword ? Eye : EyeSlash}
                              alt="Eye"
                            />
                          </button>
                        </div>
                        {touched.confirmPassword && errors.confirmPassword ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">
                              {errors.confirmPassword}
                            </div>
                          </div>
                        ) : null}
                      </div>


                      <div className="form-group">
                        <div className="p3 mb-2">Enter country</div>
                        <Field
                          type="text"
                          placeholder="Enter your country"
                          className={
                            errors.country && touched.country
                              ? "form-control re_inputRouded is-invalid"
                              : "form-control re_inputRouded "
                          }
                          name="country"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.country}
                        />
                        {touched.country && errors.country ? (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block text-danger">
                              {errors.country}
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <Button
                        variant="blue"
                        className="w-100 mt-2"
                        type="submit"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            Signing up...
                            <img
                              src={LoadingImage}
                              alt="LoadingImage"
                              width="20px"
                              className="ml-2"
                            />
                          </>
                        ) : (
                          "Sign Up"
                        )}
                      </Button>
                      {/* <Button
                        variant="blue"
                        className="w-100 mt-2"
                        type="submit"
                      >
                        Sign Up
                      </Button> */}
                      <div className="p3 pt-4 d-flex justify-content-center align-items-center">
                        Already have account?
                        <Button
                          variant="link"
                          className="ml-2 p-0 m-0"
                          onClick={handleShowLogin}
                        >
                          Login here
                        </Button>
                        <Login
                          showLogin={showLogin}
                          handleShowForgot={handleShowForgot}
                          handleCloseLogin={handleCloseLogin}
                        />
                      </div>
                    </Form>
                  )}
                </Formik>

                <Modal show={showOtpPop} onHide={handleCloseOtp} centered>
                  <Modal.Header className="px-4 pb-0 border-0" closeButton>
                    <div className="h2 py-2">OTP</div>
                  </Modal.Header>
                  <Modal.Body className="p-4">
                    <OtpModal
                      handleResendOtp={handleResendOtp}
                      verifyLoginSecurityCodeAsync={
                        verifyLoginSecurityCodeAsync
                      }
                      referralId={referralId}
                      firstTimeLoginMessage={true}
                    />
                  </Modal.Body>
                </Modal>
              </div>
            </Col>
          </Row>
          <Forgot
            showForgot={showForgot}
            handleCloseForgot={handleCloseForgot}
          />
        </Container>
      </div>
    </>
  );
};
export default Register;

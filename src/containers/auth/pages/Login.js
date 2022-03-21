import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  loginAsync,
  verifyLoginSecurityCodeAsync,
  resendOtp,
} from "../redux/authApi";
import { AuthActions } from "../redux/authAction";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { OtpModal } from "../../../components/otp-modal";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

const Login = (props) => {
  const history = useHistory();
  const [showOTP, setShowOTP] = useState(false);
  const [contactInputType, setContactInputType] = useState("mobile");
  const dispatch = useDispatch();
  const mailFormat =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))|([0-9]{10})+$/;

  const { isAuthorized, isLoading, isOtpVerified, user } = useSelector(
    ({ auth }) => ({
      isAuthorized: auth.authToken && auth.user,
      tokenVerified: auth.tokenVerified,
      flashMessage: auth.flashMessage,
      isLoading: auth.isLoading,
      isOtpVerified: auth.isOtpVerified,
      user: auth.user,
    }),
    shallowEqual
  );
  /* useEffect(() => {
    //console.log(isAuthorized);
    if (isAuthorized) {
      history.push("/");
      //setShowOTP(false);
    }
  }, [isAuthorized]); */
  useEffect(() => {
    //console.log({user, isOtpVerified, email: formik.values.emailId});
    if (
      user !== null &&
      isOtpVerified !== null &&
      formik.values.emailId !== ""
    ) {
      setShowOTP(true);
      //formik.values.emailId = "";
    } else {
      setShowOTP(false);
    }
  }, [user, isOtpVerified]);
  const initialValues = {
    emailId: "",
    password: "",
  };

  const LoginSchema = Yup.object().shape({
    emailId: Yup.string()
      .matches(mailFormat, "Please enter valid email address/mobile number")
      .required("Email address/mobile number is required."),
    password: Yup.string()
      .trim()
      .matches(/^(?!\s*$).+/, "Please enter valid password")
      .min(6, "Please enter valid password")
      .max(32, "Please enter valid password")
      .required("Password is required"),
  });

  const getInputClasses = (fieldname) => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }
    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }
    return "";
  };

  useEffect(() => {
    return () => {
      setContactInputType("mobile");
    };
  }, []);

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values, { setStatus, setFieldError }) => {
      const LoginDetail = {};
      const Emailregex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (Emailregex.test(String(values.emailId).toLowerCase())) {
        LoginDetail.emailId = values.emailId;
        LoginDetail.password = values.password;
      } else {
        if (values.emailId.length <= 7 || values.emailId.length >= 15) {
          return setFieldError("emailId", "Please enter valid mobile number");
        }
        LoginDetail.contactNumber = values.emailId;
        LoginDetail.password = values.password;
      }
      try {
        dispatch(loginAsync(LoginDetail));
      } catch (error) {
        setStatus(
          "Invalid Login Details"
          // intl.formatMessage({
          //     id: "AUTH.VALIDATION.INVALID_LOGIN",
          // })
        );
      }
    },
  });
  const handleResendOtp = () => {
    if (contactInputType === "mobile") {
      dispatch(
        resendOtp({
          contactNumber: formik && formik.values && formik.values.emailId,
        })
      );
    } else {
      dispatch(
        resendOtp({
          emailId: formik && formik.values && formik.values.emailId,
        })
      );
    }
  };
  const handleContactNumber = (e) => {
    return new Promise(async (resolve, reject) => {
      try {
        await resolve(formik.setFieldValue("emailId", e));
        await resolve(formik.setFieldTouched("emailId", true));
      } catch (err) {
        reject(err);
      }
    });
  };
  const handleCloseLogin = () => {
    formik.resetForm();
    dispatch(AuthActions.resetAuth());
    props.handleCloseLogin();
  };
  return (
    <>
      <Modal show={props.showLogin} onHide={handleCloseLogin} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">Login</div>
        </Modal.Header>
        <Modal.Body className="p-4">
          {!showOTP && (
            <Form onSubmit={formik.handleSubmit}>
              {contactInputType === "email" ? (
                <Form.Group>
                  <div className="p3 mb-2">Enter Email/Mobile</div>

                  <input
                    type="email"
                    placeholder="Enter your email/mobile"
                    className={`form-control re_inputRouded ${getInputClasses(
                      "emailId"
                    )}`}
                    autoFocus={true}
                    name="emailId"
                    onChange={(e) => {
                      formik.setFieldValue("emailId", e.target.value);
                    }}
                    onKeyUp={(e) => {
                      if (
                        formik.values &&
                        formik.values.emailId &&
                        formik.values.emailId.match(/^[0-9+]+$/)
                      ) {
                        setContactInputType("mobile");
                      }
                    }}
                    value={formik.values.emailId}
                    // {...formik.getFieldProps("emailId")}
                  />
                  {formik.touched.emailId && formik.errors.emailId ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block text-danger">
                        {formik.errors.emailId}
                      </div>
                    </div>
                  ) : null}
                </Form.Group>
              ) : (
                <>
                  <Form.Group>
                    <div className="p3 mb-2">Enter Email/Mobile</div>
                    <PhoneInput
                      placeholder="Enter your email/mobile"
                      className={`form-control d-flex re_inputRouded ${getInputClasses(
                        "emailId"
                      )}`}
                      // defaultCountry="US"
                      value={formik.values && formik.values.emailId}
                      prefix={null}
                      onKeyDown={(e) => {
                        if (
                          e.key.length === 1 &&
                          e.key.match(
                            /^[a-zA-Z!@#$%^&*()_\-=\[\]{};':"\\|,.<>\/?]*$/
                          )
                        ) {
                          // handleContactNumber(
                          //   formik.values.emailId
                          //     ? formik.values.emailId + e.key
                          //     : e.key
                          // );
                          // formik.setFieldValue(
                          //   "emailId",
                          //   formik.values.emailId
                          //     ? formik.values.emailId + e.key
                          //     : e.key
                          // );
                          setContactInputType("email");
                        }
                      }}
                      autoFocus={true}
                      onChange={(e) => {
                        handleContactNumber(e);
                      }}
                      error={
                        formik.values && formik.values.contactNumber
                          ? isValidPhoneNumber(formik.values.contactNumber)
                            ? undefined
                            : "Invalid phone number"
                          : "Phone number required"
                      }
                    />

                    {formik.touched.emailId && formik.errors.emailId ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {formik.errors.emailId}
                        </div>
                      </div>
                    ) : null}
                  </Form.Group>
                </>
              )}

              <Form.Group>
                <div className="p3 mb-2">Enter Password</div>
                <input
                  type="password"
                  placeholder="Enter password"
                  className={`form-control re_inputRouded ${getInputClasses(
                    "password"
                  )}`}
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block text-danger">
                      {formik.errors.password}
                    </div>
                  </div>
                ) : null}
              </Form.Group>
              <Form.Group className="d-flex justify-content-between align-items-center">
                <label className="re_checkbox">
                  <input type="checkbox" />
                  <span>Keep me logged in</span>
                </label>
                {/* <Form.Check type="checkbox" label="Keep me logged in" /> */}
                <Button variant="link-md" onClick={props.handleShowForgot}>
                  Forgot Password?
                </Button>
              </Form.Group>
              <Button
                variant="blue"
                type="submit"
                disabled={isLoading}
                className={`w-100 ${!isLoading ? "defwtarw" : "defwtarwmw"}`}
                // onClick={handleLogin}
              >
                Next
              </Button>
              {props.link && (
                <div className="p3 pt-4 text-center">
                  Don't have account?
                  <Link
                    onClick={handleCloseLogin}
                    to="/register"
                    className="color_blue ml-2"
                  >
                    Register now
                  </Link>
                </div>
              )}
            </Form>
          )}
          {showOTP && (
            <OtpModal
              handleResendOtp={handleResendOtp}
              verifyLoginSecurityCodeAsync={verifyLoginSecurityCodeAsync}
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Login;

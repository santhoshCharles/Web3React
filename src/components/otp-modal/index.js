import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { OtpTimer } from "../otp-timer/index";
import { useFormik } from "formik";
import * as Yup from "yup";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import { useSelector, shallowEqual } from "react-redux";

import { useDispatch } from "react-redux";
export const OtpModal = (props) => {
  const [isExpired, setIsExpired] = useState(false);
  const { isOtpLoading } = useSelector((state) => state.auth, shallowEqual);

  const dispatch = useDispatch();
  const { handleResendOtp, verifyLoginSecurityCodeAsync, referralId } = props;
  const initialValues = {
    otp: "",
  };

  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Please enter OTP")
      .min(4, "Please enter valid OTP")
      .max(6, "Please enter valid OTP"),
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
  const formik = useFormik({
    initialValues,
    validationSchema: OtpSchema,
    onSubmit: (values) => {
      try {
        if (props && props.firstTimeLoginMessage === true) {
          dispatch(
            verifyLoginSecurityCodeAsync(
              values?.otp,
              props.firstTimeLoginMessage,
              referralId
            )
          );
        } else {
          dispatch(verifyLoginSecurityCodeAsync(values?.otp));
        }
      } catch (error) {}
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group>
        <div className="p3 mb-2">Enter OTP</div>
        <Form.Control
          type="number"
          placeholder="Enter your OTP"
          disabled={isExpired}
          name="otp"
          className={`form-control re_inputRouded ${getInputClasses("otp")}`}
          {...formik.getFieldProps("otp")}
        />
        {formik.touched.otp && formik.errors.otp ? (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block text-danger">{formik.errors.otp}</div>
          </div>
        ) : null}
      </Form.Group>
      <div className="p4 color_gray pb-4 ">
        Please enter OTP, we have sent you on your registered email/mobile
        number.
      </div>
      {/* <Button
        variant="blue"
        className="w-100"
        // onClick={onBtnClick}
        type="submit"
      >
        Login
      </Button> */}

      <Button
        variant="blue"
        disabled={isExpired || isOtpLoading}
        className="w-100"
        type="submit"
        // disabled={isOtpLoading}
      >
        {isOtpLoading ? (
          <>
            Logging in...
            <img
              src={LoadingImage}
              alt="LoadingImage"
              width="20px"
              className="ml-2"
            />
          </>
        ) : (
          "Login"
        )}
      </Button>
      <OtpTimer
        seconds={120}
        handleResendOtp={handleResendOtp}
        setIsExpired={setIsExpired}
      />
    </Form>
  );
};

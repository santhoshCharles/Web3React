import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { forgotPasswordAsync } from "../redux/authApi";

const Forgot = (props) => {
  const Emailregex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const initialValues = {
    emailId: "",
  };
  const dispatch = useDispatch();
  const emailSchema = Yup.object().shape({
    emailId: Yup.string()
      .matches(Emailregex, "Please enter valid email address")
      .min(3, "Minimum 3 symbols")
      .max(64, "Maximum 64 symbols")
      .required("Please enter email."),
  });
  useEffect(() => {
    return () => {
      formik.values = {};
    };
  }, []);

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
    validationSchema: emailSchema,
    onSubmit: (values, { setStatus, setFieldError, resetForm }) => {
      try {
        dispatch(forgotPasswordAsync(values, props.handleCloseForgot));
        resetForm();
        // props.handleCloseForgot();
      } catch (error) {
        props.handleCloseForgot();
      }
    },
  });
  const handleClose = () => {
    formik.resetForm();
    props.handleCloseForgot();
  };
  return (
    <>
      <Modal show={props.showForgot} onHide={handleClose} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">Forgot Password</div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <div className="p3 mb-2">Enter email</div>
              <input
                type="email"
                placeholder="Enter your email"
                className={`form-control re_inputRouded ${getInputClasses(
                  "emailId"
                )}`}
                name="emailId"
                {...formik.getFieldProps("emailId")}
              />
              {formik.touched.emailId && formik.errors.emailId ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block text-danger">
                    {formik.errors.emailId}
                  </div>
                </div>
              ) : null}
            </Form.Group>
            <div className="p4 color_gray pb-4">
              We will send you reset pass word link to your registered email.
            </div>
            <Button variant="blue" className="w-100" type="submit">
              Continue
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Forgot;

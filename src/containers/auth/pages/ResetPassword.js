import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { resetPasswordAsync } from "../redux/authApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showCreatePassword, setShowCreatePassword] = useState(true);

  const { isPasswordReset, isAuthorized } = useSelector(
    ({ auth }) => ({
      isLoading: auth.isLoading,
      isAuthorized: auth.authToken && auth.user,
      isPasswordReset: auth.isPasswordReset,
    }),
    shallowEqual
  );
  const handleCloseCreatePassword = () => {
    if (isAuthorized && isPasswordReset) {
      formik.resetForm();
      setShowCreatePassword(false);
      return history.push("/");
    }
  };

  const initialValues = {
    newPassword: "",
    oldPassword: "",
  };
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/;

  const validateSchema = Yup.object().shape({
    newPassword: Yup.string()
      .trim()
      .matches(
        passwordRegex,
        "Password should contain min 6 and max 32 characters with atleast one Alphanumeric and special character."
      )
      .required("Please enter password."),
    oldPassword: Yup.string().trim().required("Please enter confirm password."),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validateSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      dispatch(resetPasswordAsync(values));
    },
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
  return (
    <>
      <Modal
        show={showCreatePassword}
        onHide={handleCloseCreatePassword}
        centered
      >
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">Reset Password</div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <div className="p3 mb-2">Old Password</div>
              <input
                type="password"
                placeholder="Old Password"
                className={`form-control re_inputRouded ${getInputClasses(
                  "oldPassword"
                )}`}
                name="oldPassword"
                {...formik.getFieldProps("oldPassword")}
              />
              {formik.touched.oldPassword && formik.errors.oldPassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block text-danger">
                    {formik.errors.oldPassword}
                  </div>
                </div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <div className="p3 mb-2">New Password</div>
              <input
                type="password"
                placeholder="New Password"
                className={`form-control re_inputRouded ${getInputClasses(
                  "newPassword"
                )}`}
                name="newPassword"
                {...formik.getFieldProps("newPassword")}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block text-danger">
                    {formik.errors.newPassword}
                  </div>
                </div>
              ) : null}
            </Form.Group>
            <Button variant="blue" className="w-100" type="submit">
              Reset
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ResetPassword;

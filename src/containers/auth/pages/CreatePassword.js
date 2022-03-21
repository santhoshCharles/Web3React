import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { setNewPasswordAsync } from "../redux/authApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const CreatePassword = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const handleCloseCreatePassword = () => {
    formik.resetForm();
    setShowCreatePassword(false);
    return history.push("/");
  };
  const { newPasswordSet } = useSelector(
    ({ auth }) => ({
      isLoading: auth.isLoading,
      newPasswordSet: auth.newPasswordSet,
    }),
    shallowEqual
  );
  useEffect(() => {
    if (params && params.resetCode && !newPasswordSet) {
      setShowCreatePassword(true);
    } else {
      return history.push("/");
    }
  }, [params]);
  useEffect(() => {
    if (newPasswordSet) {
      history.push("/");
    }
  }, [newPasswordSet]);
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/;

  const validateSchema = Yup.object().shape({
    password: Yup.string()
      .trim()
      .matches(
        passwordRegex,
        "Password should contain min 6 and max 32 characters with atleast one Alphanumeric and special character."
      )
      .required("Please enter a new password."),
    confirmPassword: Yup.string()
      .trim()
      .oneOf(
        [Yup.ref("password"), null],
        "Password and confirm password didn't match"
      )
      .required("Please enter confirm password."),
  });
  const formik = useFormik({
    initialValues,
    validationSchema: validateSchema,
    onSubmit: (values, { setStatus, setFieldError }) => {
      values.resetToken = params && params.resetCode;
      try {
        dispatch(setNewPasswordAsync(values));
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
          <div className="h2 py-2">Create Password</div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <div className="p3 mb-2">Generate new Password</div>
              <input
                type="password"
                placeholder="Enter new Password"
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
            <Form.Group>
              <div className="p3 mb-2">Confirm Password</div>
              <input
                type="password"
                placeholder="Confirm Password"
                className={`form-control re_inputRouded ${getInputClasses(
                  "confirmPassword"
                )}`}
                name="confirmPassword"
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block text-danger">
                    {formik.errors.confirmPassword}
                  </div>
                </div>
              ) : null}
            </Form.Group>
            <Button variant="blue" className="w-100" type="submit">
              Next
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default CreatePassword;

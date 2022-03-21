import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateEmailRequestAsync } from "../../containers/Settings/pages/redux/profileApi";

const Emailregex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EmailSchema = () =>
  Yup.object().shape({
    emailId: Yup.string()
      .trim()
      .min(7, "Please enter valid email")
      .matches(Emailregex, "Invalid email format")
      .required("Email is required"),
    code: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Please enter code")
      .min(4, "Please enter valid code")
      .max(6, "Please enter valid code"),
  });

const ProfileVerifyModal = (props) => {
  const dispatch = useDispatch();

  const { profileEmailChangeModal, onCloseChangeModal, emailId } = props;

  const changeEmailRequest = (values) => {
    dispatch(updateEmailRequestAsync(values));
  };

  return (
    <>
      <Modal
        show={profileEmailChangeModal}
        onHide={onCloseChangeModal}
        centered
      >
        <Modal.Body>
          <Formik
            initialValues={{
              emailId: emailId || "",
              code: "",
            }}
            validationSchema={EmailSchema}
            onSubmit={(values) => {
              changeEmailRequest(values);
            }}
          >
            {({ handleSubmit, touched, errors }) => (
              <>
                <Form
                  className="form def_form frmwtpddng"
                  onSubmit={handleSubmit}
                >
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="form-label">Verification Code</label>
                      <Field
                        type="text"
                        name="code"
                        className="form-control wth_chng"
                        placeholder="OTP"
                        label="Verification Code"
                      />
                      {touched.code && errors.code ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block text-danger">
                            {errors.code}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-center align-items-center mb-0">
                    <button
                      type="button"
                      className="btn btn-def btn_pdng mr-3"
                      onClick={onCloseChangeModal}
                    >
                      Keep
                    </button>
                    <button
                      type="submit"
                      className="btn btn-def defpddng"
                      //   onClick={() => handleSubmit()}
                    >
                      <span>Verify</span>
                    </button>
                  </div>
                </Form>
              </>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileVerifyModal;

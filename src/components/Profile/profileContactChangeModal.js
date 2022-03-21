import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { updateContactRequestAsync } from "../../containers/Settings/pages/redux/profileApi";

const EmailSchema = () =>
  Yup.object().shape({
    contactNumber: Yup.number().required("Contact Number is required "),
    code: Yup.string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .required("Please enter code")
      .min(4, "Please enter valid code")
      .max(6, "Please enter valid code"),
  });

const ProfileContactChange = (props) => {
  const dispatch = useDispatch();

  const {
    profileContactChangeModal,
    onCloseContactChangeModal,
    contactNumber,
  } = props;

  const changeEmailRequest = (values) => {
    dispatch(updateContactRequestAsync(values));
  };

  return (
    <>
      <Modal
        show={profileContactChangeModal}
        onHide={onCloseContactChangeModal}
        centered
      >
        <Modal.Body>
          <Formik
            initialValues={{
              contactNumber: contactNumber || "",
              code: "",
            }}
            validationSchema={EmailSchema}
            onSubmit={(values) => {
              changeEmailRequest(values);
            }}
          >
            {({ handleSubmit, errors, touched }) => (
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
                      onClick={onCloseContactChangeModal}
                    >
                      Keep
                    </button>
                    <button
                      type="submit"
                      className="btn btn-def defpddng"
                      //   onClick={() => handleSubmit}
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

export default ProfileContactChange;

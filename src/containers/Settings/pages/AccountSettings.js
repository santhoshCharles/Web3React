import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import ModalYesNo from "../../../components/Modal/ModalYesNo";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import PencilWhite from "../../../assets/images/PencilWhite.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import ProfileVerifyModal from "../../../components/Profile/profileEmailVerifyModal";
import ProfileContactChange from "../../../components/Profile/profileContactChangeModal";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ProfileActions } from "./redux/profileAction";
import {
  changeEmailRequestAsync,
  updateUserProfileAsync,
  resetPasswordAsync,
  changeContactRequestAsync,
} from "./redux/profileApi";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
const phoneRegExp =
  /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;
const Emailregex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,32}$/;

const AccountSettings = () => {
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const { user } = useSelector((state) => state.auth);
  const { profileEmailChangeModal, profileContactChangeModal, isLoading } =
    useSelector((state) => state.profile, shallowEqual);

  const onCloseChangeModal = () => {
    dispatch(ProfileActions.closeChangeModal());
  };

  const onCloseContactChangeModal = () => {
    dispatch(ProfileActions.closeContactChangeModal());
  };

  const handleContactNumber = (e) => {
    return new Promise(async (resolve, reject) => {
      try {
        await resolve(ContactDetailformik.setFieldValue("contactNumber", e));
        await resolve(
          ContactDetailformik.setFieldTouched("contactNumber", true)
        );
      } catch (err) {
        reject(err);
      }
    });
  };

  // formik for chaning basic profile details
  const initialAccountDetails = {
    fullName: user.fullName || "",
    twitterURL: user.twitterURL || "",
    linkedIn: user.linkedIn || "",
    githubURL: user.githubURL || "",
  };

  const accountDetailsSchema = Yup.object().shape({
    fullName: Yup.string().trim().required("Please enter fullName."),
    twitterURL: Yup.string()
      .trim()
      .url("Please enter valid link. example:'https://www.example.com/'"),
    linkedIn: Yup.string()
      .trim()
      .url("Please enter valid link. example:'https://www.example.com/'"),
    githubURL: Yup.string()
      .trim()
      .url("Please enter valid link. example:'https://www.example.com/'"),
  });

  const AccountDetailformik = useFormik({
    initialValues: initialAccountDetails,
    validationSchema: accountDetailsSchema,
    onSubmit: (values) => {
      dispatch(updateUserProfileAsync(values));
    },
  });

  const getInputClasses = (fieldname) => {
    if (
      AccountDetailformik.touched[fieldname] &&
      AccountDetailformik.errors[fieldname]
    ) {
      return "is-invalid";
    }
    if (
      AccountDetailformik.touched[fieldname] &&
      !AccountDetailformik.errors[fieldname]
    ) {
      return "is-valid";
    }
    return "";
  };

  // formik for changing contact information

  const initialContactDetails = {
    contactNumber: user.contactNumber || "",
    emailId: user.emailId || "",
    oldEmail: user.emailId || "",
    oldNumber: user.contactNumber || "",
  };

  const getContactInputClasses = (fieldname) => {
    if (
      ContactDetailformik.touched[fieldname] &&
      ContactDetailformik.errors[fieldname]
    ) {
      return "is-invalid";
    }
    if (
      ContactDetailformik.touched[fieldname] &&
      !ContactDetailformik.errors[fieldname]
    ) {
      return "is-valid";
    }
    return "";
  };

  const contactSchema = Yup.object().shape({
    emailId: Yup.string()
      .matches(Emailregex, "Please enter valid email address")
      .min(3, "Minimum 3 symbols")
      .max(64, "Maximum 64 symbols")
      .required("Please enter email."),
    contactNumber: Yup.string()
      .matches(phoneRegExp, "Please enter valid mobile number.")
      .required("Please enter mobile number."),
  });

  const ContactDetailformik = useFormik({
    initialValues: initialContactDetails,
    validationSchema: contactSchema,
    onSubmit: (values) => {
      console.log({ values });
    },
  });

  // formik for resetting password

  const getResetPasswordInputClasses = (fieldname) => {
    if (
      resetPasswordformik.touched[fieldname] &&
      resetPasswordformik.errors[fieldname]
    ) {
      return "is-invalid";
    }
    if (
      resetPasswordformik.touched[fieldname] &&
      !resetPasswordformik.errors[fieldname]
    ) {
      return "is-valid";
    }
    return "";
  };

  const resetPasswordInitialValues = {
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
  };
  const resetPasswordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .trim()
      .matches(
        passwordRegex,
        "Password should contain min 6 and max 32 characters with atleast one Alphanumeric and special character."
      )
      .required("Please enter old password."),
    newPassword: Yup.string()
      .trim()
      .matches(
        passwordRegex,
        "Password should contain min 6 and max 32 characters with atleast one Alphanumeric and special character."
      )
      .required("Please enter new password."),
    confirmPassword: Yup.string()
      .trim()
      .oneOf(
        [Yup.ref("newPassword"), null],
        " New Password and confirm password didn't match."
      )
      .required("Please enter confirm password."),
  });

  const resetPasswordformik = useFormik({
    initialValues: resetPasswordInitialValues,
    validationSchema: resetPasswordSchema,
    onSubmit: (values, { resetForm }) => {
      resetPassword(values);
      resetForm();
    },
  });

  const changeEmailRequest = () => {
    dispatch(
      changeEmailRequestAsync({ emailId: ContactDetailformik.values.emailId })
    );
  };

  const resetPassword = (values) => {
    dispatch(
      resetPasswordAsync({
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })
    );
  };

  const changeContactRequest = () => {
    dispatch(
      changeContactRequestAsync({
        contactNumber: ContactDetailformik.values.contactNumber,
      })
    );
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      <Container className="shadowBox radius-top-0 bg-white">
        <Form onSubmit={AccountDetailformik.handleSubmit}>
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between pb-2 pb-lg-0">
              <div className="h3 pb-3">Account Details</div>

              <Button
                type="submit"
                variant="blue"
                className="w-124px"
                disabled={
                  JSON.stringify(initialAccountDetails) ===
                  JSON.stringify(AccountDetailformik.values)
                }
              >
                <img src={PencilWhite} alt="edit" className="mr-2" />
                Update
              </Button>
            </div>
            <Col md={12} lg={9}>
              <Row>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      className={`form-control re_inputRouded ${getInputClasses(
                        "fullName"
                      )}`}
                      name="fullName"
                      {...AccountDetailformik.getFieldProps("fullName")}
                    />
                    {AccountDetailformik.touched.fullName &&
                    AccountDetailformik.errors.fullName ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {AccountDetailformik.errors.fullName}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Email"
                      className={`form-control re_inputRouded ${getContactInputClasses(
                        "emailId"
                      )}`}
                      name="emailId"
                      {...ContactDetailformik.getFieldProps("emailId")}
                    />
                    {ContactDetailformik.values.emailId !==
                      ContactDetailformik.values.oldEmail &&
                      !("emailId" in ContactDetailformik.errors) && (
                        <button
                          type="button"
                          className="btn btn-blue mt-2 w-124px"
                          onClick={() => changeEmailRequest()}
                        >
                          VERIFY EMAIL
                        </button>
                      )}
                    {ContactDetailformik.touched.emailId &&
                    ContactDetailformik.errors.emailId ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {ContactDetailformik.errors.emailId}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <PhoneInput
                      placeholder="Enter your mobile"
                      className={`form-control d-flex re_inputRouded ${getContactInputClasses(
                        "contactNumber"
                      )}`}
                      defaultCountry="US"
                      value={ContactDetailformik.values.contactNumber}
                      onChange={(e) => handleContactNumber(e)}
                      error={
                        ContactDetailformik.values.contactNumber
                          ? isValidPhoneNumber(
                              ContactDetailformik.values.contactNumber
                            )
                            ? undefined
                            : "Invalid phone number"
                          : "Phone number required"
                      }
                    />

                    {ContactDetailformik.values.contactNumber !==
                      ContactDetailformik.values.oldNumber &&
                      !("contactNumber" in ContactDetailformik.errors) && (
                        <button
                          type="button"
                          className="btn btn-blue mt-2 w-124px"
                          onClick={() => changeContactRequest()}
                        >
                          VERIFY CONTACT NUMBER
                        </button>
                      )}
                    {ContactDetailformik.touched.contactNumber &&
                    ContactDetailformik.errors.contactNumber ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {ContactDetailformik.errors.contactNumber}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="h3 pb-3">Social Links</div>
            </div>
            <Col md={12} lg={9}>
              <Row>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Twitter Link"
                      className={`form-control re_inputRouded`}
                      name="twitterURL"
                      {...AccountDetailformik.getFieldProps("twitterURL")}
                    />
                    {AccountDetailformik.touched.twitterURL &&
                    AccountDetailformik.errors.twitterURL ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {AccountDetailformik.errors.twitterURL}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Linkedin Link"
                      className={`form-control re_inputRouded`}
                      name="linkedIn"
                      {...AccountDetailformik.getFieldProps("linkedIn")}
                    />
                    {AccountDetailformik.touched.linkedIn &&
                    AccountDetailformik.errors.linkedIn ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {AccountDetailformik.errors.linkedIn}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Github Link"
                      className={`form-control re_inputRouded ${getInputClasses(
                        "githubURL"
                      )}`}
                      name="githubURL"
                      {...AccountDetailformik.getFieldProps("githubURL")}
                    />
                    {AccountDetailformik.touched.githubURL &&
                    AccountDetailformik.errors.githubURL ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {AccountDetailformik.errors.githubURL}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </Form>
        <Form onSubmit={resetPasswordformik.handleSubmit}>
          <div className="row">
            <div className="col-12 d-flex align-items-center justify-content-between pb-2 pb-lg-0">
              <div className="h3 pb-3">Change Password</div>
              <Button type="submit" variant="blue" className="w-124px">
                <img src={PencilWhite} alt="edit" className="mr-2" />
                Change Password
              </Button>
            </div>
            {/* <div className="h3 pb-3">Change Password</div> */}

            <Col md={12} lg={9}>
              <Row>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="Old Password"
                      className={`form-control re_inputRouded ${getResetPasswordInputClasses(
                        "oldPassword"
                      )}`}
                      name="oldPassword"
                      {...resetPasswordformik.getFieldProps("oldPassword")}
                    />
                    {resetPasswordformik.touched.oldPassword &&
                    resetPasswordformik.errors.oldPassword ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {resetPasswordformik.errors.oldPassword}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="password"
                      placeholder="New Password"
                      className={`form-control re_inputRouded ${getResetPasswordInputClasses(
                        "newPassword"
                      )}`}
                      name="newPassword"
                      {...resetPasswordformik.getFieldProps("newPassword")}
                    />
                    {resetPasswordformik.touched.newPassword &&
                    resetPasswordformik.errors.newPassword ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {resetPasswordformik.errors.newPassword}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={6} lg={4}>
                  <div className="form-group">
                    <input
                      type="password"
                      className={`form-control re_inputRouded ${getResetPasswordInputClasses(
                        "confirmPassword"
                      )}`}
                      placeholder="Confirm New Password"
                      name="confirmPassword"
                      {...resetPasswordformik.getFieldProps("confirmPassword")}
                    />
                    {resetPasswordformik.touched.confirmPassword &&
                    resetPasswordformik.errors.confirmPassword ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block text-danger">
                          {resetPasswordformik.errors.confirmPassword}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </Form>

        {/* <div className="h3 pb-3">Account Financials</div>
        <div className="d-flex align-items-center justify-content-between pb-2">
          <div className="p3 color_gray">Export Earnings (25)</div>
          <Button variant="blue" className="w-124px">
            Export
          </Button>
        </div>
        <div className="d-flex align-items-center justify-content-between pb-4">
          <div className="p3 color_gray">Export Spending (25)</div>
          <Button variant="blue" className="w-124px">
            Export
          </Button>
        </div> */}
        {/* <div className="h3 pb-3">Account Preferences</div>
        <div className="d-flex align-items-center justify-content-between pb-4">
          <div className="p3 color_gray">Delete My Account</div>
          <Button
            variant="outline-black"
            className="w-124px"
            onClick={handleShowDelete}
          >
            Delete
          </Button>
          <ModalYesNo
            show={showDelete}
            handleClose={handleCloseDelete}
            text="Are you sure want to Delete ?"
            subText="Please confirm with us to continue"
          />
        </div> */}
        <ProfileVerifyModal
          profileEmailChangeModal={profileEmailChangeModal}
          onCloseChangeModal={onCloseChangeModal}
          emailId={ContactDetailformik.values.emailId}
        />
        <ProfileContactChange
          profileContactChangeModal={profileContactChangeModal}
          onCloseContactChangeModal={onCloseContactChangeModal}
          contactNumber={ContactDetailformik.values.contactNumber}
        />
      </Container>
    </>
  );
};
export default AccountSettings;

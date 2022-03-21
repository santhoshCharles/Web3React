import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addEmployeementAsync,
  updateEmployeementAsync,
} from "../redux/userProfileApi";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const AddEmployment = (props) => {
  const dispatch = useDispatch();

  const { selectedEmployeement, isLoading } = useSelector(
    (state) => state.userProfile,
    shallowEqual
  );

  const initialValues = {
    designation: selectedEmployeement.designation || "",
    company: selectedEmployeement.company || "",
    startDate: selectedEmployeement.startDate || "",
    endDate: selectedEmployeement.endDate || "",
  };

  const AddEmploymentSchema = Yup.object().shape({
    designation: Yup.string()
      .trim()
      .min(2, "Please enter valid Designation")
      .required("Designation is required"),
    company: Yup.string()
      .trim()
      .min(2, "Please enter valid company")
      .required("Company Name is required"),
    startDate: Yup.string().trim().required("Start Date is required"),
    endDate: Yup.string().trim().optional(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: AddEmploymentSchema,
    onSubmit: (values, { setErrors }) => {
      if (values.endDate) {
        if (values.endDate >= values.startDate) {
          if (!selectedEmployeement.designation) {
            return dispatch(addEmployeementAsync({ ...values }));
          }
          if (selectedEmployeement.designation) {
            const val = { ...values, _id: selectedEmployeement._id };
            return dispatch(
              updateEmployeementAsync(val, selectedEmployeement._id)
            );
          }
        } else {
          setErrors({ endDate: "End date could not be older than start date" });
        }
      } else {
        if (!selectedEmployeement.designation) {
          return dispatch(addEmployeementAsync({ ...values }));
        }
        if (selectedEmployeement.designation) {
          const val = { ...values, _id: selectedEmployeement._id };
          dispatch(updateEmployeementAsync(val, selectedEmployeement._id));
        }
      }
    },
  });
  // const handleDateChangeRaw = (e) => {
  //   e.preventDefault();
  // };
  const close = () => {
    props.handleClose();
    formik.resetForm();
  };
  return (
    <>
      <Modal show={props.show} onHide={close} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">
            {selectedEmployeement.designation
              ? "Edit Employment"
              : "Add Employment"}
          </div>
        </Modal.Header>

        <Modal.Body className="p-4">
          <form className="row" onSubmit={formik.handleSubmit}>
            <Col md={12}>
              <div className="form-group">
                <div className="p3 mb-2">Designation</div>
                <input
                  name="designation"
                  type="text"
                  placeholder="Enter Designation"
                  className="form-control re_input"
                  {...formik.getFieldProps("designation")}
                />
                {formik.touched.designation && formik.errors.designation ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.designation}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={12}>
              <div className="form-group">
                <div className="p3 mb-2">Company</div>
                <input
                  name="company"
                  type="text"
                  placeholder="Enter Company"
                  className="form-control re_input"
                  {...formik.getFieldProps("company")}
                />
                {formik.touched.company && formik.errors.company ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.company}</div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={12}>
              <div className="form-group">
                <div className="p3 mb-2">Start Date</div>
                <DatePicker
                  className="w-100 form-control re_input"
                  name="startDate"
                  // onChangeRaw={handleDateChangeRaw}
                  selected={formik.values.startDate}
                  onChange={(date) => {
                    if (date) {
                      formik.setFieldValue("startDate", date.getTime());
                    } else {
                      formik.setFieldValue("startDate", "");
                    }
                  }}
                  selectsStart
                  startDate={formik.values.startDate}
                  endDate={formik.values.endDate}
                  placeholderText="Enter Start Date"
                  maxDate={new Date()}
                  showYearDropdown={true}
                  showMonthDropdown	={true}
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.startDate}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={12}>
              <div className="form-group">
                <div className="p3 mb-2">End Date</div>
                <DatePicker
                  className="w-100 form-control re_input"
                  selected={formik.values.endDate}
                  name="endDate"
                  minDate={formik.values.startDate}
                  // onChangeRaw={handleDateChangeRaw}
                  onChange={(date) => {
                    if (date) {
                      formik.setFieldValue("endDate", date.getTime());
                    } else {
                      formik.setFieldValue("endDate", "");
                    }
                  }}
                  selectsEnd
                  startDate={formik.values.startDate}
                  endDate={formik.values.endDate}
                  placeholderText="Enter End Date"
                  showYearDropdown={true}
                  showMonthDropdown	={true}
                />
                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.endDate}</div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col
              md={12}
              className="d-flex align-items-center justify-content-end"
            >
              <Button type="submit" variant="blue" className="w-100">
                {isLoading ? (
                  <>
                    {selectedEmployeement.designation
                      ? "Updating..."
                      : "Submiting..."}
                    <img
                      src={LoadingImage}
                      alt="LoadingImage"
                      width="20px"
                      className="ml-2"
                    />
                  </>
                ) : selectedEmployeement.designation ? (
                  "Update"
                ) : (
                  "Submit"
                )}
              </Button>
            </Col>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddEmployment;

import React from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import {
  addEducationAsync,
  updateEducationAsync,
} from "../redux/userProfileApi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

const AddEducation = (props) => {
  const dispatch = useDispatch();

  const { selectedEducation, isLoading } = useSelector(
    (state) => state.userProfile,
    shallowEqual
  );

  const initialValues = {
    degree: selectedEducation.degree || "",
    college: selectedEducation.college || "",
    startDate: selectedEducation.startDate || "",
    endDate: selectedEducation.endDate || "",
  };

  const AddEducationSchema = Yup.object().shape({
    degree: Yup.string()
      .trim()
      .min(2, "Please enter valid Degree")
      .required("Degree is required"),
    college: Yup.string()
      .trim()
      .min(2, "Please enter valid college/university")
      .required("College Name is required"),
    startDate: Yup.string().trim().required("Start Date is required"),
    endDate: Yup.string().trim().optional(),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: AddEducationSchema,
    onSubmit: (values, { setErrors, resetForm }) => {
      if (values.endDate >= values.startDate) {
        if (values.endDate) {
          if (!selectedEducation.degree) {
            return dispatch(addEducationAsync({ ...values }));
          }
          resetForm();
          if (selectedEducation.degree) {
            const val = { ...values, _id: selectedEducation._id };
            return dispatch(updateEducationAsync(val, selectedEducation._id));
          }
          resetForm();
        } else {
          setErrors({ endDate: "End date could not be older than start date" });
        }
      } else {
        if (!selectedEducation.degree) {
          return dispatch(addEducationAsync({ ...values }));
        }
        if (selectedEducation.degree) {
          const val = { ...values, _id: selectedEducation._id };
          return dispatch(updateEducationAsync(val, selectedEducation._id));
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
            {selectedEducation.degree ? "Edit Education" : "Add Education"}
          </div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form className="row" onSubmit={formik.handleSubmit}>
            <Col md={12}>
              <div className="form-group">
                <div className="p3 mb-2">Degree</div>
                <input
                  name="degree"
                  type="text"
                  placeholder="Enter Degree"
                  className="form-control re_input"
                  {...formik.getFieldProps("degree")}
                />
                {formik.touched.degree && formik.errors.degree ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.degree}</div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={12}>
              <div className="form-group">
                <div className="p3 mb-2">College/university</div>
                <input
                  name="college"
                  type="text"
                  placeholder="Enter College/university"
                  className="form-control re_input"
                  {...formik.getFieldProps("college")}
                />
                {formik.touched.college && formik.errors.college ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.college}</div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={12}>
              <div className="form-group">
                <div className="p3 mb-2">Start Date</div>
                <DatePicker
                  className="w-100 form-control re_input"
                  selected={formik.values.startDate}
                  name="startDate"
                  // onChangeRaw={handleDateChangeRaw}
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
                    {selectedEducation.degree ? "Updating..." : "Submiting..."}
                    <img
                      src={LoadingImage}
                      alt="LoadingImage"
                      width="20px"
                      className="ml-2"
                    />
                  </>
                ) : selectedEducation.degree ? (
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

export default AddEducation;

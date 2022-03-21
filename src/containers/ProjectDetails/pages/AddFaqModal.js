import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addFAQAsync,
  updateFAQAsync,
} from "../../CreateProject/redux/createProjectApi";

import ArrowLeft from "./../../../assets/images/ArrowLeft.svg"

const AddFaqModal = (props) => {
  const { onFaqShow, onCloseFaq, projectId, isEditMode, editData } = props;
  const dispatch = useDispatch();

  const { isLoading } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );

  const initialValues = {
    question: editData && editData.question ? editData.question : "",
    answer: editData && editData.answer ? editData.answer : "",
  };

  const addFaqSchema = Yup.object().shape({
    question: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid question "
      )
      .required("Please enter question"),
    answer: Yup.string()
      .trim()
      .notOneOf(
        ["null", "NULL", "Null", "Undefined", "undefined"],
        "Please enter valid answer "
      )
      .required("Please enter answer"),
  });

  return (
    <>
      <Modal show={onFaqShow} onHide={onCloseFaq} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">{isEditMode ? "Edit FAQ" : "Add FAQ"}</div>
        </Modal.Header>
        <Modal.Body className="px-4">
          <Formik
            initialValues={initialValues}
            validationSchema={addFaqSchema}
            onSubmit={(values, { resetForm }) => {
              if (isEditMode) {
                return dispatch(
                  updateFAQAsync(
                    values,
                    projectId,
                    resetForm,
                    onCloseFaq,
                    editData._id
                  )
                );
              } else {
                return dispatch(
                  addFAQAsync(values, projectId, resetForm, onCloseFaq)
                );
              }
            }}
          >
            {({
              handleSubmit,
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
            }) => (
              <>
                <Form
                  className="form def_form frmwtpddng"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <div className="form-group">
                      <label className="form-label">Question*</label>
                      <input
                        placeholder="Describe your question..."
                        type="text"
                        name="question"
                        className={
                          errors.question && touched.question
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.question}
                      />
                      {touched.question && errors.question ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.question}</div>
                        </div>
                      ) : null}
                    </div>
                    <div className="form-group">
                      <label className="pho_14_500">Answer*</label>
                      <textarea
                        rows="4"
                        name="answer"
                        placeholder="Plese describe the answer..."
                        className={
                          errors.answer && touched.answer
                            ? "form-control re_inputRouded is-invalid"
                            : "form-control re_inputRouded"
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.answer}
                      ></textarea>
                      {touched.answer && errors.answer ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">{errors.answer}</div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-end  align-items-center mb-0">
                    {isEditMode && <button
                      type="submit"
                      className="btn btn-link text-dark px-4 "
                        onClick={onCloseFaq}
                    >
                      <img src={ArrowLeft} alt=""/>
                      <span className="pl-2">
                        BACK
                      </span>
                    </button>}
                    <button
                      type="submit"
                      className="btn btn-blue px-4 "
                      disabled={isLoading}
                      //   onClick={() => handleSubmit()}
                    >
                      <span>
                        {isEditMode ? "Update FAQ" : "Add as a new FAQ"}
                      </span>
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

export default AddFaqModal;

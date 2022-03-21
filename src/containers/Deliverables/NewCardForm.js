import React, { useState } from "react";

import PlusGreen from "./../../assets/images/right-true-verify.png";

import close from "./../../assets/images/close.svg";
import { Formik, Form, Field } from "formik";
import queryString from "query-string";
import * as Yup from "yup";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { addCardAsync } from "./redux/projectBoardApi";

const NewCardForm = (props) => {
  const [titleRef, setTitleRef] = useState("");
  const dispatch = useDispatch();

  const queryParams = queryString.parse(window.location.search);

  const handleAdd = (data) => {
    const value = data;
    if (
      props.laneId &&
      queryParams &&
      queryParams.projectId &&
      queryParams.packageId
    ) {
      value.cardCategoryId = props.laneId;
      dispatch(
        addCardAsync(
          value,
          queryParams.projectId,
          queryParams.packageId,
          props.onCancel
        )
      );
    }
  };

  const initialValues = {
    title: "",
  };

  const validateYupSchema = Yup.object().shape({
    title: Yup.string().trim(" ").required("Title is required"),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateYupSchema}
        onSubmit={handleAdd}
      >
        {({ errors, touched }) => (
          <Form className="newCardForm">
            <Field name="text">
              {({ field }) => (
                <textarea
                  {...field}
                  placeholder="Enter your task"
                  ref={setTitleRef}
                  className="re_workBox re_input form-control"
                  rows="3"
                  name="title"
                ></textarea>
              )}
            </Field>

            {touched.title && errors.title ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{errors.title}</div>
              </div>
            ) : null}

            <div className="py-2 d-flex align-items-center justify-content-between">
              <button
                type="submit"
                value="Submit"
                className="re_workBox re_addCardBtn d-flex justify-content-center align-items-center mr-2"
                //onClick={handleAdd}
              >
                <img src={PlusGreen} alt="" className="mr-2" width="25px" />
                Save
              </button>
              <button
                type="button"
                className="re_workBox re_addCardBtn d-flex justify-content-center align-items-center"
                onClick={props.onCancel}
              >
                <img src={close} alt="" width="13px" className="mr-2" />
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default NewCardForm;

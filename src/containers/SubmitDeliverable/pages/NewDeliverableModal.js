import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Row } from "react-bootstrap";

import { shallowEqual, useDispatch, useSelector } from "react-redux";
import LinkSimple from "../../../assets/images/LinkSimple.svg";
import Paperclipblue from "../../../assets/images/Paperclipblue.svg";
import PaperclipGray from "../../../assets/images/PaperclipGray.svg";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import { Autocomplete } from "../../../components/Chips/Autocomplete";
import { GrayChipItem } from "../../../components/Chips/ChipItem";

import { Formik, Form, Field, getIn, FieldArray, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  submitDeliverablesAsync,
  uploadFileToS3,
  getPackageCollaborators,
} from "../redux/deliverableApi";
import queryString from "query-string";

const NewDeliverableModal = (props) => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const { onNewShow, onCloseNew } = props;

  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [selectedCollaborator, setSelectedCollaborator] = useState([]);
  const [Tags, setTags] = useState([]);
  const [users, setUsers] = useState([]);

  const callbackFunction = (childData, remove) => {
    if (remove) {
      const value = selectedCollaborator.filter((res) => res._id !== childData);
      setSelectedCollaborator(value);
      let tags = Tags.filter((id) => id !== childData);
      setTags(tags);
    } else {
      setSelectedCollaborator([...selectedCollaborator, childData[0]]);
      setTags([...Tags, childData[0]._id]);
    }
  };

  const queryParams = queryString.parse(window.location.search);

  const { isLoading, taskList, collaboratorList } = useSelector(
    (state) => state.deliverables,
    shallowEqual
  );
  const { _id } = useSelector((state) => state.auth.user, shallowEqual);
  const initialValues = {
    selectTask: "",
    notes: "",
    files: [{ fileName: "", fileLink: "" }],
    postLink: [{ link: "", linkName: "" }],
  };

  const validateYupSchema = Yup.object().shape({
    selectTask: Yup.string().trim(" ").required("Task is required"),
    notes: Yup.string().trim(" ").required("Submission Notes is required"),
    files: Yup.array().of(
      Yup.object().shape({
        fileName: Yup.string().trim(" ").required("File name is required"),
        fileLink: Yup.mixed().required("File link is required"),
      })
    ),
    postLink: Yup.array().of(
      Yup.object().shape({
        link: Yup.string()
          .url("Please enter valid link. example:'https://www.example.com/'")
          .required("Link is required"),
        linkName: Yup.string().trim(" ").required("Link name is required"),
      })
    ),
  });
  useEffect(() => {
    return () => {
      setSelectedProjectId(null);
    };
  }, []);

  const onClose = (resetForm) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onCloseNew();
    resetForm();
  };
  const onSubmit = async (fields, { resetForm }) => {
    let data = null;

    data = new FormData();
    if (fields.files && fields.files.length > 0) {
      const object = fields.files.map(async (file, index) => {
        await data.append("img", file.fileLink);
      });

      const response = await dispatch(uploadFileToS3(data));
      if (response.responseCode === 200 && response.responseData) {
        response.responseData.map(async (Data, index) => {
          fields.files[index].fileLink = Data;
        });


        const selectedCol = Array.from(selectedCollaborator, ({ _id }) => _id)
  
        fields.coWorkers = selectedCol
        const value = dispatch(
          submitDeliverablesAsync(selectedProjectId, fields)
        );
        if (value) {
          onClose(resetForm);
        }
      } else {
        onClose(resetForm);
      }
    }
  };

  const onChangeFile = (e, setFieldValue, values, setValues, index, field) => {
    const files = [...values.files];
    let objectName = {
      fileLink: e.target.files[0],
      fileName: "",
    };
    files[index] = objectName;
    setValues({ ...values, files });
  };

  const handleSelectTask = (field, e) => {
    const selectedIndex = e.target.options.selectedIndex;
    setSelectedProjectId(
      e.target.options[selectedIndex].getAttribute("projectid")
    );
    // if (queryParams.projectId && queryParams.packageId) {
    //   dispatch(
    //     getPackageCollaborators(
    //       queryParams.projectId,
    //       e.target.value,
    //       //queryParams.packageId,
    //       _id
    //     )
    //   )
    // }
    field.onChange(e);
  };

  useEffect(() => {
    if (queryParams.projectId && queryParams.packageId) {
      dispatch(
        getPackageCollaborators(
          queryParams.projectId,
          queryParams.packageId,
          _id
        )
      )
    }
  }, [queryParams.projectId, queryParams.packageId])

  // const handleSelectCollaborator = (e, index) => {
  //   setSelectedCollaborator((prev) => {
  //     prev[index] = e.target.value;
  //     return [...prev]
  //   })
  // }

  useEffect(() => {
    if (collaboratorList) {
      let colList = [];
      collaboratorList.map((item, index) => {
        colList.push({
          label: item.fullName,
          name: item.fullName,
          _id: item._id,
        })
      });
      setUsers(colList);
    }

  }, [collaboratorList]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validateYupSchema}
        onSubmit={onSubmit}
      >
        {({ errors, values, touched, setValues, setFieldValue, resetForm }) => (
          <Modal
            size="lg"
            show={onNewShow}
            onHide={() => onClose(resetForm)}
            centered
          >
            <Modal.Header className="px-4 pb-0 border-0" closeButton>
              <div className="h2 py-2">Submit a new deliverable</div>
            </Modal.Header>
            <Modal.Body className="px-4">
              {isLoading && <SplashScreen />}

              <Form>
                <div className="row">
                  <div className="col-12 form-group">
                    <label className="form-label">Select Task*</label>
                    <Field name="selectTask">
                      {({ field }) => (
                        <select
                          {...field}
                          className={
                            "form-control re_input" +
                            (errors.selectTask && touched.selectTask
                              ? " is-invalid"
                              : "")
                          }
                          onChange={(e) => handleSelectTask(field, e)}
                        >
                          <option value="" disabled hidden>
                            Select Task
                          </option>
                          {taskList.map((task) => (
                            <option
                              key={task._id}
                              projectid={task.projectId}
                              value={task._id}
                            >
                              {task.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    {touched.selectTask && errors.selectTask ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.selectTask}</div>
                      </div>
                    ) : null}
                  </div>

                  
                    <div className="col-12 form-group d-flex align-items-center flex-wrap">
                      {selectedCollaborator.map((item, index) => (
                        <div key={index}>
                          <GrayChipItem
                            onClick={() => callbackFunction(item._id, true)}
                            item={item.name}
                            close={true}
                          />
                        </div>
                      ))}
                    </div>
                  

                  <div className="col-12 form-group">
                    <Autocomplete
                      placeholder="Select a co-worker"
                      callback={callbackFunction}
                      itemList={users}
                      selected={selectedCollaborator}
                    />
                  </div>

                  {/* {selectedCollaborator.map((id, index, task) => (
                    <div key={id} className="col-12 form-group">
                      <label className="form-label">Select a co-worker</label>
                      <select
                        className={
                          "form-control re_input"
                        }
                        value={id}
                        onChange={(e) => handleSelectCollaborator(e, index)}
                      >
                        <option value="" disabled hidden>
                          Select the co-worker
                        </option>
                        {collaboratorList.map((collaborator) => {
                          const otherSelectedCollaborator = [...selectedCollaborator];
                          otherSelectedCollaborator.splice(index, 1);
                          if (otherSelectedCollaborator.includes(collaborator._id)) {
                            return null;
                          }
                          return (
                            <option
                              key={collaborator._id}
                              projectid={collaborator.profilePicture}
                              value={collaborator._id}
                            >
                              {collaborator.fullName}
                            </option>
                          );
                        })}
                      </select>

                      {selectedProjectId !== null && index === selectedCollaborator.length - 1 &&
                        index !== collaboratorList.length - 1 && (
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => {
                              setSelectedCollaborator((prev) =>
                                prev.concat([""]))
                            }}
                          >
                            + Add another collaborator
                          </Button>
                        )
                      }

                      {index !== 0 && (
                        <Button
                          variant="light"
                          className="ml-2"
                          type="button"
                          onClick={() => {
                            setSelectedCollaborator((prev) => {
                              prev.splice(index, 1);
                              return [...prev];
                            });
                          }}
                        >
                          &times;
                        </Button>
                      )}
                    </div>
                  ))} */}

                  <div className="col-12 form-group">
                    <Field name="notes">
                      {({ field }) => (
                        <textarea
                          {...field}
                          rows="4"
                          placeholder="Describe the deliverable"
                          className={
                            "form-control re_input" +
                            (errors.notes && touched.notes ? " is-invalid" : "")
                          }
                        ></textarea>
                      )}
                    </Field>
                    {touched.notes && errors.notes ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">{errors.notes}</div>
                      </div>
                    ) : null}
                  </div>

                  <FieldArray name="files">
                    {({ push, remove }) =>
                      values.files.map((file, i) => {
                        const ticketErrors =
                          (errors.files?.length && errors.files[i]) || {};
                        const ticketTouched =
                          (touched.files?.length && touched.files[i]) || {};
                        return (
                          <div key={i} className="form-group col-12">
                            <Row>
                              {i === 0 && (
                                <label className="col-12 form-label">
                                  Select a file
                                </label>
                              )}
                              <div className="col-md-6 pr-md-2">
                                <div className="re_input d-flex align-items-center py-2 pl-1 text-nowrap overflow-hidden">
                                  <input
                                    name={`files.${i}.fileLink`}
                                    type="file"
                                    ref={inputRef}
                                    onChange={(e) =>
                                      onChangeFile(
                                        e,
                                        setFieldValue,
                                        values,
                                        setValues,
                                        i
                                      )
                                    }
                                  />

                                  <img src={PaperclipGray} alt="" />
                                  <span className="opacity-40">
                                    {values.files[i].fileLink
                                      ? values.files[i].fileLink.name
                                      : "Attach your file"}
                                  </span>
                                </div>
                                <ErrorMessage
                                  name={`files.${i}.fileLink`}
                                  component="div"
                                  className="fv-help-block"
                                />
                              </div>
                              <div className="col-md-6 pl-md-2">
                                <div className="d-flex">
                                  <Field
                                    name={`files.${i}.fileName`}
                                    placeholder="Give a name to your file"
                                    type="text"
                                    className={
                                      "form-control re_input" +
                                      (ticketErrors.fileName &&
                                        ticketTouched.fileName
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  {i !== 0 && (
                                    <Button
                                      variant="light"
                                      className="ml-2"
                                      type="button"
                                      onClick={() => remove(i)}
                                    >
                                      &times;
                                    </Button>
                                  )}
                                </div>
                                <ErrorMessage
                                  name={`files.${i}.fileName`}
                                  component="div"
                                  className="fv-help-block"
                                />
                              </div>
                            </Row>

                            {values.files.length === i + 1 &&
                              values.files.length < 5 && (
                                <Button
                                  variant="link"
                                  className="p-0"
                                  onClick={() =>
                                    push({ fileName: "", fileLink: "" })
                                  }
                                >
                                  + Add another file
                                  <img
                                    src={Paperclipblue}
                                    alt=""
                                    className="ml-2"
                                  />
                                </Button>
                              )}
                          </div>
                        );
                      })
                    }
                  </FieldArray>

                  <FieldArray name="postLink">
                    {({ push, remove }) =>
                      values.postLink.map((post, i) => {
                        const ticketErrors =
                          (errors.postLink?.length && errors.postLink[i]) || {};
                        const ticketTouched =
                          (touched.postLink?.length && touched.postLink[i]) ||
                          {};
                        return (
                          <div key={i} className="form-group col-12">
                            <Row>
                              {i === 0 && (
                                <label className="col-12 form-label">
                                  Post a link
                                </label>
                              )}
                              <div className="col-md-6 pl-md-2">
                                <Field
                                  name={`postLink.${i}.link`}
                                  placeholder="Submit the Link"
                                  type="text"
                                  className={
                                    "form-control re_input" +
                                    (ticketErrors.link && ticketTouched.link
                                      ? " is-invalid"
                                      : "")
                                  }
                                />

                                <ErrorMessage
                                  name={`postLink.${i}.link`}
                                  component="div"
                                  className="fv-help-block"
                                />
                              </div>
                              <div className="col-md-6 pl-md-2">
                                <div className="d-flex">
                                  <Field
                                    name={`postLink.${i}.linkName`}
                                    placeholder="Give a name to your link"
                                    type="text"
                                    className={
                                      "form-control re_input" +
                                      (ticketErrors.linkName &&
                                        ticketTouched.linkName
                                        ? " is-invalid"
                                        : "")
                                    }
                                  />
                                  {i !== 0 && (
                                    <Button
                                      variant="light"
                                      className="ml-2"
                                      type="button"
                                      onClick={() => remove(i)}
                                    >
                                      &times;
                                    </Button>
                                  )}
                                </div>
                                <ErrorMessage
                                  name={`postLink.${i}.linkName`}
                                  component="div"
                                  className="fv-help-block"
                                />
                              </div>
                            </Row>

                            {values.postLink.length === i + 1 && (
                              <Button
                                variant="link"
                                className="p-0"
                                onClick={() => push({ link: "", linkName: "" })}
                              >
                                + Add another file
                                <img
                                  src={Paperclipblue}
                                  alt=""
                                  className="ml-2"
                                />
                              </Button>
                            )}
                          </div>
                        );
                      })
                    }
                  </FieldArray>
                </div>
                <div className="form-group d-flex flex-wrap justify-content-end  align-items-center mb-0">
                  <button type="submit" className="btn btn-blue px-4 ">
                    {/* <span>Submit Deliverable</span> */}
                    Submit Deliverable
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default NewDeliverableModal;

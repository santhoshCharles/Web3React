import React, { useState, useEffect, useContext } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, Col, Row, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useParams } from "react-router-dom";
import { getMonthYear } from "../../../utils";
import "react-datepicker/dist/react-datepicker.css";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import { get } from "../../../utils";
import {
  addPackageAsync,
  updatePackageAsync,
} from "../../CreateProject/redux/createProjectApi";
import { Web3Context } from "../../../web3/contexts/web3Context";
import { poolMethods } from '../../../web3/functions/factory'
import { CreateProjectActions } from "../../CreateProject/redux/createProjectAction"
import { toast } from "react-toastify";

const AddWorkTask = (props) => {
  const {
    isEditMode,
    onAddWorkTaskShow,
    onCloseAddWorkTask,
    setIsEditMode,
    editData,
    setEditData,
  } = props;
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectTypeValue, setprojectTypeValue] = useState("");
  const [issueTypes, setIssueTypes] = useState([]);

  const [collaborator, setCollaborator] = useState([]);
  const { networkDetails, handleConnect } = useContext(Web3Context);
  const [getInstance, setInstance] = useState();

  const dispatch = useDispatch();

  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (editData) {
      setprojectTypeValue(editData.projectType);
    }
  }, [editData]);
  const { isSaving, projectDetail } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );

  const { user } = useSelector((state) => state.auth, shallowEqual);

  const { masterDetails } = useSelector(
    (state) => state.masterDetails,
    shallowEqual
  );

  useEffect(() => {
    if (Object.keys(masterDetails).length >= 3) {
      Object.keys(masterDetails).map((type) => {
        const masterD = get(["values"], masterDetails[type]).map((r) => ({
          label: r._id,
          name: r.name,
          _id: r._id,
        }));
        if (masterDetails[type].type === "Project Types") {
          setProjectTypes(masterD);
        }
        if (masterDetails[type].type === "Issue Types") {
          setIssueTypes(masterD);
        }
        if (masterDetails[type].type === "Collaborator Levels") {
          setCollaborator(masterD);
        }
      });
    }
  }, [masterDetails]);

  useEffect(() => {
    (async () => {
      const instance = await poolMethods.getInstance(networkDetails.web3)
      if (instance) {
        setInstance(instance);
      }
    })()
  }, [networkDetails.web3])

  const getProjectTypeId = (projectTypeName) => {
    const projectTypeId = projectTypes.filter((projectType) => {
      return projectType.name === projectTypeName;
    });
    return projectTypeId[0]._id;
  };
  const getIssueTypeId = (issueTypeName) => {
    const issueTypeId = issueTypes.filter((issueType) => {
      return issueType.name === issueTypeName;
    });
    return issueTypeId[0]._id;
  };
  const getexpertiseLevelId = (expertiseLevelName) => {
    const expertiseLevelId = collaborator.filter((collaboratorType) => {
      return collaboratorType.name === expertiseLevelName;
    });
    return expertiseLevelId[0]._id;
  };

  const initialValues = {
    name: editData && editData.name ? editData.name : "",
    link: editData && editData.link ? editData.link : "",
    projectType:
      editData && editData.projectType
        ? getProjectTypeId(editData.projectType)
        : "",
    issueType:
      editData && editData.issueType ? getIssueTypeId(editData.issueType) : "",
    minimumCost: editData && editData.minimumCost ? editData.minimumCost : "",
    expertiseLevel:
      editData && editData.expertiseLevel
        ? getexpertiseLevelId(editData.expertiseLevel)
        : "",
    startDate: editData && editData.startDate ? editData.startDate : "",
    endDate: editData && editData.endDate ? editData.endDate : "",
    description: editData && editData.description ? editData.description : "",
    context: editData && editData.context ? editData.context : "",
    acceptanceCriteria:
      editData && editData.acceptanceCriteria
        ? editData.acceptanceCriteria
        : "",
    reference: editData && editData.reference ? editData.reference : "",
    bonus: editData && editData.bonus ? editData.bonus : "",
    memberLimit: editData && editData.memberLimit ? editData.memberLimit : "",
  };

  const PackagesSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .min(3, "Please enter valid name")
      .required("Name is required"),
    link: Yup.string()
      .trim()
      .min(3, "Please enter valid link")
      .required("Link is required"),
    projectType: Yup.string().trim().required(" Select project type"),
    issueType: Yup.string().trim().required("Select task type"),
    minimumCost: Yup.number()
      .min(1, "Please enter valid minimum cost")
      .required("Minimum cost is required"),
    expertiseLevel: Yup.string().trim().required("Select level of expertise"),
    startDate: Yup.string().trim().required("Start date is required"),
    endDate: Yup.string().trim().required("End date is required"),
    description: Yup.string()
      .trim()
      .min(3, "Please enter valid description")
      .required("Description is required"),
    context: Yup.string()
      .trim()
      .min(3, "Please enter valid context")
      .required("Context is required"),

    memberLimit: Yup.number().when("projectType", {
      is: "Collaborative", //just an e.g. you can return a function
      then: Yup.number()
        .required("Please select number of collaborators")
        .min(3, "Please select atleast 3 members"),
      otherwise: Yup.number().default(1),
    }),

    acceptanceCriteria: Yup.string()
      .trim()
      .min(3, "Please enter valid acceptance criteria")
      .required("Acceptance Criteria is required"),
    reference: Yup.string()
      .trim()
      .min(3, "Please enter valid reference")
      .required("Reference is required"),
    bonus: Yup.string().trim().min(0, "Please enter valid bonus"),
  });

  const handleProjectTypeChange = (event) => {
    formik.handleChange(event);
    const obj = projectTypes.find((o) => o.label === event.target.value);
    if (Object.keys(obj).length > 0) {
      setprojectTypeValue(obj.name);
    }
  };
  useEffect(() => {
    return () => {
      setprojectTypeValue("");
      formik.resetForm();
    };
  }, []);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: PackagesSchema,
    onSubmit: async (values, { resetForm, setErrors }) => {
      if (values.endDate >= values.startDate && props.projectDetail) {
        let data = values;
        if (projectTypeValue !== "Collaborative") {
          data.memberLimit = 1;
        }
        let bonus = data.bonus ? data.bonus : 0;
        const isValid =
          parseInt(props.projectDetail.remainingBudget) >=
          parseInt(data.memberLimit) * parseInt(data.minimumCost) +
          parseInt(bonus);

        const checkBonus =
          parseInt(bonus) <= parseInt(props.projectDetail.remainingBudget);

        if (isEditMode) {
          if (editData.bonus !== "") {
            delete data.bonus;
          }
          if (checkBonus) {
            return dispatch(
              updatePackageAsync(
                data,
                params.projectId,
                editData._id,
                onCloseModal
              )
            );
          } else {
            return setErrors({
              bonus: `Amount can not be greater than remaining project budget ($ ${props.projectDetail.remainingBudget})`,
            });
          }
        } else {
          if (isValid) {
            let projectCost = parseFloat(data.minimumCost);
            let memberLimit = parseInt(data.memberLimit);

            projectCost = projectCost * memberLimit;
            if (data.bonus) {
              projectCost += parseFloat(data.bonus) + parseFloat((projectCost * 4.5) / 100); // deduct platform fee as well

            }
            //SC OBJECT
            const createPackageObj = {
              projectId: props.projectDetail.scProjectId,
              budget: Math.floor(projectCost),
              bonus: data.bonus ? Number(data.bonus) : 0
            };
            //SC OBJECT
            if (getInstance) {
              try {
                dispatch(CreateProjectActions.addPackageSCStart());
                const createPackageResp = await poolMethods.createPackage(getInstance, networkDetails.address, createPackageObj)
                console.log({ createPackageResp })
                if (createPackageResp && createPackageResp.blockHash) {
                  data.scPackageId = createPackageResp['events']['CreatedPackage']["raw"]["topics"][2]
                  let result = await dispatch(
                    addPackageAsync(data, params.projectId, onCloseModal)
                  );
                  dispatch(CreateProjectActions.addPackageSCSuccess());
                  return result
                }
              } catch (err) {
                toast.error(err)
                dispatch(CreateProjectActions.addPackageError());
              }

            } else {
              handleConnect()
            }
          } else {
            return setErrors({
              minimumCost: `Amount can not be greater than remaining project budget ($ ${props.projectDetail.remainingBudget})`,
            });
          }
        }
      } else {
        setErrors({ endDate: "End date could not be older than start date" });
      }
    },
  });

  const onCloseModal = () => {
    setIsEditMode(false);
    setEditData({});
    formik.resetForm();
    dispatch(CreateProjectActions.addPackageSCSuccess());
    onCloseAddWorkTask();
  };

  return (
    <>
      <Modal show={onAddWorkTaskShow} onHide={onCloseModal} size="lg" centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">
            {isEditMode ? "Edit WorkTask" : "Add a New WorkTask"}
          </div>
        </Modal.Header>
        <Modal.Body className="px-4">
          <>
            <form className="row" onSubmit={formik.handleSubmit}>
              <Col md={12}>
                <div className="h4 pb-3">General Info</div>
              </Col>
              <Col md={6} lg={4}>
                <div className="form-group">
                  <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    className="form-control re_input"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.name}</div>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="form-group">
                  <input
                    name="link"
                    type="text"
                    placeholder="Link"
                    className="form-control re_input"
                    {...formik.getFieldProps("link")}
                  />
                  {formik.touched.link && formik.errors.link ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.link}</div>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="form-group">
                  <select
                    name="projectType"
                    disabled={isEditMode}
                    className="form-control re_input"
                    onChange={(e) => handleProjectTypeChange(e)}
                    onBlur={formik.handleBlur}
                    value={
                      formik.values.projectType || initialValues.projectType
                    }
                  >
                    <option value="" disabled selected hidden>
                      Project Type
                    </option>
                    {projectTypes.map((item) => (
                      <option key={item.name} value={item.label}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.projectType && formik.errors.projectType ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.projectType}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>

              {projectTypeValue === "Collaborative" && (
                <>
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
                        <div className="pb-2  ">
                          <span className="color_gray">
                            Please define the maximum number of accepted
                            collaborators
                          </span>
                        </div>
                      </Col>
                      <Col md={4} lg={4}>
                        <div className="form-group">
                          <select
                            name="memberLimit"
                            disabled={isEditMode}
                            className="form-control re_input"
                            {...formik.getFieldProps("memberLimit")}
                          // onChange={(e) => handleProjectTypeChange(e)}
                          // onBlur={formik.handleBlur}
                          // value={projectTypeValue}
                          >
                            <option value="" disabled selected hidden>
                              collaborators
                            </option>
                            <option key="3" value={3}>
                              3
                            </option>
                            <option key="4" value={4}>
                              4
                            </option>
                            <option key="5" value={5}>
                              5
                            </option>
                            <option key="6" value={6}>
                              6
                            </option>
                            <option key="7" value={7}>
                              7
                            </option>
                            <option key="8" value={8}>
                              8
                            </option>
                            <option key="9" value={9}>
                              9
                            </option>
                            <option key="10" value={10}>
                              10
                            </option>
                          </select>
                          {formik.touched.memberLimit &&
                            formik.errors.memberLimit ? (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                {formik.errors.memberLimit}
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </Col>

                      <Col md={8}>
                        <div className="form-group pt-1">
                          <span className="p5 borderLink ">
                            For collaborative projects you need to select
                            between 3 and 10 collaborators.
                          </span>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </>
              )}

              <Col md={6} lg={4}>
                <div className="form-group">
                  <select
                    name="issueType"
                    disabled={isEditMode}
                    className="form-control re_input"
                    {...formik.getFieldProps("issueType")}
                  >
                    <option value="" disabled selected hidden>
                      Type of Task
                    </option>
                    {issueTypes.map((item) => (
                      <option key={item.name} value={item.label}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.issueType && formik.errors.issueType ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.issueType}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="form-group position-relative">
                  <input
                    name="bonus"
                    type="text"
                    disabled={
                      isEditMode && editData.bonus !== "" ? true : false
                    }
                    // disabled={
                    //   isEditMode &&
                    //   (!("bonus" in editData) || editData.bonus !== "")
                    //     ? false
                    //     : true
                    // }
                    placeholder="Bonus"
                    className="form-control re_input"
                    {...formik.getFieldProps("bonus")}
                  />
                  {formik.touched.bonus && formik.errors.bonus ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.bonus}</div>
                    </div>
                  ) : null}
                  <span className="re_doller_icon p1 opacity50">
                    {props.projectDetail &&
                      props.projectDetail.tokenName !== null
                      ? props.projectDetail.tokenName
                      : "$"}
                  </span>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="form-group position-relative">
                  <input
                    name="minimumCost"
                    type="number"
                    disabled={isEditMode}
                    placeholder="Minimum Guaranteed Payment"
                    className="form-control re_input"
                    {...formik.getFieldProps("minimumCost")}
                  />
                  {formik.touched.minimumCost && formik.errors.minimumCost ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.minimumCost}
                      </div>
                    </div>
                  ) : null}
                  <span className="bg-white pl-2 re_doller_icon p1 color_gray">
                    {props.projectDetail &&
                      props.projectDetail.tokenName !== null
                      ? props.projectDetail.tokenName
                      : "$"}
                  </span>
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="form-group">
                  <select
                    disabled={isEditMode}
                    name="expertiseLevel"
                    className="form-control re_input"
                    {...formik.getFieldProps("expertiseLevel")}
                  >
                    <option value="" disabled selected hidden>
                      Level of expertise
                    </option>
                    {collaborator.map((item) => (
                      <option key={item.name} value={item.label}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.expertiseLevel &&
                    formik.errors.expertiseLevel ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.expertiseLevel}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col md={6} lg={4}>
                <div className="form-group">
                  <DatePicker
                    className="w-100 form-control re_input"
                    selected={formik.values.startDate}
                    disabled={isEditMode}
                    minDate={new Date()}
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
                    placeholderText="Start Date"
                    showYearDropdown={true}
                    showMonthDropdown={true}
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
              <Col md={6} lg={4}>
                <div className="form-group">
                  <DatePicker
                    className="w-100 form-control re_input"
                    selected={formik.values.endDate}
                    disabled={isEditMode}
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
                    placeholderText="End Date"
                    showYearDropdown={true}
                    showMonthDropdown={true}
                  />
                  {formik.touched.endDate && formik.errors.endDate ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.endDate}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col md={12}>
                <div className="h4 pb-3">Description</div>
                <div className="form-group">
                  <textarea
                    name="description"
                    rows={7}
                    placeholder="Write Description"
                    className="form-control re_input"
                    {...formik.getFieldProps("description")}
                  ></textarea>
                  {formik.touched.description && formik.errors.description ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.description}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <textarea
                    name="context"
                    rows={7}
                    placeholder="Add Context"
                    className="form-control re_input"
                    {...formik.getFieldProps("context")}
                  ></textarea>
                  {formik.touched.context && formik.errors.context ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.context}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <textarea
                    name="acceptanceCriteria"
                    rows={7}
                    placeholder="Acceptance Criteria"
                    className="form-control re_input"
                    {...formik.getFieldProps("acceptanceCriteria")}
                  ></textarea>
                  {formik.touched.acceptanceCriteria &&
                    formik.errors.acceptanceCriteria ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.acceptanceCriteria}
                      </div>
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <textarea
                    name="reference"
                    rows={7}
                    placeholder="Reference"
                    className="form-control re_input"
                    {...formik.getFieldProps("reference")}
                  ></textarea>
                  {formik.touched.reference && formik.errors.reference ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.reference}
                      </div>
                    </div>
                  ) : null}
                </div>
              </Col>
              <Col md={12}>
                <Button
                  type="submit"
                  variant="blue"
                  className="px-4"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      Saving...
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>
              </Col>
            </form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddWorkTask;

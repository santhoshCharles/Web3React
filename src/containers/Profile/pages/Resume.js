import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import dollarsymbol from "../../../assets/images/CurrencyCircleDollar.svg";
import briefcase from "../../../assets/images/briefcase.svg";
import cancel from "../../../assets/images/cancel.svg";
import language from "../../../assets/images/Translate.svg";
import plus from "../../../assets/images/plus.svg";
import pen from "../../../assets/images/pen.svg";
import document from "../../../assets/images/document.svg";
import AddEmployment from "./AddEmployment";
import AddEducation from "./AddEducation";
import { UserProfileActions } from "../redux/userProfileAction";
import {
  getProfileAsync,
  updateProfileAsync,
  deleteEducationAsync,
  deleteEmployeementAsync,
} from "../redux/userProfileApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getMonthYear, monthDiff } from "../../../utils";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import PencilWhite from "../../../assets/images/PencilWhite.svg";
import Trash from "../../../assets/images/Trash.svg";
import download from "../../../assets/images/download.svg";
import ModalYesNo from "../../../components/Modal/ModalYesNo";
import Chips from "../../../components/Chips/Chips";

export const EmploymentListItem = (props) => {
  const onSelect = () => {
    props.onClick();
    props.onSelectAddEmployeement(props?.item);
  };

  const onDelete = () => {
    props.handleShowEmployeeDelete(props?.item);
  };

  return (
    <>
      <div className="re_EmploymentListItem">
        <div className="d-flex align-items-center justify-content-between pb-2">
          <div className="d-flex align-items-center justify-content-start">
            <div className="p1 pr-3">{props.title}</div>
            <button type="button" className="btn btn-link" onClick={onSelect}>
              <img src={pen} alt="pen" />
            </button>
          </div>
          <button type="button" className="btn btn-link p-0" onClick={onDelete}>
            <img src={Trash} alt="Trash" />
          </button>
        </div>
        <div className="p4 pb-2">{props.subtitle}</div>
        <div className="d-flex align-items-center">
          <div className="p4 color_gray">{props.date}</div>
          <span className="re_dot mx-3"></span>
          <span className="p4 color_gray">{props.range}</span>
        </div>
      </div>
    </>
  );
};

export const EducationListItem = (props) => {
  const onSelect = () => {
    props.onClick();
    props.onSelectAddEducation(props?.item);
  };

  const onDelete = () => {
    props.handleShowEducationDelete(props?.item);
  };

  return (
    <>
      <div className="re_EmploymentListItem">
        <div className="d-flex align-items-center justify-content-between pb-2">
          <div className="d-flex align-items-center justify-content-start">
            <div className="p1 pr-3">{props.title}</div>
            <button type="button" className="btn btn-link" onClick={onSelect}>
              <img src={pen} alt="pen" />
            </button>
          </div>
          <button type="button" className="btn btn-link p-0" onClick={onDelete}>
            <img src={Trash} alt="Trash" />
          </button>
        </div>
        <div className="p4 pb-2">{props.subtitle}</div>
        <div className="d-flex align-items-center">
          <div className="p4 color_gray">{props.date}</div>
          <span className="re_dot mx-3"></span>
          <span className="p4 color_gray">{props.range}</span>
        </div>
      </div>
    </>
  );
};

const Resume = () => {
  const [showEmployeeDelete, setShowEmployeeDelete] = useState(false);
  const handleCloseEmployeeDelete = () => setShowEmployeeDelete(false);
  const handleShowEmployeeDelete = () => setShowEmployeeDelete(true);

  const [showEducationDelete, setShowedcationDelete] = useState(false);
  const handleCloseEdcationDelete = () => setShowedcationDelete(false);
  const handleShowEducationDelete = () => setShowedcationDelete(true);

  const {
    selectedEducation,
    selectedEmployeement,
    refreshProfile,
    showResumeLoader,
  } = useSelector((state) => state.userProfile, shallowEqual);

  const { resumePicture, employmentHistory, education, jobPreferences } =
    useSelector((state) => state.auth.user);

  const [jobPreferencesTab, setJobPreferencesTab] = useState({
    jobStatus: (jobPreferences && jobPreferences.jobStatus) || "",
    expectation: (jobPreferences && jobPreferences.expectation) || "",
    languages: (jobPreferences && jobPreferences.languages) || "",
  });

  const [resume, setResume] = useState(null);
  const [showDownloadLink, setShowDownloadLink] = useState(false);

  const [empHistory, setEmpHistory] = useState([]);
  const [ShowEdit, setShowEdit] = useState(false);
  const handleShowEdit = () => setShowEdit(true);
  const handleCloseEdit = () => setShowEdit(false);
  const [resumeUrl, setResumeUrl] = useState(resumePicture);

  const [AddShowEmployment, setAddShowEmployment] = useState(false);
  const handleShowAddEmployment = () => setAddShowEmployment(true);
  const handleCloseAddEmployment = () => setAddShowEmployment(false);

  const [AddShowEducation, setAddShowEducation] = useState(false);
  const handleShowAddEducation = () => setAddShowEducation(true);
  const handleCloseAddEducation = () => setAddShowEducation(false);
  const [Tags, setTags] = useState([]);

  const onChange = (e) => {
    setJobPreferencesTab({
      ...jobPreferencesTab,
      [e.target.name]: e.target.value,
    });
  };

  const jobPreferenceSchema = Yup.object().shape({
    jobStatus: Yup.string().trim().required("Job status is required"),
    expectation: Yup.string().trim().required("USD is required"),
    languages: Yup.string().trim().required("Language is required"),
  });

  const formik = useFormik({
    initialValues: jobPreferencesTab,
    enableReinitialize: true,
    validationSchema: jobPreferenceSchema,
    onSubmit: (values) => {
      const updatedValues = {...values, languages: Tags.join(",")}
      onSaveJobPreferences(updatedValues);
    },
  });

  const onFileChange = (e) => {
    setShowEdit(true);
    setResumeUrl(URL.createObjectURL(e.target.files[0]));
    setJobPreferencesTab({
      ...formik.values,
      resumePicture: e.target.files.length ? e.target.files[0] : "",
    });
    formik.setFieldValue(
      "resumePicture",
      e.target.files.length ? e.target.files[0] : ""
    );
    setResume(e.target.files.length ? e.target.files[0] : "");
    setShowDownloadLink(false);
  };

  const dispatch = useDispatch();

  const onSelectAddEmployeement = (employment) => {
    dispatch(UserProfileActions.setSelectedEmployeement(employment));
    handleShowAddEmployment();
  };

  const onEmployeeDeleteIconClick = (employment) => {
    dispatch(UserProfileActions.setSelectedEmployeement(employment));
    handleShowEmployeeDelete();
  };

  const onDeleteEmployeement = () => {
    dispatch(deleteEmployeementAsync(selectedEmployeement._id));
  };

  const onSelectAddEducation = (education) => {
    dispatch(UserProfileActions.setSelectedEducation(education));
    handleShowAddEducation();
  };

  const onEducationIconClick = (education) => {
    dispatch(UserProfileActions.setSelectedEducation(education));
    handleShowEducationDelete();
  };

  const onDeleteEducation = () => {
    dispatch(deleteEducationAsync(selectedEducation._id));
  };

  const onSaveJobPreferences = async (values) => {
    let data = null;
    if (values.resumePicture) {
      data = new FormData();
      data.append("img", values.resumePicture);
    }

    if (resumeUrl === "" && values.resumePicture === undefined) {
      return formik.setFieldError("resumePicture", "resume is required");
    }
    dispatch(
      updateProfileAsync(
        { resumePicture: resumeUrl, jobPreferences: values },
        data,
        "resume",
        values.resumePicture
      )
    );
  };

  const getDiffDayMonthYear = (endDate, startDate) => {
    let a = moment(endDate);
    let b = moment(startDate);

    var years = a.diff(b, "year");
    b.add(years, "years");

    var months = a.diff(b, "months");
    b.add(months, "months");

    var days = a.diff(b, "days");
    b.add(days, "days");

    let returnVal = "";
    if (years > 0) {
      returnVal += `${years} years `;
    }

    if (months > 0) {
      returnVal += `${months} months`;
    }

    if (months == 0 && years == 0) {
      returnVal += `${days + 1} days `;
    }

    return returnVal;
  };

  const callbackFunction = (childData, remove) => {
    let value = [];
    if (remove) {
      value = Tags.filter((r) => r !== childData);
      setTags(value);
    } else {
      if (childData === "") {
        return formik.setFieldError("tags", "Please enter a valid language");
      } else {
        value = [...Tags, childData];
        formik.setFieldValue("tags", value);
        setTags(value);
      }
    } 
  };

  useEffect(() => {
    if (refreshProfile) {
      dispatch(getProfileAsync());
    }
  }, [refreshProfile]);

  useEffect(() => {
    if (resumePicture) {
      setResume(true);
      setShowDownloadLink(true);
    } else {
      setResume(false);
      setShowDownloadLink(false);
    }
  }, [resumePicture]);

  useEffect(() => {
    setEmpHistory(
      employmentHistory
        .map((res) => ({
          ...res,
          eDate: res.endDate,
          endDate: res.endDate === null ? Date.parse(new Date()) : res.endDate,
        }))
        .sort((a, b) => b.startDate - a.startDate)
        .sort((a, b) => b.endDate - a.endDate)
    );
  }, [employmentHistory]);

  useEffect(() => {
    if(jobPreferences.languages) {
      setTags(jobPreferences.languages.split(","))  
    }
  }, [])

  return (
    <>
      <Container className="bg-white shadowBox radius-top-0 mb-3 ">
        <div className="d-flex align-items-center justify-content-between  pb-3">
          <div className="h2 pb-3">Job Preferences</div>
          {!ShowEdit ? (
            <button
              type="button"
              className="btn btn-blue btn-sm px-4"
              onClick={handleShowEdit}
            >
              <img src={PencilWhite} alt="edit" className="mr-2" />
              Edit
            </button>
          ) : (
            <Button
              type="button"
              onClick={formik.handleSubmit}
              variant="blue"
              className="btn btn-black btn-sm px-4"
              disabled={showResumeLoader}
            >
              {showResumeLoader ? (
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
          )}
        </div>
        {!ShowEdit ? (
          <div className="row">
            <div className="col-md-12">
              <div className="d-flex align-items-center pb-3 border-bottom">
                <img
                  src={briefcase}
                  alt="briefcase"
                  width="32px"
                  name="jobStatus"
                />
                <div className="p3 pl-2">
                  {jobPreferencesTab.jobStatus
                    ? jobPreferencesTab.jobStatus
                    : "Job Status..."}
                </div>
              </div>
              <div className="d-flex align-items-center py-3 border-bottom">
                <img
                  src={dollarsymbol}
                  alt="dollarsymbol"
                  width="32px"
                  name="expectation"
                />
                <div className="p3 pl-2">
                  Compensation Expectation USD $
                  {jobPreferencesTab.expectation
                    ? jobPreferencesTab.expectation
                    : "Expectation..."}
                  /hour
                </div>
              </div>
              <div className="d-flex align-items-center py-3">
                <img
                  src={language}
                  alt="Language"
                  width="32px"
                  name="languages"
                />

                <div className="d-flex align-items-center pl-2">
                  {jobPreferencesTab.languages
                    ? jobPreferencesTab.languages
                      .split(",")
                      .map((language) => (
                        <div className="re_tag_item mb-0">{language}</div>
                      ))
                    : "No language.."}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <form className="row justify-content-between">
            <div className="col-md-7 col-lg-6 col-xl-5 ">
              <div className="d-flex align-items-start">
                <img
                  src={briefcase}
                  alt="briefcase"
                  width="32px"
                  className="mt-2 mr-3"
                  name="jobStatus"
                />
                <div className="form-group w-100">
                  <input
                    name="jobStatus"
                    type="text"
                    placeholder="Job Status"
                    className="form-control re_input "
                    {...formik.getFieldProps("jobStatus")}
                  />
                  {formik.touched.jobStatus && formik.errors.jobStatus ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.jobStatus}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex align-items-start">
                <img
                  src={dollarsymbol}
                  alt="dollarsymbol"
                  width="32px"
                  className="mt-2 mr-3"
                  name="jobStatus"
                />
                <div className="form-group w-100 position-relative">
                  <div className="p3 color_gray re_leftInput">USD</div>
                  <div className="p3 color_gray re_rightInput">hour</div>
                  <input
                    type="text"
                    name="expectation"
                    placeholder="Compensation Expectation USD"
                    className="form-control re_input"
                    {...formik.getFieldProps("expectation")}
                  />
                  {formik.touched.expectation && formik.errors.expectation ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.expectation}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="d-flex align-items-start">
                <img
                  src={language}
                  alt="language"
                  width="32px"
                  className="mt-2 mr-3"
                  name="jobStatus"
                />
                <div className="form-group w-100">

                  <Chips
                    placeholder="English, Korean, Spanish"
                    name="languages"
                    className="form-control re_input "
                    {...formik.getFieldProps("languages")}
                    parentCallback={callbackFunction}
                  />

                  {/* <input
                    type="text"
                    name="languages"
                    placeholder="English, Korean, Spanish"
                    className="form-control re_input "
                    {...formik.getFieldProps("languages")}
                  /> */}
                  {formik.touched.languages && formik.errors.languages ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {formik.errors.languages}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </form>
        )}
        <div className="">
          <div className="d-flex align-items-center justify-content-end">
            <div className="re_uploadResumeBtn">
              <input
                type="file"
                accept="application/pdf, image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={onFileChange}
                name="resumePicture"
              />
              <button type="button" className="btn btn-blue btn-sm">
                Attach Resume
              </button>
            </div>
          </div>
          {resume && resumeUrl !== "" && (
            <div className="re_resumebox">
              <div className="re_ResumeImgMain">
                <img
                  src={document}
                  alt="Resume"
                  className="re_ResumeImg"
                  name="resumePicture"
                />
                {ShowEdit && (
                  <button
                    type="button"
                    className="re_closeBtn"
                    onClick={() => {
                      // setShowEdit(true);
                      setResumeUrl("");
                      setResume(null);
                      setShowDownloadLink(false);
                    }}
                  >
                    <img src={cancel} alt="Cancel" className="re_Close" />
                  </button>
                )}

                {showDownloadLink && (
                  <a
                    href={resumePicture}
                    download="Resume"
                    target="_blank"
                    className="mt-2 btn btn-blue w-100"
                  >
                    <img src={download} alt="download" className="mr-2" />
                    Resume
                  </a>
                )}
              </div>
            </div>
          )}
          {formik.errors.resumePicture ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.resumePicture}</div>
            </div>
          ) : null}
        </div>
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h2 pb-2">Employment History</div>
          <button
            type="button"
            className="re_AddBtn"
            onClick={() => {
              onSelectAddEmployeement({});
            }}
          >
            <img src={plus} alt="add" />
          </button>
        </div>
        {empHistory.map((item, index) => {
          return (
            <EmploymentListItem
              key={index}
              title={item.designation}
              subtitle={item.company}
              date={
                item.eDate !== null
                  ? `${getMonthYear(new Date(item.startDate))} - ${getMonthYear(
                    new Date(item.endDate)
                  )}`
                  : `${getMonthYear(new Date(item.startDate))} - Present`
              }
              range={
                item.eDate !== null
                  ? getDiffDayMonthYear(
                    new Date(item.endDate),
                    new Date(item.startDate)
                  )
                  : getDiffDayMonthYear(new Date(), new Date(item.startDate))
              }
              onClick={handleShowAddEmployment}
              item={item}
              onSelectAddEmployeement={onSelectAddEmployeement}
              selectedEmployeement={selectedEmployeement}
              handleShowEmployeeDelete={onEmployeeDeleteIconClick}
            />
          );
        })}
      </Container>
      <AddEmployment
        show={AddShowEmployment}
        handleClose={handleCloseAddEmployment}
      />
      <ModalYesNo
        show={showEmployeeDelete}
        handleClose={handleCloseEmployeeDelete}
        handleOk={() => onDeleteEmployeement()}
        text="Are you sure want to Delete ?"
        subText="Please confirm with us to continue"
      />
      <Container className="bg-white shadowBox mt-4">
        <div className="d-flex align-items-center justify-content-between">
          <div className="h2 pb-2">Education</div>
          <button
            type="button"
            className="re_AddBtn"
            onClick={() => {
              onSelectAddEducation({});
            }}
          >
            <img src={plus} alt="add" />
          </button>
        </div>
        {education
          .sort((a, b) => b.startDate - a.startDate)
          .map((item, index) => {
            return (
              <EducationListItem
                key={index}
                title={item.degree}
                subtitle={item.collage}
                date={
                  item.endDate !== null
                    ? `${getMonthYear(
                      new Date(item.startDate)
                    )} - ${getMonthYear(new Date(item.endDate))}`
                    : `${getMonthYear(new Date(item.startDate))} - Present`
                }
                range={
                  item.endDate !== null
                    ? getDiffDayMonthYear(
                      new Date(item.endDate),
                      new Date(item.startDate)
                    )
                    : getDiffDayMonthYear(new Date(), new Date(item.startDate))
                }
                onClick={handleShowAddEducation}
                item={item}
                onSelectAddEducation={onSelectAddEducation}
                selectedEducation={selectedEducation}
                onDeleteEducation={() => onDeleteEducation(item)}
                handleShowEducationDelete={onEducationIconClick}
              />
            );
          })}
      </Container>
      <AddEducation
        show={AddShowEducation}
        handleClose={handleCloseAddEducation}
      />
      <ModalYesNo
        show={showEducationDelete}
        handleClose={handleCloseEdcationDelete}
        handleOk={() => onDeleteEducation()}
        text="Are you sure want to Delete ?"
        subText="Please confirm with us to continue"
      />
    </>
  );
};

export default Resume;

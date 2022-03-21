import React, { useEffect, useState } from "react";
import { Col, Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import Chips from "../../../components/Chips/Chips";
import picon from "../../../assets/images/p-icon.png";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import plus from "../../../assets/images/plus.svg";
import non_photo from "../../../assets/images/non_photo.svg";
import logo from "../../../assets/images/logo.svg";
import ModalYesNo from "../../../components/Modal/ModalYesNo";
import { ReactTimeAgoC } from "../../../components/utils/ReactTimeAgoC";
import {
  addPortfolioAsync,
  removeportfolioAsync,
} from "../redux/userProfileApi";
import ViewPorfolioModel from "../../../components/Profile/ViewPorfolioModel";
import uploadbtnnew1 from "../../../assets/images/uploadbtnnew1.svg";
import pluseWhite from "../../../assets/images/pluseWhite.svg";
import LogoIcon from "../../../assets/images/LogoIcon.svg";
import { Radiobox } from "../../../components/Checkbox/Checkbox";
import star from "../../../assets/images/star.svg";

const Portfolio = () => {
  const [AddProject, setAddproject] = useState(false);
  const [file, setFile] = useState({ file: null, url: "" });
  const handleShowAddProject = () => setAddproject(!AddProject);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [viewPortfolio, setViewPortfolio] = useState(false);
  const [portfolioDeleteId, setPortfolioDeleteId] = useState(null);
  const { portfolio } = useSelector((state) => state.auth.user);
  const { showLoader } = useSelector(
    (state) => state.userProfile,
    shallowEqual
  );

  const [portfolioList, setPortfolioList] = useState([]);
  const [Tags, setTags] = useState([]);
  const [getOnePortfolio, setOnePortfolio] = useState({});
  const callbackFunction = (childData, remove) => {
    let value = [];
    if (remove) {
      value = Tags.filter((r) => r !== childData);
      setTags(value);
    } else {
      if (childData === "") {
        return formik.setFieldError("tags", "Please enter a valid tag");
      } else {
        value = [...Tags, childData];
        formik.setFieldValue("tags", value);
        setTags(value);
      }
    }
  };

  const initialValues = {
    projectUrl: "",
    projectTitle: "",
    tags: [],
    isReBakedProject: true,
    description: ""
  };

  const PortfolioSchema = Yup.object().shape({
    projectUrl: Yup.string()
      .trim()
      .url("Please enter valid url. example:'https://www.example.com/'")
      // .min(3, "Please enter a valid project URL")
      .required("Project URL is required"),
    projectTitle: Yup.string()
      .trim()
      .min(3, "Please enter a valid project title")
      .required("Project title is required"),
    tags: Yup.array().min(1, "Tag is required").required("Tag is required"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: PortfolioSchema,
    onSubmit: async (values) => {
      let data = null;
      if (file && file.file) {
        const updatedValues = { ...values, tags: Tags };
        console.log(updatedValues);
        data = new FormData();
        data.append("img", file.file);

        const response = dispatch(addPortfolioAsync(updatedValues, data));
        if (response && response.responseCode === 200) {
          formik.resetForm();
          setFile({
            url: "",
            file: null,
          });
        }
      } else {
        formik.setFieldError("projectLogo", "Project Logo is Required");
      }
    },
  });

  const uploadImage = (e) => {
    if ("projectLogo" in formik.errors) {
      delete formik.errors["projectLogo"];
    }
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  useEffect(() => {
    if (portfolio) {
      setPortfolioList(portfolio);
    }
  }, [portfolio]);

  const handleOk = async () => {
    const response = await dispatch(removeportfolioAsync(portfolioDeleteId));
    // if (response.responseCode === 200) {
    //   handleClose();
    // }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const onViewPorfolioClose = () => {
    setOnePortfolio({});
    setViewPortfolio(false);
  };
  const onViewPorfolioshow = () => setViewPortfolio(true);

  return (
    <>
      <Container className="bg-white shadowBox radius-top-0">
        <div className="bg-light-blue p-4 rounded-lg">
          <div className="h2 pb-3">Specified Skillset</div>
          <div className="d-flex align-items-center">
            <button
              type="button"
              className="btn-link btn px-0 mr-3 d-flex align-items-center"
              onClick={handleShowAddProject}
            >
              <img src={plus} alt={plus} className="mr-1" /> Add a project
            </button>
            {/* <div className="d-flex align-items-center justify-content-md-end">
            <img src={view} alt="view" />
            <div className="f16-400 pl-1 opacity50">Only visible to you</div>
          </div> */}
          </div>

          {AddProject && (
            <form
              className="align-items-start row mt-3"
              onSubmit={formik.handleSubmit}
            >
              <Col md="auto">
                <div className="re_profileUpload p-3 mb-3 d-flex align-items-center justify-content-center">
                  <img
                    src={file.url ? file.url : non_photo}
                    alt="LOGO"
                    className="mw-100 mh-100"
                  />
                  <div className="re_uploadBtn">
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      onChange={uploadImage}
                    />
                    <img src={uploadbtnnew1} alt="updatebtn" />
                  </div>
                </div>
                {formik.errors.projectLogo ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.projectLogo}
                    </div>
                  </div>
                ) : null}
              </Col>
              <Col>
                <Row>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Project URL"
                        className="form-control re_inputRouded"
                        name="projectUrl"
                        {...formik.getFieldProps("projectUrl")}
                      />
                      {formik.touched.projectUrl && formik.errors.projectUrl ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.projectUrl}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <input
                        type="text"
                        placeholder="Project Title"
                        className="form-control re_inputRouded"
                        name="projectTitle"
                        {...formik.getFieldProps("projectTitle")}
                      />
                      {formik.touched.projectTitle &&
                        formik.errors.projectTitle ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.projectTitle}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <Chips
                        placeholder="Tags (comma seperated)"
                        lg={6}
                        parentCallback={callbackFunction}
                      />
                      {formik.touched.tags && formik.errors.tags ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.tags}
                          </div>
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <Radiobox
                        name="isReBakedProject"
                        text={
                          <>
                            <img
                              src={LogoIcon}
                              alt="LogoIcon"
                              height="16px"
                              className="mr-2"
                            />
                            ReBaked project
                          </>
                        }
                        value={true}
                        defaultChecked={true}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <div className="mb-2">
                      <Radiobox
                        name="isReBakedProject"
                        text={`External Showcases`}
                        value={false}
                        onChange={formik.handleChange}
                      />
                    </div>
                    <Button type="submit" variant="blue" disabled={showLoader}>
                      {showLoader ? (
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
                        <>
                          <img src={pluseWhite} alt="Add" /> Add Project
                        </>
                      )}
                    </Button>
                  </Col>
                  <Col md={6}>
                    <div className="form-group">
                      <textarea
                        name="description"
                        placeholder="Description"
                        rows="7"
                        className="form-control re_inputRouded"
                        {...formik.getFieldProps("description")}
                      />
                      {formik.touched.description && formik.errors.description ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.description}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Col>
            </form>
          )}
        </div>
      </Container>
      <Container className="bg-white shadowBox mt-4">
        <div className="h2 pb-3">Projects</div>
        {portfolioList.map((por, ind) => {
          return (
            <div
              key={ind}
              className="row mx-0 justify-content-between align-items-center re_EarningsList"
            >
              <div className="col-md-8 d-flex align-items-center">
                <div className="re_picon">
                  <img
                    src={por.image ? por.image : picon}
                    alt="icon"
                    className="mw-100 mh-100"
                  />
                </div>
                <div className="pl-3">
                  <div className="d-flex flex-lg-row flex-column align-items-start align-items-lg-center pb-2">
                    {por.isReBakedProject && (
                      <img
                        src={LogoIcon}
                        alt="LogoIcon"
                        className="mr-2"
                        height="16px"
                      />
                    )}
                    <div className="p4 pr-2">{por.projectTitle}</div>
                    <span className="p4 color_gray text-nowrap pr-2">
                      <ReactTimeAgoC date={new Date(por.createdAt)} />{" "}
                    </span>
                    {/* <div className="re_starlbl text-nowrap">
                      <img src={star} alt="star" />
                      <span className="color_yellow pr-1">4.9</span>
                      <span className="color_gray">(156)</span>
                    </div> */}
                  </div>
                  {por.tags.map((tag, index) => {
                    return (
                      <span key={index} className="re_tag_item d-inline-block">
                        {tag}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="col-md-4 d-flex align-items-center justify-content-md-end re_view_earning_details pt-2 pt-md-0">
                <button
                  type="button"
                  className="btn btn-blue "
                  onClick={() => {
                    setOnePortfolio(por);
                    onViewPorfolioshow();
                  }}
                >
                  View Work
                </button>
                <button
                  type="button"
                  className="btn-link-sm mr-md-4 ml-4"
                  onClick={() => {
                    setPortfolioDeleteId(por._id);
                    handleShow();
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        <ModalYesNo
          show={show}
          handleClose={handleClose}
          handleOk={handleOk}
          showLoader={showLoader}
          showLoaderText="Deleting..."
          text="Are you sure want to Delete ?"
          subText="Please confirm with us to continue"
        />
        <ViewPorfolioModel
          show={viewPortfolio}
          data={getOnePortfolio}
          handleClose={onViewPorfolioClose}
        />
      </Container>
    </>
  );
};

export default Portfolio;

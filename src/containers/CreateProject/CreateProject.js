import React, { useState, useEffect, useContext, useRef } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import Modal1 from "../../components/Modal/Modal";
import uploadbtnnew1 from "../../assets/images/uploadbtnnew1.svg";
import pro_logo from "../../assets/images/non_photo.svg";
import non_photo from "../../assets/images/non_photo.svg";
import logo from "../../assets/images/logo.svg";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  createProjectAsync,
  updateProjectAsync,
  getProjectDetailsAsync,
  getMasterDetails,
} from "./redux/createProjectApi";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { CreateProjectActions } from "./redux/createProjectAction";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import { Redirect, useHistory, useParams, Link } from "react-router-dom";
import { propTypes } from "react-time-ago";
import { poolMethods } from "../../web3/functions/factory";
import { Web3Context } from "../../web3/contexts/web3Context";
import info from "../../assets/images/infoblack.svg";

const CreateProject = () => {
  const inputRef = useRef(null);
  const { networkDetails, handleConnect } = useContext(Web3Context);
  const [getInstance, setInstance] = useState();
  const [file, setFile] = useState({ file: null, url: "" });
  const [projectCoverImage, setProjectCoverImage] = useState({
    file: null,
    url: "",
  });
  const [existingToken, setExistingToken] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();

  const { projectDetail, createProjectModal, isLoading, masterData } =
    useSelector((state) => state.createProject, shallowEqual);

  useEffect(() => {
    setExistingToken(
      projectDetail.isExistingToken && projectDetail.isExistingToken.toString()
    );
  }, [projectDetail.isExistingToken]);

  useEffect(() => {
    if (params && params.projectId)
      dispatch(getProjectDetailsAsync(params.projectId));
    setFile({ file: null, url: projectDetail.logo });
  }, [params && params.projectId]);

  useEffect(() => {
    setFile({ file: null, url: projectDetail.logo });
  }, [projectDetail.logo]);

  useEffect(() => {
    (async () => {
      dispatch(getMasterDetails());
      const instance = await poolMethods.getInstance(networkDetails.web3);
      if (instance) {
        setInstance(instance);
      }
    })();
  }, [networkDetails.web3]);

  const { user } = useSelector((state) => state.auth, shallowEqual);

  const initialValues = {
    title: projectDetail.title || "",
    description: projectDetail.description || "",
    websiteURL: projectDetail.websiteURL || "",
    githubURL: projectDetail.githubURL || "",
    linkedIn: projectDetail.linkedIn || "",
    twitter: projectDetail.twitter || "",
    //category: projectDetail.category || "",
    isExistingToken:
      projectDetail.isExistingToken === true ||
        projectDetail.isExistingToken === false
        ? projectDetail.isExistingToken
        : "",
    totalBudget: projectDetail.totalBudget || "",
    blockchainNetwork: projectDetail.blockchainNetwork || "",
    tokenContract: projectDetail.tokenContract || "",
    tokenName: projectDetail.tokenName || "",
    tokenExplorer: projectDetail.tokenExplorer || "",
  };

  const CreateProjectSchema = Yup.object().shape({
    title: Yup.string()
      .trim()
      .min(3, "Please enter valid title")
      .required("Title is required"),
    description: Yup.string()
      .trim()
      .min(3, "Please enter valid description")
      .required("Description is required"),
    websiteURL: Yup.string()
      .trim()
      .url("Please enter valid link. example:'https://www.example.com/'")
      .required("Website URL is required"),
    githubURL: Yup.string()
      .trim()
      .url("Please enter valid link. example:'https://www.example.com/'")
      .required("Github URL is required"),
    linkedIn: Yup.string()
      .trim()
      .url("Please enter valid link. example:'https://www.example.com/'")
      .notRequired(),
    // .required("LinkedIn is required"),
    twitter: Yup.string()
      .trim()
      .url("Please enter valid link. example:'https://www.example.com/'")
      .notRequired(),
    // .required("Twitter is required"),
    /* category: Yup.string()
      .trim()
      .min(3, "Please enter valid category")
      .required("Category is required"), */
    totalBudget: Yup.number().min(1).required("Budget is required"),
    isExistingToken: Yup.boolean().required("Please select anyone"),
    blockchainNetwork:
      existingToken == "true"
        ? Yup.string().trim().required("Blockchain Network is required")
        : Yup.string(),
    tokenContract:
      existingToken == "true"
        ? Yup.string()
          .trim()
          .min(3, "Please enter valid Token Contract")
          .required("Token Contract is required")
        : Yup.string(),
    tokenName:
      existingToken == "true"
        ? Yup.string()
          .trim()
          // .min(3, "Please enter valid Token Name")
          .required("Name of Currency is required.")
        : Yup.string(),
    tokenExplorer:
      existingToken == "true"
        ? Yup.string()
          .trim()
          .min(3, "Please enter valid Token Explorer")
          .required("Token Explorer is required")
        : Yup.string(),
    file: Yup.mixed(),
  });
  const goBack = () => {
    history.goBack();
    // history.push(`project-details/${projectDetail && projectDetail._id}`);
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: CreateProjectSchema,
    onSubmit: async (values, { resetForm }) => {
      console.log({values})
      const route = `project-details/${projectDetail && projectDetail._id}`;
      let data = null;
      let profileCoverImage = null;
      if (file && file.file) {
        data = new FormData();
        data.append("img", file.file);
      }
      if (projectCoverImage && projectCoverImage.file) {
        profileCoverImage = new FormData();
        profileCoverImage.append("img", projectCoverImage.file);
      }

      let updatedValues = {}
      
      updatedValues.description = values.description;
      updatedValues.githubURL = values.githubURL;
      updatedValues.isExistingToken = values.isExistingToken;
      updatedValues.linkedIn = values.linkedIn;
      updatedValues.logo = values.logo;
      updatedValues.remainingBudget = values.totalBudget;
      updatedValues.title = values.title;
      updatedValues.tokenContract = values.tokenContract;
      updatedValues.tokenExplorer = values.tokenExplorer;
      updatedValues.tokenName = values.tokenName;
      updatedValues.totalBudget = values.totalBudget;
      updatedValues.twitter = values.twitter;
      updatedValues.websiteURL = values.websiteURL;

      if (values.blockchainNetwork) {
        //console.log("in", values.blockchainNetwork)
        updatedValues.blockchainNetworkUp = values.blockchainNetwork;
      }
      console.log({updatedValues})

      //SC OBJECT
      const createProjectObj = {
        token:
          updatedValues.isExistingToken == "true"
            ? updatedValues.tokenContract
            : "0x0000000000000000000000000000000000000000",
        budget: updatedValues.totalBudget,
      };
      //SC OBJECT

      if (!projectDetail.title) {

        if (updatedValues.isExistingToken == "true") {
          if (getInstance) {
            dispatch(CreateProjectActions.createProjectSCStart());
            try {
              let createProjectResp = await poolMethods.createProject(
                getInstance,
                networkDetails.address,
                createProjectObj
              );
              //console.log({ createProjectResp, createProjectObj })
              /* if (createProjectResp['events']['ApprovedProject'] && Object.keys(createProjectResp['events']['ApprovedProject']).length === 0) {
                updatedValues.scProjectId =
                  createProjectResp['events']['CreatedProject']["raw"]["topics"][1];
              } else {
                updatedValues.scProjectId =
                  createProjectResp['events']['CreatedProject']["raw"]["topics"][1];
                updatedValues.adminVerification = "ACCEPTED"
              } */
              if(updatedValues.isExistingToken == "true" && updatedValues.tokenContract != "0x0000000000000000000000000000000000000000"){
                updatedValues.adminVerification = "ACCEPTED";
                updatedValues.statusApprovedByInitiator = "COMPLETED";
              }
              
              updatedValues.scProjectId =
                  createProjectResp['events']['CreatedProject']["raw"]["topics"][1];
              dispatch(CreateProjectActions.createProjectSCSuccess());
              // createProjectError

              dispatch(
                createProjectAsync(updatedValues, data, profileCoverImage, goBack)
              );
            } catch (error) {
              dispatch(CreateProjectActions.createProjectError(error));
              toast.error(error);
            }
          } else {
            handleConnect()
          }
        } else {
          dispatch(
            createProjectAsync(updatedValues, data, profileCoverImage, goBack)
          );
        }


        setExistingToken("");
        setFile({ file: null, url: "" });
        setProjectCoverImage({ file: null, url: "" });
        resetForm();
        if (inputRef.current) {
          return (inputRef.current.value = "");
        }
      }


      if (projectDetail.title) {

        if (updatedValues.isExistingToken == "true") {
          if (getInstance) {
            dispatch(CreateProjectActions.createProjectSCStart());
            try {
              let createProjectResp = await poolMethods.createProject(
                getInstance,
                networkDetails.address,
                createProjectObj
              );
              console.log({ createProjectResp, createProjectObj })
              if (createProjectResp['events']['ApprovedProject'] && Object.keys(createProjectResp['events']['ApprovedProject']).length === 0) {
                updatedValues.scProjectId =
                  createProjectResp['events']['CreatedProject']["raw"]["topics"][1];
              } else {
                updatedValues.scProjectId =
                  createProjectResp['events']['CreatedProject']["raw"]["topics"][1];
                //updatedValues.adminVerification = "ACCEPTED"
              }
              dispatch(CreateProjectActions.createProjectSCSuccess());
              // createProjectError

              return dispatch(
                updateProjectAsync(
                  projectDetail._id,
                  updatedValues,
                  data,
                  goBack,
                  null,
                  profileCoverImage
                )
              );
            } catch (error) {
              dispatch(CreateProjectActions.createProjectError(error));
              toast.error(error);
            }
          } else {
            handleConnect()
          }
        } else {

          resetForm();
          setExistingToken("");
          return dispatch(
            updateProjectAsync(
              projectDetail._id,
              updatedValues,
              data,
              goBack,
              null,
              profileCoverImage
            )
          );
        }
      }
    }
  })

  const uploadImage = (e) => {
    setFile({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };
  const uploadProfileCoverImage = (e) => {
    formik.setFieldValue("file", e.target.files[0]);
    setProjectCoverImage({
      url: URL.createObjectURL(e.target.files[0]),
      file: e.target.files[0],
    });
  };

  const onCloseCreateProject = () => {
    dispatch(CreateProjectActions.onCloseCreateProject());
  };

  const existingTokenChange = (event) => {
    formik.handleChange(event);
    setExistingToken(event.target.value);
  };

  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle
        title={projectDetail.title ? "Edit Project" : "Create Project"}
      />
      <section className="pt-80 pb-80">
        <Container className="bg-white shadowBox">
          <form className="row" onSubmit={formik.handleSubmit}>
            <Col md={12}>
              <Row>
                <Col md="auto">
                  <div className="re_profileUpload p-3 re_pro_logo d-flex align-items-center justify-content-center">
                    <img
                      src={
                        file.url ? file.url : user.logo ? user.logo : non_photo
                      }
                      alt="LOGO"
                      className="mw-100 mh-100"
                    />
                    <div className="re_uploadBtn">
                      <input
                        type="file"
                        title="Please Select Image Resolution of 170*170 For Best View."
                        accept=".png, .jpg, .jpeg"
                        onChange={uploadImage}
                      />
                      <img src={uploadbtnnew1} alt="updatebtn" />
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="form-group">
                    <input
                      name="title"
                      type="text"
                      placeholder="Title"
                      className="form-control re_input"
                      {...formik.getFieldProps("title")}
                    />
                    {formik.touched.title && formik.errors.title ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.title}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <textarea
                      name="description"
                      rows={4}
                      placeholder="Description"
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

                  <div className="form-group row align-items-center">
                    <label className="h3 col-auto">
                      Cover image{" "}
                      <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={
                          <Tooltip className="re_tooltip">
                            Please Select Image Resolution of 1920*270 For Best
                            View.
                          </Tooltip>
                        }
                      >
                        <img
                          src={info}
                          alt="info"
                          width="15px"
                          className="ml-2"
                        />
                      </OverlayTrigger>
                    </label>
                    <div className=" col-md-6">
                      <input
                        type="file"
                        className="form-control py-1"
                        ref={inputRef}
                        accept=".png, .jpg, .jpeg"
                        onChange={uploadProfileCoverImage}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <div className="h2 pb-3">Social Visibility</div>
            </Col>
            <Col md={4}>
              <div className="form-group">
                <input
                  nae="websiteURL"
                  type="text"
                  placeholder="Website URL"
                  className="form-control re_input"
                  {...formik.getFieldProps("websiteURL")}
                />
                {formik.touched.websiteURL && formik.errors.websiteURL ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.websiteURL}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="form-group">
                <input
                  name="githubURL"
                  type="text"
                  placeholder="GitHub URL"
                  className="form-control re_input"
                  {...formik.getFieldProps("githubURL")}
                />
                {formik.touched.githubURL && formik.errors.githubURL ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.githubURL}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="form-group">
                <input
                  name="linkedIn"
                  type="text"
                  placeholder="LinkedIn"
                  className="form-control re_input"
                  {...formik.getFieldProps("linkedIn")}
                />
                {formik.touched.linkedIn && formik.errors.linkedIn ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.linkedIn}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>
            <Col md={4}>
              <div className="form-group">
                <input
                  name="twitter"
                  type="text"
                  placeholder="Twitter"
                  className="form-control re_input"
                  {...formik.getFieldProps("twitter")}
                />
                {formik.touched.twitter && formik.errors.twitter ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{formik.errors.twitter}</div>
                  </div>
                ) : null}
              </div>
            </Col>
            {/* <Col md={12}>
              <div className="h2 pb-3">Project Category</div>
            </Col>
            <Col md={4}>
              <div className="form-group">
                <select
                  name="category"
                  className="form-control re_input"
                  {...formik.getFieldProps("category")}
                >
                  <option value="" disabled selected hidden>
                    Category
                        </option>

                  {masterData.projectCategories && masterData.projectCategories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.category}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col> */}
            <Col md={12}>
              <div className="h2 pb-3">Budget & Tokenomics</div>
            </Col>
            <Col md={4}>
              <div className="form-group">
                <input
                  name="totalBudget"
                  type="number"
                  placeholder="Total Project Budget"
                  className="form-control re_input"
                  {...formik.getFieldProps("totalBudget")}
                  readOnly={
                    Object.keys(projectDetail).length > 0 ? true : false
                  }
                />
                {formik.touched.totalBudget && formik.errors.totalBudget ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.totalBudget}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>

            <Col md={4}>
              <div className="form-group">
                <select
                  name="isExistingToken"
                  className="form-control re_input"
                  onChange={existingTokenChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.isExistingToken || existingToken}
                  disabled={projectDetail.isExistingToken}
                >
                  <option value="" disabled selected hidden>
                    Is there any existing token?
                  </option>
                  <option key="Yes" value="true">
                    Yes
                  </option>
                  <option key="No" value="false">
                    No
                  </option>
                </select>
                {formik.touched.isExistingToken &&
                  formik.errors.isExistingToken ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {formik.errors.isExistingToken}
                    </div>
                  </div>
                ) : null}
              </div>
            </Col>

            {existingToken == "true" ? (
              <>
                <Col md={12}></Col>
                <Col md={4}>
                  {!projectDetail.blockchainNetwork ? (
                    <div className="form-group">
                      <select
                        name="blockchainNetwork"
                        className="form-control re_input"
                        {...formik.getFieldProps("blockchainNetwork")}
                      >
                        <option value="" disabled selected hidden>
                          Blockchain Network
                        </option>
                        {masterData.blockchainNetwork &&
                          masterData.blockchainNetwork.map((blockchain) => (
                            <option key={blockchain._id} value={blockchain._id}>
                              {blockchain.name}
                            </option>
                          ))}
                      </select>
                      {formik.touched.blockchainNetwork &&
                        formik.errors.blockchainNetwork ? (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.blockchainNetwork}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control re_input"
                        value={projectDetail.blockchainNetwork}
                        disabled={true}
                      />
                    </div>
                  )}
                </Col>
                <Col md={12}></Col>
                <Col md={4}>
                  <div className="form-group">
                    <input
                      name="tokenContract"
                      type="text"
                      placeholder="Token Contract"
                      className="form-control re_input"
                      {...formik.getFieldProps("tokenContract")}
                      readOnly={
                        Object.keys(projectDetail).length > 0 &&
                          projectDetail.tokenContract
                          ? true
                          : false
                      }
                    />
                    {formik.touched.tokenContract &&
                      formik.errors.tokenContract ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.tokenContract}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="form-group">
                    <input
                      name="tokenName"
                      type="text"
                      placeholder="Name of Currency"
                      className="form-control re_input"
                      {...formik.getFieldProps("tokenName")}
                      readOnly={
                        Object.keys(projectDetail).length > 0 &&
                          projectDetail.tokenName
                          ? true
                          : false
                      }
                    />
                    {formik.touched.tokenName && formik.errors.tokenName ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.tokenName}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="form-group">
                    <input
                      name="tokenExplorer"
                      type="text"
                      placeholder="Token Explorer"
                      className="form-control re_input"
                      {...formik.getFieldProps("tokenExplorer")}
                      readOnly={
                        Object.keys(projectDetail).length > 0 &&
                          projectDetail.tokenExplorer
                          ? true
                          : false
                      }
                    />
                    {formik.touched.tokenExplorer &&
                      formik.errors.tokenExplorer ? (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.tokenExplorer}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </Col>
              </>
            ) : null}
            {existingToken == "false" && (
              <Col md={12}>
                <div className="form-group">
                  <span className="borderLink">
                    Please procced by applying for a Token Debt Issurance via
                    the <Link>RBKD DAO.</Link>
                  </span>
                </div>
              </Col>
            )}

            <Col md={12} className="pt-4">
              <Button
                type="submit"
                variant="blue"
                disabled={
                  isLoading ||
                  JSON.stringify(initialValues) ===
                  JSON.stringify(formik.values)
                }
              >
                {isLoading ? (
                  <>
                    {projectDetail.title ? "Updating..." : "Creating..."}
                    <img
                      src={LoadingImage}
                      alt="LoadingImage"
                      width="20px"
                      className="ml-2"
                    />
                  </>
                ) : projectDetail.title ? (
                  "Save Project"
                ) : (
                  "Create Project"
                )}
              </Button>
            </Col>
          </form>
        </Container>
      </section>

      <Modal1
        show={createProjectModal}
        handleClose={onCloseCreateProject}
        packagesBtn="true"
        text="Your project creation request has been submitted."
        subtext="Wait for approval from admin"
      />
    </>
  );
};
export default CreateProject;

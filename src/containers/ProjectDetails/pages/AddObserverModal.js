import React, { useState, useEffect, useContext } from "react";
import { Modal, Col, Row, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, useFormik } from "formik";
import {
  getAllusers,
  addObserver,
  updateObserver,
} from "../redux/observerListApi";

import CheckCircle from "./../../../assets/images/CheckCircle.svg";
import { getAllPackagesAsync } from "../../CreateProject/redux/createProjectApi";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import { Web3Context } from "../../../web3/contexts/web3Context";
import { poolMethods } from '../../../web3/functions/factory'
import { observerListActions } from "../redux/observerListAction"
import { toast } from "react-toastify";

const Emailregex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const AddObserverModal = (props) => {
  const { networkDetails, handleConnect } = useContext(Web3Context);
  const dispatch = useDispatch();
  const { AddModalShow, CloseAddModal } = props;
  const [users, setUsers] = useState([]);
  const [walletAddress, setWalletAddress] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [getInstance, setInstance] = useState();

  const params = useParams();

  const { masterData, allUsers, addingObserverLoading, observerDetails } =
    useSelector((state) => state.projectList);

  const { getAllPackages, projectDetail } = useSelector((state) => state.createProject);

  useEffect(() => {
    (async () => {
      const instance = await poolMethods.getInstance(networkDetails.web3)
      if (instance) {
        setInstance(instance);
      }
    })()
  }, [networkDetails.web3])

  useEffect(() => {
    if (params && params.projectId) {
      dispatch(getAllusers());
      dispatch(getAllPackagesAsync(params.projectId));
    }
  }, [params && params.projectId]);

  useEffect(() => {
    if (observerDetails.observerDetails) {
      props.setPackageId(observerDetails.packages);
      props.updatePackagesStats((preValues) => {
        return {
          ...preValues,
          ["alreadySelected"]: observerDetails.packages,
        };
      });
      props.setUserId(observerDetails.observerDetails.id);
    } else {
      props.setPackageId([]);
    }
  }, [observerDetails]);

  const onChangeHandler = (searchText) => {
    let matches = [];
    if (searchText.length > 0) {
      matches = allUsers.filter((user) => {
        const regex = new RegExp(`${searchText}`, "gi");
        return user.fullName.match(regex);
      });
    }
    setSuggestions(matches);
    props.setSearchText(searchText);
  };

  const onChangePackages = ({ target: { checked, value } }, name) => {
    if (checked) {
      props.setPackageId((oldPackageIds) => {
        return [...oldPackageIds, value];
      });
      props.updatePackagesStats((preValues) => {
        return {
          ...preValues,
          ["newChecked"]: [...preValues.newChecked, { _id: value, name }],
          ["removed"]: [...preValues.removed.filter((e) => e._id != value)],
        };
      });
    } else {
      props.setPackageId((oldPackageIds) => {
        return oldPackageIds.filter((e) => e != value);
      });

      props.updatePackagesStats((preValues) => {
        return {
          ...preValues,
          ["newChecked"]: [
            ...preValues.newChecked.filter((e) => e._id != value),
          ],
          ["removed"]: [...preValues.removed, { _id: value, name }],
        };
      });
    }
  };

  const userVal = observerDetails.observerDetails
    ? observerDetails.observerDetails._id
    : "";

  const initialValues = {
    user: userVal,
    role: (observerDetails && observerDetails.role) || "",
    //package: ""
  };

  const ObserverSchema = Yup.object().shape({
    user:
      props.userId !== ""
        ? Yup.string()
        : Yup.string()
          .matches(Emailregex, "Please enter valid email address")
          .min(3, "Minimum 3 symbols")
          .max(64, "Maximum 64 symbols")
          .required("Please enter email/name."),
    role: Yup.string().trim().required("Please choose anyone"),
    /* package: packageIds.length > 0
      ? Yup.string()
      : Yup.string()
        .required("Please choose at least one WorkTask") */
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ObserverSchema,
    onSubmit: async (values, { resetForm }) => {
      if (props.packageIds.length === 0) {
        props.setWorkTaskError("Please choose at least one WorkTask");
        return false;
      }

      const updatedObj = {
        user: props.userId || values.user,
        role: values.role,
        packages: props.packageIds,
      };

      props.setObject(updatedObj);

      props.setSearchText("");
      props.setPackageId([]);

      if (!observerDetails) {
        resetForm();
        props.setWorkTaskError("");

        //SC OBJECT
        const addObserverObj = {
          projectId: projectDetail.scProjectId,
          observers: [walletAddress]
        };
        //SC OBJECT
        //console.log({addObserverObj, getInstance})


        /* if (getInstance) {
          try {
            dispatch(observerListActions.addObserverSCStart());
            const addObservers = await poolMethods.addObserver(getInstance, networkDetails.address, addObserverObj)
            console.log({addObservers})
            dispatch(observerListActions.addObserverSCSuccess());
            if (addObservers && addObservers.blockHash) {
              
              const data = await dispatch(
                addObserver(
                  params.projectId,
                  updatedObj,
                  allUsers.find(({ _id }) => _id === updatedObj.user)
                )
              );
              
              if (data.responseCode === 200) {
                return resetForm();
              }
            }
          } catch (err) {
            toast.error(err)
            dispatch(observerListActions.addObserverError());
          }
        } else {
          handleConnect()
        }   */

        const data = await dispatch(
          addObserver(
            params.projectId,
            updatedObj,
            allUsers.find(({ _id }) => _id === updatedObj.user)
          )
        );
        
        if (data.responseCode === 200) {
          return resetForm();
        }
      
      }
      if (observerDetails) {
        if (props.packagesStats.removed.length > 0) {
          props.StopSupportModalShow(true);
        } else {
          resetForm();
          props.setWorkTaskError("");
          return dispatch(updateObserver(params.projectId, updatedObj));
        }
      }
    },
  });

  const userValue = observerDetails.observerDetails
    ? observerDetails.observerDetails.name
    : formik.values.name || props.searchText;

  const closeModal = () => {
    CloseAddModal();
    props.setSearchText("");
    props.setPackageId([]);
    formik.resetForm();
  };
  return (
    <>
      <Modal
        show={AddModalShow}
        onHide={closeModal}
        centered
        size="lg"
        className="max-width-624px"
      >
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">
            {observerDetails ? "Update" : "Add"} an Observer
          </div>
        </Modal.Header>
        <Modal.Body className="px-4">
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group position-relative">
              <label className="form-label">Name / Email*</label>
              <input
                name="user"
                placeholder="Enter observer name or email"
                type="text"
                className={"form-control re_inputRouded"}
                onChange={(e) => {
                  formik.handleChange(e);
                  props.setUserId("");
                  setWalletAddress("")
                  onChangeHandler(e.target.value);
                }}
                //value={searchText}
                onBlur={formik.handleBlur}
                readOnly={observerDetails ? true : false}
                autoComplete="off"
                value={userValue}
              //onBlur={() => setSuggestions([])}
              />

              {formik.touched.user && formik.errors.user ? (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">{formik.errors.user}</div>
                </div>
              ) : null}

              {suggestions.length > 0 && (
                <div className="rbt-menu dropdown-menu show">
                  {suggestions.map((suggestion, i) => (
                    <a
                      id={`typeHead-item-${i}`}
                      key={suggestion._id}
                      className="dropdown-item"
                      onClick={() => {
                        props.setSearchText(suggestion.fullName);

                        if ("user" in formik.errors) {
                          delete formik.errors["user"];
                        }
                        props.setUserId(suggestion._id);
                        setWalletAddress(suggestion.walletAddress)
                        setSuggestions([]);
                      }}
                    >
                      {suggestion.fullName}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <Row>
              <Col md={6}>
                <div className="form-group">
                  <label className="form-label">Role*</label>
                  <select
                    className="form-control re_inputRouded"
                    name="role"
                    {...formik.getFieldProps("role")}
                  >
                    <option value="" disabled selected hidden>
                      Please choose anyone
                    </option>
                    {masterData.observerRoles &&
                      masterData.observerRoles.map((observerRole) => {
                        return (
                          <option
                            key={observerRole._id}
                            value={observerRole._id}
                          >
                            {observerRole.name}
                          </option>
                        );
                      })}
                  </select>
                  {formik.touched.role && formik.errors.role ? (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">{formik.errors.role}</div>
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>

            <label className="form-label">Select Assigned WorkTasks*</label>
            <Row>
              {getAllPackages && getAllPackages.length > 0 ? (
                getAllPackages.map((packageDetails) => {
                  return (
                    <Col md={6} key={packageDetails._id}>
                      <label className="re_selectWorktask">
                        <input
                          type="checkbox"
                          value={packageDetails._id}
                          name="package"
                          onClick={(e) =>
                            onChangePackages(e, packageDetails.name)
                          }
                          defaultChecked={
                            observerDetails.packages &&
                            observerDetails.packages.includes(
                              packageDetails._id
                            ) &&
                            true
                          }
                        />
                        <span>
                          {packageDetails.name}
                          <img src={CheckCircle} alt="" />
                        </span>
                      </label>
                    </Col>
                  );
                })
              ) : (
                <div className="text-center ml-3 p3 color_gray ">
                  No worktask present
                </div>
              )}
            </Row>
            {props.workTaskError ? (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{props.workTaskError}</div>
              </div>
            ) : null}
            <div className="d-flex justify-content-end pt-3">
              <Button type="submit" variant="blue">
                {addingObserverLoading ? (
                  <>
                    {observerDetails ? "Updating..." : "Adding..."}
                    <img
                      src={LoadingImage}
                      alt="LoadingImage"
                      width="20px"
                      className="ml-2"
                      disabled={addingObserverLoading}
                    />
                  </>
                ) : observerDetails ? (
                  "Update an Observer"
                ) : (
                  "Add an Observer"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddObserverModal;

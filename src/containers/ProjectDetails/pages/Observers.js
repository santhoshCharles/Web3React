import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { useHistory } from "react-router";

import a1 from "./../../../assets/images/a1.png";
import message from "./../../../assets/images/message.svg";
import closeGray from "./../../../assets/images/closeGray.svg";
import UserCircle from "./../../../assets/images/UserCircle.svg";
import StopSupportModal from "./StopSupportModal";
import AddObserverModal from "./AddObserverModal";
import {
  getMasterDetails,
  getObserverList,
  removeObserver,
  getObserverDetails,
  updateObserver,
} from "../redux/observerListApi";
import { observerListActions } from "../redux/observerListAction";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import BasicPagination from "../../../components/Pagination/BasicPagination";
import ChatModal from "../../../components/Chat/chatModal";

export const Observers = () => {
  const history = useHistory();
  const {
    isLoading,
    addingObserverLoading,
    observerList,
    masterData,
    observerSkip,
    observerLimit,
    refreshList,
    removingObserverLoading,
  } = useSelector((state) => state.projectList);

  const { user } = useSelector((state) => state.auth, shallowEqual);

  const [StopSupportModalShow, setStopSupportModalShow] = useState(false);
  const [userObj, setUserObj] = useState({
    _id: "",
    profilePicture: "",
    fullName: "",
    role: "",
  });
  const [roleData, setRoleData] = useState({
    user: "",
    role: "",
    packages: [],
  });
  const [showChatModal, setshowChatModal] = useState(false);
  const [AddModalShow, setAddModalShow] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const [packagesStats, setPackagesStats] = useState({
    alreadySelected: [],
    newChecked: [],
    removed: [],
  });
  const [workTaskError, setWorkTaskError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [updatedObject, setObject] = useState({});
  const [packageIds, setPackageId] = useState([]);
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const params = useParams();

  const handleCloseChatModal = () => {
    setshowChatModal(false);
  };
  const CloseStopSupportModal = () => {
    setStopSupportModalShow(false);
  };
  const ShowStopSupportModal = (selectedObserver, show) => {
    setPackagesStats({ alreadySelected: [], newChecked: [], removed: [] });
    const { _id, profilePicture, fullName, role } = selectedObserver;
    const roleName = masterData.observerRoles.find((obj) => obj._id === role);
    setUserObj({ _id, profilePicture, fullName, role: roleName.name });
    if (show) {
      setStopSupportModalShow(true);
    }
  };

  const showSupportModalHideEditModal = () => {
    setAddModalShow(false);
    setStopSupportModalShow(true);
  };

  const CloseAddModal = () => setAddModalShow(false);
  const ShowAddModal = () => {
    setPackagesStats({ alreadySelected: [], newChecked: [], removed: [] });
    dispatch(observerListActions.resetObserverDetails());
    setAddModalShow(true);
    setWorkTaskError("");
    setPackageId([]);
    setUserId("")
  };

  const ShowEditModal = async (observer) => {
    ShowStopSupportModal(observer, false);
    await dispatch(getObserverDetails(params.projectId, observer._id));

    setPackagesStats({ alreadySelected: [], newChecked: [], removed: [] });
    setAddModalShow(true);
    setWorkTaskError("");
  };

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : observerSkip;
    dispatch(observerListActions.setObserverBatchNumber(count));
  };

  const deleteObserver = () => {
    dispatch(observerListActions.setObserverBatchNumber(0));
    dispatch(removeObserver(params.projectId, userObj._id));
  };

  const roleChangeHandler = async (e, observer) => {
    const updatedObj = {
      user: observer._id,
      role: e.target.value,
      packages: observer.packages,
    };
    setRoleData(updatedObj);
    return await dispatch(updateObserver(params.projectId, updatedObj));
  };

  const updatePackagesStats = (data) => {
    setPackagesStats(data);
  };

  const stopObservation = async () => {
    const updatedObjectData = {
      ...updatedObject,
      packagesStats,
    };
    await dispatch(updateObserver(params.projectId, updatedObjectData));
  };

  useEffect(() => {
    dispatch(getMasterDetails());
  }, []);

  useEffect(() => {
    if (params && params.projectId) {
      dispatch(getObserverList(params.projectId));
    }
  }, [params && params.projectId, refreshList, addingObserverLoading]);

  useEffect(() => {
    if (addingObserverLoading === false) {
      setAddModalShow(false);
    }
    if (removingObserverLoading === false) {
      setStopSupportModalShow(false);
    }
  }, [addingObserverLoading, removingObserverLoading]);

  useEffect(() => {
    return () => dispatch(observerListActions.resetPaginationCount(0));
  }, []);

  return (
    <>
      {isLoading && <SplashScreen />}
      <Container className="bg-white shadowBox radius-top-0">
        <div>
          {observerList.records &&
            observerList.records.map((observer) => {
              return (
                <div className="re_ObserversItem" key={observer._id}>
                  <Row className="align-items-center">
                    <Col xl={5} className="pb-xl-0 pb-3">
                      <div className="d-flex align-items-center">
                        <div
                          className="re_picon"
                          onClick={() =>
                            history.push(
                              `/aplicant-profile?aplicantId=${observer._id}`
                            )
                          }
                          style={{
                            background: `url(${observer.profilePicture})no-repeat scroll center center / cover`,
                          }}
                        ></div>
                        <div className="pl-3">
                          <div className="p1">
                            <Link onClick={() => ShowEditModal(observer)}>
                              {observer.fullName}
                            </Link>
                          </div>
                          <div className="d-flex align-items-center flex-wrap">
                            {masterData.skills &&
                              masterData.skills.map((skills) => {
                                if (
                                  observer.skills &&
                                  observer.skills.includes(skills._id)
                                ) {
                                  return (
                                    <label
                                      className="lbl-green mr-1 w-auto"
                                      key={skills._id}
                                    >
                                      #{skills.name}
                                    </label>
                                  );
                                }
                              })}
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col xl={7}>
                      <Row>
                        <Col md={4}>
                          <div className="position-relative d-flex align-items-center">
                            <img
                              src={UserCircle}
                              alt=""
                              className="re_UserCircle"
                            />
                            <select
                              className="form-control re_input re_ObserversSelect"
                              //defaultValue={observer.role}
                              onChange={(e) => roleChangeHandler(e, observer)}
                              value={
                                observer._id === roleData.user
                                  ? roleData.role
                                  : observer.role
                              }
                            >
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
                          </div>
                        </Col>
                        <Col md={4}>
                          <button
                            type="submit"
                            className="btn btn-link text-dark d-flex align-items-center"
                            onClick={() => ShowStopSupportModal(observer, true)}
                          >
                            <img src={closeGray} alt="" />
                            <span className="pl-2">Remove Observer</span>
                          </button>
                        </Col>
                        <Col md={4}>
                          <button
                            type="submit"
                            className="btn btn-link text-dark d-flex align-items-center"
                            onClick={() => {
                              setshowChatModal(true);
                              setSelectedUserInfo({
                                _id: observer._id,
                                fullName: observer.fullName,
                              });
                            }}
                          >
                            <img src={message} alt="" />
                            <span className="pl-2">Send Message</span>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              );
            })}

          {observerList.recordsTotal > 0 && (
            <div className="row d-flex align-items-center mt-3">
              <div className="col-md-12 aspgntn">
                <BasicPagination
                  totalRecords={observerList.recordsTotal}
                  filteredRecords={observerList.recordsFiltered}
                  limit={observerLimit}
                  batch={observerSkip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
            </div>
          )}
        </div>
        {observerList.recordsTotal === 0 ? (
          <div class="text-center p3 color_gray py-4">
            No observer available
          </div>
        ) : null}
        <div className="d-flex justify-content-end">
          <Button variant="blue" onClick={ShowAddModal}>
            Add an Observer
          </Button>
        </div>
      </Container>
      <AddObserverModal
        AddModalShow={AddModalShow}
        CloseAddModal={CloseAddModal}
        updatePackagesStats={updatePackagesStats}
        packagesStats={packagesStats}
        StopSupportModalShow={showSupportModalHideEditModal}
        setWorkTaskError={setWorkTaskError}
        workTaskError={workTaskError}
        setSearchText={setSearchText}
        searchText={searchText}
        setObject={setObject}
        setPackageId={setPackageId}
        packageIds={packageIds}
        setUserId={setUserId}
        userId={userId}
      />
      <StopSupportModal
        StopSupportModalShow={StopSupportModalShow}
        CloseStopSupportModal={CloseStopSupportModal}
        deleteObserver={deleteObserver}
        removingObserverLoading={removingObserverLoading}
        {...userObj}
        packagesStats={packagesStats}
        stopObservation={stopObservation}
      />
      <Modal show={showChatModal} onHide={handleCloseChatModal} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">{selectedUserInfo.fullName}</div>
        </Modal.Header>
        {user && (
          <Modal.Body className="p-4">
            <ChatModal recieverId={selectedUserInfo._id} senderId={user._id} />
          </Modal.Body>
        )}
      </Modal>
    </>
  );
};

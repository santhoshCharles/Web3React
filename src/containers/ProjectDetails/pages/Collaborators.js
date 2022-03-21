import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Dropdown, Modal } from "react-bootstrap";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link, useParams, useHistory } from "react-router-dom";
import moment from "moment";
import {
  getCollaboratorList,
  removeCollaborator,
} from "../../CreateProject/redux/createProjectApi";
import { CreateProjectActions } from "../../CreateProject/redux/createProjectAction";
import BasicPagination from "../../../components/Pagination/BasicPagination";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import ChatModal from "../../../components/Chat/chatModal";

import a1 from "./../../../assets/images/a1.png";
import { get } from "../../../utils";
import message from "./../../../assets/images/message.svg";
import closeGray from "./../../../assets/images/closeGray.svg";
import UserCircle from "./../../../assets/images/UserCircle.svg";
import EndContractModal from "./EndContractModal";
import success from "../../../assets/images/success.svg";
import Database from "../../../assets/images/Database.svg";
import DotsThree from "../../../assets/images/DotsThree.svg";
import trophy from "../../../assets/images/trophy.svg";
import trophy2 from "../../../assets/images/trophy2.svg";
import { dayDifferenceTimestamp, getMasterData } from "../../../utils";
import { getMasterDetailsAsync } from "../../GetMasterDetailRedux";

export const Collaborators = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const [skills, setSkills] = useState([]);
  const [showChatModal, setshowChatModal] = useState(false);
  const [selectedUserInfo, setSelectedUserInfo] = useState({});
  const [selectedCollaborator, setSelectedCollaborator] = useState({});
  const [projectTypes, setProjectTypes] = useState([]);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const handleCloseChatModal = () => {
    setshowChatModal(false);
  };
  const handleChatbutton = (userInfo) => {
    setshowChatModal(true);
    setSelectedUserInfo(userInfo);
  };
  const {
    refreshCollaboratorList,
    collaboratorListData,
    collaboratorSkip,
    isCollaboratorListLoading,
    projectDetail,
    collaboratorLimit,
  } = useSelector((state) => state.createProject, shallowEqual);

  const daysDifferenceStartDate = (startDate, endDate) => {
    if (startDate > Date.now()) {
      return `${dayDifferenceTimestamp(
        startDate,
        Date.now()
      )}${" "}days yet to start`;
    } else if (startDate < Date.now() && endDate > Date.now()) {
      return `${dayDifferenceTimestamp(endDate, Date.now())}${" "}days left`;
    } else {
      return `completed`;
    }
  };
  useEffect(() => {
    if (refreshCollaboratorList) {
      dispatch(getCollaboratorList(params && params.projectId));
    }
  }, [refreshCollaboratorList]);

  const { masterDetails } = useSelector(
    (state) => state.masterDetails,
    shallowEqual
  );

  const getSkillTypeName = (skillId) => {
    const skillType = skills.filter((skill) => {
      return skill._id === skillId;
    });
    if (skillType && skillType.length > 0) {
      return skillType[0].name;
    } else {
      return "";
    }
  };
  useEffect(() => {
    if (Object.keys(masterDetails).length >= 3) {
      Object.keys(masterDetails).map((type) => {
        const masterD = get(["values"], masterDetails[type]).map((r) => ({
          label: r._id,
          name: r.name,
          _id: r._id,
        }));
        if (masterDetails[type].type === "Skills") {
          setSkills(masterD);
        }
      });
    }

    const masterData = getMasterData("Project Types", masterDetails);
    setProjectTypes(masterData);
  }, [masterDetails]);

  const [StopSupportModalShow, setStopSupportModalShow] = useState(false);
  const CloseStopSupportModal = () => setStopSupportModalShow(false);
  const ShowStopSupportModal = (collaborator, packageId) => {
    setSelectedCollaborator({ collaborator, packageId });
    setStopSupportModalShow(true);
  };
  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : collaboratorSkip;
    dispatch(CreateProjectActions.setCollaboratorListBatchNumber(count));
  };

  const getProjectTypeName = (projectTypeId) => {
    if (projectTypeId) {
      const project = projectTypes.filter((projectType) => {
        return projectType._id === projectTypeId;
      });
      if (project[0]) {
        return project[0].name;
      } else {
        return "";
      }
    }
  };

  useEffect(() => {
    // dispatch(getMasterDetailsAsync());
    return () => {
      setSkills([]);
      dispatch(CreateProjectActions.resetCollaboratorList());
    };
  }, []);

  return (
    <>
      {isCollaboratorListLoading && <SplashScreen />}
      <Container className="bg-white shadowBox radius-top-0">
        {collaboratorListData.recordsTotal > 0 ? (
          collaboratorListData.records.map((collaborator, index) => (
            <div className="re_EarningsList px-4" key={collaborator._id}>
              <>
                <div className="d-flex align-items-center flex-wrap justify-content-lg-between">
                  <div className="h3">
                    {collaborator.name ? collaborator.name : ""}{" "}
                  </div>
                  <div className="d-flex align-items-center flex-wrap justify-content-end">
                    <div className="d-flex flex-wrap align-items-center px-2 py-2">
                      <img src={trophy2} alt="trophy" width="19px" />
                      <div className="h6 pl-2 pr-2">
                        {collaboratorListData.tokenName !== null
                          ? collaboratorListData.tokenName
                          : "$"}{" "}
                        {collaborator.minimumCost
                          ? collaborator.minimumCost
                          : ""}
                      </div>
                      <div className="p5 color_gray">
                        Min. Guaranteed Payment
                      </div>
                    </div>
                    <div className="d-flex flex-wrap align-items-center px-2 py-2">
                      <img src={trophy} alt="trophy2" className="mr-2" />
                      <div className="p5 color_gray pr-2">Bonus:</div>
                      {collaboratorListData.tokenName !== null
                        ? collaboratorListData.tokenName
                        : "$"}{" "}
                      {collaborator.bonus ? collaborator.bonus : 0}
                    </div>
                  </div>
                </div>
                <div>
                  {collaborator.collaborators.length > 0 &&
                    collaborator.collaborators.map(
                      (collaboratorData, index) => (
                        <div
                          className="re_ObserversItem"
                          key={collaboratorData._id}
                        >
                          <Row className="align-items-center">
                            <Col xl={5} className="pb-xl-0 pb-3">
                              <div className="d-flex align-items-center">
                                <div
                                  className="re_picon"
                                  style={{
                                    background: `url(${
                                      collaboratorData.profilePicture
                                        ? collaboratorData.profilePicture
                                        : a1
                                    })no-repeat scroll center center / cover`,
                                  }}
                                ></div>
                                <div className="pl-3">
                                  <div className="d-flex flex-md-row flex-column align-items-start align-items-lg-center">
                                    <div className="p1 pb-2 pr-3">
                                      {collaboratorData.fullName
                                        ? collaboratorData.fullName
                                        : ""}
                                    </div>
                                    {/* <div className="d-flex flex-md-row flex-column align-items-start align-items-md-center pb-2">
                                      <div className="p3 d-flex align-items-center pr-3">
                                        <img
                                          src={Database}
                                          alt="Database"
                                          className="mr-2"
                                        />
                                        <span>14,000.00</span>
                                      </div>
                                      <div className="p3 d-flex align-items-center">
                                        <img
                                          src={success}
                                          alt="success"
                                          className="mr-2"
                                        />
                                        <span>10</span>
                                      </div>
                                    </div> */}
                                  </div>
                                  <div className="d-flex align-items-center flex-wrap">
                                    {collaboratorData.skills.length > 0 &&
                                      collaboratorData.skills.map(
                                        (skill, index) => (
                                          <label
                                            key={skill._id}
                                            className="lbl-green mr-1 w-auto"
                                          >
                                            {getSkillTypeName(skill)}
                                          </label>
                                        )
                                      )}
                                  </div>
                                </div>
                              </div>
                            </Col>
                            <Col xl={7}>
                              <Row>
                                {!collaboratorData.isReviewed && (
                                  <Col md={4}>
                                    <button
                                      type="button"
                                      className="btn btn-link text-dark d-flex align-items-center"
                                      onClick={() =>
                                        ShowStopSupportModal(
                                          collaboratorData,
                                          collaborator._id
                                        )
                                      }
                                    >
                                      <img src={closeGray} alt="" />
                                      <span className="pl-2">End Contract</span>
                                    </button>
                                  </Col>
                                )}

                                <Col md={4}>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleChatbutton(collaboratorData)
                                    }
                                    className="btn btn-link text-dark d-flex align-items-center"
                                  >
                                    <img src={message} alt="" />
                                    <span className="pl-2">Send Message</span>
                                  </button>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      )
                    )}
                </div>
              </>

              <div className="d-flex flex-wrap justify-content-md-between">
                <div className="p4">
                  Timetable:{" "}
                  <span className="p3">
                    {daysDifferenceStartDate(
                      collaborator.startDate,
                      collaborator.endDate
                    )}
                    {/* {new moment().to(moment(collaborator.endDate))} */}
                    {/* 85 days left */}
                  </span>
                </div>
                {collaborator.memberLimit >
                  collaborator.collaborators.length && (
                  <Link
                    to={`/request?projectId=${
                      params && params.projectId
                    }&packageId=${collaborator._id}&packageName=${
                      collaborator.name
                    }&scProjectId=${projectDetail.scProjectId}&scPackageId=${collaborator.scPackageId}&minimumCost=${collaborator.minimumCost}`}
                    className="btn btn-blue ml-2"
                  >
                    Review Pending Requests
                  </Link>
                )}
                
                {/* <Button
                  variant="blue"
                  onClick={() =>
                    redirectToRequests(
                      params && params.projectId,
                      collaborator._id,
                      collaborator.name
                    )
                  }
                >
                  Review Pending Requests
                </Button> */}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p3 color_gray ">
            No collaborator present
          </div>
        )}
        {collaboratorListData.recordsTotal > 0 && (
          <div className="row d-flex align-items-center mt-3">
            <div className="col-md-12 aspgntn">
              <BasicPagination
                totalRecords={collaboratorListData.recordsTotal}
                // filteredRecords={collaboratorListData.recordsFiltered}
                limit={collaboratorLimit}
                batch={collaboratorSkip + 1}
                onBatchChange={onPageChange}
              />
            </div>
          </div>
        )}
      </Container>
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
      <EndContractModal
        StopSupportModalShow={StopSupportModalShow}
        selectedCollaborator={selectedCollaborator}
        CloseStopSupportModal={CloseStopSupportModal}
        projectId={params && params.projectId}
      />
    </>
  );
};

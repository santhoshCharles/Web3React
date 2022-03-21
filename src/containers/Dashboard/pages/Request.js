import React, { useEffect, useState, useContext } from "react";
import { Container } from "react-bootstrap";
import queryString from "query-string";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useHistory, Redirect } from "react-router-dom";

import { PageTitle } from "../../../components/PageTitle/PageTitle";
import success from "../../../assets/images/success.svg";
import star from "../../../assets/images/star.svg";
import Database from "../../../assets/images/Database.svg";
import chat from "../../../assets/images/chat.svg";
import { Link } from "react-router-dom";
import Profile from "../../../assets/images/Profile.png";
import {
  getAllUserRequestReceived,
  acceptRejectRequest,
} from "../redux/dashboardApi";

import { dashboardActions } from "../redux/dashboardAction";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import LoadingImage from "../../../assets/images/Rolling-1s-200px.svg";
import BasicPagination from "../../../components/Pagination/BasicPagination";
import { Modal } from "react-bootstrap";
import ChatModal from "../../../components/Chat/chatModal";
import { getPackageAsync } from "../../PackageDetails/redux/packageApi";
import { Web3Context } from "../../../web3/contexts/web3Context";
import { poolMethods } from '../../../web3/functions/factory'
import { toast } from "react-toastify";

const Request = (props) => {
  const {
    userRequestReceived,
    isLoading,
    isRequestAccepted,
    refreshRequestList,
    requestListLimit,
    requestListSkip,
  } = useSelector((state) => state.dashboardDetail);
  const dispatch = useDispatch();

  const history = useHistory();

  const { projectId, packageId, packageName, scProjectId, scPackageId, minimumCost } = queryString.parse(
    window.location.search
  );

  useEffect(() => {
    if (isRequestAccepted === false) {
      dispatch(getAllUserRequestReceived(projectId, packageId));
    }
  }, [isRequestAccepted]);

  useEffect(() => {
    if (refreshRequestList === true)
      dispatch(getAllUserRequestReceived(projectId, packageId));
  }, [refreshRequestList]);

  /* useEffect(() => {
    userRequestReceived.records &&
      userRequestReceived.recordsTotal === 0 &&
      history.push(`/package-list/${projectId}`);
  }, [userRequestReceived]); */

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : requestListSkip;
    dispatch(dashboardActions.setUserRequestBatchNumber(count));
  };

  return (
    <>
      {/* {userRequestReceived && userRequestReceived.recordsTotal === 0 ? (
        <Redirect to={`/package-list/${projectId}`} />
      ) : null} */}
      {isLoading && <SplashScreen />}
      <PageTitle title="Review Applicants" />

      <section className="pt-80 pb-80 min-height-50vh">
        <Container className="bg-white shadowBox">
          <div className="h2 pb-4">{packageName}</div>

          <div>
            {userRequestReceived.records &&
              userRequestReceived.records.length > 0 ? (
              userRequestReceived.records.map((userInfo, index) => {
                return (
                  <List
                    key={userInfo._id}
                    PackageName=""
                    profilePicture={
                      userInfo.profilePicture && userInfo.profilePicture
                    }
                    name={userInfo.fullName && userInfo.fullName}
                    minPay={`14,000.00`}
                    success={`10`}
                    avgRating={userInfo && userInfo.avgRating}
                    details={userInfo.basicInfo && userInfo.basicInfo}
                    userId={userInfo._id}
                    projectId={projectId}
                    packageId={packageId}
                    scProjectId={scProjectId}
                    scPackageId={scPackageId}
                    minimumCost={minimumCost}
                    isRequestAccepted={isRequestAccepted}
                    walletAddress={userInfo.walletAddress && userInfo.walletAddress}
                  //setRequestStatus={setRequestStatus}
                  />
                );
              })
            ) : (
              <div className="text-center p3 color_gray ">
                No requests pending
              </div>
            )}
          </div>
          {userRequestReceived.recordsTotal > 0 && (
            <div className="row d-flex align-items-center mt-3">
              <div className="col-md-12 aspgntn">
                <BasicPagination
                  totalRecords={userRequestReceived.recordsTotal}
                  filteredRecords={userRequestReceived.recordsFiltered}
                  limit={requestListLimit}
                  batch={requestListSkip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
};
export default Request;

export const List = (props) => {
  const { networkDetails, handleConnect } = useContext(Web3Context);
  const [getInstance, setInstance] = useState();
  const history = useHistory();
  const [requestStatus, setRequestStatus] = useState("");
  const [showChatModal, setshowChatModal] = useState(false);
  const handleCloseChatModal = () => {
    setshowChatModal(false);
  };
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const { packageDetail } = useSelector(
    (state) => state.packageDetail,
    shallowEqual
  );

  useEffect(() => {
    (async () => {
      const instance = await poolMethods.getInstance(networkDetails.web3)
      if (instance) {
        setInstance(instance);
      }
    })()
  }, [networkDetails.web3])

  const requestStatusAccepted = async () => {

    dispatch(getPackageAsync(props.projectId, props.packageId));
    //SC OBJECT
    const approveCollaboratorObj = {
      projectId: props.scProjectId,
      packageId: props.scPackageId,
      collaborator: props.walletAddress,
      approve: true
    }
    //SC OBJECT

    //SC OBJECT
    const addCollaboratorObj = {
      projectId: props.scProjectId,
      packageId: props.scPackageId,
      collaborator: props.walletAddress,
      mgp: Number(props.minimumCost)
    };
    //SC OBJECT
    //console.log({ approveCollaboratorObj, addCollaboratorObj })
    setRequestStatus("ACCEPTED");
    if(props.walletAddress == undefined){
      return toast.error("Collaborator must be connected with the Wallet Address")
    }
    if (getInstance) {
      dispatch(dashboardActions.acceptRejectRequestSCStart());
      try {
        const addCollaborator = await poolMethods.addCollaborator(getInstance, networkDetails.address, addCollaboratorObj)
        const approveCollaborator = await poolMethods.approveCollaborator(getInstance, networkDetails.address, approveCollaboratorObj)
        dispatch(dashboardActions.acceptRejectRequestSCSuccess());
        if (addCollaborator && addCollaborator.blockHash && approveCollaborator && approveCollaborator.blockHash) {
          dispatch(
            acceptRejectRequest(
              props.projectId,
              props.packageId,
              props.userId,
              "ACCEPTED"
            )
          );
        }
      } catch (err) {
        toast.error(err)
        dispatch(dashboardActions.acceptRejectRequestError());
      }

    } else {
      handleConnect()
    }
  };

  const requestStatusRejected = async () => {

    //SC OBJECT
    const rejectCollaboratorObj = {
      projectId: props.scProjectId,
      packageId: props.scPackageId,
      collaborator: networkDetails.address,
      approve: false
    }
    //SC OBJECT

    setRequestStatus("REJECTED");

    dispatch(
      acceptRejectRequest(
        props.projectId,
        props.packageId,
        props.userId,
        "REJECTED"
      )
    );

    /* if (getInstance) {
      try {
        await poolMethods.approveCollaborator(getInstance, networkDetails.address, rejectCollaboratorObj)

        dispatch(
          acceptRejectRequest(
            props.projectId,
            props.packageId,
            props.userId,
            "REJECTED"
          )
        );
      } catch (err) {
        toast.error(err)
      }

    } else {
      handleConnect()
    } */
  };

  return (
    <>
      <div className="row mx-0 re_EarningsList">
        <div className="col-12 h3 pb-3">{props.PackageName}</div>
        <div className="col-md-6 d-flex align-items-center">
          <div
            onClick={() =>
              history.push(`/aplicant-profile?aplicantId=${props.userId}`)
            }
            className="d-flex align-items-center"
          >
            <img
              src={props.profilePicture}
              alt="Profile"
              className="re_img_72_rounded"
            />
            <div className="pl-3">
              <strong>{props.name}</strong>
              <div className="d-flex flex-md-row flex-column align-items-start align-items-md-center py-2">
                {/* <div className="h5 d-flex align-items-center pr-3">
                  <img src={Database} alt="Database" className="mr-2" />
                  <span>{props.minPay}</span>
                </div> */}
                {/* <div className="h5 d-flex align-items-center">
                  <img src={success} alt="success" className="mr-2" />
                  <span>{props.success}</span>
                </div> */}
                {props.avgRating && props.avgRating > 0 && (
                  <div className="h5 d-flex align-items-center">
                    <img src={star} alt="star" className="mr-2" />
                    <span>{props.avgRating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-md-end">
          <button
            type="button"
            onClick={() => setshowChatModal(true)}
            className="btn btn-link p-0 mr-2"
          >
            <img src={chat} alt="chat" />
          </button>

          <button
            type="button"
            className="btn btn-blue px-2 px-md-4 mr-2"
            onClick={requestStatusAccepted}
            disabled={props.isRequestAccepted}
          >
            {props.isRequestAccepted && requestStatus === "ACCEPTED" ? (
              <>
                Accepting...
                <img
                  src={LoadingImage}
                  alt="LoadingImage"
                  width="20px"
                  className="ml-2"
                />
              </>
            ) : (
              "Accept"
            )}
          </button>

          <button
            type="button"
            className="btn btn-blue px-2 px-md-4 mr-2"
            onClick={requestStatusRejected}
            disabled={props.isRequestAccepted}
          >
            {props.isRequestAccepted && requestStatus === "REJECTED" ? (
              <>
                Rejecting...
                <img
                  src={LoadingImage}
                  alt="LoadingImage"
                  width="20px"
                  className="ml-2"
                />
              </>
            ) : (
              "Reject"
            )}
          </button>
        </div>
        <div className="col-12 pt-3 p3 color_gray">{props.details}</div>
      </div>
      <Modal show={showChatModal} onHide={handleCloseChatModal} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">{props.name}</div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <ChatModal recieverId={props.userId} senderId={user._id} />
        </Modal.Body>
      </Modal>
    </>
  );
};

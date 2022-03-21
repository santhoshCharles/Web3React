import React from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

import ArrowLeftWhite from "./../../../assets/images/ArrowLeftWhite.svg";
import obj from "./../../../assets/images/obj.svg";
import info from "../../../assets/images/info.svg";
import a1 from "./../../../assets/images/a1.png";
import { removeCollaborator } from "../../CreateProject/redux/createProjectApi";
import { useDispatch } from "react-redux";

const EndContractModal = (props) => {
  const dispatch = useDispatch();
  const {
    StopSupportModalShow,
    CloseStopSupportModal,
    selectedCollaborator,
    selectedPackageId,
    projectId,
  } = props;

  const endContract = () => {
    dispatch(
      removeCollaborator(
        projectId,
        selectedCollaborator.packageId,
        selectedCollaborator.collaborator._id
      )
    );
    CloseStopSupportModal();
  };
  return (
    <>
      <Modal
        show={StopSupportModalShow}
        onHide={CloseStopSupportModal}
        centered
      >
        <Modal.Header className="px-4 pb-0 pt-4 border-0" closeButton>
          <div className="h2 text-center py-2 w-100">End Contract with</div>
        </Modal.Header>
        <Modal.Body className="text-center px-4 pb-5">
          <div className="d-flex align-items-center justify-content-center pb-4 pb-md-5">
            <div
              className="re_picon"
              style={{
                background: `url(${
                  selectedCollaborator.profilePicture
                    ? selectedCollaborator.profilePicture
                    : a1
                })no-repeat scroll center center / cover`,
              }}
            ></div>
            <div className="pl-3">
              <div className="p1">
                {selectedCollaborator.fullName
                  ? selectedCollaborator.fullName
                  : ""}
              </div>
              {/* <div className="p5 border rounded px-2 py-1">Design Expert</div> */}
            </div>
          </div>
          <img src={obj} alt="" />
          <div className="p2 pt-4 pt-md-5 pb-2">
            Are you sure you want to end this contract?
          </div>
          <div className="p3 pb-4 pb-md-5 color_gray">
            You’ll be prompted to provide feedback and make any final payments
            in the following steps.
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button
              variant="green"
              className="px-4"
              onClick={CloseStopSupportModal}
            >
              <img src={ArrowLeftWhite} alt="" className="mr-2" />
              BACK
            </Button>
            <Button
              variant="blue"
              onClick={endContract}
              className="ml-3 text-uppercase"
            >
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="re_tooltip">test</Tooltip>}
              >
                <img src={info} alt="info" className="mr-2" />
              </OverlayTrigger>
              END CONTRACT
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EndContractModal;

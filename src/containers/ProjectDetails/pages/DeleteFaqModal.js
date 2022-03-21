import React from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";

import ArrowLeftWhite from "./../../../assets/images/ArrowLeftWhite.svg";
import Frame from "./../../../assets/images/Frame.svg";
import info from "../../../assets/images/info.svg";

import { deleteFaq } from "../../CreateProject/redux/createProjectApi";

const DeleteFaqModal = (props) => {
  const dispatch = useDispatch();
  const { onFaqShow, onCloseFaq, deleteData, projectId } = props;
  const handleDelete = () => {
    if (projectId && Object.keys(deleteData).length > 0) {
      dispatch(deleteFaq(projectId, deleteData._id, onCloseFaq));
    }
  };
  return (
    <>
      <Modal show={onFaqShow} onHide={onCloseFaq} centered>
        <Modal.Header className="px-4 pb-0 pt-4 border-0" closeButton>
          <div className="h2 text-center py-2 w-100">Remove the FAQ</div>
        </Modal.Header>
        <Modal.Body className="text-center px-4 pb-5">
          <img src={Frame} alt="" />
          <div className="p2 py-4">
            Are you sure you want to
            <br />
            remove the FAQ?
          </div>
          <div className="d-flex align-items-center justify-content-center">
            <Button variant="green" className="px-4" onClick={onCloseFaq}>
              <img src={ArrowLeftWhite} alt="" className="mr-2" />
              BACK
            </Button>
            <Button
              variant="blue"
              onClick={handleDelete}
              className="ml-3 text-uppercase"
            >
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="re_tooltip">test</Tooltip>}
              >
                <img src={info} alt="info" className="mr-2" />
              </OverlayTrigger>
              Remove FAQ
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteFaqModal;

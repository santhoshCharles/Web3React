import React from "react";
import { Modal } from "react-bootstrap";

const ViewPorfolioModel = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">Project</div>
        </Modal.Header>
        <Modal.Body className="py-4  px-4">
          <div className="p3 pb-3">Project Title : <span className="color_gray">{props.data.projectTitle}</span></div>
          <div className="p3 pb-3">Project Tags: <span className="color_gray">{(props.data.tags ? props.data.tags.join(', ') : '')}</span></div>
          <div className="p3 pb-3">Description: <span className="color_gray">{props.data.description ? props.data.description : '-'}</span></div>
          <div className="d-flex align-items-center align-items-md-center">
            <div className="p3 pr-2 text-nowrap">Project Link:</div>
            <a
              href={props.data.projectUrl}
              target="_blank"
              className="p3 color_blue text-break"
            >
              {props.data.projectUrl}
            </a>
          </div>

        </Modal.Body>
      </Modal>
    </>
  );
};
export default ViewPorfolioModel;

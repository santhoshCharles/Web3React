import React from "react";
import { Button, Modal } from "react-bootstrap";

const Modal1 = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header className="pb-0 border-0" closeButton></Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-1">
          <div className="h2 pr-5">{props.text}</div>
          <div className="p3 color_gray py-3">{props.subtext}</div>
          {props.subtext2 && (
            <div className="p5 opacity70 pb-3">{props.subtext2}</div>
          )}
          {/* {props.packagesBtn && (
            <Button variant="blue" className="px-5 w-100" onClick={props.onClick}>
              Add Packages
            </Button>
          )} */}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Modal1;

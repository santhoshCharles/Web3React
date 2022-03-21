import React from "react";
import { Button, Modal } from "react-bootstrap";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
const ModalYesNo = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header className="pb-0 border-0" closeButton></Modal.Header>
        <Modal.Body className="pt-2 px-4 pb-4 ">
          <div className="h2 pb-3">{props.text}</div>
          {"selectedPackageData" in props &&
          Object.keys(props.selectedPackageData).length > 0 ? (
            <div className="p3 color_gray pb-4">
              {props.selectedPackageData.collaborators.length > 0 ||
              props.selectedPackageData.collaborators.length > 0
                ? "The observer/ Collaborators are associated with the task still, do you want to cancel?"
                : props.subText}
            </div>
          ) : (
            <div className="p3 color_gray pb-4">{props.subText}</div>
          )}

          <Button
            type="button"
            variant="blue"
            onClick={props.handleOk}
            className="mr-3 w-124px"
            disabled={props.showLoader ? props.showLoader : false}
          >
            {props && props.showLoader ? (
              <>
                {props.showLoaderText}
                <img
                  src={LoadingImage}
                  alt="LoadingImage"
                  width="20px"
                  className="ml-2"
                />
              </>
            ) : (
              "Yes"
            )}{" "}
          </Button>
          {/* <Button variant="black" className="mr-3 w-124px" onClick={props.handleOk}>
            Yes
          </Button> */}
          <Button
            variant="outline-black"
            className="w-124px"
            onClick={props.handleClose}
          >
            Cancel
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ModalYesNo;

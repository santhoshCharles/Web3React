import React from "react";
import { Modal } from "react-bootstrap";
import Earning1 from "../../assets/images/Earning1.svg";
import Earning2 from "../../assets/images/Earning2.svg";
import Earning3 from "../../assets/images/Earning3.svg";
import Earning4 from "../../assets/images/Earning4.svg";

const EarningModal = (props) => {
  console.log({props})
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose} size="lg" centered>
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">Earning</div>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="d-flex pb-3 align-items-center">
            <img src={Earning3} alt="" className="mr-2" />
            <div className="p3 ">WorkTask Name : <span className="color_gray">{props.name}</span></div>
          </div>
          <div className="d-flex pb-3 align-items-center">
            <img src={Earning1} alt="" className="mr-2" />
            <div className="p3 ">Total Individual Earning: <span className="color_gray">$2,000.00</span></div>
          </div>
          <div className="d-flex pb-3 align-items-center">
            <img src={Earning3} alt="" className="mr-2" />
            <div className="p3 ">WorkTask Description: <span className="color_gray">{props.description}</span></div>
          </div>
          <div className="d-flex align-items-center">
            <img src={Earning4} alt="" className="mr-2" />
            <div className="d-flex align-items-center align-items-md-center">
              <div className="p3 pr-2 text-nowrap">Project Link:</div>
              <a
                href={props.websiteURL}
                target="_blank"
                className="p3 color_blue text-break"
              >
                {props.websiteURL}
              </a>
            </div>
          </div>


        </Modal.Body>
      </Modal>
    </>
  );
};
export default EarningModal;

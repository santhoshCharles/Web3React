import React from "react";
import { Button, Dropdown } from "react-bootstrap";
import PlusGreen from "./../../assets/images/PlusGreen.svg";
import DotsThreeVertical from "./../../assets/images/DotsThreeVertical.svg";
import Trashgreen from "./../../assets/images/Trashgreen.svg";
import PushPin from "./../../assets/images/PushPin.svg";
import PencilLine from "./../../assets/images/PencilLine.svg";

const LaneHeader = (props) => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="h5">{props.laneTitle}</div>
        <div className="d-flex align-items-center">
          {/* <Button variant="link" onClick={props.onClick}>
            <img src={PlusGreen} alt="" />
          </Button> */}
          {/* <Dropdown>
            <Dropdown.Toggle variant="link" className="" id="re_DropDown">
              <img src={DotsThreeVertical} alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu alignRight>
              <Dropdown.Item as={Button}>
                <img src={PencilLine} alt="" className="mr-2" />
                Rename section
              </Dropdown.Item>
              <Dropdown.Item as={Button}>
                <img src={Trashgreen} alt="" className="mr-2" />
                Delete section
              </Dropdown.Item>
              <Dropdown.Item as={Button}>
                <img src={PushPin} alt="" className="mr-2" />
                Pin this section
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      </div>
    </>
  );
};

export default LaneHeader;

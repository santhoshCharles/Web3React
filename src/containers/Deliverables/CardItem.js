import React, { useRef, useState } from "react";

import CheckCircle from "./../../assets/images/CheckCircle.svg";

import commit from "./../../assets/images/commit.svg";
import close from "./../../assets/images/close.svg";

import { Button } from "react-bootstrap";
import moment from "moment";
import ModalYesNo from "../../components/Modal/ModalYesNo";
import { deleteCard } from "./redux/projectBoardApi";
import queryString from "query-string";
import { useDispatch } from "react-redux";

export const Item = (props) => {
  const [showDeleteModel, setshowDeleteModel] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [chat, setChat] = useState(false)

  const dispatch = useDispatch();
  const queryParams = queryString.parse(window.location.search);

  const clickDelete = (e) => {
    dispatch(
      deleteCard(queryParams.projectId, queryParams.packageId, props.id)
    );
    // props.onDelete();
  };

  const handleClose = () => {
    setshowDeleteModel(false);
  };

  const handleDiv = (e) => {
    props.onClick(e);
    //setChat(true)
  };
  return (
    <div className="re_workBox bg-white cursor-pointer">
      {/* <div className="text-right ">
        <Button
          variant="link"
          onClick={(e) => {
            setshowDeleteModel(true);
            e.stopPropagation();
          }}
          s
        >
          <img src={close} width="12px" alt="" />
        </Button>
      </div> */}

      <div onClick={(e) => handleDiv(e)}>
        <div className="p-3">
          <div className="re_lbl5 d-flex align-items-center">
            <span className="bg-g-blue"></span>
            <span className="bg-g-green"></span>
            <span className="bg-g-yellow"></span>
            <span className="bg-g-yellow"></span>
            <span className="bg-g-yellow"></span>
          </div>
          <div className="p2 my-2 re_ellips_3line">
            {props.metadata && props.metadata.markCompleted === "COMPLETED" && (
              <img src={CheckCircle} alt="" className="mr-2" />
            )}

            {props.metadata ? props.metadata.title : ""}
          </div>
          <div className="d-flex flex-wrap align-items-center justify-content-between">
            <div className="d-flex align-items-center re_imageUsers">
              {props.metadata && (
                <div className="re_imgGrroup h-35px">
                  {props.metadata.profile.map((profile, i) => {
                    return (
                      <img
                        key={i}
                        src={profile.profilePicture}
                        alt="Profile Pic"
                      />
                    );
                  })}
                  {props.metadata && props.metadata.profile.length > 3 && (
                    <div className="re_more">
                      {props.metadata.profile.length - 3}
                    </div>
                  )}
                </div>
              )}
              {props.metadata && props.metadata.dueDate && (
                <div className="p3 pl-2">
                  {" "}
                  {moment(props.metadata && props.metadata.dueDate).format(
                    "MMM YY"
                  )}
                </div>
              )}
            </div>
            {/* <div className="d-flex align-items-center">
              <div className="d-flex align-items-center">
                <span className="p3 text-dark opacity50">
                  {props.commitCount}
                </span>
                <img src={commit} alt="" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <ModalYesNo
        show={showDeleteModel}
        handleClose={handleClose}
        handleOk={clickDelete}
        showLoader={loading}
        showLoaderText="Deleting..."
        text="Are you sure want to Delete ?"
        subText="Please confirm with us to delete"
      />
    </div>
  );
};
export default Item;

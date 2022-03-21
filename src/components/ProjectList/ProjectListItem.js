import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import icon from "../../assets/images/p-icon.png";
import non_photo from "../../assets/images/non_photo.svg";
import logo from "../../assets/images/logo.svg";
import Profile from "../../assets/images/Profile.png";
import trophy from "../../assets/images/trophy.svg";
import trophy2 from "../../assets/images/trophy2.svg";
import { Button } from "react-bootstrap";
import { ReactTimeAgoC } from "../utils/ReactTimeAgoC";
import { dayDifferenceTimestamp } from "../../utils";

const ProjectListItem = (props) => {
  const history = useHistory();

  const { _id } = useSelector((state) =>
    state.auth.user !== null ? state.auth.user : {}
  );

  const slicedMembers = props.totalTeamMembers.slice(0, 3);

  const daysDifferenceStartDate = dayDifferenceTimestamp(
    props.projectStartDate,
    Date.now()
  );

  const daysDifferenceEndDate = dayDifferenceTimestamp(
    props.projectEndDate,
    Date.now()
  );

  let showStatus = "";
  if (props.projectStartDate && props.projectEndDate) {
    if (props.projectStartDate > Date.now()) {
      showStatus = "not_started";
    } else if (
      props.projectStartDate < Date.now() &&
      props.projectEndDate > Date.now()
    ) {
      showStatus = "deadline";
    }
    /* else {
      showStatus = "completed";
    } */
  }

  let buttonStatus = "";
  if (
    props.mode === "myProjects" &&
    props.initiatorDetails &&
    _id === props.initiatorDetails._id &&
    props.adminVerification === "REJECTED"
  ) {
    buttonStatus = true;
  } else {
    buttonStatus = false;
  }

  return (
    <div
      className={`re_ProjectListItem ${props.looking ? "lookingLblShow" : ""}`}
    >
      <div
        className="img_cover"
        style={{
          backgroundImage: `url('${props.projectCoverImage !== null
              ? props.projectCoverImage
              : non_photo
            } ')`,
        }}
      ></div>
      <div className="bg-white">
        <div className="icon">
          <img
            src={props.logo !== null ? props.logo : non_photo}
            alt="icon"
            className="mw-100 mh-100"
          />
        </div>
        <Link to={props.Link} className="px-4 re_linkForDetails h3">
          {props.title}
        </Link>
        {props.initiatorDetails && (
          <div className="p4 pt-2 pb-3 px-4">
            Posted <ReactTimeAgoC date={new Date(props.createdAt)} /> By{" "}
            <span className="color_blue">
              {props.initiatorDetails.fullName}
            </span>
          </div>
        )}
        <div className="p4 color_gray text px-4">{props.description}</div>
        {props.showCollaborators ? (
          <div className="px-4 pb-2 pt-3 d-flex align-items-center re_imageUsers">
            {slicedMembers && slicedMembers.length > 0 ? (
              <Link
                to="/"
                onClick={props.openRequestsModel}
                id={props.projectIndex}
                className="re_imgGrroup h-35px"
              >
                {slicedMembers.map((team, index) => {
                  return (
                    <img
                      src={team.profilePicture}
                      alt="team"
                      title={team.fullName}
                      key={team._id}
                    />
                  );
                })}
                {props.totalMembers > 3 && (
                  <div className="re_more">{props.totalMembers - 3}</div>
                )}
              </Link>
            ) : (
              <div className="color_blue p4 pl-3 h-35px">
                Looking Team Members
              </div>
            )}
          </div>
        ) : (
          <div className="px-4 pb-2 pt-3 d-flex align-items-center re_imageUsers">
            <Link className="re_imgGrroup h-35px"></Link>
          </div>
        )}
        {/* <div className="d-flex flex-wrap align-items-center px-4 py-2 border-top hight-0">
          <img src={trophy} alt="trophy" />
          <div className="h5 pl-2 pr-2">
            ${props.projectCost ? props.projectCost.toFixed(2) : 0}
          </div>
          <div className="p4 color_gray">Min. Guaranteed Payment</div>
        </div>
        <div className="p4 px-4 py-2 border-top hight-0">
          <img src={trophy2} alt="trophy2" className="mr-2" />
          {`Total Budget: $${
            props.totalBudget ? props.totalBudget.toFixed(2) : 0
          }`}
        </div>
        {/* {props.initiatorDetails && (
          <div className="p4 px-4 py-2 border-top hight-0">
            Initiated by: {props.initiatorDetails.fullName}
          </div>
        )} */}
        <div className="d-flex justify-content-between align-items-center px-4 py-2 border-top hight-0">
          {showStatus ? (
            showStatus === "not_started" && daysDifferenceStartDate >= 0 ? (
              <div className="p4">
                <span className="color_gray">Deadline:</span>{" "}
                {daysDifferenceStartDate} days yet to start
              </div>
            ) : showStatus == "deadline" && daysDifferenceEndDate >= 0 ? (
              <div className="p4">
                <span className="color_gray">Deadline:</span>{" "}
                {daysDifferenceEndDate} days left
              </div>
            ) : (
              <div className="p4">
                <span className="color_gray">COMPLETED</span>
              </div>
            )
          ) : (
            <div className="p4"></div>
          )}

          {props.statusApprovedByInitiator === "COMPLETED" && props.adminVerification === "ACCEPTED" &&
            <Button
              type="button"
              variant="blue"
              onClick={() => {
                localStorage.setItem("project_step", 2);
                history.push(`project-details/${props._id}`);
              }}
              disabled={buttonStatus}
            >
              {props.mode === "myProjects" &&
                props.initiatorDetails &&
                _id === props.initiatorDetails._id
                ? "Create Tasks"
                : "List of Tasks"}
            </Button>
          }
        </div>
      </div>
    </div>
  );
};
export default ProjectListItem;

import React from "react";
import { Link } from "react-router-dom";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import info from "../../assets/images/info.svg";
import link from "../../assets/images/link.svg";
import notification from "../../assets/images/notification.svg";
import Database from "../../assets/images/Database.svg";

export const ListItemsProject = (props) => {
  return (
    <div className="re_packageList re_EarningsList">
      <div className="row justify-content-between px-3 pb-3">
        <div className="col-lg-8">
          <div className="d-flex flex-column flex-md-row flex-wrap align-items-start align-items-md-center pt-2">
            <Link to={props.link} className="h5 color_black mr-3">
              {props.title}
            </Link>
            <Link to={props.link} className="color_blue p3">
              <img src={link} alt="link" className="mr-1" width="15px" />
              {props.linkText}
            </Link>
          </div>
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end pt-2 pt-lg-0">
          {props.viewDetail && (
            <Link to={props.viewDetailLink} className="btn btn-blue mr-3">
              View Detail
            </Link>
          )}
          <div className="h5 d-flex align-items-center pr-3">
            <img src={Database} alt="Database" className="mr-2" />
            <span>
              {props.tokenName ?
                props.tokenName
                : "$"+props.bonus}
              
            </span>
          </div>
        </div>
      </div>
      <div className="p3 p-3 color_gray border-top">{props.text}</div>
    </div>
  );
};
export const ListItemsPackage = (props) => {
  return (
    <div className="re_packageList re_lastBorderNone">
      <div className="row justify-content-between pb-2">
        <div className="col-lg-8">
          <div className="d-flex flex-column flex-md-row flex-wrap align-items-start align-items-md-center pt-2">
            <Link to={props.link} className="h3 color_black mr-3">
              {props.title}
            </Link>
            <Link to={props.link} className="p4 color_blue">
              <img src={link} alt="link" className="mr-1" width="15px" />
              {props.linkText}
            </Link>
          </div>

          {/* <div className="f14-400 opacity60 pt-2">{props.subtitle}</div> */}
        </div>
        <div className="col-lg-4 d-flex align-items-center justify-content-lg-end pt-2 pt-lg-0">
          <div className="h5 d-flex align-items-center">
            <img src={Database} alt="Database" className="mr-2" />
            <span>
              {props.tokenName ? props.tokenName : "$"}{props.bonus}
            </span>
          </div>
        </div>
      </div>
      <div className="p3">{props.text}</div>

      {(props.mode === "awaiting") && (
        <Link
          to={props.requestLink}
          className={`mt-3 btn btn-link p4 re_newRaquestBtn active`}
        >
          <img src={notification} alt="link" className="mr-1" />{" "}
          {props.requestCount} New Requests
        </Link>
      )}

      {/* {props.Requestsbtn && (
        <Button
          variant="link"
          className={`mt-3 p4 re_newRaquestBtn ${props.requestCount > 0 ? "active" : ""}`}
          onClick={props.RequestsModel}
        >
          <img src={notification} alt="link" className="mr-1" /> {props.requestCount} New Requests
        </Button>
      )} */}
    </div>
  );
};

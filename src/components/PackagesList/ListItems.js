import React from "react";
import { Link, useHistory } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import info from "../../assets/images/info.svg";
import link from "../../assets/images/link.svg";
import Database from "../../assets/images/Database.svg";

export const ListItems = (props) => {
  const { projectId, packageId } = props;

  return (
    <div className="re_packageList re_EarningsList px-4">
      <div className="row justify-content-between align-items-end pb-2">
        <div className="col-md-8">
          <Link
            className="h5 color_black"
            to={`/package-details?projectId=${projectId}&packageId=${packageId}`}
          >
            {props.title}
          </Link>
          <div className="p3 d-flex flex-wrap align-items-center pt-2">
            <Link
              className="color_blue text-nowrap"
              to={`/package-details?projectId=${projectId}&packageId=${packageId}`}
            >
              <img src={link} alt="link" width="15px" className="mr-1" />
              Package Link
            </Link>
            <span className="pt-2 pt-lg-0 pb-2 pb-md-0 color_gray d-flex flex-wrap text-nowrap align-items-center">
              <span className="re_dot d-none d-lg-block mx-3"></span>{" "}
              {props.tag1}
              <span className="re_dot mx-3"></span> {props.tag2}
              <span className="re_dot mx-3"></span> {props.tag3}
              <span className="re_dot mx-3"></span> {props.tag4}
            </span>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-md-end">
          {/* {props.usd && (
            <div className="re_greenGradiant re_lbl my-2 my-md-0">
              {props.bonus} USD
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip className="re_tooltip">
                    Total Bonus Available
                  </Tooltip>
                }
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div>
          )}
          {props.ldo && (
            <div className="re_blueGradiant re_lbl my-2 my-md-0">
              {props.mgp} LDO
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip className="re_tooltip">
                    Minimum Guaranteed Payment
                  </Tooltip>
                }
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div>
          )} */}
          <div className="h5 d-flex align-items-center">
            <img src={Database} alt="Database" className="mr-2" />
            <span>${props.bonus}</span>
          </div>
        </div>
      </div>
      <div className="p3 color_gray">{props.text}</div>
    </div>
  );
};

export const ListItems2 = (props) => {
  return (
    <div className="re_packageList re_EarningsList px-4">
      <div className="row justify-content-between align-items-end pb-2">
        <div className="col-md-8">
          <Link to={props.link} className="h5 color_black">
            {props.title}
          </Link>
          <div className="p3 d-flex flex-column flex-md-row flex-wrap align-items-start align-items-md-center pt-2 pb-2 pb-md-0">
            <Link to={props.link} className="color_blue text-nowrap">
              <img src={link} alt="link" width="15px" className="mr-1" />
              Project Link
            </Link>
            <span className="color_gray d-flex flex-wrap text-nowrap align-items-center pt-2 pt-md-0">
              <span className="re_dot d-none d-md-block mx-3"></span>{" "}
              {props.tag1}
              <span className="re_dot mx-3"></span> {props.tag2}
            </span>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-md-end">
          {/* {props.usd && (
            <div className="re_greenGradiant re_lbl my-2 my-md-0">
              {props.bonus} USD
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip className="re_tooltip">
                    Total Bonus Available
                  </Tooltip>
                }
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div>
          )}
          {props.ldo && (
            <div className="re_blueGradiant re_lbl my-2 my-md-0">
              {props.mgp} LDO
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip className="re_tooltip">
                    Minimum Guaranteed Payment
                  </Tooltip>
                }
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div>
          )} */}
          <div className="h5 d-flex align-items-center">
            <img src={Database} alt="Database" className="mr-2" />
            <span>${props.bonus}</span>
          </div>
        </div>
      </div>
      <div className="p3 color_gray">{props.text}</div>
    </div>
  );
};

export const ListItems3 = (props) => {
  const history = useHistory();

  const checkPermission = (event) => {
    event.preventDefault();
    if (!props.isLogin && props.from && props.from === "package-detail") {
      props.handleShowLogin();
      return false;
    } else {
      //console.log("link", props.link);
      history.push({
        pathname: props.link,
      });
    }
  };

  return (
    <div className="re_activityList re_EarningsList">
      <div className="row justify-content-between align-items-end pb-3 px-3">
        <div className="col-xl-8">
          <Link className="h5 color_black" onClick={checkPermission}>
            {props.title}
          </Link>
          <div className="p3 d-flex flex-wrap align-items-center pt-2">
            <Link className="color_blue text-nowrap" onClick={checkPermission}>
              <img src={link} alt="link" width="15px" className="mr-1" />
              Package Link
            </Link>

            <span className="pt-2 pt-lg-0 color_gray d-flex flex-wrap text-nowrap align-items-center">
              <span className="re_dot d-none d-md-block mx-3"></span>{" "}
              {props.tag1}
              <span className="re_dot mx-3"></span> {props.tag2}
              <span className="re_dot mx-3"></span> {props.tag3}
              <span className="re_dot mx-3"></span> {props.tag4}
            </span>
          </div>
        </div>
        <div className="col-xl-4 d-flex align-items-center justify-content-xl-end">
          {props.ldo && (
            <div className="re_blueGradiant re_lbl my-2 my-xl-0">
              {props.mgp} USD
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={
                  <Tooltip className="re_tooltip">
                    Minimum Guaranteed Payment
                  </Tooltip>
                }
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div>
          )}
          {props.usd && (
            <div className="re_greenGradiant re_lbl ml-2 my-2 my-xl-0">
              {props.bonus} USD
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip className="re_tooltip">Bonus</Tooltip>}
              >
                <img src={info} alt="info" className="ml-2" />
              </OverlayTrigger>
            </div>
          )}
          {props.database && (
            <div className="h5 d-flex align-items-center my-2 my-xl-0">
              <img src={Database} alt="Database" className="mr-2" />
              <span>${props.bonus}</span>
            </div>
          )}
        </div>
      </div>
      <div className="p3 color_gray border-top px-3 pt-3">{props.text}</div>
    </div>
  );
};

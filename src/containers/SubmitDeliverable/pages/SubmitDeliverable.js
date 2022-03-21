import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  OverlayTrigger,
  Row,
  Table,
  Tooltip,
} from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getDeliverableListDataAsync,
  getDeliverableTaskDataAsync,
} from "../redux/deliverableApi";
import { deliverableActions, deliverablesMap } from "../redux/deliverableAction";
import { PageTitle } from "../../../components/PageTitle/PageTitle";
import info from "../../../assets/images/info.svg";
import download from "../../../assets/images/download.svg";
import Linkwhite from "../../../assets/images/Linkwhite.svg";
import { Link } from "react-router-dom";
import { ReadMore } from "../../../components/ReadMore";
import queryString from "query-string";

import DownloadBlue from "../../../assets/images/DownloadBlue.svg";
import NewDeliverableModal from "./NewDeliverableModal";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import BasicPagination from "../../../components/Pagination/BasicPagination";
import Modal1 from "../../../components/Modal/Modal";

const SubmitDeliverable = () => {
  const dispatch = useDispatch();
  const queryParams = queryString.parse(window.location.search);

  const {
    isLoading,
    taskList,
    deliverablesList,
    limit,
    skip,
    refreshDeliverableList,
    deliverableStatus
  } = useSelector((state) => state.deliverables, shallowEqual);
  useEffect(() => {
    dispatch(getDeliverableTaskDataAsync());
  }, []);

  useEffect(() => {
    if (refreshDeliverableList) {
      dispatch(getDeliverableListDataAsync(queryParams));
    }
  }, [refreshDeliverableList]);

  useEffect(() => {
    if (deliverableStatus == 200) {
      setDeliverPackage(true)
    }
    return () => {
      dispatch({ type: deliverablesMap.RESET_DELIVER_RESPONSE_CODE })
    }
  }, [deliverableStatus])
  const [NewModalShow, setNewModalShow] = useState(false);
  const [showDeliverPackage, setDeliverPackage] = useState(false);
  const handleCloseDeliver = () => setDeliverPackage(false);
  const NewCloseModal = () => setNewModalShow(false);

  const getClassName = (status) => {
    switch (status) {
      case "COMPLETED": {
        return "lbl-green";
      }
      case "DELIVERED": {
        return "lbl-blue";
      }
      case "UNDER REVIEW": {
        return "lbl-orange";
      }
      default:
        return "lbl-blue";
    }
  };

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(deliverableActions.setBatchNumber(count));
  };
  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="Submit Deliverable" />
      <section className="pt-80 pb-80 min-height-50vh">
        <Container className="bg-white shadowBox mb-3">
          <Button variant="deliverable" onClick={() => setNewModalShow(true)}>
            Submit a new deliverable
            <img src={DownloadBlue} alt="" className="ml-2" />
          </Button>
        </Container>
        <NewDeliverableModal
          onNewShow={NewModalShow}
          onCloseNew={NewCloseModal}
        />
        <Container className="bg-white shadowBox">
          <Row>
            <Col md={4}>
              <div className="h2 pb-3">Deliverables</div>
            </Col>
            {/* <Col md={8}>
              <div className="d-flex align-items-center justify-content-md-end">
                <div>
                  <input
                    placeholder="Search"
                    type="text"
                    className="Re_ChatSearch re_inputRouded mb-2"
                  />
                </div>
              </div>
            </Col> */}
          </Row>
          {deliverablesList &&
            deliverablesList.records &&
            deliverablesList.records.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="p4 color_gray font-weight-400">
                    INITIATED BY
                  </th>
                  <th className="p4 color_gray font-weight-400 ">TASK</th>
                  <th className="p4 color_gray font-weight-400">
                    SUBMISSION DATE
                  </th>
                  <th className="p4 color_gray font-weight-400">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {/* -------- */}
                {deliverablesList.records.map((deliverable, index) => (
                  <tr key={index}>
                    <td>
                      <div className="p2">
                        {deliverable && deliverable.initiatorDetails.fullName
                          ? deliverable.initiatorDetails.fullName
                          : ""}
                      </div>
                    </td>
                    <td className="w-40">
                      <div className="p2 re_ellips re_width-370px">
                        {deliverable && deliverable.packages.name
                          ? deliverable.packages.name
                          : ""}
                      </div>
                      <ReadMore>
                        {deliverable && deliverable.packages.description
                          ? deliverable.packages.description
                          : ""}
                      </ReadMore>
                      <div className="d-flex align-items-center flex-wrap pt-3">
                        {deliverable.packages.deliverables.files &&
                          deliverable.packages.deliverables.files.length > 0 &&
                          deliverable.packages.deliverables.files.map((file, index) => (
                            <a
                              key={file._id}
                              download
                              href={file.fileLink}
                              className="lbl-green text-uppercase mr-1"
                            >
                              {file.fileName ? file.fileName : ""}
                              <img src={download} alt="" className="ml-2" />
                            </a>
                          ))}
                        {deliverable.packages.deliverables.postLink &&
                          deliverable.packages.deliverables.postLink.length > 0 &&
                          deliverable.packages.deliverables.postLink.map((link, index) => (
                            <a
                              key={link._id}
                              href={link.link}
                              target="_blank"
                              rel="noreferrer"
                              className="lbl-blue text-uppercase mr-1"
                            >
                              {link.linkName ? link.linkName : ""}
                              <img
                                src={Linkwhite}
                                alt=""
                                width="15px"
                                className="ml-2"
                              />
                            </a>
                          ))}
                      </div>
                    </td>
                    <td>
                      <div className="p2">
                        {moment(deliverable.packages.deliverables.submittedAt).format(" DD MMM YY")}
                      </div>
                    </td>
                    <td>
                      <label className={getClassName(deliverable.packages.workStatus)}>
                        {deliverable.packages.workStatus}
                        <OverlayTrigger
                          placement="bottom"
                          delay={{ show: 250, hide: 400 }}
                          overlay={
                            <Tooltip className="re_tooltip">test</Tooltip>
                          }
                        >
                          <img
                            src={info}
                            alt="info"
                            width="12px"
                            height="12px"
                            className="ml-2"
                          />
                        </OverlayTrigger>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center p3 color_gray ">No Deliverables</div>
          )}
          {deliverablesList && deliverablesList.recordsTotal > 0 && (
            <div className="row d-flex align-items-center mt-3">
              <div className="col-md-12 aspgntn">
                <BasicPagination
                  totalRecords={deliverablesList.recordsTotal}
                  // filteredRecords={collaboratorListData.recordsFiltered}
                  limit={limit}
                  batch={skip + 1}
                  onBatchChange={onPageChange}
                />
              </div>
            </div>
          )}
        </Container>
      </section>
      <Modal1
        show={showDeliverPackage}
        handleClose={handleCloseDeliver}
        text="Your request to deliver your work has been recorded."
        subtext="The project initiator will review, and validate if the submission meets the Minimum Acceptance Criteria."
      />
    </>
  );
};
export default SubmitDeliverable;

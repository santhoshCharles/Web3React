import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import RSlider from "./../RangeSlider/Slider";
import { Checkbox } from "../Checkbox/Checkbox";
import {
  collaboratorsList,
  submitCollaboratorRatingAsync,
} from "../../containers/ProjectDetails/redux/observerListApi";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import { shallowEqual } from "react-redux";
import queryString from "query-string";
import { toast } from "react-toastify";
import { getPackageAsync } from "../../containers/PackageDetails/redux/packageApi";

const domain = [0, 100];
const defaultValues = [40];

const RatingModal = (props) => {
  const [ratting, setRatting] = useState({});

  //console.log("rating model");

  const dispatch = useDispatch();
  const queryParams = queryString.parse(window.location.search);

  const { user } = useSelector((state) => state.auth, shallowEqual);

  const { collaboratorRatting, refreshCollaboratorListing, isLoading } =
    useSelector((state) => state.projectList, shallowEqual);

  useEffect(() => {
    dispatch(
      collaboratorsList(queryParams.projectId, queryParams.packageId, user._id)
    );
  }, []);

  useEffect(() => {
    const rate = {};
    collaboratorRatting.forEach(({ _id }) => {
      rate[_id] = [0];
    });
    setRatting(rate);
  }, [collaboratorRatting?.length]);

  const handleRattingChange = (value, _id) => {
    setRatting((prevValue) => ({
      ...prevValue,
      [_id]: [...value],
    }));
  };

  const handleEqullyDistribute = ({ target: { checked } }) => {
    if (checked) {
      const value = 100 / collaboratorRatting.length;
      const ratting = {};
      collaboratorRatting.forEach(({ _id }) => {
        ratting[_id] = [value];
      });
      setRatting(ratting);
    } else {
      const ratting = {};
      collaboratorRatting.forEach(({ _id }) => {
        ratting[_id] = [0];
      });
      setRatting(ratting);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = Object.keys(ratting).map((key) => ({
      user: key,
      rate: ratting[key][0],
    }));
    const sumRating = await data.reduce(function (sum, current) {
      return sum + current.rate;
    }, 0);

    if (sumRating && sumRating <= 100) {
      const response = await dispatch(
        submitCollaboratorRatingAsync(
          data,
          queryParams.projectId,
          queryParams.packageId
        )
      );

      if (response.responseCode === 200) {
        props.handleCloseRating();
        return dispatch(
          getPackageAsync(queryParams.projectId, queryParams.packageId)
        );
      }
    } else {
      return toast.warning("Total rating can not be greater than 100");
    }
  };

  return (
    <>
      <Modal
        show={props.showRating}
        onHide={props.handleCloseRating}
        size="lg"
        centered
      >
        <Modal.Header className="px-4 pb-0 border-0" closeButton>
          <div className="h2 py-2">Rating</div>
        </Modal.Header>
        {collaboratorRatting.length > 0 ? (
          <Modal.Body className="p-4">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={5}>
                  <div className="p2 pb-3">{props.title}</div>
                </Col>
                <Col md={7}>
                  <div className="d-flex align-items-center justify-content-between re_rangeMinMAx">
                    <div className="p3 color_gray">0</div>
                    <div className="p3 color_gray">50</div>
                    <div className="p3 color_gray">100</div>
                  </div>
                </Col>
              </Row>

              {collaboratorRatting.map((collaborator) => {
                return (
                  <Row className=" pt-3" key={collaborator._id}>
                    <Col md={5}>
                      <div className="d-flex align-items-center">
                        <img
                          src={collaborator.profilePicture}
                          alt="Profile"
                          className="re_img_46_rounded"
                        />
                        <div className="p4 color_gray pl-2">
                          {collaborator.fullName}
                        </div>
                      </div>
                    </Col>
                    <Col md={7}>
                      <div className="re_slider1">
                        <RSlider
                          handleChangeBudget={(value) =>
                            handleRattingChange(value, collaborator._id)
                          }
                          //onUpdate={props.handleUpdateBudget}
                          defaultValues={ratting[collaborator._id]}
                          domain={domain}
                          mode={1}
                          step={1}
                          left={true}
                          valueTooltip={true}
                        />
                      </div>
                    </Col>
                  </Row>
                );
              })}
              <div className="d-flex justify-content-between pt-4">
                <Checkbox
                  small={true}
                  text="Distribute Equally"
                  onChange={handleEqullyDistribute}
                />
                <Button
                  variant="blue"
                  disabled={isLoading}
                  className="px-4"
                  type="submit"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </Form>
          </Modal.Body>
        ) : (
          <div className="text-center p2 color_gray mt-3 mb-5">
            No collaborators present
          </div>
        )}
      </Modal>
    </>
  );
};
export default RatingModal;

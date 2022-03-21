import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Checkbox, Radiobox } from "../Checkbox/Checkbox";
import { get } from "../../utils";
import RSlider from "./../RangeSlider/Slider";
import {
  collaboratorList,
  budgetRange,
} from "../../containers/ProjectList/redux/projectListApi";
import SplashScreen from "../SplashScreen/SplashScreen";
import { addDaysToTimestamp } from "../../utils";

import search from "../../assets/images/search2.svg";

const LeftSearch = (props) => {
  const [issueType, setIssueTypes] = useState([]);

  const {
    projectStatus,
    collaboratorLevel,
    deliveryDate,
    membersRange,
    minPrice,
    maxPrice,
    issueTypes,
  } = props.filterChangeObj;

  const { masterDetails } = useSelector(
    (state) => state.masterDetails,
    shallowEqual
  );

  const collaborators = useSelector(
    (state) => state.projectList.collaboratorList
  );

  const { minProjectCost, maxProjectCost, refreshCost } = useSelector(
    (state) => state.projectList
  );

  // const [projectCost, setProjectCost] = useState({
  //   values: [0, 500],
  //   update: [0, 500],
  // });

  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(budgetRange(props.mode));
    dispatch(collaboratorList());
  }, []);

  // useEffect(() => {
  //   if (maxProjectCost) {
  //     setProjectCost({
  //       values: [minProjectCost, maxProjectCost],
  //       update: [minProjectCost, maxProjectCost],
  //     });
  //   } else {
  //     setProjectCost({
  //       values: [0, 500],
  //       update: [0, 500],
  //     });
  //   }
  // }, [minProjectCost, maxProjectCost, refreshCost]);

  // const handleChangeBudgetSlider = (changedValue) => {
  //   if (!maxProjectCost || minProjectCost !== maxProjectCost) {
  //     setProjectCost({ ...projectCost, update: changedValue });
  //     props.onChangeFilters({ ...projectCost, update: changedValue });
  //   }
  // };

  // const handleUpdateBudgetSlider = (updatedValue) => {
  //   if (!maxProjectCost || minProjectCost !== maxProjectCost) {
  //     setProjectCost({ ...projectCost, update: updatedValue });
  //   }
  // };
  useEffect(() => {
    if (Object.keys(masterDetails).length >= 3) {
      Object.keys(masterDetails).map((type) => {
        const masterD = get(["values"], masterDetails[type]).map((r) => ({
          label: r._id,
          name: r.name,
          _id: r._id,
        }));
        if (masterDetails[type].type === "Issue Types") {
          setIssueTypes(masterD);
        }
      });
    }
  }, [masterDetails]);

  const getTaskTypeId = (getTaskTypeName) => {
    const issueTypeId = issueType.filter((issueType) => {
      return issueType.name === getTaskTypeName;
    });

    if (issueTypeId.length > 0) {
      return issueTypeId[0]._id;
    }
  };
  return (
    <>
      <div className="re_leftPanlListProject p-4">
        <Form>
          <div className="reSearch">
            <div className="form-group w-100 mb-0">
              <input
                type="text"
                placeholder="Ex. Content Writting"
                className="form-control re_input"
                onChange={props.onChangeSearch}
                name="search"
                value={props.onSearch}
              />
            </div>
            <Button
              variant="black"
              className=""
              onClick={props.onClickFilters}
              id="searchText"
            >
              <img src={search} alt="search" />
            </Button>
          </div>
          <div className="pt-3 pb-3 ">
            <Button
              variant="blue"
              className="w-124px"
              onClick={props.onClickFiltersReset}
            >
              Reset
            </Button>
          </div>
          {/* <div className="p2 pt-md-4 pt-3 pb-4">Budget</div>
          <div className="d-flex pb-md-2">
            <div className="pr-2">
              <input
                type="text"
                className="re_priceInput re_input w-100"
                name="minPrice"
                value={`${projectCost.update[0]}`}
                readOnly
              />
            </div>
            <div className="pl-2">
              <input
                type="text"
                className="re_priceInput re_input w-100"
                name="maxPrice"
                value={`${projectCost.update[1]}`}
                readOnly
              />
            </div>
          </div> */}
          {/* <div className="py-4">
            <div className="re_slider2">
              <RSlider
                handleChangeBudget={handleChangeBudgetSlider}
                handleUpdateBudget={handleUpdateBudgetSlider}
                domain={projectCost && projectCost.values}
                defaultValues={
                  maxPrice ? projectCost.update : projectCost.values
                }
                mode={1}
                step={5}
                left={false}
              />
            </div>
          </div> */}
          <div className="p2 pb-3">Project Type</div>
          <div className="pb-1">
            <Radiobox
              small={true}
              text="Completed"
              name="projectStatus"
              value="COMPLETED"
              onChange={props.onChangeFilters}
              checked={projectStatus === "COMPLETED"}
            />
          </div>
          <div className="pb-1">
            <Radiobox
              small={true}
              text="Ongoing"
              name="projectStatus"
              value="OPEN"
              onChange={props.onChangeFilters}
              checked={projectStatus === "OPEN"}
            />
          </div>
          <hr className="dashedBorder" />
          <div className="p2 pb-3 pt-3 pt-md-4">Collaborator Level</div>
          {collaborators.map((collaborator, index) => {
            return (
              <div className="pb-1" key={collaborator._id}>
                <Radiobox
                  small={true}
                  text={collaborator.name}
                  name="collaboratorLevel"
                  value={collaborator._id}
                  onChange={props.onChangeFilters}
                  checked={collaboratorLevel === collaborator._id}
                />
              </div>
            );
          })}
          <hr className="dashedBorder" />
          <div className="p2 pb-3 pt-3 pt-md-4">Delivery Time</div>
          <div className="pb-1">
            <Radiobox
              small={true}
              text="Express 3 days"
              name="deliveryDate"
              value={addDaysToTimestamp(3)}
              onChange={props.onChangeFilters}
            // checked="deliveryDate"
            />
          </div>
          <div className="pb-1">
            <Radiobox
              small={true}
              text="Up to 7 days"
              name="deliveryDate"
              value={addDaysToTimestamp(7)}
              onChange={props.onChangeFilters}
            // checked="deliveryDate"
            />
          </div>
          <div className="pb-1">
            <Radiobox
              small={true}
              text="Up to 15 days"
              name="deliveryDate"
              value={addDaysToTimestamp(15)}
              onChange={props.onChangeFilters}
            // checked="deliveryDate"
            />
          </div>
          <div className="pb-1">
            <Radiobox
              small={true}
              text="Up to 30 days"
              name="deliveryDate"
              value={addDaysToTimestamp(30)}
              onChange={props.onChangeFilters}
            // checked="deliveryDate"
            />
          </div>
          <div className="pb-1">
            <Radiobox
              small={true}
              text="Anytime"
              name="deliveryDate"
              value=""
              onChange={props.onChangeFilters}
            // checked="deliveryDate"
            />
          </div>
          {/* <div className="f18-400 pb-3 pt-3 pt-md-4 text-uppercase">
            Job type
          </div>
          <div className="pb-1">
            <Checkbox small={true} text="Hourly" />
          </div>
          <div className="pb-1">
            <Checkbox small={true} text="Fixed-Price" />
          </div> */}
          <hr className="dashedBorder" />
          <div className="p2 pb-3 pt-3 pt-md-4">Type of Tasks</div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="Content"
              name="Content"
              value={getTaskTypeId("Content")}
              onChange={props.onChangeTaskType}
              checked={props.taskNames.includes("Content")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="Design"
              name="Design"
              value={getTaskTypeId("Design")}
              onChange={props.onChangeTaskType}
              checked={props.taskNames.includes("Design")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="Marketing"
              name="Marketing"
              value={getTaskTypeId("Marketing")}
              onChange={props.onChangeTaskType}
              checked={props.taskNames.includes("Marketing")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="Development"
              name="Development"
              value={getTaskTypeId("Development")}
              onChange={props.onChangeTaskType}
              checked={props.taskNames.includes("Development")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="Multi-Purpose"
              name="Multi-Purpose"
              value={getTaskTypeId("Multi-Purpose")}
              onChange={props.onChangeTaskType}
              checked={props.taskNames.includes("Multi-Purpose")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="Other"
              name="Other"
              value={getTaskTypeId("Other")}
              onChange={props.onChangeTaskType}
              checked={props.taskNames.includes("Other")}
            />
          </div>
          <hr className="dashedBorder" />
          <div className="p2 pb-3 pt-3 pt-md-4">Number of Members</div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="Less than 5 members"
              name="membersRange"
              value="0-5"
              onChange={props.onChangeMembers}
              checked={membersRange.includes("0-5")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="5 to 10 members"
              name="membersRange"
              value="5-10"
              onChange={props.onChangeMembers}
              checked={membersRange.includes("5-10")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="10 to 15 members"
              name="membersRange"
              value="10-15"
              onChange={props.onChangeMembers}
              checked={membersRange.includes("10-15")}
            />
          </div>
          <div className="pb-1">
            <Checkbox
              small={true}
              text="15 to 20 members"
              name="membersRange"
              value="15-20"
              onChange={props.onChangeMembers}
              checked={membersRange.includes("15-20")}
            />
          </div>
        </Form>
      </div>
    </>
  );
};
export default LeftSearch;

import React, { useState, useEffect, useRef } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import LeftSearch from "./LeftSearch";
import ProjectListRight from "./ProjectListRight";

import filter from "../../assets/images/filter.svg";
import { projectList } from "../../containers/ProjectList/redux/projectListApi";
import BasicPagination from "../Pagination/BasicPagination";
import {
  projectListActions,
  projectListConstant,
} from "../../containers/ProjectList/redux/projectListAction";
import { useDebounce } from "../../hooks/userDebounce";
import CollaboratorModal from "./CollaboratorModal";

const ProjectList = (props) => {
  const projectData = useSelector((state) => state.projectList, shallowEqual);
  const { user } = useSelector((state) => state.auth, shallowEqual);

  const dispatch = useDispatch();
  const [search, setSearch] = useState({ name: "", value: "" });
  const [ShowFilter, setShowFilter] = useState(false);
  const [ShowRequestsModel, setShowRequestsModel] = useState(false);
  const [projectCollaborators, setProjectCollaborators] = useState([]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState([]);
  const [taskNames, setTaskNames] = useState([]);
  const [filterChangeObj, setFilterChangeObj] = useState({
    minPrice: "",
    maxPrice: "",
    projectStatus: "",
    collaboratorLevel: "",
    deliveryDate: "",
    membersRange: [],
    issueTypes: [],
  });
  const didMount = useRef(false);

  const debouncedSearchTerm = useDebounce(search.value, 500);

  const [filterClickObj, setFilterClickObj] = useState({
    column: "",
    dir: "",
    search: "",
  });

  const handleShowFilter = () => {
    setShowFilter(!ShowFilter);
  };

  const onChangeFilters = (e) => {
    setFilterChangeObj((preValues) => {
      if (e.values && e.update) {
        return {
          ...preValues,
          minPrice: !isNaN(e.update[0])
            ? e.update[0].toString()
            : e.values[0].toString(),
          maxPrice: !isNaN(e.update[1])
            ? e.update[1].toString()
            : e.values[1].toString(),
        };
      } else {
        const { name, value } = e.target;
        return {
          ...preValues,
          [name]: value,
        };
      }
    });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const onChangeMembers = ({ target: { checked, value } }) => {
    if (checked) {
      setFilterChangeObj((preValues) => {
        return {
          ...preValues,
          membersRange: [...preValues.membersRange, value],
        };
      });
    } else {
      setFilterChangeObj((preValues) => {
        return {
          ...preValues,
          membersRange: preValues.membersRange.filter((e) => e !== value),
        };
      });
    }
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const onChangeTaskType = ({ target: { checked, value, name } }) => {
    if (checked) {
      setFilterChangeObj((preValues) => {
        return {
          ...preValues,
          issueTypes: [...preValues.issueTypes, value],
        };
      });
      setTaskNames([...taskNames, name]);
    } else {
      let sortedArray = [];
      setFilterChangeObj((preValues) => {
        return {
          ...preValues,
          issueTypes: preValues.issueTypes.filter((e) => e !== value),
        };
      });
      sortedArray = taskNames.filter((e) => e !== name);
      setTaskNames(sortedArray);
    }
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const onClickFilters = (e) => {
    const { name, value } = search;
    setFilterClickObj((preValues) => {
      return {
        ...preValues,
        [name]: value,
      };
    });
  };

  const onClickFiltersReset = (e) => {
    let deliveryDateRadio = document.querySelector(
      "input[type=radio][name=deliveryDate]:checked"
    );

    if (deliveryDateRadio != null) {
      deliveryDateRadio.checked = false;
    }

    setSearch({ name: "", value: "" });
    didMount.current = false;
    setTaskNames([]);
    dispatch({ type: projectListConstant.RESET_FILTERS });
    setFilterClickObj((preValues) => {
      return {
        ...preValues,
        search: "",
      };
    });
    setFilterChangeObj((preValues) => {
      return {
        ...preValues,
        projectStatus: "",
        collaboratorLevel: "",
        deliveryDate: "",
        minPrice: "",
        maxPrice: "",
        membersRange: [],
        issueTypes: [],
      };
    });
  };

  const onChangeSearch = (e) => {
    const { name, value } = e.target;
    setSearch({
      name,
      value,
    });
    didMount.current = true;
  };

  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : projectData.skip;
    dispatch(projectListActions.setProjectBatchNumber(count));
  };

  const handlecloseRequestsModel = () => {
    setShowRequestsModel(false);
  };

  const openRequestsModel = (event) => {
    event.preventDefault();
    const projectIndex = event.target.parentNode.id;
    if (projectIndex) {
      setProjectCollaborators(
        projectData.projectList.records[projectIndex].totalTeamMembers
      );
      setSelectedProjectDetails(projectData.projectList.records[projectIndex]);
      setShowRequestsModel(true);
    }
  };

  useEffect(() => {
    if (didMount.current) {
      setFilterClickObj((preValues) => {
        return {
          ...preValues,
          search: debouncedSearchTerm,
        };
      });
    } else {
      didMount.current = true;
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    dispatch(projectList(filterChangeObj, filterClickObj, props.mode));

    return () => {
      dispatch(projectListActions.resetBatchNumber(0));
    };
  }, [filterChangeObj, filterClickObj]);

  useEffect(() => {
    if (projectData.refreshList) {
      dispatch(projectList(filterChangeObj, filterClickObj, props.mode));
    }
  }, [projectData.refreshList]);

  useEffect(() => {
    return () => {
      dispatch(projectListActions.cleanUpProjectList());
    };
  }, []);

  return (
    <Row className="re_proListMain position-relative">
      <Col
        md={12}
        className="d-flex align-items-center justify-content-end d-xl-none re_filterBtnMobile"
      ></Col>
      <Col
        md={6}
        lg={4}
        xl={3}
        className={`d-none d-xl-block ${ShowFilter ? "active" : ""}`}
      >
        <LeftSearch
          onChangeFilters={onChangeFilters}
          taskNames={taskNames}
          onChangeTaskType={onChangeTaskType}
          onClickFilters={onClickFilters}
          onChangeSearch={onChangeSearch}
          onChangeMembers={onChangeMembers}
          onClickFiltersReset={onClickFiltersReset}
          mode={props.mode}
          step={5}
          filterChangeObj={filterChangeObj}
          onSearch={search.value}
        />
      </Col>
      <Col lg={12} xl={9} className="position-relative">
        <div className="d-flex align-items-center justify-content-end  mb-3">
          {props.CreateBtn && (
            <div className="d-flex justify-content-end re_createBtn">
              <Link to="/create-project" className="btn btn-blue">
                Create Project
              </Link>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-end d-xl-none re_filterBtnMobile">
            <div
              className="p4 text-uppercase re_Followers mb-0"
              onClick={handleShowFilter}
            >
              Filter <img src={filter} alt="filter" width="20px" />
            </div>
          </div>
        </div>
        <ProjectListRight
          mode={props.mode}
          openRequestsModel={openRequestsModel}
        />
        {/* && !projectData.isLoading */}
        {projectData.projectList.recordsTotal > 0 && (
          <div className="row d-flex align-items-center mt-3">
            <div className="col-md-12 aspgntn">
              <BasicPagination
                totalRecords={projectData.projectList.recordsTotal}
                filteredRecords={projectData.projectList.recordsFiltered}
                limit={projectData.limit}
                batch={projectData.skip + 1}
                onBatchChange={onPageChange}
              />
            </div>
          </div>
        )}

        <CollaboratorModal
          selectedProjectDetails={selectedProjectDetails}
          handleCloseRequest={handlecloseRequestsModel}
          mode={props.mode}
          showRequest={ShowRequestsModel}
          projectCollaborators={projectCollaborators}
        />
      </Col>
    </Row>
  );
};
export default ProjectList;

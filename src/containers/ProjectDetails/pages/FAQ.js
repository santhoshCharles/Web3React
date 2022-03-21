import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { FAQAccordion } from "../../../components/FAQ/FAQAccordion";
import { getAllFaqsAsync } from "../../CreateProject/redux/createProjectApi";
import SplashScreen from "../../../components/SplashScreen/SplashScreen";
import BasicPagination from "../../../components/Pagination/BasicPagination";
import { CreateProjectActions } from "../../CreateProject/redux/createProjectAction";
import AddFaqModal from "./AddFaqModal";
import DeleteFaqModal from "./DeleteFaqModal";
const list = [
  {
    title: "abcd",
    text: "abcd",
  },
];
const FAQ = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const [faqModalShow, setFaqModalShow] = useState(false);
  const [faqDeleteModalShow, setFaqDeleteModalShow] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [deleteData, setDeleteData] = useState({});

  const { getAllFaqs, isLoading, refreshFaqList, skip, limit } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );
  const { projectDetail } = useSelector(
    (state) => state.createProject,
    shallowEqual
  );
  //console.log("projectDetail123", projectDetail.adminVerification)
  const { user } = useSelector((state) => state.auth);
  const faqCloseModal = () => {
    setFaqModalShow(false);
    setIsEditMode(false);
    setEditData({});
  };
  useEffect(() => {
    if (params.projectId && refreshFaqList === true) {
      dispatch(getAllFaqsAsync(params.projectId));
    }
  }, [params && params.projectId, refreshFaqList]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    return () => {
      dispatch(CreateProjectActions.setFaqBatchNumber(0));
    };
  }, []);
  const onPageChange = (currentBatch) => {
    let count = currentBatch ? currentBatch - 1 : skip;
    dispatch(CreateProjectActions.setFaqBatchNumber(count));
  };
  const handleEdit = (data) => {
    setFaqModalShow(true);
    setEditData(data);
    setIsEditMode(true);
  };
  const handleDelete = (data) => {
    setDeleteData(data);
    setFaqDeleteModalShow(true);
  };
  const faqDeleteCloseModal = () => {
    setFaqDeleteModalShow(false);
  };
  return (
    <>
      {isLoading && <SplashScreen />}
      <Container className={`bg-white shadowBox radius-top-0 py-0`}>
        {user && projectDetail && projectDetail.initiator === user._id && (
          <div className=" d-flex flex-wrap justify-content-end  align-items-center pt-3 ">
            {projectDetail.adminVerification !== "ACCEPTED" ? null : (
              <button
                className="btn btn-blue px-3"
                onClick={() => setFaqModalShow(true)}
              >
                Add a new FAQ
              </button>
            )}
          </div>
        )}
        <div className="re_accordion p-0 border-0 re_faqProject">
          {getAllFaqs.records && getAllFaqs.records.length === 0 ? (
            projectDetail && projectDetail.adminVerification !== "ACCEPTED" ? (
              <div className="text-center p3 color_gray py-4">
                Wait for approval from admin
              </div>
            ) : (
              <div className="text-center p3 color_gray py-4">
                No FAQ available
              </div>
            )
          ) : (
            <FAQAccordion
              data={getAllFaqs.records ? getAllFaqs.records : []}
              EditDelete
              handleEdit={(data) => handleEdit(data)}
              handleDelete={(data) => handleDelete(data)}
              projectDetail={projectDetail}
              user={user}
            />
          )}
        </div>
        <AddFaqModal
          onFaqShow={faqModalShow}
          onCloseFaq={faqCloseModal}
          projectId={params && params.projectId}
          isEditMode={isEditMode}
          editData={editData}
        />
        <DeleteFaqModal
          onFaqShow={faqDeleteModalShow}
          onCloseFaq={faqDeleteCloseModal}
          deleteData={deleteData}
          projectId={params && params.projectId}
        />
        {getAllFaqs.recordsTotal > 0 && (
          <div className="row d-flex align-items-center mt-3">
            <div className="col-md-12 aspgntn">
              <BasicPagination
                totalRecords={getAllFaqs.recordsTotal}
                filteredRecords={getAllFaqs.recordsFiltered}
                limit={limit}
                batch={skip + 1}
                onBatchChange={(batchNumber) => onPageChange(batchNumber)}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};
export default FAQ;

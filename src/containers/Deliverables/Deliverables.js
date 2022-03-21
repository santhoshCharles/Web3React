import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import queryString from "query-string";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { PageTitle } from "../../components/PageTitle/PageTitle";
import TaskAdd from "./TaskAdd";
import Board from "react-trello";
import TaskView from "./TaskView";
import AddCardLink from "./AddCardLink";
import NewCardForm from "./NewCardForm";
import LaneHeader from "./LaneHeader";
import Item from "./CardItem";
import Profile from "./../../assets/images/Profile.png";
import SplashScreen from "../../components/SplashScreen/SplashScreen";
import {
  getProjectBoardDetails,
  handleCardDragAsync,
} from "./redux/projectBoardApi";
import { ProjectCardMap } from "./redux/projectBoardAction";

const Deliverables = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedCardData, setSelectedCardData] = useState({});
  const [selectedCardId, setSelectedCardId] = useState("");
  const [isCardIdPresent, setIsCardIdPresent] = useState(false);
  const [ShowTask, setShowTask] = useState(false);
  const queryParams = queryString.parse(window.location.search);
  const { isLoading, projectBoardDetails, refreshData } = useSelector(
    (state) => state.projectBoard,
    shallowEqual
  );

  useEffect(() => {
    if (!queryParams.projectId || !queryParams.packageId) {
      history.goBack();
    }
  }, [queryParams]);

  useEffect(() => {
    return () => {
      dispatch({ type: ProjectCardMap.RESET_PROJECT_BOARD_DETAILS });
    };
  }, []);
  useEffect(() => {
    if (queryParams.cardId !== undefined && queryParams.cardId !== "") {
      setSelectedCardId(queryParams.cardId);
      setIsCardIdPresent(true);
      setShowTask(true);
    }
  }, [queryParams.cardId]);
  useEffect(() => {
    const { projectId, packageId } = queryParams;
    if (refreshData && queryParams && projectId && packageId) {
      dispatch(getProjectBoardDetails(projectId, packageId));
    }
  }, [refreshData, queryParams.projectId, queryParams.packageId]);

  const handleCardDrag = (
    cardId,
    sourceLaneId,
    targetLaneId,
    position,
    cardDetails
  ) => {
    let data = {};
    data.fromcardCategoryId = sourceLaneId;
    data.tocardCategoryId = targetLaneId;
    data.dropSequence = position;
    dispatch(
      handleCardDragAsync(
        data,
        queryParams.projectId,
        queryParams.packageId,
        cardDetails._id
      )
    );
  };
  const handleShowTask = (cardId, metadata, laneId) => {
    metadata.laneId = laneId;
    setSelectedCardData(metadata);
    setSelectedCardId(cardId);
    setShowTask(true);
  };
  const handleCloseTask = () => {
    setShowTask(false);
    setSelectedCardData({});
    setSelectedCardId("");
    setIsCardIdPresent(false);
  };
  return (
    <>
      {isLoading && <SplashScreen />}
      <PageTitle title="Project Board" />
      <div className="pt-80 pb-80 min-height-50vh">
        <Container className="shadowBox bg-white">
          {/* <Row>
            <Col md={4}>
              <div className="h2 pb-3">Project Board</div>
            </Col>
            <Col md={8}>
              <div className="d-flex align-items-center justify-content-md-end">
                <div>
                  <input
                    placeholder="Search"
                    type="text"
                    className="Re_ChatSearch re_inputRouded mb-2"
                  />
                </div>
              </div>
            </Col>
          </Row> */}
          <hr className="m-0" />
          {Object.keys(projectBoardDetails).length > 0 ? (
            <Board
              onCardClick={(cardId, metadata, laneId) =>
                handleShowTask(cardId, metadata, laneId)
              }
              data={projectBoardDetails}
              // onDataChange={(newData) => console.log(newData, "mewDatataa")}
              editable
              handleDragEnd={handleCardDrag}
              // onCardDelete={(cardId, laneId) =>
              //   console.log(laneId, "CardID on DELETE")
              // }
              // hideCardDeleteIcon={false}
              cardDraggable={true}
              laneDraggable={false}
              components={{
                Card: Item,
                LaneHeader: LaneHeader,
                NewCardForm: NewCardForm,
                AddCardLink: AddCardLink,
              }}
            />
          ) : (
            <SplashScreen />
          )}

          {/* <Row>
            <Col lg={3} md={6} className="pr-md-2">
              <ItemList listTitle="Brainstorming" AddTitleShowForm={AddTitleShowForm} handleCloseAddTitle={handleCloseAddTitle} handleShowAddTitle={handleShowAddTitle} handleShowTask={handleShowTask} handleCloseTask={handleCloseTask} />
            </Col>
            <Col lg={3} md={6} className="pl-lg-2 pr-md-2">
              <ItemList listTitle="Currently working on" AddTitleShowForm={AddTitleShowForm} handleCloseAddTitle={handleCloseAddTitle} handleShowAddTitle={handleShowAddTitle} handleShowTask={handleShowTask} handleCloseTask={handleCloseTask} />
            </Col>
            <Col lg={3} md={6} className="pl-md-2 pr-lg-2">
              <ItemList listTitle="Peer-Review" AddTitleShowForm={AddTitleShowForm} handleCloseAddTitle={handleCloseAddTitle} handleShowAddTitle={handleShowAddTitle} handleShowTask={handleShowTask} handleCloseTask={handleCloseTask} />
            </Col>
            <Col lg={3} md={6} className="pl-md-2">
              <ItemList listTitle="Approved" AddTitleShowForm={AddTitleShowForm} handleCloseAddTitle={handleCloseAddTitle} handleShowAddTitle={handleShowAddTitle} handleShowTask={handleShowTask} handleCloseTask={handleCloseTask} />
            </Col>
          </Row> */}
        </Container>
      </div>
      {selectedCardData && selectedCardData.descText === "" && (
        <TaskAdd
          ShowTask={ShowTask}
          handleCloseTask={handleCloseTask}
          selectedCardId={selectedCardId}
          projectBoardDetails={projectBoardDetails}
        />
      )}
      {(isCardIdPresent ||
        (selectedCardData && selectedCardData.descText !== "")) && (
        <TaskView
          ShowTask={ShowTask}
          handleCloseTask={handleCloseTask}
          selectedCardId={selectedCardId}
          projectBoardDetails={projectBoardDetails}
        />
      )}
    </>
  );
};

export default Deliverables;

// export const ItemList = (props) => {
//   return (<>
//     <div className="py-2 d-flex align-items-center justify-content-between">
//       <div className="h5">{props.listTitle}</div>
//       <div className="d-flex align-items-center">
//         <Button variant="link" onClick={props.handleShowAddTitle}><img src={PlusGreen} alt="" /></Button>
//         <Dropdown>
//           <Dropdown.Toggle variant="link" className="" id="re_DropDown">
//             <img src={DotsThreeVertical} alt="" />
//           </Dropdown.Toggle>
//           <Dropdown.Menu alignRight>
//             <Dropdown.Item as={Button}><img src={PencilLine} alt="" className="mr-2" />Rename section</Dropdown.Item>
//             <Dropdown.Item as={Button}><img src={Trashgreen} alt="" className="mr-2" />Delete section</Dropdown.Item>
//             <Dropdown.Item as={Button}><img src={PushPin} alt="" className="mr-2" />Pin this section</Dropdown.Item>
//           </Dropdown.Menu>
//         </Dropdown>
//       </div>
//     </div>
//     <div className="re_workBoxScroll">
//       <PerfectScrollbar
//         className="scroll"
//         options={perfectScrollbarOptions}
//         style={{ maxHeight: 700 }}
//       >
//         <Item handleShowTask={props.handleShowTask} Title="Integration IDRT FIAT Gateway Harmony One high standards" date="Jul 20" Profile={Profile} totalProfile="+12" />
//       </PerfectScrollbar>
//       {props.AddTitleShowForm ? <>
//         <textarea placeholder="Enter your task" className="re_workBox re_input form-control" rows="3"></textarea>
//         <div className="py-2 d-flex align-items-center justify-content-between">
//           <button type="button" className="re_workBox re_addCardBtn d-flex justify-content-center align-items-center mr-2" onClick={props.handleCloseAddTitle}><img src={PlusGreen} alt="" className="mr-2" />Save a card</button>
//           <button type="button" className="re_workBox re_addCardBtn d-flex justify-content-center align-items-center" onClick={props.handleCloseAddTitle}><img src={close} alt="" width="15px" className="mr-2" />Cancle</button>
//         </div></> :
//         <button type="button" className="re_workBox re_addCardBtn d-flex justify-content-center align-items-center" onClick={props.handleShowAddTitle}><img src={PlusGreen} alt="" className="mr-2" />Add a card</button>}
//     </div>
//   </>)
// }

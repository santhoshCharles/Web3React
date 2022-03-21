import React, { forwardRef, useState, useRef, useEffect } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import moment from "moment";
import { Picker, emojiIndex } from "emoji-mart";
import { Formik, Form, Field } from "formik";
import { toast } from "react-toastify";
import Select from "react-select";
import * as Yup from "yup";
import { Mention, MentionsInput } from "react-mentions";
import queryString from "query-string";
import "react-datepicker/dist/react-datepicker.css";
import cancel from "../../assets/images/cancel.svg";
import calendarCircle from "./../../assets/images/calendarCircle.svg";
import CheckCircle from "./../../assets/images/CheckCircle.svg";
import Profile from "./../../assets/images/Profile.png";
import Timer from "./../../assets/images/Timer.svg";
import Trashgreen from "./../../assets/images/Trashgreen.svg";
import chatattachment from "./../../assets/images/chat-attachment.svg";
import chaticon from "./../../assets/images/chat-icon.svg";
import chatMention from "./../../assets/images/chat-Mention.svg";
import chatText from "./../../assets/images/chat-Text.svg";
import chaturllink from "./../../assets/images/chat-urllink.svg";
import { getFileType } from "../../utils";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import {
  updateCardAsync,
  uploadImageFunc,
  getCardDetails,
  markAsComplete,
} from "./redux/projectBoardApi";
import { ProjectCardMap } from "./redux/projectBoardAction";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../components/SplashScreen/SplashScreen";

const TaskAdd = (props) => {
  const { isLoading, refreshCardData, cardData } = useSelector(
    (state) => state.projectBoard,
    shallowEqual
  );

  const [uploading, setUploading] = useState(false);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const queryParams = queryString.parse(window.location.search);
  const { projectBoardDetails, selectedCardId } = props;
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [mention, setMentions] = useState([]);
  const [members, setMembers] = useState([]);
  const [file, setFile] = useState([]);
  const [error, setError] = useState("");
  const [blockedByCards, setBlockedByCards] = useState([]);
  const [selectBlockedBy, setSelectdBlockedBy] = useState("");
  const [showPreviewBox, setShowPreviewBox] = useState(false);
  const [link, setLink] = useState({ label: "", value: "" });

  const inputRef = useRef(null);
  const InputIcon = forwardRef(({ value, onClick }, ref) => (
    <button
      className="btn btn-link text-dark p-0 d-flex align-items-center"
      onClick={onClick}
      type="button"
      ref={ref}
    >
      <img src={calendarCircle} alt="" />
      <div className="p5 pl-2">
        {value ? moment(value).format("DD/MM/YY") : "No due date"}
      </div>
    </button>
  ));
  useEffect(() => {
    const { projectId, packageId } = queryParams;
    if (
      refreshCardData &&
      projectId &&
      packageId &&
      props.selectedCardId !== ""
    ) {
      dispatch(getCardDetails(projectId, packageId, props.selectedCardId));
    }
  }, [props.setSelectedCardId, refreshCardData]);
  useEffect(() => {
    if (cardData && cardData.dueDate) {
      setStartDate(cardData.dueDate);
    }
  }, [cardData]);

  useEffect(() => {
    const memberArray =
      projectBoardDetails.packageMembers &&
      projectBoardDetails.packageMembers.length > 0 &&
      projectBoardDetails.packageMembers.map((member) => {
        return {
          id: member._id,
          display: member.fullName,
        };
      });
    setMembers(memberArray);
  }, [props.projectBoardDetails]);
  useEffect(() => {
    if (
      projectBoardDetails &&
      projectBoardDetails.blockedBy &&
      projectBoardDetails.blockedBy.length > 0 &&
      Object.keys(cardData).length > 0
    ) {
      const blockedByCards = projectBoardDetails.blockedBy
        .filter((card) => card._id !== cardData._id)
        .map((card) => {
          return {
            key: card._id,
            value: card._id,
            label: card.title,
          };
        });
      if (blockedByCards.length > 0) {
        setBlockedByCards(blockedByCards);
        const data = blockedByCards.filter(
          (card) => card.value === cardData.blockedBy
        );

        if (data && data.length > 0) {
          return setSelectdBlockedBy(data[0]);
        } else {
          return setSelectdBlockedBy("");
        }
      }
    }
  }, [props.selectedCardId, cardData, projectBoardDetails]);
  const addEmoji = (emoji, setFieldValue, values) => {
    const text = `${values.descText}${emoji.native}`;
    //setnewMessage(text);
    setFieldValue("descText", text);
    setshowEmojiPicker(false);
  };

  const resetAttachement = async (index) => {
    let data = file;
    data.splice(index, 1);
    await setFile([...data]);
  };

  const uploadImage = async (e) => {
    setshowEmojiPicker(false);
    if (e.target.files.length > 0) {
      const data = [
        ...file,
        {
          url: URL.createObjectURL(e.target.files[0]),
          file: e.target.files[0],
        },
      ];
      await setFile([...data]);
      setError("");
      setShowPreviewBox(true);
    }
  };

  const handleChange = (
    event,
    newValue,
    newPlainTextValue,
    mentions,
    setFieldValue
  ) => {
    setFieldValue("descText", newValue);
    setMentions(mentions);
  };

  useEffect(() => {
    return () => {
      dispatch({ type: ProjectCardMap.RESET_CARD_DETAILS });
    };
  }, []);
  const savePost = async (values, setFieldValue, resetForm) => {
    setshowEmojiPicker(false);
    const { projectId, packageId } = queryParams;
    let finalResponse = {};

    // let string = values.descText.replace(/\([^()]*\)/g, "");
    finalResponse.descText = values.descText;
    if (mention && mention.length > 0) {
      finalResponse.mentionedDetails = mention;
    }
    if (file.length > 5) {
      return toast.warning("You can upload at a time 5 attachements!");
    }
    if (file.length > 0) {
      let data = null;
      data = new FormData();
      const object = file.map(async (file, index) => {
        await data.append("img", file.file);
      });
      setUploading(true);
      const fileResponse = await uploadImageFunc(data);
      setUploading(false);
      if (fileResponse && fileResponse.responseCode === 200) {
        let descAttachment = [];
        await fileResponse.responseData.map(async (Data, index) => {
          let fileObject = {
            fileType: await getFileType(file[index].file),
            fileName: file[index].file.name,
            fileUrl: Data,
          };
          descAttachment = [...descAttachment, fileObject];
        });

        finalResponse.descAttachment = [...descAttachment];
      } else {
        setFile([]);
        resetForm();
        if (inputRef.current) {
          return (inputRef.current.value = "");
        }
      }
    }

    const response = await dispatch(
      updateCardAsync(finalResponse, projectId, packageId, props.selectedCardId)
    );
    if (response.responseCode === 200) {
      setFieldValue("descText", "");
      resetForm();
      props.handleCloseTask();
    }
  };

  const toggleEmojiPicker = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };

  const handleLinkInputChange = ({ target: { value, name } }) => {
    setLink((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddLink = (setFieldValue, values) => {
    var str = link.label;
    var result = str.link(link.value);
    var renderData = result;

    setFieldValue("descText", `${values.descText} <pre>${renderData}</pre>`);
    setLink({ value: "", label: "" });
  };
  useEffect(() => {
    if (!file.length > 0) {
      setShowPreviewBox(false);
    }
  }, [file]);

  const initialValues = {
    descText: "",
  };

  const validateYupSchema = Yup.object().shape({
    descText: Yup.string().trim(" ").required("Descripton is Required"),
  });

  const updateDueDate = (date) => {
    setshowEmojiPicker(false);
    const { projectId, packageId } = queryParams;
    if (date && projectId && packageId) {
      setStartDate(date);
      const values = {
        dueDate: date.getTime(),
      };
      dispatch(
        updateCardAsync(values, projectId, packageId, props.selectedCardId)
      );
    }
  };
  const updateBlockedBy = (e) => {
    setshowEmojiPicker(false);
    const { projectId, packageId } = queryParams;
    setSelectdBlockedBy(e);
    if (projectId && packageId) {
      const values = {
        blockedBy: e.value,
      };
      dispatch(
        updateCardAsync(values, projectId, packageId, props.selectedCardId)
      );
    }
  };

  const handleClosePreview = () => {
    props.handleCloseTask();
    setFile([]);
    dispatch({ type: ProjectCardMap.RESET_CARD_DETAILS });
  };
  const handleMarkAsComplete = (e) => {
    const { projectId, packageId } = queryParams;
    dispatch(markAsComplete(projectId, packageId, selectedCardId));
    // props.handleCloseTask();
  };
  return (
    <>
      <Modal
        show={props.ShowTask}
        onHide={handleClosePreview}
        centered
        size="lg"
      >
        {isLoading && <SplashScreen />}
        <Modal.Header className="px-4 border-0 align-items-start" closeButton>
          <div>
            {(user._id === props.projectBoardDetails?.initiator ||
              (props.projectBoardDetails &&
                props.projectBoardDetails.observers &&
                props.projectBoardDetails.observers.includes(user._id))) &&
              cardData.cardCategoryId === "615d3b430a1b043d33ae6f56" &&
              cardData.markCompleted !== "COMPLETED" && (
                <label className="re_MarkasComplete">
                  <input
                    type="checkbox"
                    onChange={(e) => handleMarkAsComplete(e)}
                  />
                  <span>Mark as Complete</span>
                </label>
              )}

            <div className="h3 text-break pr-4">
              {/* Brainstorming &#61;&#62; Integration IDRT FIAT Gateway */}
              {cardData.title}
            </div>
          </div>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4 pt-1">
          <Formik
            initialValues={initialValues}
            validationSchema={validateYupSchema}
            enableReinitialize={true}
            onSubmit={(values, { setFieldValue, resetForm }) =>
              savePost(values, setFieldValue, resetForm)
            }
          >
            {({ errors, touched, values, setFieldValue }) => (
              <Form>
                <Row>
                  <Col md={3} className="p4">
                    Due date
                  </Col>
                  <Col md={9} className="p4">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => updateDueDate(date)}
                      customInput={<InputIcon />}
                    />
                  </Col>
                </Row>
                <Row className="pb-2">
                  <Col md={3} className="p4">
                    Project
                  </Col>
                  <Col md={9} className="p4">
                    {projectBoardDetails.projectName}
                  </Col>
                </Row>
                <Row className="pb-2 align-items-center">
                  <Col md={3} className="p4">
                    Dependencies
                  </Col>
                  <Col md={9} className="p4">
                    <div className="d-flex align-items-center text-nowrap">
                      <img src={Timer} alt="" />
                      <span className="p4 px-2 text-nowrap">Blocked by</span>

                      <Select
                        value={selectBlockedBy}
                        onChange={updateBlockedBy}
                        options={blockedByCards}
                        className="w-100"
                        classNamePrefix="select"
                      />
                    </div>
                  </Col>
                </Row>
                {/* <div className="p4 pb-1 border-bottom-green">Subtasks</div>

                <button type="button" className="re_subtaskbtn">
                  <div className="d-flex align-items-center">
                    <img src={CheckCircle} alt="" />
                    <span className="p4 px-2">
                      Distinctively - Envisioneer Impactful
                    </span>
                  </div>
                  <div className="d-flex align-items-center re_imageUsers">
                    <div className="p4 pr-2 opacity50">Oct 10</div>
                    <div className="re_imgGrroup h-35px">
                      <img src={Profile} alt="team" />
                      <img src={Profile} alt="team" />
                      <div className="re_more">+12</div>
                    </div>
                  </div>
                </button>

                <button type="button" className="re_subtaskbtn">
                  <div className="d-flex align-items-center">
                    <img src={CheckCircle} alt="" />
                    <span className="p4 px-2">
                      Distinctively - Envisioneer Impactful
                    </span>
                  </div>
                  <div className="d-flex align-items-center re_imageUsers">
                    <div className="p4 pr-2 opacity50">Oct 10</div>
                    <div className="re_imgGrroup h-35px">
                      <img src={Profile} alt="team" />
                      <img src={Profile} alt="team" />
                      <div className="re_more">+12</div>
                    </div>
                  </div>
                </button>

                <button type="button" className="re_subtaskbtn">
                  <div className="d-flex align-items-center">
                    <img src={CheckCircle} alt="" />
                    <span className="p4 px-2">
                      Distinctively - Envisioneer Impactful
                    </span>
                  </div>
                  <div className="d-flex align-items-center re_imageUsers">
                    <div className="p4 pr-2 opacity50">Oct 10</div>
                    <div className="re_imgGrroup h-35px">
                      <img src={Profile} alt="team" />
                      <img src={Profile} alt="team" />
                      <div className="re_more">+12</div>
                    </div>
                  </div>
                </button> */}

                {/* {AddSubTaskFormShow && (
                  <input
                    type="text"
                    className="form-control re_input mt-2"
                    placeholder="Enter subtask"
                  />
                )}
                <div className="text-right py-2">
                  {AddSubTaskFormShow && (
                    <Button
                      variant="outline-secondary"
                      className="mr-2"
                      onClick={() => setAddSubTaskFormShow(false)}
                    >
                      Cancle
                    </Button>
                  )}
                  <Button
                    variant="outline-success"
                    onClick={() => setAddSubTaskFormShow(!AddSubTaskFormShow)}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M3.125 10H16.875"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        stroklinejoin="round"
                      />
                      <path
                        d="M10 3.125V16.875"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        stroklinejoin="round"
                      />
                    </svg>
                    Add subtask
                  </Button>
                </div> */}
                <div className="p3 pb-2">Description</div>

                <div className="re_borderBoxOnly re_chatBox p-3">
                  <Field name="descText">
                    {({ field }) => (
                      <MentionsInput
                        {...field}
                        // style={defaultStyle}
                        // className={
                        //   "form-control re_input border-0" +
                        //   (errors.descText && touched.descText
                        //     ? " is-invalid"
                        //     : "")
                        // }
                        className="mentions"
                        allowSuggestionsAboveCursor={true}
                        placeholder="Ask a question or post an update"
                        name="descText"
                        value={values.descText}
                        onChange={(
                          event,
                          newValue,
                          newPlainTextValue,
                          mentions
                        ) =>
                          handleChange(
                            event,
                            newValue,
                            newPlainTextValue,
                            mentions,
                            setFieldValue
                          )
                        }
                      >
                        <Mention
                          trigger="@"
                          markup="@__display__(__id__)"
                          data={members}
                          displayTransform={(id, display) => `@${display}`}
                        />
                      </MentionsInput>
                    )}
                  </Field>

                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <div className="d-flex align-items-center">
                      {/* <Button variant="link" className="mr-2 p-0">
                        <img src={chatText} alt="" />
                      </Button> */}

                      {showEmojiPicker && (
                        <Picker
                          set="apple"
                          onSelect={(emoji) =>
                            addEmoji(emoji, setFieldValue, values)
                          }
                          title="Pick your emoji…"
                          emoji="point_up"
                        />
                      )}
                      <Button
                        variant="link"
                        type="button"
                        className="mr-2 p-0 zindex-22"
                        onClick={toggleEmojiPicker}
                      >
                        <img src={chaticon} alt="" />
                      </Button>

                      <label className="mr-2 mb-0 p-0 cursor-pointer zindex-22">
                        <input
                          type="file"
                          accept="application/pdf, image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ref={inputRef}
                          hidden
                          onChange={(e) => uploadImage(e)}
                        />
                        <img src={chatattachment} alt="" />
                      </label>

                      {/* <Button variant="link" className="attach-link mr-2 p-0">
                        <img src={chaturllink} alt="" />
                        <div className="link-inputs">
                          <input
                            className="mb-1"
                            type="text"
                            name="label"
                            placeholder="Enter link text"
                            value={link.label}
                            onChange={handleLinkInputChange}
                          />
                          <input
                            className="mb-1"
                            type="text"
                            name="value"
                            placeholder="Enter link"
                            value={link.value}
                            onChange={handleLinkInputChange}
                          />
                          <Button
                            onClick={() => handleAddLink(setFieldValue, values)}
                          >
                            Add
                          </Button>
                        </div>
                        
                      </Button> */}

                      {/* <Button variant="link" className="mr-2 p-0">
                        <img src={chatMention} alt="" />
                      </Button> */}
                      {/* <MentionsInput value={this.state.value} onChange={this.handleChange}>
                        <Mention
                          trigger="@"
                          data={this.props.users}
                          renderSuggestion={this.renderUserSuggestion}
                        />
                      </MentionsInput> */}
                    </div>
                    {/* <div className="d-flex align-items-center">
                      <div className="p5 opacity60 pr-2">
                        {cardData &&
                          cardData.profile &&
                          cardData.profile.length}{" "}
                        people will notifed
                      </div>
                    </div> */}
                  </div>
                </div>
                {touched.descText && errors.descText ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{errors.descText}</div>
                  </div>
                ) : null}
                <Button
                  className="mt-2 px-4"
                  variant="blue"
                  type="submit"
                  value="Submit"
                  disabled={uploading}
                >
                  {/* {isLoading ? "Saving..." : "Save"} */}
                  {uploading ? (
                    <>
                      {uploading ? "Uploading..." : "Saving..."}
                      <img
                        src={LoadingImage}
                        alt="LoadingImage"
                        width="20px"
                        className="ml-2"
                      />
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>

                {/* )} */}
                {/* <Button variant="link" className="mt-2 p-0 text-dark d-flex align-items-center  justify-content-start"><img src={Trashgreen} alt="" /><span className="opacity60 pl-2">Delete Card</span></Button> */}
              </Form>
            )}
          </Formik>
          {showPreviewBox && (
            <div className="d-flex flex-column ">
              {showPreviewBox &&
                file.length > 0 &&
                file.map((file, index) => {
                  return (
                    <>
                      <div className="pt-2 d-flex align-items-center">
                        <a className="pr-2 text-break p5">{file.file.name}</a>
                        <button
                          type="button"
                          className="btn btn-link p-0 d-flex align-items-center"
                          onClick={() => {
                            resetAttachement(index);
                            inputRef.current.value = null;
                          }}
                        >
                          <img
                            src={cancel}
                            alt="Cancel"
                            className="re_Close"
                            width="15px"
                          />
                        </button>
                      </div>
                    </>
                  );
                })}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default TaskAdd;

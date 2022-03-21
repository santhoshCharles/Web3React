import React, {
  forwardRef,
  useState,
  useRef,
  Fragment,
  useEffect,
} from "react";
import { Button, Col, Dropdown, Modal, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";
import { toast } from "react-toastify";
import { ProjectCardMap } from "./redux/projectBoardAction";
import "react-datepicker/dist/react-datepicker.css";
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
import fileIcon from "./../../assets/images/file.svg";
import Crosshair from "./../../assets/images/Crosshair.svg";
import downarrowgreen from "./../../assets/images/downarrowgreen.svg";
import ThumbsUp from "./../../assets/images/ThumbsUp.svg";
import img from "./../../assets/images/img.png";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import ModalYesNo from "../../components/Modal/ModalYesNo";
import { Picker, emojiIndex } from "emoji-mart";
import cancel from "../../assets/images/cancel.svg";
import { Mention, MentionsInput } from "react-mentions";
import Document from "../../assets/images/document.svg";
import {
  deleteCard,
  deleteCardComment,
  updateCardAsync,
  uploadImageFunc,
  updateCardCommentAsync,
  deleteCardCommentAttachment,
  markAsComplete,
  getCardDetails,
} from "./redux/projectBoardApi";
import queryString from "query-string";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getFileType } from "../../utils";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import SplashScreen from "../../components/SplashScreen/SplashScreen";

const TaskView = (props) => {
  const { isLoading, cardData, isFetching, refreshCardData } = useSelector(
    (state) => state.projectBoard,
    shallowEqual
  );
  const [blockedByCards, setBlockedByCards] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const data = useSelector((state) => state.projectBoard);
  const queryParams = queryString.parse(window.location.search);
  const { projectBoardDetails, selectedCardData } = props;
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(null);
  const [AddSubTaskFormShow, setAddSubTaskFormShow] = useState(false);
  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [mention, setMentions] = useState([]);
  const [members, setMembers] = useState([]);
  const [show, setShow] = useState(false);
  const [newMessage, setnewMessage] = useState("");
  const [file, setFile] = useState([]);
  const [error, setError] = useState("");
  const [selectBlockedBy, setSelectdBlockedBy] = useState("");
  const [showPreviewBox, setShowPreviewBox] = useState(false);
  const [
    showCommentAttachementPreviewBox,
    SetshowCommentAttachementPreviewBox,
  ] = useState(false);
  const [link, setLink] = useState({ label: "", value: "" });
  const [loading, setLoading] = useState(false);
  const [commentAttachment, setCommentAttachment] = useState([]);
  const [commentId, setCommnetId] = useState("");

  const inputRef = useRef(null);
  const textAreaRef = useRef(null);

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
  }, [props.selectedCardId, refreshCardData]);

  useEffect(() => {
    if (!file.length > 0) {
      setShowPreviewBox(false);
    }
  }, [file]);
  useEffect(() => {
    if (!commentAttachment.length > 0) {
      SetshowCommentAttachementPreviewBox(false);
    }
  }, [commentAttachment]);

  useEffect(() => {
    return () => {
      dispatch({ type: ProjectCardMap.RESET_CARD_DETAILS });
    };
  }, []);
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

  const handleMarkAsComplete = (e) => {
    const { projectId, packageId } = queryParams;
    dispatch(
      markAsComplete(projectId, packageId, cardData && props.selectedCardId)
    );
    // props.handleCloseTask();
  };
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
    const text = `${values.commentText}${emoji.native}`;
    //setnewMessage(text);
    setFieldValue("commentText", text);
    setshowEmojiPicker(false);
  };

  const GetTimeDifference = (previous, current = Date.now()) => {
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    if (typeof previous === "string") previous = new Date(previous);
    const difference = current - previous;
    if (difference < minute) {
      return `${Math.round(difference / 1000)} seconds ago`;
    }
    if (difference < hour) {
      return `${Math.round(difference / minute)} minutes ago`;
    }
    if (difference < day) {
      return `${Math.round(difference / hour)} hours ago`;
    }
    return `${Math.round(difference / day)} days ago`;
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
    setFieldValue("commentText", newValue);
    setMentions(mentions);
  };
  const resetCommentAttachement = async (index) => {
    let data = commentAttachment;
    data.splice(index, 1);
    await setCommentAttachment([...data]);
  };

  const resetFilesAttachement = async (index) => {
    let data = file;
    data.splice(index, 1);
    await setFile([...data]);
  };
  const handleClose = () => {
    setShow(false);
  };

  const handleDeleteWorkTask = (e) => {
    dispatch(
      deleteCard(
        queryParams.projectId,
        queryParams.packageId,
        props.selectedCardId
      )
    );
    setShow(false);
    e.stopPropagation();
    props.handleCloseTask();
  };

  const savePost = async (values, setFieldValue, resetForm) => {
    const { projectId, packageId } = queryParams;
    let finalResponse = {};

    finalResponse.commentText = values.commentText;
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
        let descAttachment = commentAttachment;
        await fileResponse.responseData.map(async (Data, index) => {
          let fileObject = {
            fileType: getFileType(file[index].file),
            fileName: file[index].file.name,
            fileUrl: Data,
          };
          descAttachment = [...descAttachment, fileObject];
        });

        finalResponse.attachment = [...descAttachment];
      } else {
        setFile([]);
        resetForm();
        if (inputRef.current) {
          return (inputRef.current.value = "");
        }
      }
    } else if (commentAttachment.length) {
      finalResponse.attachment = [...commentAttachment];
    }
    if (commentId !== "") {
      const response = await dispatch(
        updateCardCommentAsync(
          finalResponse,
          projectId,
          packageId,
          props.selectedCardId,
          commentId
        )
      );
      if (response.responseCode === 200) {
        setFieldValue("commentText", "");
        setCommnetId("");
        resetForm();
        setshowEmojiPicker(false);
        // props.handleCloseTask();
      }
      setCommentAttachment([]);
    } else {
      const response = await dispatch(
        updateCardAsync(
          finalResponse,
          projectId,
          packageId,
          props.selectedCardId
        )
      );

      if (response.responseCode === 200) {
        setFieldValue("commentText", "");
        resetForm();
        setshowEmojiPicker(false);
        // props.handleCloseTask();
      }
    }
    setFile([]);
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

    setFieldValue(
      "commentText",
      `${values.commentText} <pre>${renderData}</pre>`
    );
    setLink({ value: "", label: "" });
  };

  const initialValues = {
    commentText: "",
  };

  const validateYupSchema = Yup.object().shape({
    commentText: Yup.string().trim(" ").required("Comment is required"),
  });

  const updateDueDate = (date) => {
    const { projectId, packageId } = queryParams;
    setshowEmojiPicker(false);
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
  const editPost = async (comment, setFieldValue) => {
    setCommnetId(comment._id);
    setCommentAttachment([]);
    setshowEmojiPicker(false);
    if (comment.attachment.length > 0) {
      setCommentAttachment(comment.attachment);
      SetshowCommentAttachementPreviewBox(true);
    }
    setFieldValue("commentText", comment.commentText);
    if (textAreaRef !== null && textAreaRef.current) {
      textAreaRef.current.scrollIntoView();
      textAreaRef.current.focus();
    }
  };

  const handleDeleteCardComment = (e, commentId) => {
    setshowEmojiPicker(false);
    dispatch(
      deleteCardComment(
        queryParams.projectId,
        queryParams.packageId,
        props.selectedCardId,
        commentId
      )
    );
    // props.handleCloseTask();
    e.stopPropagation();
  };

  const handleDeleteAttchment = (attachmentId) => {
    dispatch(
      deleteCardCommentAttachment(
        queryParams.projectId,
        queryParams.packageId,
        props.selectedCardId,
        attachmentId
      )
    );
    // props.handleCloseTask();
    //e.stopPropagation();
  };

  const handleClosePreview = () => {
    props.handleCloseTask();
    dispatch({ type: ProjectCardMap.RESET_CARD_DETAILS });
    setFile([]);
    setCommentAttachment([]);
    setCommnetId("");
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
            <div className="h3 text-break pr-4 ">
              {/* Brainstorming &#61;&#62; Integration IDRT FIAT Gateway */}
              {cardData.title}
            </div>
          </div>
        </Modal.Header>

        <Modal.Body className="px-4 pb-4 pt-1">
          <Formik
            initialValues={initialValues}
            validationSchema={validateYupSchema}
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
                    {props.projectBoardDetails &&
                      props.projectBoardDetails.projectName}
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

                <div className="p3 pb-2">Description</div>
                <div className="p4">
                  {" "}
                  {cardData &&
                    cardData.descText &&
                    cardData.descText.replace(/\([^()]*\)/g, "")}
                </div>
                <div className="pb-3">
                  {cardData &&
                    cardData.descAttachment &&
                    cardData.descAttachment.map((file) => (
                      <>
                        <div
                          key={file._id}
                          className="d-flex align-items-center"
                        >
                          <img src={fileIcon} alt="" />
                          <a
                            className="px-2 text-break p5"
                            href={file.fileUrl}
                            // target="_blank"
                            download="#"
                          >
                            {file.fileName}
                          </a>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="link"
                              className="p-0 h-15px d-flex align-items-center"
                              id="re_DropDown"
                            >
                              <img src={downarrowgreen} alt="" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight>
                              {/* <Dropdown.Item as={Button}>
                            <img src={Crosshair} alt="" className="mr-2" />
                            Request approvals
                          </Dropdown.Item> */}
                              <Dropdown.Item
                                as={Button}
                                onClick={() => handleDeleteAttchment(file._id)}
                              >
                                <img src={Trashgreen} alt="" className="mr-2" />
                                Delete attachment
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                        {/* <div className="d-flex align-items-center">
                      <img src={fileIcon} alt="" />
                      <a className="px-2">Jack-Canfield-A2.mp4</a>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          className=""
                          id="re_DropDown"
                        >
                          <img src={downarrowgreen} alt="" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight>
                          <Dropdown.Item as={Button}>
                            <img src={Crosshair} alt="" className="mr-2" />
                            Request approval
                          </Dropdown.Item>
                          <Dropdown.Item as={Button}>
                            <img src={Trashgreen} alt="" className="mr-2" />
                            Delete attachment
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div> */}
                        {/* <div className="d-flex align-items-center">
                      <img src={fileIcon} alt="" />
                      <a className="px-2">Jack-Canfield-A2.zip</a>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="link"
                          className=""
                          id="re_DropDown"
                        >
                          <img src={downarrowgreen} alt="" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu alignRight>
                          <Dropdown.Item as={Button}>
                            <img src={Crosshair} alt="" className="mr-2" />
                            Request approval
                          </Dropdown.Item>
                          <Dropdown.Item as={Button}>
                            <img src={Trashgreen} alt="" className="mr-2" />
                            Delete attachment
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div> */}
                      </>
                    ))}
                </div>

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
                </button>

                {AddSubTaskFormShow && (
                  <input
                    type="text"
                    className="form-control re_input mt-2"
                    placeholder="Enter subtask"
                  />
                )} */}
                {/* <div className="text-right py-2">
                  {AddSubTaskFormShow && (
                    <Button
                      variant="outline-secondary"
                      className="mr-2"
                      onClick={() => setAddSubTaskFormShow(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  {AddSubTaskFormShow ? (
                    <Button>Submit</Button>
                  ) : (
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
                  )}
                </div> */}
                {cardData &&
                  cardData.comments &&
                  cardData.comments.map((comment) => (
                    <div key={comment._id} className="comment pb-3">
                      <div className="d-flex align-items-start justify-content-between">
                        <div className="d-flex">
                          <div
                            className="re_commentProfile rounded-circle"
                            style={{
                              backgroundImage: `url(${comment.commentedBy.profilePicture})`,
                            }}
                          ></div>
                          <div className="pl-3">
                            <div className="d-flex flex-wrap align-items-end">
                              <span className="h6 pr-2">
                                {comment.commentedBy.fullName}
                              </span>
                              {!!comment.attachment.length && (
                                <>
                                  <img src={chatattachment} alt="" />
                                  <span className="p5 pr-2">attached</span>
                                </>
                              )}
                              <span className="p5 opacity60">
                                {GetTimeDifference(
                                  new Date(comment.commentedAt)
                                )}
                              </span>
                            </div>

                            <div className="p4">
                              {comment.commentText.replace(/\([^()]*\)/g, "")}
                            </div>
                            {comment.attachment?.map(
                              ({ fileName, fileType, fileUrl, _id }) => (
                                <Fragment key={_id}>
                                  <img
                                    src={
                                      fileType.toLowerCase().includes("image")
                                        ? fileUrl
                                        : Document
                                    }
                                    alt=""
                                    width="150px"
                                  />

                                  <div className="p5 text-break color_gray">
                                    {fileName} •
                                    <a
                                      href={fileUrl}
                                      target="_blank"
                                      className="color_gray"
                                      download="#"
                                    >
                                      Download
                                    </a>
                                  </div>
                                </Fragment>
                              )
                            )}
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          {/* <Button variant="link">
                          <img src={ThumbsUp} alt="" />
                        </Button> */}
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="link"
                              className=""
                              id="re_DropDown"
                            >
                              <img src={downarrowgreen} alt="" />
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight>
                              {/* <Dropdown.Item as={Button}>
                              Pin to top
                            </Dropdown.Item> */}
                              {/* <Dropdown.Item onClick={() => handleClick(commentText, attachment, setFieldValue)}> */}
                              <Dropdown.Item
                                className="m-auto"
                                onClick={() => editPost(comment, setFieldValue)}
                              >
                                Edit comment
                              </Dropdown.Item>
                              {/* <Dropdown.Item as={Button}>
                              Copy comment link
                            </Dropdown.Item> */}
                              <Dropdown.Item
                                className="m-auto"
                                onClick={(e) =>
                                  handleDeleteCardComment(e, comment._id)
                                }
                              >
                                Delete comment
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </div>
                    </div>
                  ))}
                <div className="p3 pb-2">Comment</div>
                <div className="re_borderBoxOnly re_chatBox p-3">
                  <Field name="commentText">
                    {({ field }) => (
                      <MentionsInput
                        {...field}
                        // className={
                        //   "form-control re_input border-0" +
                        //   (errors.commentText && touched.commentText
                        //     ? " is-invalid"
                        //     : "")
                        // }
                        // markup="@__display__"
                        className="mentions"
                        inputRef={textAreaRef}
                        // allowSuggestionsAboveCursor={true}
                        placeholder="Ask a question or post an update"
                        name="commentText"
                        value={values.commentText}
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
                          inputRef={textAreaRef}
                          markup="@__display__(__id__)"
                          // className="mentions__mention"
                          data={members}
                          appendSpaceOnAdd={true}
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
                        className="mr-2 p-0"
                        onClick={toggleEmojiPicker}
                      >
                        <img src={chaticon} alt="" />
                      </Button>

                      <label className="mr-2 mb-0 p-0 cursor-pointer">
                        <input
                          type="file"
                          accept="application/pdf, image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                          ref={inputRef}
                          hidden
                          onChange={(e) =>
                            uploadImage(
                              e
                              // selectedChatInfo &&
                              //   selectedChatInfo.participantDetails
                              //   ? selectedChatInfo.participantDetails._id
                              //   : ""
                            )
                          }
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
                    <div className="d-flex align-items-center">
                      {commentId === "" && (
                        <div className="p5 opacity60 pr-2">
                          {cardData &&
                            cardData.profile &&
                            cardData.profile.length}{" "}
                          people will notifed
                        </div>
                      )}
                      <Button
                        variant="blue"
                        type="submit"
                        value="Submit"
                        disabled={isFetching || uploading}
                      >
                        {/* {isLoading ? "Commenting..." : "Comment"} */}
                        {isFetching || uploading ? (
                          <>
                            {uploading ? "Uploading..." : "Commenting..."}
                            <img
                              src={LoadingImage}
                              alt="LoadingImage"
                              width="20px"
                              className="ml-2"
                            />
                          </>
                        ) : (
                          "Comment"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
                {touched.commentText && errors.commentText ? (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">{errors.commentText}</div>
                  </div>
                ) : null}
                {showPreviewBox && (
                  <div className="  d-flex flex-wrap re_resumebox">
                    {showPreviewBox &&
                      file.length > 0 &&
                      file.map((file, index) => {
                        return (
                          <div className=" mr-3 p5  text-break  re_ResumeImgMain">
                            <img
                              src={
                                file.file.type.toLowerCase().includes("image")
                                  ? file.url
                                  : Document
                              }
                              alt="Resume"
                              className="re_ResumeImg"
                              name="resumePicture"
                            />
                            <span>{file.file.name}</span>

                            <button
                              type="button"
                              className="re_closeBtn"
                              onClick={() => {
                                // setFile([]);
                                resetFilesAttachement(index);
                                inputRef.current.value = null;
                              }}
                            >
                              <img
                                src={cancel}
                                alt="Cancel"
                                className="re_Close"
                              />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                )}
                {showCommentAttachementPreviewBox && (
                  <div className="  d-flex flex-wrap re_resumebox">
                    {showCommentAttachementPreviewBox &&
                      commentAttachment.length > 0 &&
                      commentAttachment.map((attachment, index) => (
                        <div className="mr-3 p5 text-break re_ResumeImgMain">
                          <img
                            src={
                              attachment.fileType
                                .toLowerCase()
                                .includes("image")
                                ? attachment.fileUrl
                                : Document
                            }
                            alt="Resume"
                            className="re_ResumeImg"
                            name="resumePicture"
                          />
                          <span>{attachment.fileName}</span>
                          <button
                            type="button"
                            className="re_closeBtn"
                            onClick={(e) => {
                              // setShowPreviewBox(false);
                              resetCommentAttachement(index);
                            }}
                          >
                            <img
                              src={cancel}
                              alt="Cancel"
                              className="re_Close"
                            />
                          </button>
                        </div>
                      ))}
                  </div>
                )}

                <Button
                  variant="link"
                  className="mt-2 p-0 text-dark d-flex align-items-center  justify-content-start"
                  onClick={(e) => {
                    setShow(true);
                    e.stopPropagation();
                  }}
                >
                  <img src={Trashgreen} alt="" />
                  <span className="opacity60 pl-2">Delete Card</span>
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <ModalYesNo
        show={show}
        handleClose={handleClose}
        handleOk={handleDeleteWorkTask}
        showLoader={loading}
        showLoaderText="Deleting..."
        text="Are you sure want to Delete ?"
        subText="Please confirm with us to delete"
      />
    </>
  );
};
export default TaskView;

import React, { useState, useEffect, useMemo, useRef } from "react";
import { Col, Container, Row, Dropdown, Button } from "react-bootstrap";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Picker, emojiIndex } from "emoji-mart";
import moment from "moment";
import countryList from "react-select-country-list";
import { parsePhoneNumber } from "react-phone-number-input";
import ReactTextareaAutocomplete from "@webscopeio/react-textarea-autocomplete";
import "emoji-mart/css/emoji-mart.css";
import DotsThree from "./../../assets/images/DotsThree.svg";
import Profile from "./../../assets/images/Profile.png";
import Envelope from "./../../assets/images/EnvelopeSimpleOpen.svg";
import Paperclip from "./../../assets/images/Paperclip.svg";
import Smiley from "./../../assets/images/Smiley.svg";
import DownloadSimple from "./../../assets/images/DownloadSimple.svg";
import Document from "../../assets/images/document.svg";
import cancel from "../../assets/images/cancel.svg";
import img from "./../../assets/images/img.png";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getChatListAsync, uploadImageFunc } from "./redux/chatApi";
import { ChatActions } from "./redux/chatAction";
import { formatDistance, subDays } from "date-fns";
import socket from "../../components/Socket/Socket";
import DatePicker from "react-datepicker";
import queryString from "query-string";
import "react-datepicker/dist/react-datepicker.css";
import LoadingImage from "../../assets/images/Rolling-1s-200px.svg";
import { getFileType } from "../../utils";
import SplashScreen from "../../components/SplashScreen/SplashScreen";

const perfectScrollbarOptions = {
  wheelSpeed: 1,
  wheelPropagation: false,
};

const Chat = (props) => {
  const inputRef = useRef(null);

  const [scrollEl, setScrollEl] = useState();
  const [scrollList, setScrollList] = useState();
  const searchRef = useRef();
  const dispatch = useDispatch();

  const queryParams = queryString.parse(window.location.search);
  const [startDate, setStartDate] = useState(new Date());
  const [participants, SetParticipants] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [getAllMessages, setGetAllMessages] = useState({});
  const [showPreviewBox, setShowPreviewBox] = useState(false);

  const [showEmojiPicker, setshowEmojiPicker] = useState(false);
  const [newMessage, setnewMessage] = useState("");
  const [error, setError] = useState("");
  const [file, setFile] = useState({ file: null, url: "" });

  const { user } = useSelector((state) => state.auth, shallowEqual);
  const {
    chatList,
    searchText,
    refreshChatListing,
    limit,
    isLoading,
    selectedChatInfo,
    selectedChatMessage,
    refreshMessages,
  } = useSelector((state) => state.chat, shallowEqual);

  useEffect(() => {
    window.scroll(0, 0);
    const options = countryList().getData();
    setCountryOptions(options);
  }, []);
  useEffect(() => {
    if (getAllMessages) {
      SetParticipants([
        getAllMessages.participant1Details,
        getAllMessages.participant2Details,
      ]);
      dispatch(ChatActions.setSelectedChatMessages(getAllMessages));
      // dispatch(ChatActions.resetRefreshMessage());
    }
  }, [getAllMessages]);
  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  }, [scrollEl, selectedChatMessage]);

  useEffect(() => {
    if (refreshMessages) {
      let data = {
        receiver:
          selectedChatInfo && selectedChatInfo.participantDetails
            ? selectedChatInfo.participantDetails._id
            : queryParams.recieverId,
        sender: user && user._id,
      };
      if (socket) {
        socket.emit("checkRoom", data);
        socket.on("getAllMessages", (messages) => {
          if (messages && messages.data) {
            setGetAllMessages(messages);
          }
        });
      }
    }
  }, [socket, selectedChatInfo, refreshMessages]);

  useEffect(() => {
    return () => {
      dispatch(ChatActions.resetRefreshMessage());
      // dispatch(ChatActions.setSelectedChatInfo({}));
      dispatch(ChatActions.resetState());

      setGetAllMessages({});
    };
  }, []);

  useEffect(() => {
    if (refreshChatListing) {
      dispatch(getChatListAsync(searchText));
    }
  }, [refreshChatListing, user]);

  useEffect(() => {
    if (searchRef.current) {
      let keyPressEvent = (e) => {
        if (e.keyCode === 13) {
          e.preventDefault();
          dispatch(ChatActions.refreshChatList());
        }
      };
      let input = searchRef.current;
      input.addEventListener("keyup", keyPressEvent);

      return () => input.removeEventListener("keyup", keyPressEvent);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (scrollList) {
        scrollList.scrollTop = scrollList.scrollHeight;
      }
    }, 200);
  }, [scrollList]);

  const onSearchTextChange = (e) => {
    dispatch(ChatActions.searchTextChange(e.target.value));
  };

  const toggleEmojiPicker = () => {
    setshowEmojiPicker(!showEmojiPicker);
  };
  const addEmoji = (emoji) => {
    const text = `${newMessage}${emoji.native}`;
    setnewMessage(text);
    setshowEmojiPicker(false);
  };

  const setSelectedChatInfo = async (record) => {
    await dispatch(ChatActions.setSelectedChatInfo(record));
  };

  useEffect(() => {
    if (chatList && chatList.records && chatList.records.length > 0) {
      const participant = chatList.records.filter((participant) => {
        return participant.participantDetails._id === queryParams.recieverId;
      });
      if (participant && participant.length > 0) {
        return dispatch(ChatActions.setSelectedChatInfo(participant[0]));
      }
    }
  }, [chatList]);

  const getSender = (senderId) => {
    const participant = participants.filter((participant) => {
      return participant._id === senderId;
    });
    if (participant.length > 0) {
      return participant[0];
    }
    return null;
  };

  const handleInput = (e) => {
    setnewMessage(e.target.value);
    setError("");
  };
  const getLastMessageName = (record) => {
    let message = "";
    if (record && record.lastMessageObj.sender === user._id) {
      message = "Me";
    } else {
      message = record.participantDetails.fullName;
    }
    return message;
  };
  const setBatchNumber = () => {
    dispatch(ChatActions.setChatListBatchNumber(limit + 1));
  };
  const getCountryName = (selectedChatInfo) => {
    const phoneNumber = parsePhoneNumber(
      selectedChatInfo.participantDetails.contactNumber
    );
    if (phoneNumber) {
      const country = countryOptions.filter((countryData) => {
        return countryData.value === phoneNumber.country;
      });
      if (country.length > 0) {
        return country[0].label;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const uploadImage = async (e) => {
    if (e.target.files.length > 0) {
      setFile({
        url: URL.createObjectURL(e.target.files[0]),
        file: e.target.files[0],
      });
      setError("");
      setShowPreviewBox(true);
    }
  };

  const getFileViewer = (message) => {
    switch (message.fileType) {
      case "image/jpeg": {
        return (
          <>
            <img src={message.message} alt="" />
            <div className="p5 color_gray">
              <a
                href={message.message}
                target="_blank"
                className="mr-1 color_gray"
                download="#"
              >
                <img src={DownloadSimple} />
              </a>
              TGC-Gala.jpg ({(message.size / 1024).toFixed(2)}
              KB)
            </div>
          </>
        );
      }
      case "image": {
        return (
          <>
            <img src={message.message} alt="" />
            <div className="p5 color_gray">
              <a
                href={message.message}
                target="_blank"
                className="mr-1 color_gray"
                download="#"
              >
                <img src={DownloadSimple} />
              </a>
              TGC-Gala.jpg ({(message.size / 1024).toFixed(2)}
              KB)
            </div>
          </>
        );
      }
      case "pdf": {
        return (
          <>
            <img src={Document} alt="" />
            <div className="p5 color_gray">
              <a
                href={message.message}
                target="_blank"
                className="mr-1 color_gray"
                download="#"
              >
                <img src={DownloadSimple} />
              </a>
              TGC-Gala.jpg ({(message.size / 1024).toFixed(2)}
              KB)
            </div>
          </>
        );
      }
      case "document": {
        return (
          <>
            <img src={Document} alt="" />
            <div className="p5 color_gray">
              <a
                href={message.message}
                target="_blank"
                className="mr-1 color_gray"
                download="#"
              >
                <img src={DownloadSimple} />
              </a>
              TGC-Gala.jpg ({(message.size / 1024).toFixed(2)}
              KB)
            </div>
          </>
        );
      }
      default:
        return null;
    }
  };
  const sendMessage = async (receiverId) => {
    if (newMessage !== "" && error === "") {
      const data = {
        receiver: receiverId,
        sender: user && user._id,
        message: newMessage,
        category: "TEXT",
      };
      socket.emit("sendMessage", data);
      setnewMessage("");
    }
    if (file.file !== null && error === "") {
      let data = null;
      data = new FormData();
      data.append("img", file.file);
      const fileResponse = await uploadImageFunc(data);
      if (fileResponse && fileResponse.responseCode === 200) {
        const dataToBeSent = {
          receiver: receiverId,
          sender: user && user._id,
          message: fileResponse.responseData[0],
          category: "FILE",
          size: file.file.size,
          fileType: await getFileType(file.file),
          fileName: file.file.name,
        };
        socket.emit("sendMessage", dataToBeSent);
        setFile({
          file: null,
          url: "",
        });
        setShowPreviewBox(false);
        if (inputRef.current) {
          return (inputRef.current.value = "");
        }
      } else {
        setFile({
          file: null,
          url: "",
        });
        if (inputRef.current) {
          return (inputRef.current.value = "");
        }
      }
    } else {
      setError("Please type a message");
    }
  };
  const removeClassOnRead = (id) => {
    document.getElementById(id).classList.remove("font-weight-bold");
  };
  return (
    <>
      {isLoading && <SplashScreen />}
      <div className="pt-80 pb-80 h100vh-343">
        <Container className="bg-white shadowBox p-0">
          <div className="py-3 px-4 border-bottom">
            <Row className="justify-content-between align-items-center">
              <Col md={4} className="order-1 col-auto">
                <div className="p1 Re_afterBorder">All Conversations</div>
              </Col>
              <Col md={4} className="order-3 order-md-2 pt-3 pt-md-0">
                <div>
                  <input
                    name="Search"
                    placeholder="Search for an username or project..."
                    type="text"
                    className="Re_ChatSearch re_inputRouded"
                    value={searchText}
                    onChange={onSearchTextChange}
                    ref={searchRef}
                  />
                </div>
              </Col>
              <Col
                md={4}
                className="order-2 order-md-3 text-right  col-auto"
              ></Col>
            </Row>
          </div>
          <div className="re_chatmain ">
            <div className="re_leftList ">
              <PerfectScrollbar
                options={perfectScrollbarOptions}
                containerRef={(ref) => {
                  setScrollList(ref);
                }}
              >
                {chatList &&
                  chatList.records &&
                  chatList.records.length > 0 &&
                  chatList.records.map((record) => (
                    <div
                      key={record._id}
                      onClick={() => {
                        setSelectedChatInfo(record);
                        removeClassOnRead(record._id);
                      }}
                      className={`d-flex align-items-center re_chatUserItem ${
                        selectedChatInfo._id === record._id ? "active" : ""
                      }
                       `}
                    >
                      <div
                        className={`userImage ${
                          record.participantDetails.isLoggedOut === false
                            ? "active"
                            : ""
                        }
                         `}
                        style={{
                          backgroundImage: `url(${
                            record.participantDetails
                              ? record.participantDetails.profilePicture
                              : Profile
                          })`,
                        }}
                      ></div>
                      <div className="pl-2">
                        <div className="d-flex align-items-center justify-content-between">
                          <div
                            id={record._id}
                            className={`p2 re_wEllips ${
                              record.unreadMessage &&
                              record.lastMessageObj.sender !== user._id
                                ? "font-weight-bold"
                                : ""
                            } `}
                          >
                            {record.participantDetails.fullName}
                          </div>
                          <div className=" p5 color_gray text-right">
                            {formatDistance(
                              subDays(new Date(record.lastMessageTime), 0),
                              new Date(),
                              { addSuffix: true }
                            )}
                          </div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="p5 color_gray re_wEllips">
                            {getLastMessageName(record)}:{" "}
                            <span className="p4">
                              {record.lastMessageObj &&
                                record.lastMessageObj.message}
                            </span>{" "}
                          </div>
                          <Button variant="link" className="p-0">
                            <img src={Envelope} alt="mail" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}

                {chatList &&
                chatList.recordsFiltered < chatList.recordsTotal ? (
                  <button
                    type="button"
                    className="btn btn-gray btn-sm"
                    onClick={setBatchNumber}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        Loading...
                        <img
                          src={LoadingImage}
                          alt="LoadingImage"
                          width="20px"
                          className="ml-2"
                        />
                      </>
                    ) : (
                      "Show More"
                    )}
                  </button>
                ) : null}
              </PerfectScrollbar>
            </div>

            <div className="re_centerChat">
              <PerfectScrollbar
                options={perfectScrollbarOptions}
                containerRef={(ref) => {
                  setScrollEl(ref);
                }}
              >
                {selectedChatMessage &&
                selectedChatMessage.data &&
                selectedChatMessage.data.length > 0 ? (
                  selectedChatMessage.data.map((message) => (
                    <div key={message._id}>
                      <div className="d-flex align-items-start pb-3">
                        <div
                          className="userImage w-40"
                          style={{
                            backgroundImage: `url( ${
                              getSender(message.sender)
                                ? getSender(message.sender).profilePicture
                                : ""
                            })`,
                          }}
                        ></div>
                        <div className="pl-2">
                          <div className="d-flex align-items-start pb-1">
                            <div className="p2">
                              {getSender(message.sender)
                                ? getSender(message.sender).fullName
                                : ""}
                              <span className="pl-2 p5 color_gray">
                                {moment(message.time).format(
                                  "MMM Do, YYYY, h:mm a"
                                )}
                                {/* Aug 29, 7:13pm */}
                              </span>
                            </div>
                          </div>

                          {message.category === "TEXT" ||
                          message.category === undefined ? (
                            <div className="p4 color_gray pb-1">
                              {message ? message.message : ""}
                            </div>
                          ) : (
                            getFileViewer(message)
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center color_gray h4 mt-5">
                    No messages yet.
                  </div>
                )}
              </PerfectScrollbar>
              {selectedChatInfo && selectedChatInfo.participantDetails && (
                <form className="message-form">
                  {showPreviewBox && file.file && (
                    <div className="re_resumebox">
                      <div className="re_ResumeImgMain">
                        <span>{file.file.name}</span>
                        {/* <img
                        src={file.url}
                        alt="Resume"
                        className="re_ResumeImg"
                        name="resumePicture"
                      /> */}

                        <button
                          type="button"
                          className="re_closeBtn"
                          onClick={() => {
                            setFile({ file: null, url: "" });
                            setShowPreviewBox(false);
                          }}
                        >
                          <img src={cancel} alt="Cancel" className="re_Close" />
                        </button>
                      </div>
                    </div>
                  )}

                  <ReactTextareaAutocomplete
                    className="re_inputRouded h-auto w-100"
                    name="newMessage"
                    value={newMessage}
                    loadingComponent={() => <span>Loading</span>}
                    onChange={handleInput}
                    placeholder="Compose your message"
                    trigger={{
                      ":": {
                        dataProvider: (token) =>
                          emojiIndex.search(token).map((o) => ({
                            colons: o.colons,
                            native: o.native,
                          })),
                        component: ({ entity: { native, colons } }) => (
                          <div>{`${colons} ${native}`}</div>
                        ),
                        output: (item) => `${item.native}`,
                      },
                    }}
                  />
                  {error !== "" ? (
                    <div className="chat-error-container">
                      <div className="fv-help-block">{error}</div>
                    </div>
                  ) : null}
                  <div className="pt-3 d-flex align-items-center justify-content-end">
                    <div className="position-relative z-index mr-3">
                      {showEmojiPicker && (
                        <Picker
                          set="apple"
                          onSelect={addEmoji}
                          title="Pick your emoji…"
                          emoji="point_up"
                        />
                      )}
                      <button
                        type="button"
                        className="btn btn-link p-0 d-flex align-items-center"
                        onClick={toggleEmojiPicker}
                      >
                        <img src={Smiley} alt="Smiley" />
                      </button>
                    </div>

                    <label className="re_Paperclip">
                      <input
                        type="file"
                        accept="application/pdf, image/*,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        ref={inputRef}
                        onChange={(e) =>
                          uploadImage(
                            e,
                            selectedChatInfo &&
                              selectedChatInfo.participantDetails
                              ? selectedChatInfo.participantDetails._id
                              : ""
                          )
                        }
                      />
                      <img src={Paperclip} alt="Paperclip" />
                    </label>

                    <Button
                      variant="blue"
                      onClick={() =>
                        sendMessage(
                          selectedChatInfo &&
                            selectedChatInfo.participantDetails
                            ? selectedChatInfo.participantDetails._id
                            : ""
                        )
                      }
                      className="px-4"
                    >
                      Send
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {selectedChatInfo && selectedChatInfo.participantDetails && (
              <div className="re_RightUserDetails ">
                <div
                  className={`userImage mt-3 mb-2 mx-auto  w-72 ${
                    selectedChatInfo.participantDetails &&
                    selectedChatInfo.participantDetails.isLoggedOut === false
                      ? "active"
                      : ""
                  }
                   `}
                  style={{
                    backgroundImage: `url(${
                      selectedChatInfo.participantDetails.profilePicture
                        ? selectedChatInfo.participantDetails.profilePicture
                        : Profile
                    })`,
                  }}
                ></div>
                <div className="p2 text-center">
                  {selectedChatInfo.participantDetails.fullName}
                </div>
                <div className="p5 color_gray text-center">
                  From: {getCountryName(selectedChatInfo)}
                </div>
                <hr />

                <div className="re_filesList px-3">
                  <PerfectScrollbar options={perfectScrollbarOptions}>
                    {selectedChatMessage.media &&
                      selectedChatMessage.media.length > 0 &&
                      selectedChatMessage.media.map((file) => (
                        <div
                          key={file._id}
                          className="py-2 border-top d-flex align-items-center justify-content-between"
                        >
                          <div className="p5 pr-2">
                            {file.fileName ? file.fileName : ""}
                          </div>
                          <div className="p5 color_gray">
                            {moment(file.time).format("DD/MM/YY")}
                          </div>
                        </div>
                      ))}
                  </PerfectScrollbar>
                </div>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};
export default Chat;

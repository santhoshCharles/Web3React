import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ReactTimeAgoC } from "../../components/utils/ReactTimeAgoC";
import PerfectScrollbar from "react-perfect-scrollbar";
import socket from "../Socket/Socket";

const perfectScrollbarOptions = {
  wheelSpeed: 1,
  wheelPropagation: false,
};

const ChatModal = (props) => {
  const [messages, setMessages] = useState([]);
  const [participants, SetParticipants] = useState([]);
  const { user } = useSelector((state) => state.auth, shallowEqual);
  const [scrollEl, setScrollEl] = useState();

  useEffect(() => {
    let data = {
      receiver: props && props.recieverId,
      sender: props && props.senderId,
    };
    if (socket) {
      socket.emit("checkRoom", data);
    }

    socket.on("getAllMessages", (messages) => {
      if (messages && messages.data) {
        setMessages(messages.data);
        SetParticipants([
          messages.participant1Details,
          messages.participant2Details,
        ]);
      }
    });
    return () => {
      setMessages([]);
      SetParticipants([]);
    };
  }, [socket, user]);

  const initialValues = {
    message: "",
  };

  const ChatSchema = Yup.object().shape({
    message: Yup.string().trim().required("Message is required"),
  });

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: ChatSchema,
    onSubmit: (values, { resetForm }) => {
      const data = {
        receiver: props && props.recieverId,
        sender: props && props.senderId,
        message: values.message,
        category: "TEXT",
      };
      socket.emit("sendMessage", data);
      resetForm();
    },
  });

  useEffect(() => {
    if (scrollEl) {
      scrollEl.scrollTop = scrollEl.scrollHeight;
    }
  }, [scrollEl, messages]);

  const getSender = (senderId) => {
    const participant = participants.filter((participant) => {
      return participant._id === senderId;
    });
    if (participant.length > 0) {
      return participant[0];
    }
    return null;
  };
  const getReceiver = () => {
    const participant = participants.filter((participant) => {
      return participant._id !== user._id;
    });
    if (participant.length > 0) {
      return participant[0];
    }
    return null;
  };
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      formik.handleSubmit();
    }
  };
  return (
    <>
      <PerfectScrollbar
        className="scroll"
        options={perfectScrollbarOptions}
        style={{ maxHeight: "35vh", position: "relative" }}
        containerRef={(ref) => {
          setScrollEl(ref);
        }}
      >
        {messages &&
          messages.length > 0 &&
          messages.map((message) => (
            <div key={message._id} className="pl-4">
              <div className="d-flex align-items-center flex-wrap">
                <>
                  <div
                    className={
                      getSender(message.sender)
                        ? getSender(message.sender)._id === user._id
                          ? "re_userReply"
                          : "re_adminReply"
                        : "re_adminReply"
                    }
                  >
                    {getSender(message.sender)
                      ? getSender(message.sender).fullName
                      : ""}
                  </div>
                  <span className="color_gray p4 pl-2">
                    <ReactTimeAgoC date={new Date(message.time)} />
                  </span>
                </>
              </div>
              <div className="pb-3 p3 text-break pr-3">{message.message}</div>
            </div>
          ))}
      </PerfectScrollbar>
      <Form className="re_replyForm" onSubmit={formik.handleSubmit}>
        <input
          name="message"
          type="text"
          placeholder="Write here"
          className="form-control re_input"
          onKeyDown={(e) => handleEnter(e)}
          {...formik.getFieldProps("message")}
        />

        <Button type="submit" variant="blue">
          {messages.length > 0 ? "Reply" : "Send"}
        </Button>
      </Form>
      {formik.touched.message && formik.errors.message ? (
        <div className="fv-plugins-message-container">
          <div className="fv-help-block">{formik.errors.message}</div>
        </div>
      ) : null}
      {messages.length > 0 && (
        <Link
          to={`/chat?recieverId=${getReceiver() ? getReceiver()._id : null}`}
          className="btn btn-blue mt-2"
        >
          View in chats
        </Link>
      )}
    </>
  );
};

export default ChatModal;

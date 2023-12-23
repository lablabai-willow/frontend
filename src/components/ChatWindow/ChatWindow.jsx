import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import typingDots from "../../assets/typing2.svg";
import { MessageBubble } from "../../components";
import willowProfilePic from "../../assets/willow.png";
import "./ChatWindow.css";
import { LOADING_STATES } from "../../constants";

const ChatWindow = ({ convoHistory }) => {
  const scrollRef = useRef(null);
  const chatboxRef = useRef(null);
  const typingBubbleVisible = useSelector((state) => {
    return (
      state.app.loading === LOADING_STATES.PENDING &&
      state.message.tempMessage !== null
    );
  });
  const tempMessage = useSelector((state) => {
    return state.message.tempMessage;
  });

  const scrollToBottom = () => {
    chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [convoHistory]);

  return (
    <div ref={chatboxRef} className="chat-window">
      {convoHistory.length === 0 ? (
        <div className="intro-container">
          <img
            className="intro-picture"
            src={willowProfilePic}
            alt="willow-picture"
          />
          <h2 className="intro-text">
            Hi, I'm Willow. I'm here for you. What's on your mind today?
          </h2>
          <p className="intro-info">
            You can input images via typing the url or uploading.
          </p>
        </div>
      ) : (
        convoHistory.map((messageObject) => {
          return <MessageBubble key={messageObject.key} {...messageObject} />;
        })
      )}
      {tempMessage && <MessageBubble key="TEMP_OBJECT" {...tempMessage} />}
      {typingBubbleVisible && (
        <div className="typing-icon-container">
          <div className="typing-icon-bubble ">
            <img src={typingDots} className="typing-icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWindow;

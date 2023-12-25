import React from "react";
import { AI_COACH, BASE_STORAGE_BUCKET_URL, END_USER } from "../../constants";
import willowProfilePic from "../../assets/willow.png";
import "./MessageBubble.css";

const styleByUser = (user, endUserClass, agentClass) => {
  return user == END_USER ? endUserClass : agentClass;
};

const ProfilePic = ({ src, alt }) => {
  return <img src={src} alt={alt} className="profile-pic" />;
};

const ImageBubble = ({ user, content, className, key }) => {
  return (
    <div
      key={key}
      className={`${className} img_bubble ${styleByUser(
        user,
        "img_bubble-end_user",
        "img_bubble-ai_coach"
      )}`}
    >
      <img
        src={`${BASE_STORAGE_BUCKET_URL}/${content}`}
        className="img_bubble-img"
      />
    </div>
  );
};

const addLineBreaks = (text) => {
  const sentences = text.split(/(?<=[.!?])\s+/);

  return sentences.map((sentence, index) => <p key={index}>{sentence}</p>);
};

const AudioBubble = ({ src }) => {};

const TextBubble = ({ content, user, className, key }) => {
  return (
    <div key={key} className={` text_bubble ${className}`}>
      {addLineBreaks(content)}
    </div>
  );
};

const MessageBubble = (props) => {
  const bubbleMap = {
    text: TextBubble,
    image: ImageBubble,
    audio: AudioBubble,
  };

  const Bubble = bubbleMap[props.type];

  return (
    <div
      ref={props.refToPass}
      className={`msg_bubble-container ${styleByUser(
        props.user,
        "msg_bubble-container-end_user",
        "msg_bubble-container-ai_coach"
      )}`}
    >
      {props.user == AI_COACH ? (
        <ProfilePic src={willowProfilePic} alt="Willow profile pic" />
      ) : (
        <></>
      )}
      <Bubble
        className={`msg_bubble ${styleByUser(
          props.user,
          "msg_bubble-end_user",
          "msg_bubble-ai_coach"
        )}`}
        {...props}
      />
    </div>
  );
};

export default MessageBubble;

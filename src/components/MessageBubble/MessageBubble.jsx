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

const AudioBubble = ({ src }) => {};

const addLineBreaksAndLinks = (text) => {
  const youtubeRegex =
    /(https?:\/\/)?(www\.)?(youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;

  const sentences = text.split(/(?<=[.!?])\s+/);

  return sentences.map((sentence, index) => (
    <p key={index}>
      {sentence.split(/\s+/).map((word, wordIndex) => {
        const match = word.match(youtubeRegex);

        if (match) {
          const youtubeUrl = match[0];
          return (
            <a
              key={wordIndex}
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {word}
            </a>
          );
        } else {
          return (
            <React.Fragment key={wordIndex}>
              {word}
              {wordIndex < sentence.split(/\s+/).length - 1 && " "}{" "}
              {/* Add space between words */}
            </React.Fragment>
          );
        }
      })}
    </p>
  ));
};

const TextBubble = ({ content, user, className, key }) => {
  return (
    <div key={key} className={`text_bubble ${className}`}>
      {addLineBreaksAndLinks(content)}
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

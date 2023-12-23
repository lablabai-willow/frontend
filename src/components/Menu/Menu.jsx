import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearConversationHistory } from "../../store/messageSlice";
import "./Menu.css";

const Menu = ({ visible = false, handleFileUpload }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const env = useSelector((state) => {
    return state.app.env;
  });

  const handleClearConversationHistory = () => {
    dispatch(clearConversationHistory(env));
  };

  const navigateToDraw = () => {
    navigate("/Draw");
  };

  return (
    <div className="menu-container">
      <div className={`menu-window ${!visible ? "hidden" : ""}`}>
        <button onClick={handleFileUpload} className="menu-item">
          Send an Image
        </button>
        <span className="divider" />
        <button onClick={navigateToDraw} className="menu-item">
          Draw a Picture
        </button>
        <span className="divider" />
        <button
          onClick={handleClearConversationHistory}
          className="menu-item clear-chat"
        >
          Clear Chat
        </button>
      </div>
    </div>
  );
};

export default Menu;

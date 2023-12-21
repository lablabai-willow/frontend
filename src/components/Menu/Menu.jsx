import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearConversationHistory } from '../../store/messageSlice';
import './Menu.css'

const Menu = ({ visible=false, handleFileUpload }) => {
    const dispatch = useDispatch()
    const env = useSelector((state) => {
        return state.app.env;
    });

    const handleClearConversationHistory = () => {
        dispatch(clearConversationHistory(env))
    }

    return (
        <div className={`menu-container ${!visible ? "hidden" : ""}`}>
            <button onClick={handleFileUpload} className="menu-item">Send an Image</button>
            <span className="divider"/>
            <button onClick="" className="menu-item">Draw a Picture</button>
            <span className="divider"/>
            <button onClick={handleClearConversationHistory} className="menu-item clear-chat" >Clear Chat</button>
        </div>
    )
};

export default Menu;
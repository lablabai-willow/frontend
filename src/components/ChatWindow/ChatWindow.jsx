import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import typingDots from '../../assets/typing2.svg'
import { MessageBubble } from '../../components';
import './ChatWindow.css';
import { LOADING_STATES } from '../../constants';

const ChatWindow = ({ convoHistory }) => {
    const scrollRef = useRef(null);
    const typingBubbleVisible = useSelector((state) => {
        return state.app.loading === LOADING_STATES.PENDING && state.message.tempMessage !== null;
    })
    const tempMessage = useSelector((state) => {
        return state.message.tempMessage
    })

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [convoHistory]) ;

    
    return (
        <div ref={scrollRef} className="chat-window">
            {convoHistory.map(( messageObject ) => {
                return <MessageBubble refToPass={scrollRef} key={messageObject.key} {...messageObject} />
            })}
            {tempMessage && <MessageBubble refToPass={scrollRef} key="TEMP_OBJECT" {...tempMessage} />}
            {typingBubbleVisible && (
                <div ref={scrollRef} className="typing-icon-container">
                    <div className="typing-icon-bubble ">
                        <img src={typingDots} className="typing-icon" />
                    </div>
                </div>
            )}
        </div>    
    )
}

export default ChatWindow;
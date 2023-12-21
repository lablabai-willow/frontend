import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/messageSlice';
import sendIcon from '../../assets/fi_send.svg';
import { END_USER, LOADING_STATES } from '../../constants';
import './Input.css'

const Input = () => {
    const DEFAULT_VALUE = "Type Message..."
    const BLURRED_CLASSES = "input-container"
    const FOCUSED_CLASSES = "input-container input-container-focused"

    const [ value, setValue ] = useState("");
    const [ containerClass, setContainerClass ] = useState("input-container")

    const env = useSelector((state) => state.app.env);
    const isLoading = useSelector((state) => state.app.loading === LOADING_STATES.PENDING)
    const dispatch = useDispatch();

    const handleFocus = () => {
        setContainerClass(FOCUSED_CLASSES);
    }

    const handleBlur = () => {
        setContainerClass(BLURRED_CLASSES);
    }

    const handleEnter = (event) => {
        if (event.type === 'click' || event.key === 'Enter') {
            dispatch(sendMessage({
                user: END_USER,
                env,
                type: "text",
                content: value
            }));
            setValue("");
        }
    }

    return (
        <div className={containerClass}>
            <input
                type="text"
                name="myInput"
                className="input-input"
                placeholder={DEFAULT_VALUE}  
                value={value}
                onChange={(event) => setValue(event.target.value)}              
                onKeyDown={handleEnter}
                onFocus={handleFocus}
                onBlur={handleBlur}
                disabled={isLoading} />
            <button type="button" onClick={handleEnter} disabled={isLoading}>
                <img src={sendIcon} className="input-send" alt="Send Message" />
            </button>
        </div>
    )
}

export default Input;
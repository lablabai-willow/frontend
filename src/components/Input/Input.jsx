import React from 'react';
import sendIcon from '../../assets/fi_send.svg'
import './Input.css'

const Input = ({ value, onChange}) => {

    return (
        <div className="input-container">
            <input type="text" name="myInput" className="input-input" value={value} onChange={onChange} />
            <img src={sendIcon} className="input-send" alt="Send Message" />
        </div>
    )
}

export default Input;
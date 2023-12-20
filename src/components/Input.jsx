import React from 'react';
import sendIcon from '../assets/fi_send.svg'
import '../styles.css';

const Input = ({ value, onChange}) => {

    return (
        <div class="input-container">
            <input type="text" name="myInput" class="input-input" value={value} onChange={onChange} />
            <img src={sendIcon} class="input-send" alt="Send Message" />
        </div>
    )
}

export default Input;
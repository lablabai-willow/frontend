import React, { useState } from 'react';

import Input from './Input'
import plusSolid from '../assets/plus-solid.svg'

const Footer = () => {

    return (
        <div class="footer-container">
            <div class="footer-add_button">
                <img src={plusSolid} alt="Upload" class="footer-add_button-icon" />
            </div>
            <Input />
        </div>
    )
}

export default Footer
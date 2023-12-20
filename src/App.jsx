import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import Footer from './components/Footer'

export default function App({ env }) {

    const [value, setValue] = useState("")
    const handleInputChange = (event) => {
        setValue(event.data)
    }

    return (
        <div class="window">
            <div class="blurry-boi blurry-boi-1" />
            <div class="blurry-boi blurry-boi-2" />
            <div class="chat-window">
                {env === 'prod' ? 'PRODDDDD ENVIRONMENT' : 'DEV ENVIRONMENT'}
            </div>
            <Footer />
        </div>
    );
}
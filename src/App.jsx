import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { BlurryBoi, ChatWindow, Header, Footer } from './components'

export default function App({ env }) {

    const [value, setValue] = useState("")
    const handleInputChange = (event) => {
        setValue(event.data)
    }

    return (
        <div className="window">
            <BlurryBoi className="blurry-boi-1" />
            <BlurryBoi className="blurry-boi-2" />
            <Header />
            <ChatWindow env={env}/>
            <Footer />
        </div>
    );
}
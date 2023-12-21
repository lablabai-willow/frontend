import React from 'react'
import './Header.css'

const Header = () => {

    const handleClearConversation = () => {
        // dispatchEvent(clearConversation())
    }

    return (
        <div className="header-container">
            <h1 className="title">Willow</h1>
        </div>
    )
}

export default Header;
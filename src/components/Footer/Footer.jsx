import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, setTempFile } from '../../store/messageSlice';
import { END_USER } from '../../constants';
import { Input, Menu } from '../../components';
import plusSolid from '../../assets/plus-solid.svg';
import './Footer.css';

const Footer = () => {
    const dispatch = useDispatch()
    const [ visible, setVisible ] = useState(false);
    const fileInputRef = useRef();

    const env = useSelector((state) => {
        return state.app.env;
    })

    const handleFileUpload = () => {
        fileInputRef.current.click()
    }

    const handleImageChange = (e) => {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () => {
            dispatch(setTempFile(reader.result))
            dispatch(sendMessage({
                user: END_USER,
                env,
                type: "image",
                file: e.target.files[0]
            }));
        }
    }

    const toggleMenu = () => {
        setVisible(!visible);
    }

    return (
        <div>
            <Menu visible={visible} handleFileUpload={handleFileUpload} />
            <div className="footer-container">
                <button className="footer-add_button" onClick={toggleMenu}>
                    <img src={plusSolid} alt="Upload" className="footer-add_button-icon" />
                </button>
                <Input />
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden"/>
        </div>

    )
}

export default Footer;

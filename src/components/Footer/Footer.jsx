import React from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../../components";
import plusSolid from "../../assets/plus-solid.svg";
import "./Footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer-container">
      <div className="footer-add_button" onClick={() => navigate("/draw")}>
        <img src={plusSolid} alt="Upload" className="footer-add_button-icon" />
      </div>
      <Input />
    </div>
  );
};

export default Footer;

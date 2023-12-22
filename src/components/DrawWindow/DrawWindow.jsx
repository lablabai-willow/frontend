import { useNavigate } from "react-router-dom";
import { Tldraw } from "@tldraw/tldraw";
import arrowBack from "../../assets/arrow_back.svg";
import DrawUI from "./DrawUI/DrawUI";
import "@tldraw/tldraw/tldraw.css";
import "./DrawWindow.css";

const DrawWindow = () => {
  const navigate = useNavigate();

  return (
    <div className="window">
      <div className="draw-header-container">
        <div className="draw-back_button" onClick={() => navigate(-1)}>
          <img src={arrowBack} alt="Upload" className="draw-back_button-icon" />
        </div>
        <h1 className="draw-title">Drawing Exercise</h1>
      </div>
      <div className="tldraw-container">
        <Tldraw hideUi>
          <DrawUI />
        </Tldraw>
      </div>
    </div>
  );
};

export default DrawWindow;

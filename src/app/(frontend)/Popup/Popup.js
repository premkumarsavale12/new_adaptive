import React from "react";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import "./Popup.css";

export default function Popup(props) {
  const { alertType, trigger, title, content, setTrigger, children } = props;

  return trigger ? (
    <div className="popup hidden">
      <div className={alertType}>
        <div className="popup-object">
          <div className="heading">
            <span>{title}</span>
            {/* <InfoOutlinedIcon className="icon" /> */}
          </div>
          <div className="body-message">
            <p>{content}</p>
          </div>
          <button
            className="ai-btn primary solid"
            onClick={() => setTrigger(false)}
          >
            OK
          </button>
          {children}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

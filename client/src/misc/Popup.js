import React, { Component } from "react";
import "./Popup.scss";
export default function PopUp() {
  const handleClick = () => {
    this.props.toggle();
  };

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
      </div>
    </div>
  );
}

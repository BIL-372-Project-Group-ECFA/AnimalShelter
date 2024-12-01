import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;  // Modal açılmadığında hiç render edilmez

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          ✖
        </button>
        <h2>{title}</h2>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;

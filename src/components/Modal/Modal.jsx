import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";
import { useEffect, useRef } from "react";

function Modal({ isOpen, title, children, actions, onClose }) {
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      modalRef.current.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.modalOverlay}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          onClose();
        }
      }}
      tabIndex="0"
      ref={modalRef}
    >
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <header className={styles.modalHeader}>
          <h2>{title}</h2>
          <button className={styles.modalCloseButton} onClick={onClose}>
            &times;
          </button>
        </header>
        <main className={styles.modalBody}>{children}</main>
        <footer className={styles.modalFooter}>{actions}</footer>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default Modal;

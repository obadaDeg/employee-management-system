import PropTypes from "prop-types";
import { createPortal } from "react-dom";

function Modal({ onClose, children }) {
  return createPortal(
    <dialog onClose={onClose}>{children}</dialog>,
    document.getElementById("modal")
  );
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;

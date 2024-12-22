import PropTypes from "prop-types";

function ActiveIcon({ isActive = false, fallback, children }) {
  if (!isActive && fallback !== undefined) {
    return fallback;
  }

  return children;
}

ActiveIcon.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.node,
  isActive: PropTypes.bool,
};

export default ActiveIcon;

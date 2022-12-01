import React from "react";
import classes from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className={classes.overlay}>
      {children}
    </div>
  );
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

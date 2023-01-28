import React from "react";
import classes from "./ModalOverlay.module.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ModalOverlay = React.memo(({ onClose, children }) => {
  const navigate = useNavigate()
 /*  const close = () => {
    navigate(-1);
    onClose()
  } */
  return (
    <div onClick={onClose} className={classes.overlay}>
      {children}
    </div>
  );
});

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

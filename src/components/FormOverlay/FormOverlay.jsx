import React from "react";
import classes from "./FormOverlay.module.css";
import PropTypes from "prop-types";
const FormOverlay = React.memo(({ children, type }) => {
  
  return (
    <div className={type === "profile" ? classes.profile : classes.login}>
      {children}
    </div>
  );
});
FormOverlay.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  type: PropTypes.string.isRequired,
};
export default FormOverlay;

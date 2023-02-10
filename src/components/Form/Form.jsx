import React from "react";
import classes from "./Form.module.css";
import PropTypes from "prop-types";
const Form = React.memo(({ children, formName, onSubmit, mainForm }) => {
  return (
    <form
      onSubmit={onSubmit}
      className={mainForm ? classes.form : classes.profile}
    >
      <fieldset className={`${classes.fieldset} `}>
        {formName && (
          <legend
            className={`${classes.title} pb-6 text text_type_main-medium`}
          >
            {formName}
          </legend>
        )}

        {children}
      </fieldset>
    </form>
  );
});
Form.propTypes = {
  children: PropTypes.node.isRequired,
  formName: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  mainForm: PropTypes.bool.isRequired,
};
export default Form;

import React, { FC } from "react";
import { TForm } from "../../services/types";
import classes from "./Form.module.css";

const Form: FC<TForm> = React.memo(
  ({ children, formName, onSubmit, mainForm }) => {
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
  }
);

export default Form;


import React from "react";
import classes from "./Form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

const Form = ({children, formName, onSubmit }) => {
  return (
          <form onSubmit={onSubmit} className={classes.form}>
        <fieldset className={`${classes.fieldset} `}>
        {formName && <legend
            className={`${classes.title} pb-6 text text_type_main-medium`}
          >
            {formName}
          </legend>}
          
          {children}
        </fieldset>
                
      </form>
      );
};

export default Form;
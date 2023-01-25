
import React from "react";
import classes from "./Form.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

const Form = ({children, formName, btnName }) => {
  return (
          <form className={classes.form}>
        <fieldset className={`${classes.fieldset} `}>
          <legend
            className={`${classes.title} pb-6 text text_type_main-medium`}
          >
            {formName}
          </legend>
          {children}
        </fieldset>
        {formName && <Button
          htmlType="button"
          type="primary submit"
          size="medium"
          extraClass=""
        >
          {btnName}
        </Button>}
        
      </form>
      );
};

export default Form;
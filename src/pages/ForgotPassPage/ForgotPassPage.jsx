import React from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import { Link } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

const ForgotPassPage = () => {
  const [value, setValue] = React.useState('')
  console.log(value)
  return (
    <FormOverlay>
      <Form formName="Восстановление пароля">
        <Input onChange={e => setValue(e.target.value)} value={value} type={"email"} placeholder={"Укажите e-mail"} />
        <Button
          htmlType="submit"
          type="primary"
                   size="medium"
          extraClass=""
        >
          Восстановить
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </FormOverlay>
  );
};

export default ForgotPassPage;

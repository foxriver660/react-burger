import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import {Link} from 'react-router-dom'
import classes from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import {
 Input
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import Form from "../../components/Form/Form";



const RegisterPage = () => {
  return (
    <FormOverlay>
      <Form formName="Регистрация">
        <Input type={"text"} placeholder={"Имя"} />
        <Input type={"email"} placeholder={"E-mail"} />
        <Input type={"password"} placeholder={"Пароль"} icon={'ShowIcon'} />
        <Button
          htmlType="submit"
          type="primary"
                   size="medium"
          extraClass=""
        >
          Зарегистрироваться
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </FormOverlay>
  );
};

export default RegisterPage;

import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import classes from "./ResetPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";

import Form from "../../components/Form/Form";
import {
  Input
 } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";

const ResetPassPage = () => {
  return (
    <FormOverlay>
      <Form formName="Восстановление пароля" btnName="Сохранить">
        
        
        <Input type={"password"} placeholder={"Введите новый пароль"} />
        <Input type={"text"} placeholder={"Введите код из письма"} />
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
      Вспомнили пароль? <a href="/">Войти</a>
      </p>
    </FormOverlay>
  );
};

export default ResetPassPage;
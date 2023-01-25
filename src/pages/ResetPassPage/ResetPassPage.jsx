import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import {Link} from 'react-router-dom'
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
      <Form formName="Восстановление пароля">
        
        
        <Input type={"password"} placeholder={"Введите новый пароль"} icon={'ShowIcon'} />
        <Input type={"text"} placeholder={"Введите код из письма"} />
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

export default ResetPassPage;
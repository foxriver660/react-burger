import React from 'react'
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import {
  Input
 } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./ForgotPassPage.module.css";

const ForgotPassPage = () => {
  return (
    <FormOverlay>
    <Form formName="Восстановление пароля" btnName="Восстановить">
            <Input type={"email"} placeholder={"Укажите e-mail"} />
      
    </Form>

    <p className={`${classes.clarification} text text_type_main-default`}>
    Вспомнили пароль? <a href="/">Войти</a>
    </p>
    
  </FormOverlay>
  )
}

export default ForgotPassPage
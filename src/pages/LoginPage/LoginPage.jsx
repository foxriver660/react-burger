import React from 'react'
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import {
  Input
 } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./LoginPage.module.css";

const LoginPage = () => {
  return (
    <FormOverlay>
    <Form formName="Вход" btnName="Войти">
            <Input type={"email"} placeholder={"E-mail"} />
      <Input type={"password"} placeholder={"Пароль"} />
    </Form>

    <p className={`${classes.clarification} text text_type_main-default`}>
    Вы — новый пользователь? <a href="/">Зарегистрироваться</a>
    </p>
    <p className={`${classes.clarification} text text_type_main-default`}>
    Забыли пароль? <a href="/">Восстановить пароль</a>
    </p>
  </FormOverlay>
  )
}

export default LoginPage

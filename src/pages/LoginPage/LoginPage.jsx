import React from 'react'
import {Link} from 'react-router-dom'
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import {
  Input
 } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./LoginPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";

const LoginPage = () => {
  return (
    <FormOverlay>
    <Form formName="Вход" >
            <Input type={"email"} placeholder={"E-mail"} />
      <Input type={"password"} placeholder={"Пароль"} icon={'ShowIcon'}/>
      <Button
          htmlType="submit"
          type="primary"
                   size="medium"
          extraClass=""
        >
          Войти
        </Button>
    </Form>

    <p className={`${classes.clarification} text text_type_main-default`}>
    Вы — новый пользователь? <Link to="/register">Зарегистрироваться</Link>
    </p>
    <p className={`${classes.clarification} text text_type_main-default`}>
    Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
    </p>
  </FormOverlay>
  )
}

export default LoginPage

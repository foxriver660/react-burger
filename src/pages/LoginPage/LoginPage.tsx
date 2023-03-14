import React, { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./LoginPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { login } from "../../services/actions/profileActions";
import { Form, FormOverlay, InputEmail, InputPassword } from "../../components";
import { PATH } from "../../utils/constant";
import useForm from "../../hooks/useForm";
import { useAppSelector } from "../../services/hooks";
import { getLoginRequest } from "../../selectors/selectors";
import ErrorUserFetch from "../../components/ErrorUserFetch/ErrorUserFetch";

const LoginPage: FC = React.memo(() => {
  const location = useLocation();
  const loginRequest = useAppSelector(getLoginRequest)
  const { form, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });
  const fromPage = loginRequest ? (location.state?.from?.pathname || PATH.HOME) : null;

  return (
    <FormOverlay type="form">
      <Form
        onSubmit={(e) => handleSubmit(e, login, fromPage)}
        formName="Вход"
        mainForm={true}
      >
        <InputEmail
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
        <InputPassword
          value={form.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="">
          Войти
        </Button>
      </Form>
      {loginRequest === false && (
                <ErrorUserFetch/>
              )}
      <p
        className={`${classes.clarification} text text_type_main-default text_color_inactive`}
      >
        Вы — новый пользователь?
        <Link className={classes.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`${classes.clarification} text text_type_main-default text_color_inactive`}
      >
        Забыли пароль?
        <Link className={classes.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </FormOverlay>
  );
});

export default LoginPage;

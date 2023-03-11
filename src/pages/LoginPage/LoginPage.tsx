import React, { ChangeEvent, FC, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./LoginPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { login } from "../../services/actions/profileActions";
import { useAppDispatch } from "../../services/hooks";
import { Form, FormOverlay, InputEmail, InputPassword } from "../../components";

const LoginPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = React.useState({ email: "", password: "" });

  const fromPage = location.state?.from?.pathname || "/";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
   /* eslint-disable */
  const handleSubmit = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(login(form)).then(() => navigate(fromPage, { replace: true }));
    },
    [form]
  );
  /* eslint-enable */

  return (
    <FormOverlay type="form">
      <Form onSubmit={handleSubmit} formName="Вход" mainForm={true}>
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

      <p
        className={`${classes.clarification} text text_type_main-default text_color_inactive`}
      >
        Вы — новый пользователь?{" "}
        <Link className={classes.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p
        className={`${classes.clarification} text text_type_main-default text_color_inactive`}
      >
        Забыли пароль?{" "}
        <Link className={classes.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </FormOverlay>
  );
});

export default LoginPage;

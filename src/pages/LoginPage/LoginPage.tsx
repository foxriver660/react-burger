import React, { FC, FormEvent } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./LoginPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { login } from "../../services/actions/profileActions";
import { useAppDispatch } from "../../services/hooks";
import { Form, FormOverlay } from "../../components";

const LoginPage: FC = React.memo(() => {
  // ХУКИ
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // ЛОКАЛЬНЫЕ СТЕЙТЫ
  const [user, setUser] = React.useState({ email: "", password: "" });

  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const handlePasswordClick = () => {
    passwordRef.current?.focus();
    setShowPassword(!showPassword);
  };
  // ОПРЕДЛЕЯЕМ С КАКОЙ СТРАНИЦЫ ПРИШЛИ
  const fromPage = location.state?.from?.pathname || "/";

  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  /* eslint-disable */
  const handleSubmit = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(login(user)).then(() => navigate(fromPage, { replace: true }));
    },
    [user]
  );
  /* eslint-enable */

  return (
    <FormOverlay type="form">
      <Form onSubmit={handleSubmit} formName="Вход" mainForm={true}>
        <Input
          required={true}
          type="email"
          name="email"
          placeholder="E-mail"
          errorText="Ошибка"
          value={user.email}
          error={isValidEmail ? false : true}
          onInvalid={(e) => setIsValidEmail(false)}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            setIsValidEmail(true);
          }}
        />
        <Input
          required={true}
          name="password"
          placeholder="Пароль"
          maxLength={12}
          minLength={2}
          errorText="Ошибка"
          autoComplete="off"
          value={user.password}
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          error={isValidPassword ? false : true}
          onInvalid={(e) => setIsValidPassword(false)}
          onIconClick={handlePasswordClick}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
            setIsValidPassword(true);
          }}
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

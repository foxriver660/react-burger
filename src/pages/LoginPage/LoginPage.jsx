import React from "react";
import { Link } from "react-router-dom";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./LoginPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { login } from "../../services/actions/profileActions";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { Navigate, useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  // ХУКИ
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // ЛОКАЛЬНЫЕ СТЕЙТЫ
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef(null);
  const handlePasswordClick = () => {
    passwordRef.current.focus();
    setShowPassword(!showPassword);
  };
  // ОПРЕДЛЕЯЕМ С КАКОЙ СТРАНИЦЫ ПРИШЛИ
  const fromPage = location.state?.from?.pathname || "/";
  // ПОЛУЧАЕМ АТВОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ ИЗ СТЕЙТА
  const authUser = useSelector((state) => state.profileReducer.authUser);
  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(user, () => navigate(fromPage, { replace: true })));
      setLoading(true);
    },
    [dispatch, user, fromPage, navigate]
  );
  // !РЕДИРЕКТ ЕСЛИ АВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ
  if (authUser && !loading) {
    return <Navigate to={"/"} replace />;
  }
  // КОНФИГУРАЦИЯ ИНПУТОВ
  const passwordInputConfig = {
    required: true,
    name: "password",
    placeholder: "Пароль",
    maxLength: 12,
    minLength: 2,
    errorText: "Ошибка",
    autoComplete: "off",
  };

  const emailInputConfig = {
    required: true,
    type: "email",
    name: "email",
    placeholder: "E-mail",
    errorText: "Ошибка",
  };

  return (
    <FormOverlay type="form">
      <Form onSubmit={handleSubmit} formName="Вход" mainForm={true}>
        <Input
          {...emailInputConfig}
          value={user.email}
          error={isValidEmail ? false : true}
          onInvalid={(e) => setIsValidEmail(false)}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            setIsValidEmail(true);
          }}
        />
        <Input
          {...passwordInputConfig}
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
};

export default LoginPage;

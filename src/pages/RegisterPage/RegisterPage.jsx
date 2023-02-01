import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import Form from "../../components/Form/Form";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { registerUser } from "../../services/actions/profileActions";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // ЛОКАЛЬНЫЕ СТЕТЫ
  const [user, setUser] = React.useState({});
  // СТЕЙТ УСПЕХА РЕГИСТРАЦИИ
  const [loading, setLoading] = React.useState(false);
  // ПОЛУЧАЕМ АТВОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ ИЗ СТОРА
  const authUser = useSelector((state) => state.profileReducer.authUser);
 // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isValidName, setIsValidName] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef(null);
  const handlePasswordClick = () => {
    passwordRef.current.focus();
    setShowPassword(!showPassword);
  };
  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(user, () => navigate("/", { replace: true })));
    setLoading(true);
  };
  // !РЕДИРЕКТ ЕСЛИ АВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ
  if (authUser && !loading) {
    return <Navigate to={"/"} replace />;
  }
  // КОНФИГУРАЦИЯ ИНПУТОВ
  const passwordInputConfig = {
    required: true,
    name: "password",
    placeholder: "Пароль",
    maxlength: 12,
    minlength: 2,
    value: user.password,
    errorText: "Ошибка",
  };

  const emailInputConfig = {
    required: true,
    type: "email",
    name: "email",
    placeholder: "E-mail",
    value: user.email,
    errorText: "Ошибка",
  };
  const nameInputConfig = {
    required: true,
    type: "text",
    name: "name",
    placeholder: "Имя",
    value: user.name,
    errorText: "Ошибка",
    pattern: "[A-Za-zА-Яа-яЁё0-9]{3,}"
  };
  return (
    <FormOverlay>
      <Form onSubmit={handleSubmit} formName="Регистрация" mainForm={true}>
        <Input
          {...nameInputConfig}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          error={isValidName ? false : true}
          onInvalid={(e) => setIsValidName(false)}
        />
        <Input
          {...emailInputConfig}
          error={isValidEmail ? false : true}
          onInvalid={(e) => setIsValidEmail(false)}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            setIsValidEmail(true);
          }}
        />
        <Input
          {...passwordInputConfig}
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
          Зарегистрироваться
        </Button>
      </Form>

      <p
        className={`${classes.clarification} text text_type_main-default text_color_inactive`}
      >
        Уже зарегистрированы?{" "}
        <Link className={classes.link} to="/login">
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
};

export default RegisterPage;

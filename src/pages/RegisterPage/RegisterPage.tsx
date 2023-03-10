import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React, { FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import Form from "../../components/Form/Form";
import { registerUser } from "../../services/actions/profileActions";
import { useAppDispatch } from "../../services/hooks";

const RegisterPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // ЛОКАЛЬНЫЕ СТЕТЫ
  const [user, setUser] = React.useState({ name: "", email: "", password: "" });

  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isValidName, setIsValidName] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const handlePasswordClick = () => {
    passwordRef.current?.focus();
    setShowPassword(!showPassword);
  };
  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(user)).then(() => navigate("/", { replace: true }));
  };

  return (
    <FormOverlay type="form">
      <Form onSubmit={handleSubmit} formName="Регистрация" mainForm={true}>
        <Input
          required={true}
          name="name"
          placeholder="Имя"
          errorText="Ошибка"
          pattern={`[A-Za-zА-Яа-яЁё0-9]{3,}`}
          value={user.name}
          type="text"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          error={isValidName ? false : true}
          onInvalid={(e) => setIsValidName(false)}
        />
        <Input
          required={true}
          name="email"
          placeholder="E-mail"
          errorText="Ошибка"
          value={user.email}
          type="email"
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
});

export default RegisterPage;
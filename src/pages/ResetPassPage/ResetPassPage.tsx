import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React, { ChangeEvent, FC, FormEvent, MutableRefObject } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "./ResetPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Form from "../../components/Form/Form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { resetPass } from "../../services/actions/profileActions";
import {
  getUpdatePassRequest,
  getResetPassRequest,
} from "../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
const ResetPassPage: FC = React.memo(() => {
  // ХУКИ
  const dispatch = useAppDispatch();
  // ЛОКАЛЬНЫЙ СТЕЙТ ДЛЯ ПАРОЛЬ
  const [newPassword, setNewPassword] = React.useState("");
  // ЛОКАЛЬНЫЙ СТЕЙТ ДЛЯ КОДА ИЗ ПОЧТЫ
  const [code, setCode] = React.useState("");
  // ПОЛУЧАЕМ РЕКВЕСТЫ ИЗ СТОРА
  const resetPassRequest = useAppSelector(getResetPassRequest);
  const updatePassRequest = useAppSelector(getUpdatePassRequest);
  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidCode, setIsValidCode] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const handlePasswordClick = () => {
    passwordRef.current?.focus();
    setShowPassword(!showPassword);
  };
  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPass(newPassword, code));
  };
  // !РЕДИРЕКТ ЕСЛИ ПРОШЕЛ ЗАПРОС
  if (resetPassRequest) {
    return <Navigate to={"/"} />;
  }
  // !РЕДИРЕКТ ЕСЛИ ПРИШЕЛ НЕ С /forgot-password
  if (!updatePassRequest) {
    return <Navigate to={"/forgot-password"} />;
  }


  return (
    <FormOverlay type="form">
      <Form
        onSubmit={handleSubmit}
        formName="Восстановление пароля"
        mainForm={true}
      >
        <Input
          required={true}
          name="password"
          placeholder="Введите новый пароль"
          maxLength={12}
          minLength={2}
          errorText="Ошибка"
          autoComplete="off"
          value={newPassword}
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          error={isValidPassword ? false : true}
          onInvalid={(e) => setIsValidPassword(false)}
          onIconClick={handlePasswordClick}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setIsValidPassword(true);
          }}
        />
        <Input
          required={true}
          name="code"
          placeholder="Введите код из письма"
          errorText="Ошибка"
          value={code}
          type="text"
          onChange={(e) => setCode(e.target.value)}
          error={isValidCode ? false : true}
          onInvalid={(e) => setIsValidCode(false)}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="">
          Восстановить
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Вспомнили пароль?{" "}
        <Link className={classes.link} to="/login">
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
});

export default ResetPassPage;

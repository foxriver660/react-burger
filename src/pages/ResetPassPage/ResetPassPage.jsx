import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "./ResetPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Form from "../../components/Form/Form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { resetPass } from "../../services/actions/profileActions";
const ResetPassPage = () => {
  // ХУКИ
  const dispatch = useDispatch();
  // ЛОКАЛЬНЫЙ СТЕЙТ ДЛЯ ПАРОЛЬ
  const [newPassword, setNewPassword] = React.useState(null);
  // ЛОКАЛЬНЫЙ СТЕЙТ ДЛЯ КОДА ИЗ ПОЧТЫ
  const [code, setCode] = React.useState(null);
  // СТЕЙТ УСПЕХА ВОССТАНОВЛЕНИЯ ПАРОЛЯ
  const [loading, setLoading] = React.useState(false);
  // ПОЛУЧАЕМ АТВОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ ИЗ СТОРА
  const authUser = useSelector((state) => state.profileReducer.authUser);
  // ПОЛУЧАЕМ РЕКВЕСТЫ ИЗ СТОРА
  const resetPassRequest = useSelector(
    (state) => state.profileReducer.resetPassRequest
  );
  const updatePassRequest = useSelector(
    (state) => state.profileReducer.updatePassRequest
  );
  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidCode, setIsValidCode] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef(null);
  const handlePasswordClick = () => {
    passwordRef.current.focus();
    setShowPassword(!showPassword);
  };
  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPass(newPassword, code));
    setLoading(true);
  };
  // !РЕДИРЕКТ ЕСЛИ ПРОШЕЛ ЗАПРОС
  if (resetPassRequest) {
    return <Navigate to={"/"} />;
  }
  // !РЕДИРЕКТ ЕСЛИ ПРИШЕЛ НЕ С /forgot-password
  if (!updatePassRequest) {
    return <Navigate to={"/forgot-password"} />;
  }
  // !РЕДИРЕКТ ЕСЛИ АВТОРИЗОВАННЫЙ ПОЛЬЗОВАТЕЛЬ
  if (authUser && !loading) {
    return <Navigate to={"/"} replace />;
  }
  // КОНФИГУРАЦИЯ ИНПУТОВ
  const passwordInputConfig = {
    required: true,
    name: "password",
    placeholder: "Введите новый пароль",
    maxLength: 12,
    minLength: 2,
    errorText: "Ошибка",
    autoComplete: 'off'
  };

  const codeInputConfig = {
    required: true,
    type: "text",
    name: "code",
    placeholder: "Введите код из письма",
    errorText: "Ошибка",
  };
  return (
    <FormOverlay>
      <Form
        onSubmit={handleSubmit}
        formName="Восстановление пароля"
        mainForm={true}
      >
        <Input
          {...passwordInputConfig}
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
          {...codeInputConfig}
          value={code}
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
};

export default ResetPassPage;

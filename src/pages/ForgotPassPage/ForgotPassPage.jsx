import React from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { updatePassRequest } from "../../services/actions/profileActions";
const ForgotPassPage = () => {
  // ХУКИ
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // ЛОКАЛЬНЫЙ СТЕЙТ ДЛЯ ИНПУТА
  const [value, setValue] = React.useState("");
  // СТЕЙТ УСПЕХА ОТПРАВКИ ПОЧТЫ
  const [loading, setLoading] = React.useState(false);
  // ПОЛУЧАЕМ РЕКВЕСТ ОБ ОТПРАВКЕ ПОЧТЫ ИЗ СТОРА
  const res = useSelector((state) => state.profileReducer.updatePassRequest);
  
  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassRequest(value));
    setLoading(true);
  };
  // !РЕДИРЕКТ на /reset-password ЕСЛИ res(true)
  if (res) {
    return <Navigate to={"/reset-password"} state={{ from: location }} />;
  }

  // КОНФИГУРАЦИЯ ИНПУТОВ
  const emailInputConfig = {
    required: true,
    type: "email",
    name: "email",
    placeholder: "Укажите e-mail",
    errorText: "Ошибка",
  };
  return (
    <FormOverlay type="form">
      <Form
        onSubmit={handleSubmit}
        formName="Восстановление пароля"
        mainForm={true}
      >
        <Input
          {...emailInputConfig}
          value={value}
          error={isValidEmail ? false : true}
          onInvalid={(e) => setIsValidEmail(false)}
          onChange={(e) => {
            setValue(e.target.value);
            setIsValidEmail(true);
          }}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="">
          Восстановить
        </Button>
      </Form>

      <p
        className={`${classes.clarification} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?
        <Link className={`${classes.link} pl-2`} to="/login">
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
};

export default ForgotPassPage;

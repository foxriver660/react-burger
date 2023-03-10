import React, { FormEvent } from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import { Link, Navigate, useLocation } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { updatePassRequest } from "../../services/actions/profileActions";
import { getUpdatePassRequest } from "../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
const ForgotPassPage = React.memo(() => {
  // ХУКИ
  const dispatch = useAppDispatch();
  const location = useLocation();
  // ЛОКАЛЬНЫЙ СТЕЙТ ДЛЯ ИНПУТА
  const [value, setValue] = React.useState("");
  // ЛОКАЛЬНЫЙ СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  // ПОЛУЧАЕМ РЕКВЕСТ ОБ ОТПРАВКЕ ПОЧТЫ ИЗ СТОРА
  const isUpdatePass = useAppSelector(getUpdatePassRequest);

  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updatePassRequest(value));
  };
  // !РЕДИРЕКТ на /reset-password ЕСЛИ res(true)
  if (isUpdatePass) {
    return <Navigate to={"/reset-password"} state={{ from: location }} />;
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
          type="email"
          name="email"
          placeholder="Укажите e-mail"
          errorText="Ошибка"
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
});

export default ForgotPassPage;

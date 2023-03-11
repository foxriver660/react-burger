import React, { ChangeEvent, FC, FormEvent } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import classes from "./ResetPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { resetPass } from "../../services/actions/profileActions";
import {
  getUpdatePassRequest,
  getResetPassRequest,
} from "../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { Form, FormOverlay, InputCode, InputPassword } from "../../components";
const ResetPassPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [form, setForm] = React.useState({ password: "", token: "" });

  /* const resetPassRequest = useAppSelector(getResetPassRequest); */
  const updatePassRequest = useAppSelector(getUpdatePassRequest);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(resetPass(form)).then(() =>
    navigate("/", { replace: true}));
  };
  /* // !РЕДИРЕКТ ЕСЛИ ПРОШЕЛ ЗАПРОС
  if (resetPassRequest) {
    return <Navigate to={"/"} />;
  } */
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
        <InputPassword value={form.password} onChange={handleChange} placeholder='Введите новый пароль' />
        <InputCode value={form.token} onChange={handleChange} />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Вспомнили пароль?
        <Link className={classes.link} to="/login">
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
});

export default ResetPassPage;

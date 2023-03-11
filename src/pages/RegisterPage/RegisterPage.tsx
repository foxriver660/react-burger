import React, { ChangeEvent, FC, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { registerUser } from "../../services/actions/profileActions";
import { useAppDispatch } from "../../services/hooks";
import {
  Form,
  FormOverlay,
  InputEmail,
  InputName,
  InputPassword,
} from "../../components";

const RegisterPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({ name: "", email: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(registerUser(form)).then(() => navigate("/", { replace: true }));
  };

  return (
    <FormOverlay type="form">
      <Form onSubmit={handleSubmit} formName="Регистрация" mainForm={true}>
        <InputName
          value={form.name}
          onChange={handleChange}
          placeholder="Имя"
        />
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
        <Button htmlType="submit" type="primary" size="medium">
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

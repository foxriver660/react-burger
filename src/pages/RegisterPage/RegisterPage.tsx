import React, { FC } from "react";
import { Link } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { registerUser } from "../../services/actions/profileActions";
import {
  Form,
  FormOverlay,
  InputEmail,
  InputName,
  InputPassword,
} from "../../components";
import { PATH } from "../../utils/constant";
import useForm from "../../hooks/useForm";

const RegisterPage: FC = React.memo(() => {
  const { form, handleChange, handleSubmit } = useForm({
    name: "",
    email: "",
    password: "",
  });

  return (
    <FormOverlay type="form">
      <Form
        onSubmit={(e) => handleSubmit(e, registerUser, PATH.HOME)}
        formName="Регистрация"
        mainForm={true}
      >
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
        Уже зарегистрированы?
        <Link className={classes.link} to={PATH.LOGIN}>
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
});

export default RegisterPage;

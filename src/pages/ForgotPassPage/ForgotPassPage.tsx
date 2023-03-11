import React, { ChangeEvent, FC, FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classes from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { updatePassRequest } from "../../services/actions/profileActions";
import { useAppDispatch } from "../../services/hooks";
import { Form, FormOverlay, InputEmail } from "../../components";

const ForgotPassPage: FC = React.memo(() => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = React.useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm(e.target.value);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updatePassRequest(form)).then(() =>
      navigate("/reset-password", { replace: true, state: { from: location } })
    );
  };
  return (
    <FormOverlay type="form">
      <Form
        onSubmit={handleSubmit}
        formName="Восстановление пароля"
        mainForm={true}
      >
        <InputEmail
          value={form}
          onChange={handleChange}
          placeholder="Укажите e-mail"
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
// TODO: this

import React, { FC } from "react";
import { Link, Navigate } from "react-router-dom";
import classes from "./ResetPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { resetPass } from "../../services/actions/profileActions";
import { getUpdatePassRequest } from "../../selectors/selectors";
import { useAppSelector } from "../../services/hooks";
import { Form, FormOverlay, InputCode, InputPassword } from "../../components";
import { PATH } from "../../utils/constant";
import useForm from "../../hooks/useForm";

const ResetPassPage: FC = React.memo(() => {
  const { form, handleChange, handleSubmit } = useForm({ password: "", token: "" });

  const updatePassRequest = useAppSelector(getUpdatePassRequest);

   // !РЕДИРЕКТ ЕСЛИ ПРИШЕЛ НЕ С /forgot-password
  if (!updatePassRequest) {
    return <Navigate to={PATH.FORGOT_PASSWORD} />;
  }

  return (
    <FormOverlay type="form">
      <Form
        onSubmit={(e) => handleSubmit(e, resetPass, PATH.HOME)}
        formName="Восстановление пароля"
        mainForm={true}
      >
        <InputPassword
          value={form.password}
          onChange={handleChange}
          placeholder="Введите новый пароль"
        />
        <InputCode value={form.token} onChange={handleChange} />
        <Button htmlType="submit" type="primary" size="medium">
          Восстановить
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Вспомнили пароль?
        <Link className={classes.link} to={PATH.LOGIN}>
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
});

export default ResetPassPage;

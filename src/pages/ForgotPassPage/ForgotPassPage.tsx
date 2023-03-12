import React, { FC } from "react";
import { Link } from "react-router-dom";
import classes from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { updatePassRequest } from "../../services/actions/profileActions";

import { Form, FormOverlay, InputEmail } from "../../components";
import useForm from "../../hooks/useForm";
import { PATH } from "../../utils/constant";

const ForgotPassPage: FC = React.memo(() => {
  const {form, handleChange, handleSubmit} = useForm({email: ''});
 
  return (
    <FormOverlay type="form">
      <Form
        onSubmit={(e) => handleSubmit(e, updatePassRequest, PATH.RESET_PASSWORD)}
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
        <Link className={`${classes.link} pl-2`} to={PATH.LOGIN}>
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
});

export default ForgotPassPage;


import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import classes from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
const RegisterPage = () => {
  return (
    <FormOverlay>
      <form className={classes.form}>
        <fieldset className={`${classes.fieldset} `}>
          <legend
            className={`${classes.title} pb-6 text text_type_main-medium`}
          >
            Регистрация
          </legend>
          <label className={classes.label}>
            <input
              className={`${classes.input} pt-5 pb-5 pl-6 text text_type_main-default`}
              type="text"
              placeholder="Имя"
            />
          </label>
          <label className={classes.label}>
            <input
              className={`${classes.input} pt-5 pb-5 pl-6 text text_type_main-default`}
              type="email"
              placeholder="E-mail"
            />
          </label>
          <label className={classes.label}>
            <input
              className={`${classes.input} pt-5 pb-5 pl-6 text text_type_main-default`}
              type="password"
              placeholder="Пароль"
            />
            <div className={classes.inputBtn}>
              <ShowIcon type="primary" />
            </div>
          </label>
        </fieldset>
        <Button
          htmlType="button"
          type="primary submit"
          size="medium"
          extraClass=""
        >
          Зарегистрироваться
        </Button>
        <p className={`${classes.clarification} text text_type_main-default`}>
          Уже зарегистрированы? <a href="/">Войти</a>
        </p>
      </form>
    </FormOverlay>
  );
};

export default RegisterPage;

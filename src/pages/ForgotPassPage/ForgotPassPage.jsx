import React from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getApiUpdatePass } from "../../services/actions/profileActions";
const ForgotPassPage = () => {
  const [value, setValue] = React.useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const res = useSelector((state) => state.profileReducer.resultFP);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getApiUpdatePass(value));
   
  };

  return (
    <FormOverlay>
      <Form onSubmit={handleClick} formName="Восстановление пароля">
        <Input
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type={"email"}
          placeholder={"Укажите e-mail"}
        />
        <Button
          htmlType="submit"
          type="primary"
          size="medium"
          extraClass=""
                 >
          Восстановить
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </FormOverlay>
  );
};

export default ForgotPassPage;

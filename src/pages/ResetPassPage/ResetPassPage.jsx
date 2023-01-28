import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import classes from "./ResetPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { useSelector, useDispatch } from "react-redux/es/exports";
import Form from "../../components/Form/Form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { resetPass } from "../../services/actions/profileActions";
const ResetPassPage = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = React.useState(null);
  const [code, setCode] = React.useState(null);
  const [loading, setLoading] = React.useState(false)
  const location = useLocation()
  const forgotPage = location.state?.from?.pathname
  console.log(location)
  const authUser = useSelector((state) => state.profileReducer.authUser);
  const res = useSelector((state) => state.profileReducer.resetPassRequest);
  console.log(res);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPass(newPassword, code));
  };
  if (res) {
    return <Navigate to={"/"} />;
  }
 
  if(authUser && !loading) {return <Navigate to={"/"} replace/>}

  return (
    <FormOverlay>
      <Form onSubmit={handleSubmit} formName="Восстановление пароля">
        <Input
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          type={"password"}
          placeholder={"Введите новый пароль"}
          icon={"ShowIcon"}
        />
        <Input
          onChange={(e) => setCode(e.target.value)}
          value={code}
          type={"text"}
          placeholder={"Введите код из письма"}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="">
          Восстановить
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Вспомнили пароль? <Link to="/login">Войти</Link>
      </p>
    </FormOverlay>
  );
};

export default ResetPassPage;

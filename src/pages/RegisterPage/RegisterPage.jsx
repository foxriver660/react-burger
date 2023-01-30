import FormOverlay from "../../components/FormOverlay/FormOverlay";
import React from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import classes from "./RegisterPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import Form from "../../components/Form/Form";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { registerUser } from "../../services/actions/profileActions";

const RegisterPage = () => {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const authUser = useSelector((state) => state.profileReducer.authUser);
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(registerUser(user, () => navigate('/', {replace: true})));
    setLoading(true)
  };
  if(authUser && !loading) {return <Navigate to={"/"} replace/>}
  return (
    <FormOverlay>
      <Form onSubmit={handleClick} formName="Регистрация">
        <Input
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          value={user.name}
          type={"text"}
          placeholder={"Имя"}
        />
        <Input
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          value={user.email}
          type={"email"}
          placeholder={"E-mail"}
        />
        <Input
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          value={user.password}
          type={"password"}
          placeholder={"Пароль"}
          icon={"ShowIcon"}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="">
          Зарегистрироваться
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default`}>
        Уже зарегистрированы? <Link to="/login">Войти</Link>
      </p>
    </FormOverlay>
  );
};

export default RegisterPage;

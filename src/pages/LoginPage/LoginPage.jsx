import React from "react";
import { Link } from "react-router-dom";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./LoginPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { login } from "../../services/actions/profileActions";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { getCookie } from "../../components/utils/cookie";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
const LoginPage = () => {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";

  const authUser = useSelector((state) => state.profileReducer.authUser);
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(login(user, () => navigate(fromPage, { replace: true })));
      setLoading(true);
    },
    [user]
  );

  if (authUser && !loading) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <FormOverlay>
      <Form onSubmit={handleSubmit} formName="Вход" mainForm={true}>
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
          Войти
        </Button>
      </Form>

      <p className={`${classes.clarification} text text_type_main-default text_color_inactive`}>
        Вы — новый пользователь? <Link className={classes.link} to="/register">Зарегистрироваться</Link>
      </p>
      <p className={`${classes.clarification} text text_type_main-default text_color_inactive`}>
        Забыли пароль? <Link className={classes.link} to="/forgot-password">Восстановить пароль</Link>
      </p>
    </FormOverlay>
  );
};

export default LoginPage;

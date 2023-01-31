import React from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import Form from "../../components/Form/Form";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import classes from "./ForgotPassPage.module.css";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { updatePassRequest } from "../../services/actions/profileActions";
const ForgotPassPage = () => {
  const [value, setValue] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const res = useSelector((state) => state.profileReducer.updatePassRequest);
  const authUser = useSelector((state) => state.profileReducer.authUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updatePassRequest(value));
  };
  if (res) {
    return <Navigate to={"/reset-password"} state={{ from: location }} />;
  }
  if (authUser && !loading) {
    navigate("/", { replace: true });
  }
  return (
    <FormOverlay>
      <Form
        onSubmit={handleSubmit}
        formName="Восстановление пароля"
        mainForm={true}
      >
        <Input
          name={"email"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          type={"email"}
          placeholder={"Укажите e-mail"}
        />
        <Button htmlType="submit" type="primary" size="medium" extraClass="">
          Восстановить
        </Button>
      </Form>

      <p
        className={`${classes.clarification} text text_type_main-default text_color_inactive`}
      >
        Вспомнили пароль?{" "}
        <Link className={classes.link} to="/login">
          Войти
        </Link>
      </p>
    </FormOverlay>
  );
};

export default ForgotPassPage;

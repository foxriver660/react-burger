import React from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import classes from "./ProfilePage.module.css";
import Form from "../../components/Form/Form";
import {
  EditIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
const ProfilePage = () => {
  return (
    <FormOverlay type='profile'>
      <div className={classes.container}>
        <div className={classes.subcontainer}>
        <ul className={`${classes.list} pb-20`}>
          <li className={`${classes.item} text text_type_main-medium text_color_inactive`}>Профиль</li>
          <li className={`${classes.item} text text_type_main-medium text_color_inactive`}>История заказов</li>
          <li className={`${classes.item} text text_type_main-medium text_color_inactive`}>Выход</li>
        </ul>
        <p className="text text_type_main-default text_color_inactive">В этом разделе вы можете
изменить свои персональные данные</p>
        </div>
        <Form>
          <Input value={'value'} type={"text"} placeholder={"Имя"} icon={'EditIcon'}/>
          <Input value={'value'} type={"email"} placeholder={"Логин"} icon={'EditIcon'}/>
          <Input value={'value'} type={"passward"} placeholder={"Пароль"} icon={'EditIcon'}/>
        </Form>
      </div>
    </FormOverlay>
  );
};

export default ProfilePage;

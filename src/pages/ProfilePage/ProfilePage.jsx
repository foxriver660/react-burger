import React from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import classes from "./ProfilePage.module.css";
import Form from "../../components/Form/Form";
import {
  EditIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import {NavLink} from 'react-router-dom'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { logout } from "../../services/actions/profileActions";
import { getCookie } from "../../components/utils/cookie";
const ProfilePage = () => {
  const dispatch = useDispatch();
  const refreshToken = getCookie('refreshToken');
  const setActive = ({isActive}) => `${isActive ? classes.linkActive : classes.link} text text_type_main-medium text_color_inactive`
  const handleClick = () => {
     dispatch(logout(refreshToken));
  };
  return (
    <FormOverlay type='profile'>
      <div className={classes.container}>
        <div className={classes.subcontainer}>
        <ul className={`${classes.list} pb-20`}>
          <li ><NavLink to='/profile' className={setActive}>Профиль</NavLink></li>
          <li ><NavLink to='/profile/orders' className={setActive}>История заказов</NavLink></li>
          <li ><NavLink onClick={handleClick} to='/' className={setActive}>Выход</NavLink></li>
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

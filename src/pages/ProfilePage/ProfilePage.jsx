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
import { logout, updateUserProfile } from "../../services/actions/profileActions";

import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { getCookie } from "../../components/utils/cookie";
const ProfilePage = () => {
  const user = useSelector((state) => state.profileReducer.authUser);
  const [updateUser, setUpdateUser] = React.useState(user);
  const dispatch = useDispatch();
  const accessToken = getCookie("token");
  const refreshToken = getCookie('refreshToken');
  const setActive = ({isActive}) => `${isActive ? classes.linkActive : classes.link} text text_type_main-medium text_color_inactive`
  const handleClick = () => {
     dispatch(logout(refreshToken));
  };
  const handleSubmit = React.useCallback((e) => {
    e.preventDefault();
    dispatch(updateUserProfile(`Bearer ${accessToken}`, updateUser));
      },
  [updateUser]
);
console.log(accessToken)
const reset = () => {setUpdateUser(user)}
  console.log(updateUser)
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
        <Form onSubmit={handleSubmit}>
          <Input value={updateUser.name} onChange={(e) => setUpdateUser({ ...updateUser, name: e.target.value })} type={"text"} placeholder={"Имя"} icon={'EditIcon'}/>
          <Input value={updateUser.email} onChange={(e) => setUpdateUser({ ...updateUser, email: e.target.value })} type={"email"} placeholder={"Логин"} icon={'EditIcon'}/>
          <Input value={updateUser.password} onChange={(e) => setUpdateUser({ ...updateUser, password: e.target.value })} type={"password"} placeholder={"Пароль"} icon={'EditIcon'}/>
          <div className={classes.btnContainer}>{/* showReset && */ <button onClick={reset} className={classes.btn}>&#11119;</button>}<Button htmlType="submit" type="primary" size="medium" extraClass="">
          Сохранить
        </Button></div>
        </Form>
      </div>
    </FormOverlay>
  );
};

export default ProfilePage;

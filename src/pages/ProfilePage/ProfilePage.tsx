import React, { useEffect } from "react";
import classes from "./ProfilePage.module.css";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { logout, updateUserProfile, updateUserSuccessAction } from "../../services/actions/profileActions";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  getSuccessTokenUpdate,
  getAuthUser,
  getUpdateUserProfileFailed,
  getUpdateUserProfileSuccess,
} from "../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { Form, FormOverlay, InputEmail, InputName, InputPassword } from "../../components";
import { PATH } from "../../utils/constant";
import { wsResetMessage } from "../../services/actions/wsActions";
import useForm from "../../hooks/useForm";
const ProfilePage = React.memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authUser = useAppSelector(getAuthUser);
  const { form, handleChange, handleSubmit, handleReset } = useForm({
    ...authUser,
    password: "",
  });
  // ПОЛУЧАЕМ ДАННЫЕ ИЗ СТОРА
  const updateRequestFailed = useAppSelector(getUpdateUserProfileFailed);
  const updateRequestSuccess = useAppSelector(getUpdateUserProfileSuccess);
  const successTokenUpdate = useAppSelector(getSuccessTokenUpdate);

  useEffect(() => {
    if (updateRequestFailed) {
      dispatch(updateUserProfile(form));
    }
    return () => {
      dispatch(wsResetMessage());
      dispatch(updateUserSuccessAction(false));
    };
  }, [successTokenUpdate]); // eslint-disable-line

  const orderLocation = location.pathname === PATH.PROFILE_ORDERS;
  // УСТАНОВКА КЛАССА АКТИНОЙ ССЫЛКЕ
  const setActive = ({ isActive }: { isActive: boolean }) =>
    `${isActive ? classes.linkActive : classes.link} text text_type_main-medium text_color_inactive`;
  return (
    <FormOverlay type="profile">
      <div className={classes.container}>
        <div className={classes.subcontainer}>
          <ul className={`${classes.list} pb-20`}>
            <li>
              <NavLink to="/react-burger/profile" className={setActive} end>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink to="/react-burger/profile/orders" className={setActive} state={{ order: true }} end>
                История заказов
              </NavLink>
            </li>
            <li>
              <button
                onClick={(e) => handleSubmit(e, logout, PATH.HOME)}
                className={`${classes.link}
                } text text_type_main-medium text_color_inactive`}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className="text text_type_main-default text_color_inactive">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
        {location.state?.order || orderLocation ? (
          <Outlet />
        ) : (
          <Form formName="Профиль" onSubmit={(e) => handleSubmit(e, updateUserProfile)} mainForm={false}>
            <InputName value={form.name} onChange={handleChange} placeholder="Имя" profile={true} />

            <InputEmail value={form.email} onChange={handleChange} placeholder="Логин" profile={true} />

            <InputPassword value={form.password} onChange={handleChange} placeholder="Новый пароль" />

            <div>
              {updateRequestSuccess && (
                <p className="text text_type_main-small text_color_inactive">Данные успешно обновлены</p>
              )}
            </div>
            <div className={classes.btnContainer}>
              <Button htmlType="button" type="secondary" size="medium" onClick={handleReset}>
                Отменить изменения
              </Button>
              <Button htmlType="submit" type="primary" size="medium">
                Сохранить
              </Button>
            </div>
          </Form>
        )}
      </div>
    </FormOverlay>
  );
});

export default ProfilePage;

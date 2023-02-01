import React from "react";
import FormOverlay from "../../components/FormOverlay/FormOverlay";
import classes from "./ProfilePage.module.css";
import Form from "../../components/Form/Form";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  logout,
  updateUserProfile,
} from "../../services/actions/profileActions";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { getCookie } from "../../components/utils/cookie";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // ПОЛУЧАЕМ ТОКЕНЫ
  const accessToken = getCookie("token");
  const refreshToken = getCookie("refreshToken");
  // ПОЛУЧАЕМ АТВОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ ИЗ СТЕЙТА
  const authUser = useSelector((state) => state.profileReducer.authUser);
  // ПОЛУЧАЕМ АТВОРИЗИРОВАННОГО ПОЛЬЗОВАТЕЛЯ ИЗ СТЕЙТА
  const updateRequestFailed = useSelector(
    (state) => state.profileReducer.updateUserProfileFailed
  );

  const successTokenUpdate = useSelector(
    (state) => state.profileReducer.successTokenUpdate
  );

  // КЛИКИ ИНПУТОВ
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const handleNameClick = () => nameRef.current.focus();
  const handleEmailClick = () => emailRef.current.focus();
  const handlePasswordClick = () => passwordRef.current.focus();
  // ЗАПИСЫВАЕМ В ЛОКАЛЬНЫЙ СТЕЙТ VALUE
  const [updateUser, setUpdateUser] = React.useState({
    ...authUser,
    password: "",
  });

  // УСТАНОВКА КЛАССА АКТИНОЙ ССЫЛКЕ
  const setActive = ({ isActive }) =>
    `${
      isActive ? classes.linkActive : classes.link
    } text text_type_main-medium text_color_inactive`;
  //  ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = React.useCallback(
    (e) => {
      e.preventDefault();
      dispatch(updateUserProfile(accessToken, updateUser));
    },
    [dispatch, accessToken, updateUser]
  );
  /* eslint-disable */
  React.useEffect(() => {
    if (updateRequestFailed) {
      dispatch(updateUserProfile(accessToken, updateUser));
    }
  }, [successTokenUpdate]);
  /* eslint-enable */

  // ВЫХОД
  const handleClick = () => {
    dispatch(logout(refreshToken, () => navigate("/", { replace: true })));
  };
  // СБРОС ЛОКАЛЬНОГО СТЕЙТА
  const handleReset = () => {
    setUpdateUser({ name: authUser.name, email: authUser.email, password: "" });
  };
  const orderLocation = location.pathname === "/profile/orders";
  return (
    <FormOverlay type="profile">
      <div className={classes.container}>
        <div className={classes.subcontainer}>
          <ul className={`${classes.list} pb-20`}>
            <li>
              <NavLink to="/profile" className={setActive} end>
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile/orders"
                className={setActive}
                state={{ order: true }}
                end
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleClick}
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
          <Form formName="Профиль" onSubmit={handleSubmit} mainForm={false}>
            <Input
              value={updateUser.name}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, name: e.target.value })
              }
              type={"text"}
              placeholder={"Имя"}
              icon={"EditIcon"}
              name={"name"}
              errorText={"Ошибка"}
              size={"default"}
              ref={nameRef}
              onIconClick={handleNameClick}
            />
            <Input
              value={updateUser.email}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, email: e.target.value })
              }
              type={"email"}
              placeholder={"Логин"}
              icon={"EditIcon"}
              name={"email"}
              errorText={"Ошибка"}
              size={"default"}
              ref={emailRef}
              onIconClick={handleEmailClick}
            />
            <Input
              value={updateUser.password}
              onChange={(e) =>
                setUpdateUser({ ...updateUser, password: e.target.value })
              }
              type={"password"}
              placeholder={"Пароль"}
              icon={"EditIcon"}
              name={"password"}
              errorText={"Ошибка"}
              size={"default"}
              ref={passwordRef}
              onIconClick={handlePasswordClick}
              autoComplete={"off"}
            />
            {/*  <div>{updateRequestSuccess && isLoading && (
              <p className="text text_type_main-small text_color_inactive">
                Данные успешно обновлены
              </p>
            )}</div> */}
            <div className={classes.btnContainer}>
              <button onClick={handleReset} className={classes.btn}>
                &#11119;
              </button>
              <Button
                htmlType="submit"
                type="primary"
                size="medium"
                extraClass=""
              >
                Сохранить
              </Button>
            </div>
          </Form>
        )}
      </div>
    </FormOverlay>
  );
};

export default ProfilePage;

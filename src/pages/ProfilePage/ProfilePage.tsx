import React, { FormEvent, useEffect } from "react";
import classes from "./ProfilePage.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/input";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  updateUserProfile,
} from "../../services/actions/profileActions";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import { getCookie } from "../../utils/cookie";
import {
  getSuccessTokenUpdate,
  getAuthUser,
  getUpdateUserProfileFailed,
  getUpdateUserProfileSuccess,
} from "../../selectors/selectors";
import { wsResetMessage } from "../../services/actions/wsActions";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import { Form, FormOverlay } from "../../components";
const ProfilePage = React.memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  // ПОЛУЧАЕМ ТОКЕНЫ
  const accessToken = getCookie("token");
  // ПОЛУЧАЕМ ДАННЫЕ ИЗ СТОРА
  const authUser = useAppSelector(getAuthUser);
  const updateRequestFailed = useAppSelector(getUpdateUserProfileFailed);
  const updateRequestSuccess = useAppSelector(getUpdateUserProfileSuccess);
  const successTokenUpdate = useAppSelector(getSuccessTokenUpdate);

  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isValidName, setIsValidName] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const handlePasswordClick = () => {
    passwordRef.current?.focus();
    setShowPassword(!showPassword);
  };
  // ЗАПИСЫВАЕМ В ЛОКАЛЬНЫЙ СТЕЙТ VALUE
  const [updateUser, setUpdateUser] = React.useState({
    ...authUser,
    password: "",
  });

  // УСТАНОВКА КЛАССА АКТИНОЙ ССЫЛКЕ
  const setActive = ({ isActive }: { isActive: boolean }) =>
    `${
      isActive ? classes.linkActive : classes.link
    } text text_type_main-medium text_color_inactive`;
  //  ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = React.useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      dispatch(updateUserProfile(updateUser));
      setIsLoading(true);
    },
    [dispatch, accessToken, updateUser]
  );
  /* eslint-disable */
  useEffect(() => {
    dispatch(wsResetMessage());
    if (updateRequestFailed) {
      dispatch(updateUserProfile(updateUser));
    }
    return () => {
      dispatch(wsResetMessage());
    };
  }, [successTokenUpdate]);
  /* eslint-enable */

  // ВЫХОД
  const handleClick = () => {
    dispatch(logout()).then(() => navigate("/", { replace: true }));
  };
  // СБРОС ЛОКАЛЬНОГО СТЕЙТА
  const handleReset = () => {
    setUpdateUser({
      name: updateUser.name,
      email: updateUser.email,
      password: "",
    });
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
              required={true}
              name="name"
              placeholder="Имя"
              errorText="Ошибка"
              value={(updateUser.name = "")}
              type="text"
              icon="EditIcon"
              onChange={(e) => {
                setUpdateUser({ ...updateUser, name: e.target.value });
                setIsLoading(false);
                setIsValidName(true);
              }}
              error={isValidName ? false : true}
              onInvalid={() => setIsValidName(false)}
            />
            <Input
              required={true}
              name="email"
              placeholder="Логин"
              errorText="Ошибка"
              value={(updateUser.email = "")}
              icon="EditIcon"
              type="email"
              onChange={(e) => {
                setUpdateUser({ ...updateUser, email: e.target.value });
                setIsLoading(false);
                setIsValidEmail(true);
              }}
              error={isValidEmail ? false : true}
              onInvalid={() => setIsValidEmail(false)}
            />
            <Input
              required={true}
              name="password"
              placeholder="Пароль"
              maxLength={12}
              minLength={2}
              errorText="Ошибка"
              autoComplete="off"
              value={updateUser.password}
              ref={passwordRef}
              onChange={(e) => {
                setUpdateUser({ ...updateUser, password: e.target.value });
                setIsLoading(false);
                setIsValidPassword(true);
              }}
              type={showPassword ? "text" : "password"}
              icon={showPassword ? "HideIcon" : "ShowIcon"}
              onIconClick={handlePasswordClick}
              error={isValidPassword ? false : true}
              onInvalid={() => setIsValidPassword(false)}
            />
            <div>
              {updateRequestSuccess && isLoading && (
                <p className="text text_type_main-small text_color_inactive">
                  Данные успешно обновлены
                </p>
              )}
            </div>
            <div className={classes.btnContainer}>
              {!isLoading && (
                <Button
                  htmlType="button"
                  type="secondary"
                  size="medium"
                  onClick={handleReset}
                >
                  Отменить изменения
                </Button>
              )}
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
});

export default ProfilePage;

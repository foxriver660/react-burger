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
import {
  getSuccessTokenUpdate,
  getAuthUser,
  getUpdateUserProfileFailed,
  getUpdateUserProfileSuccess,
} from "../../selectors/selectors";
import { wsResetMessage } from "../../services/actions/wsActions";
const ProfilePage = React.memo(() => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  // ПОЛУЧАЕМ ТОКЕНЫ
  const accessToken = getCookie("token");
  const refreshToken = getCookie("refreshToken");
  // ПОЛУЧАЕМ ДАННЫЕ ИЗ СТОРА
  const authUser = useSelector(getAuthUser);
  const updateRequestFailed = useSelector(getUpdateUserProfileFailed);
  const updateRequestSuccess = useSelector(getUpdateUserProfileSuccess);
  const successTokenUpdate = useSelector(getSuccessTokenUpdate);

  // КЛИКИ ИНПУТОВ
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const handleNameClick = () => nameRef.current.focus();
  const handleEmailClick = () => emailRef.current.focus();
  const handlePasswordClick = () => passwordRef.current.focus();
  // СТЕЙТЫ ДЛЯ ВАЛИДАЦИИ И ПОКАЗ ПАРОЛЯ
  const [isValidPassword, setIsValidPassword] = React.useState(true);
  const [isValidEmail, setIsValidEmail] = React.useState(true);
  const [isValidName, setIsValidName] = React.useState(true);
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
      setIsLoading(true);
    },
    [dispatch, accessToken, updateUser]
  );
  /* eslint-disable */
  React.useEffect(() => {
    dispatch(wsResetMessage())
    if (updateRequestFailed) {
      dispatch(updateUserProfile(accessToken, updateUser));
    }
    return ()=>{dispatch(wsResetMessage());}
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
  // КОНФИГУРАЦИЯ ИНПУТОВ
  const passwordInputConfig = {
    required: true,
    name: "password",
    type: "password",
    placeholder: "Пароль",
    maxLength: 12,
    minLength: 2,
    errorText: "Ошибка",
    size: "default",
    autoComplete: "off",
    icon: "EditIcon",
  };

  const emailInputConfig = {
    required: true,
    type: "email",
    name: "email",
    placeholder: "Логин",
    errorText: "Ошибка",
    icon: "EditIcon",
    size: "default",
  };
  const nameInputConfig = {
    required: true,
    type: "text",
    name: "name",
    placeholder: "Имя",
    errorText: "Ошибка",
    icon: "EditIcon",
    size: "default",
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
              {...nameInputConfig}
              value={updateUser.name}
              onChange={(e) => {
                setUpdateUser({ ...updateUser, name: e.target.value });
                setIsLoading(false);
                setIsValidName(true);
              }}
              ref={nameRef}
              onIconClick={handleNameClick}
              error={isValidName ? false : true}
              onInvalid={(e) => setIsValidName(false)}
            />
            <Input
              {...emailInputConfig}
              value={updateUser.email}
              onChange={(e) => {
                setUpdateUser({ ...updateUser, email: e.target.value });
                setIsLoading(false);
                setIsValidEmail(true);
              }}
              ref={emailRef}
              onIconClick={handleEmailClick}
              error={isValidEmail ? false : true}
              onInvalid={(e) => setIsValidEmail(false)}
            />
            <Input
              {...passwordInputConfig}
              value={updateUser.password}
              onChange={(e) => {
                setUpdateUser({ ...updateUser, password: e.target.value });
                setIsLoading(false);
                setIsValidPassword(true);
              }}
              ref={passwordRef}
              onIconClick={handlePasswordClick}
              error={isValidPassword ? false : true}
              onInvalid={(e) => setIsValidPassword(false)}
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

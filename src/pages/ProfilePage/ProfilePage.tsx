import React, { ChangeEvent, FormEvent, useEffect } from "react";
import classes from "./ProfilePage.module.css";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  logout,
  updateUserProfile,
} from "../../services/actions/profileActions";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/button";
import {
  getSuccessTokenUpdate,
  getAuthUser,
  getUpdateUserProfileFailed,
  getUpdateUserProfileSuccess,
} from "../../selectors/selectors";
import { useAppDispatch, useAppSelector } from "../../services/hooks";
import {
  Form,
  FormOverlay,
  InputEmail,
  InputName,
  InputPassword,
} from "../../components";
const ProfilePage = React.memo(() => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  // ПОЛУЧАЕМ ДАННЫЕ ИЗ СТОРА
  const authUser = useAppSelector(getAuthUser);
  const updateRequestFailed = useAppSelector(getUpdateUserProfileFailed);
  const updateRequestSuccess = useAppSelector(getUpdateUserProfileSuccess);
  const successTokenUpdate = useAppSelector(getSuccessTokenUpdate);

  const [form, setForm] = React.useState({
    ...authUser,
    password: "",
  });

  useEffect(() => {
    if (updateRequestFailed) {
      dispatch(updateUserProfile(form));
    }
  }, [successTokenUpdate]); // eslint-disable-line

  //  ОТПРАВКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(updateUserProfile(form)).then(() => setIsLoading(true));
  };
  /* eslint-enable */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });
  // ВЫХОД
  const handleClick = () => {
    dispatch(logout()).then(() => navigate("/", { replace: true }));
  };
  // СБРОС ЛОКАЛЬНОГО СТЕЙТА
  const handleReset = () => {
    setForm({
      ...authUser,
      password: "",
    });
  };

  const orderLocation = location.pathname === "/profile/orders";
  // УСТАНОВКА КЛАССА АКТИНОЙ ССЫЛКЕ
  const setActive = ({ isActive }: { isActive: boolean }) =>
    `${
      isActive ? classes.linkActive : classes.link
    } text text_type_main-medium text_color_inactive`;
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
            <InputName
              value={form.name}
              onChange={handleChange}
              placeholder="Имя"
            />

            <InputEmail
              value={form.email}
              onChange={handleChange}
              placeholder="Логин"
            />

            <InputPassword
              value={form.password}
              onChange={handleChange}
              placeholder="Пароль"
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

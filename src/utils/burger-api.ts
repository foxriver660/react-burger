import { TToken, TUserInfo, TUserLogin } from "../services/types/data";
import { BURGER_API_URL, BURGER_API_AUTH_URL } from "./constant";
import { getCookie } from "./cookie";

/* ПРОВЕРКА ОТВЕТА СЕРВЕРА */
const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

/* ЗАПРОС НА СЕРВЕР НА ПОЛУЧЕНИЕ ДАННЫХ ИНГРЕДИЕНТОВ */
const getIngredientsAPI = () =>
  fetch(`${BURGER_API_URL}/ingredients`).then(checkResponse);

const getOrderAPI = (ingredients: string[]) =>
  fetch(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: { "authorization": `Bearer ${getCookie("token")}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkResponse);

//  !ЗАПРОС НА ВОССТАНОВЛЕНИЕ ПАРОЛЯ
const updatePassRequestAPI = (email: string) =>
  fetch(`${BURGER_API_URL}/password-reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  }).then(checkResponse);
//  !ЗАПРОС НА ИЗМЕНЕНИЕ ПАРОЛЯ
const resetPassAPI = ({password, token}: {password: string, token: string}) =>
  fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  }).then(checkResponse);

//  !ЗАПРОС НА ВЫХОД ПОЛЬЗОВАТЕЛЯ
const logoutAPI = () => {
  return fetch(`${BURGER_API_AUTH_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkResponse);
};

// !ЗАПРОС НА РЕГИСТРАЦИЮ ПОЛЬЗОВАТЕЛЯ
const registerUserAPI = ({ email, password, name }: TUserInfo) =>
  fetch(`${BURGER_API_AUTH_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  }).then(checkResponse);

//  !ЗАПРОС НА ВХОД ПОЛЬЗОВАТЕЛЯ
const loginAPI = ({ email, password }: TUserLogin) =>
  fetch(`${BURGER_API_AUTH_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);

// ! ЗАПРОС ДАННЫХ ПОЛЬЗОВАТЕЛЯ
const checkUserAccessAPI = () =>
  fetch(`${BURGER_API_AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("token")}`,
    },
  }).then(checkResponse);

//  !ЗАПРОС НА РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const updateUserProfileAPI = ({ name, email, password }: TUserInfo) =>
  fetch(`${BURGER_API_AUTH_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("token")}`,
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  }).then(checkResponse);

// !ЗАПРОС НА РЕФРЕШ ТОКЕНА
const refreshTokenAPI = () => {
  return fetch(`${BURGER_API_AUTH_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  }).then(checkResponse);
};

export {
  getIngredientsAPI,
  getOrderAPI,
  updatePassRequestAPI,
  resetPassAPI,
  registerUserAPI,
  loginAPI,
  logoutAPI,
  refreshTokenAPI,
  updateUserProfileAPI,
  checkUserAccessAPI,
};

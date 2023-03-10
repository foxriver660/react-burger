import { TToken, TUserInfo, TUserLogin } from "../services/types/data";
import { BURGER_API_URL, BURGER_API_AUTH_URL } from "./constant";

/* ПРОВЕРКА ОТВЕТА СЕРВЕРА */
const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

/* ЗАПРОС НА СЕРВЕР НА ПОЛУЧЕНИЕ ДАННЫХ ИНГРЕДИЕНТОВ */
const getIngredientsAPI = () =>
  fetch(`${BURGER_API_URL}/ingredients`).then(checkResponse);

const getOrderAPI = (ingredients: string[], token: string | undefined) =>
  fetch(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: { "authorization": `${token}`, "Content-Type": "application/json" },
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
const resetPassAPI = (newPassword: string, emailCode: string) =>
  fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: newPassword,
      token: emailCode,
    }),
  }).then(checkResponse);

//  !ЗАПРОС НА ВЫХОД ПОЛЬЗОВАТЕЛЯ
const logoutAPI = (refreshToken: string | undefined) => {
  return fetch(`${BURGER_API_AUTH_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
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
const checkUserAccessAPI = (accessToken: string | undefined) =>
  fetch(`${BURGER_API_AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
  }).then(checkResponse);

//  !ЗАПРОС НА РЕДАКТИРОВАНИЕ ПРОФИЛЯ
const updateUserProfileAPI = (accessToken: string | undefined, { name, email, password }: TUserInfo) =>
  fetch(`${BURGER_API_AUTH_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  }).then(checkResponse);

// !ЗАПРОС НА РЕФРЕШ ТОКЕНА
const refreshTokenAPI = (refreshToken: string | undefined) => {
  return fetch(`${BURGER_API_AUTH_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
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
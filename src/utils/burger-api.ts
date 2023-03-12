import { TObjectString, TUserInfo, TUserLogin } from "../services/types/data";
import { BURGER_API_URL, BURGER_API_AUTH_URL } from "./constant";
import { getCookie } from "./cookie";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

// !ЗАПРОС НА СЕРВЕР НА ПОЛУЧЕНИЕ ДАННЫХ ИНГРЕДИЕНТОВ 
export const getIngredientsAPI = () =>
  fetch(`${BURGER_API_URL}/ingredients`).then(checkResponse);

export const getOrderAPI = (ingredients: string[]) =>
  fetch(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkResponse);

//  !ЗАПРОС НА ВОССТАНОВЛЕНИЕ ПАРОЛЯ
export const updatePassRequestAPI = (email: string) =>
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
export const resetPassAPI = ({
  password,
  token,
}: {
  password: string;
  token: string;
}) =>
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
export const logoutAPI = () => {
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
export const registerUserAPI = ({ email, password, name }: TUserInfo) =>
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
export const loginAPI = ({ email, password }: TUserLogin) =>
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
export const checkUserAccessAPI = () =>
  fetch(`${BURGER_API_AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("token")}`,
    },
  }).then(checkResponse);

//  !ЗАПРОС НА РЕДАКТИРОВАНИЕ ПРОФИЛЯ
export const updateUserProfileAPI = ({ name, email, password }: TObjectString) =>
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
export const refreshTokenAPI = () => {
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


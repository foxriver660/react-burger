import { BURGER_API_URL, BURGER_API_AUTH_URL } from "./constant";

/* ПРОВЕРКА ОТВЕТА СЕРВЕРА */
const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

/* ЗАПРОС НА СЕРВЕР НА ПОЛУЧЕНИЕ ДАННЫХ ИНГРЕДИЕНТОВ */
const getIngredientsAPI = () =>
  fetch(`${BURGER_API_URL}/ingredients`).then(checkResponse);

const getOrderAPI = (ingredients) =>
  fetch(`${BURGER_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  }).then(checkResponse);

//  !ЗАПРОС НА ВОССТАНОВЛЕНИЕ ПАРОЛЯ
const updatePassRequestAPI = (email) =>
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
const resetPassAPI = (newPassword, emailCode) =>
  fetch(`${BURGER_API_URL}/password-reset/reset`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "password": newPassword,
      "token": emailCode
    }),
  }).then(checkResponse);

//  !ЗАПРОС НА ВЫХОД ПОЛЬЗОВАТЕЛЯ 
  const logoutAPI = (refreshToken) => {
    return fetch(`${BURGER_API_AUTH_URL}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "token": refreshToken,
      }),
    }).then(checkResponse);
  };

// !ЗАПРОС НА РЕГИСТРАЦИЮ ПОЛЬЗОВАТЕЛЯ
const registerUserAPI = ({ email, password, name }) =>
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
const loginAPI = ({ email, password }) =>
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

/* ЗАПРОС ДАННЫХ ПОЛЬЗОВАТЕЛЯ */
const checkUserAccessAPI = (accessToken) =>
  fetch(`${BURGER_API_AUTH_URL}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "authorization": accessToken,
    },
  }).then(checkResponse);

/* ЗАПРОС НА РЕДАКТИРОВАНИЕ ПРОФИЛЯ */
const updateUserProfileAPI = (accessToken, {name, email, password}) =>
  fetch(`${BURGER_API_AUTH_URL}/user`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "authorization": accessToken,
    },
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  }).then(checkResponse);

/* ЗАПРОС НА РЕФРЕШ ТОКЕНА */
const refreshTokenAPI = (refreshToken) => {
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
/* ЗАПРОС НА ЛОГАУТ */

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
  checkUserAccessAPI
};

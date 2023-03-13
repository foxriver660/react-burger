import {
  TGetOrderAPI,
  THeadersApi,
  TLoginApi,
  TRegisterUserAPI,
  TResApi,
  TResetPassAPI,
  TUpdatePassRequestAPI,
  } from "../services/types/data";
import { BURGER_API_URL, ENDPOINT } from "./constant";
import { getCookie } from "./cookie";

const checkResponse = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
const checkSuccess = (res: TResApi) => {
  if (res && res.success) {
    return res;
  }
  return Promise.reject(`Ответ не success: ${res}`);
};
const request = (endpoint: string, options?: THeadersApi) => {
  return fetch(`${BURGER_API_URL}${endpoint}`, options)
    .then(checkResponse)
    .then(checkSuccess);
};

export const getIngredientsAPI = () => request(ENDPOINT.INGREDIENTS);

export const loginAPI = ({ email, password }: TLoginApi) =>
  request(ENDPOINT.LOGIN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

export const getOrderAPI = (ingredients: TGetOrderAPI) =>
  request(ENDPOINT.INGREDIENTS, {
    method: "POST",
    headers: {
      authorization: `Bearer ${getCookie("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients,
    }),
  });

export const updatePassRequestAPI = (email: TUpdatePassRequestAPI) =>
  request(ENDPOINT.PASSWORD_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
    }),
  });

export const resetPassAPI = ({ password, token }: TResetPassAPI) =>
  request(ENDPOINT.PASSWORD_RESET_RESET, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password,
      token,
    }),
  });

export const logoutAPI = () =>
  request(ENDPOINT.LOGOUT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });
export const registerUserAPI = ({ email, password, name }: TRegisterUserAPI) =>
  request(ENDPOINT.REGISTER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  });

export const checkUserAccessAPI = () =>
  request(ENDPOINT.USER, {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getCookie("token")}`,
    },
  });

export const updateUserProfileAPI = ({
  name,
  email,
  password,
}: TRegisterUserAPI) =>
  request(ENDPOINT.USER, {
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
  });

export const refreshTokenAPI = () =>
  request(ENDPOINT.REFRESH_TOKEN, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: getCookie("refreshToken"),
    }),
  });

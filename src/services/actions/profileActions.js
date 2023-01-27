import { setCookie, deleteCookie } from "../../components/utils/cookie";
import { navigate } from "react-router-dom";
import {
  updatePassRequestAPI,
  registerUserAPI,
  loginAPI,
  logoutAPI,
  getUserAPI,
  resetPassAPI,
} from "../../components/utils/burger-api";
import { getCookie } from "../../components/utils/cookie";
export const UPDATE_PASS = "UPDATE_PASS";
export const RESET_PASS = "RESET_PASS";
export const LOGOUT = "LOGOUT";
export const RESET_USER = "RESET_USER";
export const REGISTER_USER = "REGISTER_USER";
export const SET_USER = "SET_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN = "LOGIN";
// !ГЕНЕРАТОР THUNK
export const updatePassRequest = (email) => (dispatch) => {
  updatePassRequestAPI(email)
    .then((res) => {
      dispatch({ type: UPDATE_PASS, payload: res.success });
      console.log("РЕЗУЛЬАТАТ ЗАПРОСА updatePassRequest:", res);
    })
    .catch((err) => {
      console.log(err);
    });
};
// !ГЕНЕРАТОР THUNK
export const resetPass = (newPassword, emailCode) => (dispatch) => {
  resetPassAPI(newPassword, emailCode)
    .then((res) => {
      dispatch({ type: RESET_PASS, payload: res.success });
      console.log("РЕЗУЛЬАТАТ ЗАПРОСА resetPass:", res);
    })
    .catch((err) => {
      console.log(err);
    });
};
// !ГЕНЕРАТОР THUNK
export const logout = (refreshToken) => (dispatch) => {
  logoutAPI(refreshToken)
    .then((res) => {
      dispatch({ type: LOGOUT, payload: res.success });
      dispatch({ type: RESET_USER });
      console.log("РЕЗУЛЬАТАТ ЗАПРОСА logout:", res);
      deleteCookie("token");
      deleteCookie("refreshToken");
    })
    .catch((err) => {
      console.log(err);
    });
};

// !ГЕНЕРАТОР THUNK
export const registerUser = (user) => (dispatch) => {
  registerUserAPI(user)
    .then((res) => {
      let authToken;
      authToken = res.accessToken.split("Bearer ")[1];
      if (authToken) {
        setCookie("token", authToken, { "max-age": 1500 });
      }
      setCookie("refreshToken", res.refreshToken);
      console.log("РЕЗУЛЬАТАТ ЗАПРОСА registerUser:", res);
      if (res.success) {
        dispatch({ type: REGISTER_USER, payload: res.success });
        dispatch({ type: SET_USER, payload: user });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// !ГЕНЕРАТОР THUNK
export const login = (user) => (dispatch) => {
  loginAPI(user)
    .then((res) => {
      let authToken;
      authToken = res.accessToken.split("Bearer ")[1];
      if (authToken) {
        setCookie("token", authToken, { "max-age": 1500 });
      }
      setCookie("refreshToken", res.refreshToken);
      console.log("РЕЗУЛЬАТАТ ЗАПРОСА login:", res);
      if (res.success) {
        dispatch({ type: SET_USER, payload: user });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
// ГЕНЕРАТОР THUNK
/* export const signOut = (user) => (dispatch) => {
  logoutAPI(user)
    .then((res) => {
      dispatch({ type: LOGIN_USER, payload: res });
      dispatch({ type: SET_USER, payload: user });
      console.log('РЕЗУЛЬАТАТ ЗАПРОСА',res.accessToken);
      let authToken;
      authToken = res.accessToken.split('Bearer ')[1];
      if (authToken) {
        setCookie('token', authToken, {'max-age': 15});
        setCookie('refreshToken', res.refreshToken);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}; */
export const getUser = (accessToken) => (dispatch) => {
  getUserAPI(accessToken)
    .then((res) => {
      console.log("ДАННЫЕ ПОЛУЧЕНЫ getUser:", res);
      dispatch({ type: SET_USER, payload: res.user });
      return res.success;
    })
    .catch((err) => {
      console.log(err);
    });
};

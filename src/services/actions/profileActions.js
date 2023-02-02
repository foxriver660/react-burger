import {
  setCookie,
  deleteCookie,
  getCookie,
  parsForCookie,
} from "../../components/utils/cookie";

import {
  updatePassRequestAPI,
  registerUserAPI,
  loginAPI,
  logoutAPI,
  checkUserAccessAPI,
  resetPassAPI,
  updateUserProfileAPI,
  refreshTokenAPI,
} from "../../components/utils/burger-api";
import { JWT_MALFORMED, JWT_EXPIRED } from "../../components/utils/constant";
export const UPDATE_PASS = "UPDATE_PASS";
export const RESET_PASS = "RESET_PASS";
export const LOGOUT = "LOGOUT";
export const RESET_USER = "RESET_USER";
export const REGISTER_USER = "REGISTER_USER";
export const SET_USER = "SET_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGIN = "LOGIN";
export const AUTHORISATION = "AUTHORISATION";
export const UPDATE_USER_FAILED = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_TOKEN = "UPDATE_TOKEN";
// !ГЕНЕРАТОР THUNK
export const updatePassRequest = (email) => (dispatch) => {
  updatePassRequestAPI(email)
    .then((res) => {
      dispatch({ type: UPDATE_PASS, payload: res.success });
      /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА updatePassRequest:", res);  */
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
      /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА resetPass:", res);  */
    })
    .catch((err) => {
      console.log(err);
    });
};
// !ГЕНЕРАТОР THUNK
export const logout = (refreshToken, cb) => (dispatch) => {
  logoutAPI(refreshToken)
    .then((res) => {
      dispatch({ type: LOGOUT, payload: res.success });
      /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА logout:", res);   */
      deleteCookie("token");
      deleteCookie("refreshToken");
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
};

// !ГЕНЕРАТОР THUNK
export const registerUser = (user, cb) => (dispatch) => {
  registerUserAPI(user)
    .then((res) => {
      setCookie("token", parsForCookie(res.accessToken));
      setCookie("refreshToken", res.refreshToken);
      /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА registerUser:", res); */
      if (res.success) {
        dispatch({ type: REGISTER_USER, payload: res.success });
        dispatch({ type: SET_USER, payload: res.user });
      }
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
};

// !ГЕНЕРАТОР THUNK
export const login = (user, cb) => (dispatch) => {
  loginAPI(user)
    .then((res) => {
      setCookie("token", parsForCookie(res.accessToken));
      setCookie("refreshToken", res.refreshToken);
      /*  console.log("РЕЗУЛЬАТАТ ЗАПРОСА login:", res); */
      if (res.success) {
        dispatch({ type: LOGIN, payload: res.success });
        dispatch({ type: SET_USER, payload: res.user });
      }
      cb();
    })
    .catch((err) => {
      console.log(err);
    });
};
// !ГЕНЕРАТОР THUNK
export const checkUserAccess = (accessToken) => (dispatch) => {
  checkUserAccessAPI(accessToken)
    .then((res) => {
      /*  console.log("ДАННЫЕ ПОЛУЧЕНЫ checkUserAccess:", res);  */
      dispatch({ type: SET_USER, payload: res.user });
      dispatch({ type: UPDATE_TOKEN, payload: null });
    })
    .catch((err) => {
      console.log(err);
      if (err.message === JWT_MALFORMED || JWT_EXPIRED) {
        dispatch(refreshToken(getCookie("refreshToken")));
      }
    });
};
// !ГЕНЕРАТОР THUNK
export const refreshToken = (refreshToken) => (dispatch) => {
  refreshTokenAPI(refreshToken)
    .then((res) => {
      /*  console.log("ДАННЫЕ ПОЛУЧЕНЫ refreshToken:", res);  */
      setCookie("token", parsForCookie(res.accessToken));
      setCookie("refreshToken", res.refreshToken);
      dispatch({ type: UPDATE_TOKEN, payload: res.success });
    })
    .catch((err) => {
      console.log(err);
    });
};
// !ГЕНЕРАТОР THUNK
export const updateUserProfile =
  (accessToken, { name, email, password }) =>
  (dispatch) => {
    updateUserProfileAPI(accessToken, { name, email, password })
      .then((res) => {
        /* console.log("ДАННЫЕ ПОЛУЧЕНЫ updateUserProfile:", res);  */
        dispatch({ type: SET_USER, payload: res.user });
        dispatch({ type: UPDATE_USER_SUCCESS, payload: res.success });
      })
      .catch((err) => {
        console.log(err);
        if (err.message === JWT_MALFORMED || JWT_EXPIRED) {
          dispatch(refreshToken(getCookie("refreshToken")));
          dispatch({ type: UPDATE_USER_FAILED, payload: !err.success });
        }
      });
  };

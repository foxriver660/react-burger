import { setCookie, deleteCookie } from "../../components/utils/cookie";
import { navigate } from "react-router-dom";
import {
  updatePassRequestAPI,
  registerUserAPI,
  loginAPI,
  logoutAPI,
  checkUserAccessAPI,
  resetPassAPI,
  updateUserProfileAPI,
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
export const AUTHORISATION = "AUTHORISATION";
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
      /* dispatch({ type: RESET_USER }); */
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
        dispatch({ type: SET_USER, payload: res.user });
        
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// !ГЕНЕРАТОР THUNK
export const login = (user, cb) => (dispatch) => {
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
        dispatch({ type: LOGIN, payload: res.success });
        dispatch({ type: SET_USER, payload: res.user });
        
      }
      cb()
    })
    .catch((err) => {
      console.log(err);
    });
};
// !ГЕНЕРАТОР THUNK
export const checkUserAccess = (accessToken) => (dispatch) => {
  checkUserAccessAPI(accessToken)
    .then((res) => {
      console.log("ДАННЫЕ ПОЛУЧЕНЫ checkUserAccess:", res);
      dispatch({ type: SET_USER, payload: res.user });
      
      return res.success;
    })
    .catch((err) => {
      console.log(err);
    });
};
// !ГЕНЕРАТОР THUNK
export const updateUserProfile = (accessToken, {name, email, password}) => (dispatch) => {
  updateUserProfileAPI(accessToken, {name, email, password})
    .then((res) => {
      console.log("ДАННЫЕ ПОЛУЧЕНЫ updateUserProfile:", res);
      dispatch({ type: SET_USER, payload: res.user });
      
      return res.success;
    })
    .catch((err) => {
      console.log(err);
    });
};


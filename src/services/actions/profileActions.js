import {
  updatePassAPI,
  registerUserAPI,
  loginUserAPI,
} from "../../components/utils/burger-api";
export const UPDATE_PASS = "UPDATE_PASS";
export const REGISTER_USER = "REGISTER_USER";
export const SET_USER = "SET_USER";
export const LOGIN_USER = "SET_USER";
// ГЕНЕРАТОР THUNK
export const getApiUpdatePass = (email) => (dispatch) => {
  updatePassAPI(email)
    .then((res) => {
      dispatch({ type: UPDATE_PASS, payload: res });
    })
    .catch((err) => {
      console.log(err);
    });
};
// ГЕНЕРАТОР THUNK
export const getApiRegisterUser = (user) => (dispatch) => {
  registerUserAPI(user)
    .then((res) => {
      dispatch({ type: REGISTER_USER, payload: res });
      dispatch({ type: SET_USER, payload: user });
      console.log('РЕЗУЛЬАТАТ ЗАПРОСА',res);
    })
    .catch((err) => {
      console.log(err);
    });
};
// ГЕНЕРАТОР THUNK
export const getApiLoginUser = (user) => (dispatch) => {
  loginUserAPI(user)
    .then((res) => {
      dispatch({ type: LOGIN_USER, payload: res });
      dispatch({ type: SET_USER, payload: user });
      console.log('РЕЗУЛЬАТАТ ЗАПРОСА',res);
    })
    .catch((err) => {
      console.log(err);
    });
};
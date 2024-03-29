import { setCookie, deleteCookie, parsForCookie } from "../../utils/cookie";

import {
  updatePassRequestAPI,
  registerUserAPI,
  loginAPI,
  logoutAPI,
  checkUserAccessAPI,
  resetPassAPI,
  updateUserProfileAPI,
  refreshTokenAPI,
} from "../../utils/burger-api";
import { JWT_MALFORMED, JWT_EXPIRED } from "../../utils/constant";
import { AppDispatch } from "../types";
import {
  TLoginApi,
  TRegisterUserAPI,
  TResetPassAPI,
  TUpdatePassRequestFormAPI,
  TUser,
} from "../types/data";
// !ACTIONS
export const UPDATE_PASS: "UPDATE_PASS" = "UPDATE_PASS";
export const RESET_PASS: "RESET_PASS" = "RESET_PASS";
export const LOGOUT: "LOGOUT" = "LOGOUT";
export const RESET_USER: "RESET_USER" = "RESET_USER";
export const REGISTER_USER: "REGISTER_USER" = "REGISTER_USER";
export const SET_USER: "SET_USER" = "SET_USER";
export const LOGIN_USER: "LOGIN_USER" = "LOGIN_USER";
export const LOGIN: "LOGIN" = "LOGIN";
export const UPDATE_USER_FAILED: "UPDATE_USER_FAILED" = "UPDATE_USER_FAILED";
export const UPDATE_USER_SUCCESS: "UPDATE_USER_SUCCESS" = "UPDATE_USER_SUCCESS";
export const UPDATE_TOKEN: "UPDATE_TOKEN" = "UPDATE_TOKEN";
export const CHECK_USER: "CHECK_USER" = "CHECK_USER";
// !ACTIONS TYPES
export interface IUpdatePassAction {
  readonly type: typeof UPDATE_PASS;
  readonly payload: boolean;
}
export interface IResetPassAction {
  readonly type: typeof RESET_PASS;
  readonly payload: boolean;
}
export interface ILogoutAction {
  readonly type: typeof LOGOUT;
  readonly payload: boolean;
}
export interface IRegisterUserAction {
  readonly type: typeof REGISTER_USER;
  readonly payload: boolean;
}
export interface ISetUserAction {
  readonly type: typeof SET_USER;
  readonly payload: TUser;
}
export interface ILoginAction {
  readonly type: typeof LOGIN;
  readonly payload: boolean | null;
}
export interface IUpdateTokenAction {
  readonly type: typeof UPDATE_TOKEN;
  readonly payload: boolean;
}
export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_FAILED;
  readonly payload: boolean;
}
export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_SUCCESS;
  readonly payload: boolean;
}
export interface ICheckUserAction {
  readonly type: typeof CHECK_USER;
}
// !UNION ALL
export type TProfileActions =
  | IUpdatePassAction
  | IResetPassAction
  | ILogoutAction
  | IRegisterUserAction
  | ILoginAction
  | IUpdateTokenAction
  | IUpdateUserFailedAction
  | IUpdateUserSuccessAction
  | ISetUserAction
  | ICheckUserAction;
// ACTIONS GENERATE
export const checkUserAction = (): ICheckUserAction => ({
  type: CHECK_USER,
});
export const updatePassAction = (payload: boolean): IUpdatePassAction => ({
  type: UPDATE_PASS,
  payload,
});
export const resetPassAction = (payload: boolean): IResetPassAction => ({
  type: RESET_PASS,
  payload,
});
export const logoutAction = (payload: boolean): ILogoutAction => ({
  type: LOGOUT,
  payload,
});
export const registerUserAction = (payload: boolean): IRegisterUserAction => ({
  type: REGISTER_USER,
  payload,
});
export const setUserAction = (payload: TUser): ISetUserAction => ({
  type: SET_USER,
  payload,
});

export const loginAction = (payload: boolean | null): ILoginAction => ({
  type: LOGIN,
  payload,
});
export const updateTokenAction = (payload: boolean): IUpdateTokenAction => ({
  type: UPDATE_TOKEN,
  payload,
});
export const updateUserFailedAction = (
  payload: boolean
): IUpdateUserFailedAction => ({
  type: UPDATE_USER_FAILED,
  payload,
});
export const updateUserSuccessAction = (
  payload: boolean
): IUpdateUserSuccessAction => ({
  type: UPDATE_USER_SUCCESS,
  payload,
});
// ГЕНЕРАТОР THUNK
export const updatePassRequest =
  ({ email }: TUpdatePassRequestFormAPI) =>
  (dispatch: AppDispatch) => {
    return updatePassRequestAPI(email)
      .then((res) => {
        dispatch(updatePassAction(res.success));
        /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА updatePassRequest:", res); */
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const resetPass =
  (newPassword: TResetPassAPI) => (dispatch: AppDispatch) => {
    return resetPassAPI(newPassword)
      .then((res) => {
        /*  console.log("РЕЗУЛЬАТАТ ЗАПРОСА resetPass:", res); */
        dispatch(resetPassAction(res.success));
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const logout = () => (dispatch: AppDispatch) => {
  return logoutAPI()
    .then((res) => {
      /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА logout:", res); */
      dispatch(logoutAction(res.success));
      deleteCookie("token");
      deleteCookie("refreshToken");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const registerUser =
  (user: TRegisterUserAPI) => (dispatch: AppDispatch) => {
    return registerUserAPI(user)
      .then((res) => {
        /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА registerUser:", res); */
        dispatch(registerUserAction(res.success));
        if (res.success) {
          setCookie("token", parsForCookie(res.accessToken));
          setCookie("refreshToken", res.refreshToken);
          dispatch(setUserAction(res.user));
          dispatch(registerUserAction(false));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const login = (user: TLoginApi) => (dispatch: AppDispatch) => {
  return loginAPI(user)
    .then((res) => {
      /* console.log("РЕЗУЛЬАТАТ ЗАПРОСА login:", res); */
      dispatch(loginAction(res.success));
      if (res.success) {
        setCookie("token", parsForCookie(res.accessToken));
        setCookie("refreshToken", res.refreshToken);
        dispatch(setUserAction(res.user));
        dispatch(loginAction(null));
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const checkUserAccess = () => (dispatch: AppDispatch) => {
  return checkUserAccessAPI()
    .then((res) => {
      /* console.log("ДАННЫЕ ПОЛУЧЕНЫ checkUserAccess:", res); */
      dispatch(setUserAction(res.user));
      dispatch(updateTokenAction(false));
    })
    .catch((err) => {
      console.log(err);
      if (err.message === JWT_MALFORMED || err.message === JWT_EXPIRED) {
        dispatch(refreshToken());
      }
    })
    .finally(() => {
      dispatch(checkUserAction());
    });
};

export const refreshToken = () => (dispatch: AppDispatch) => {
  return refreshTokenAPI()
    .then((res) => {
      /* console.log("ДАННЫЕ ПОЛУЧЕНЫ refreshToken:", res); */
      setCookie("token", parsForCookie(res.accessToken));
      setCookie("refreshToken", res.refreshToken);
      dispatch(updateTokenAction(res.success));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateUserProfile =
  ({ name, email, password }: TRegisterUserAPI) =>
  (dispatch: AppDispatch) => {
    return updateUserProfileAPI({ name, email, password })
      .then((res) => {
        /* console.log("ДАННЫЕ ПОЛУЧЕНЫ updateUserProfile:", res); */
        dispatch(setUserAction(res.user));
        dispatch(updateUserSuccessAction(res.success));
      })
      .catch((err) => {
        console.log(err);
        if (err.message === JWT_MALFORMED || JWT_EXPIRED) {
          dispatch(refreshToken());
          dispatch(updateUserFailedAction(!err.success));
        }
      });
  };

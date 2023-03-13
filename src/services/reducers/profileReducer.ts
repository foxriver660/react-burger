import {
  UPDATE_PASS,
  RESET_PASS,
  REGISTER_USER,
  SET_USER,
  LOGIN,
  LOGOUT,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_TOKEN,
  CHECK_USER,
} from "../actions/profileActions";
import { TProfileActions } from "../actions/profileActions";
import { TUser } from "../types/data";

export type TProfileState = {
  authUser: null | TUser;
  isAuth: boolean;
  isAuthCheck: boolean;
  updatePassRequest: null | boolean;
  resetPassRequest: null | boolean;
  logoutRequest: null | boolean;
  registerUserRequest: null | boolean;
  loginRequest: null | boolean;
  updateUserProfileFailed: null | boolean;
  updateUserProfileSuccess: null | boolean;
  successTokenUpdate: null | boolean;
};
const defaultState: TProfileState = {
  authUser: null,
  isAuth: false,
  isAuthCheck: false,
  updatePassRequest: null,
  resetPassRequest: null,
  logoutRequest: null,
  registerUserRequest: null,
  loginRequest: null,
  updateUserProfileFailed: null,
  updateUserProfileSuccess: null,
  successTokenUpdate: null,
};
export const profileReducer = (
  state = defaultState,
  action: TProfileActions
) => {
  switch (action.type) {
    case UPDATE_PASS:
      return {
        ...state,
        updatePassRequest: action.payload,
      };
    case RESET_PASS:
      return {
        ...state,
        resetPassRequest: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        logoutRequest: action.payload,
        authUser: null,
        isAuth: false,
      };
    case LOGIN:
      return {
        ...state,
        loginRequest: action.payload,
        isAuth: true,
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUserRequest: action.payload,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        updateUserProfileFailed: action.payload,
        updateUserProfileSuccess: false,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        updateUserProfileSuccess: action.payload,
        updateUserProfileFailed: false,
      };
    case UPDATE_TOKEN:
      return {
        ...state,
        successTokenUpdate: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        authUser: {
          name: action.payload.name,
          email: action.payload.email,
        },
        isAuth: true,
      };
    case CHECK_USER:
      return {
        ...state,
        isAuthCheck: true,
      };
    default:
      return state;
  }
};

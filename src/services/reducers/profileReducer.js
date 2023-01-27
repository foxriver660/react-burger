import { NodeBuilderFlags } from "typescript";
import {
  UPDATE_PASS,
  RESET_PASS,
  RESET_USER,
  REGISTER_USER,
  SET_USER,
  LOGIN_USER,
  LOGIN,
  LOGOUT,
} from "../actions/profileActions";

const defaultState = {
  login: false,

  updatePassRequest: null,
  resetPassRequest: null,

  logoutRequest: null,

  registerUserRequest: null,
  signInRequest: null,
  signOutRequest: null,

  user: { name: null, email: null, password: null },
};
export const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        login: true,
      };
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
      };
    case RESET_USER:
      return {
        ...state,
        user: {
          name: null,
          email: null,
          password: null,
        },
      };
    case REGISTER_USER:
      return {
        ...state,
        registerUserRequest: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
        },
      };

    case LOGIN_USER:
      return {
        ...state,
        resultLI: action.payload,
      };

    default:
      return state;
  }
};

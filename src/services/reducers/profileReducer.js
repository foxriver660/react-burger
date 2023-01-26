import {
  UPDATE_PASS,
  REGISTER_USER,
  SET_USER,
  LOGIN_USER,
} from "../actions/profileActions";

const defaultState = {
  resultFP: null,
  resultRU: null,
  resultLI:null,
  name: null,
  email: null,
  password: null,
};
export const profileReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_PASS:
      return {
        ...state,
        resultFP: action.payload,
      };
    case REGISTER_USER:
      return {
        ...state,
        resultRU: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        name: action.payload.name,
        email: action.payload.email,
        password: action.payload.password,
      };
      case LOGIN_USER:
      return {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
      };
    default:
      return state;
  }
};

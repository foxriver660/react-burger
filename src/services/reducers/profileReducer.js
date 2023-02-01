import {
  UPDATE_PASS,
  RESET_PASS,
  RESET_USER,
  REGISTER_USER,
  SET_USER,
  LOGIN,
  LOGOUT,
  
} from "../actions/profileActions";

const defaultState = {
  authUser: null,
  
  updatePassRequest: null,
  resetPassRequest: null,

  logoutRequest: null,

  registerUserRequest: null,
  loginRequest: null,

  

  
};
export const profileReducer = (state = defaultState, action) => {
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
      };
      case LOGIN:
      return {
        ...state,
        loginRequest: action.payload,
      };
    case RESET_USER:
      return {
        ...state,
        authUser: {
          name: null,
          email: null,
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
        authUser: {
          name: action.payload.name,
          email: action.payload.email,
                  },
      };

  

    default:
      return state;
  }
};

import {
  UPDATE_PASS,
  RESET_PASS,
  RESET_USER,
  REGISTER_USER,
  SET_USER,
  LOGIN,
  LOGOUT,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPDATE_TOKEN,
} from "../actions/profileActions";

const defaultState = {
  authUser: null,
  
  updatePassRequest: null,
  resetPassRequest: null,

  logoutRequest: null,

  registerUserRequest: null,
  loginRequest: null,

  updateUserProfileFailed: null,
  updateUserProfileSuccess: null,

  successTokenUpdate: null
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
      };

  

    default:
      return state;
  }
};

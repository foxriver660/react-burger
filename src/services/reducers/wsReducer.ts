import {
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_RESET_MESSAGE,
  WS_CONNECTION_FAILED
} from "../actions/wsActions";
import { TWSActions } from "../actions/wsActions";

export type TWSState = {
  wsConnected: boolean,
  wsConnectedFailed: boolean,
  orders: { orders: boolean },
};

const initialState = {
  wsConnected: false,
  wsConnectedFailed: false,
  orders: { orders: [] },
};

export const wsReducer = (state = initialState, action: TWSActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
        wsConnectedFailed: false,
      };
      case WS_CONNECTION_FAILED:
      return {
        ...state,
        wsConnectedFailed: true,
      };
        case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };
    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    case WS_RESET_MESSAGE:
      return {
        ...state,
        orders: { orders: [] },
      };
    default:
      return state;
  }
};

import {
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_RESET_MESSAGE,
  WS_CONNECTION_FAILED,
  WS_DISCONNECT
} from "../actions/wsActions";
import { TWsActions } from "../actions/wsActions";
import { TAllOrders } from "../types/data";

export type TWsState = {
  wsConnected: boolean,
  wsConnectedFailed: boolean,
  orders: TAllOrders,
};

const defaultState: TWsState  = {
  wsConnected: false,
  wsConnectedFailed: false,
  orders: { orders: [] },
};

export const wsReducer = (state = defaultState, action: TWsActions) => {
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
        wsConnected: false,
        wsConnectedFailed: true,
      };
        case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
        wsConnectedFailed: true,
      };
      case WS_DISCONNECT:
      return {
        ...state,
        wsConnected: false,
        wsConnectedFailed: false,
      };
    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
        wsConnectedFailed: true,
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

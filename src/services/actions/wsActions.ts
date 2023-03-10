import {TAllOrders} from '../types/data'
// !ACTIONS
export const WS_CONNECTION_START: "WS_CONNECTION_START" =
  "WS_CONNECTION_START";

export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_DISCONNECT: "WS_DISCONNECT" = "WS_DISCONNECT";
export const WS_RESET_MESSAGE: "WS_RESET_MESSAGE" = "WS_RESET_MESSAGE";

// TODO НЕТУ В ГЕНЕРАТОРАХ РАЗОБРАТЬСЯ
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_FAILED: "WS_CONNECTION_FAILED" =
  "WS_CONNECTION_FAILED";

// !ACTIONS TYPES
export interface IWSConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string;
}

export interface IWSConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWSDisconnectAction {
  readonly type: typeof WS_DISCONNECT;
}
export interface IWSResetMessageAction {
  readonly type: typeof WS_RESET_MESSAGE;
}
// !ACTIONS TYPES MW
export interface IWSConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWSConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWSGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: TAllOrders;
}
export interface IWSConnectionFailedAction {
  readonly type: typeof WS_CONNECTION_FAILED;
}
// !UNION ALL
export type TWsActions =
  | IWSConnectionStartAction
    | IWSConnectionSuccessAction
  | IWSDisconnectAction
  | IWSResetMessageAction
  | IWSConnectionErrorAction
  | IWSConnectionClosedAction
  | IWSGetMessageAction
  | IWSConnectionFailedAction;
// ACTIONS GENERATE
export const wsConnectionStart = (url: string): IWSConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url
  };
};
export const wsConnectionSuccess = (): IWSConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};
export const wsDisconnect = (): IWSDisconnectAction => {
  return {
    type: WS_DISCONNECT,
  };
};
export const wsResetMessage = (): IWSResetMessageAction => {
  return {
    type: WS_RESET_MESSAGE,
  };
};
// ACTIONS GENERATE ADD
export const wsConnectionError = (): IWSConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};
export const wsConnectionClosed = (): IWSConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};
export const wsGetMessage = (payload: TAllOrders): IWSGetMessageAction => {
  
  return {
    type: WS_GET_MESSAGE,
    payload,
  };
};
export const wsConnectionFailed = (): IWSConnectionFailedAction => {
  return {
    type: WS_CONNECTION_FAILED,
  };
};


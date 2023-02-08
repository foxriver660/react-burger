export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_USER_NAME_UPDATE = "WS_USER_NAME_UPDATE";
export const WS_DISCONNECT = "WS_DISCONNECT";

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START,
  };
};
export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  };
};
export const wsDisconnect = () => {
  return {
    type: WS_DISCONNECT,
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (message) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};

export const wsUserNameUpdate = (userName) => {
  return {
    type: WS_USER_NAME_UPDATE,
    payload: userName,
  };
};

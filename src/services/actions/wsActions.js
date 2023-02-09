export const WS_CONNECTION_START_FEED = "WS_CONNECTION_START_FEED";
export const WS_CONNECTION_START_HISTORY = "WS_CONNECTION_START_HISTORY";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_USER_NAME_UPDATE = "WS_USER_NAME_UPDATE";
export const WS_DISCONNECT = "WS_DISCONNECT";

export const wsConnectionStartFeed = () => {
  return {
    type: WS_CONNECTION_START_FEED,
  };
};
export const wsConnectionStartHistory = () => {
  return {
    type: WS_CONNECTION_START_HISTORY,
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

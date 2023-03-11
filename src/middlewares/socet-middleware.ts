import { INVALID_TOKEN, JWT_EXPIRED } from "../utils/constant";
import { Middleware } from "redux";
import { TActions } from "../services/types/data";

export const socketMiddleware = (wsActions: TActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let reconnectTimer = 0;
    let timeout = 5000;
    let url = "";

    return (next) => (action) => {
      const { dispatch } = store;

      const { type, payload } = action;
      const {
        wsConnectionStart,
        wsDisconnect,
        wsConnectionSuccess,
        wsConnectionClosed,
        wsConnectionError,
        wsGetMessage,
        wsConnectionFailed,
      } = wsActions;

      if (type === wsConnectionStart(payload).type) {
        url = payload;
        socket = new WebSocket(url);
        console.log("***create WebSocket***");
      }

      if (type === wsDisconnect().type) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        socket?.close(1000, "User disconnected");
        socket = null;
        console.log("***DISCONNECT***");
      }
      /* СОЕДИНЕНИЕ С СЕРВЕРОМ */
      if (socket) {
        socket.onopen = (event) => {
          dispatch(wsConnectionSuccess());
          /* console.log("socket.onopen:", event); */
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          /* console.log("socket.onmessage:", parsedData); */
          const { success, ...restParsedData } = parsedData;
          success && dispatch(wsGetMessage(restParsedData));
          if (restParsedData.message === INVALID_TOKEN || JWT_EXPIRED) {
            dispatch(wsConnectionFailed());
          }
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError());
          /* console.log("socket.onerror:", event); */
        };

        socket.onclose = (event) => {
          /* console.log("socket.onclose:", event); */
          if (event.code !== 1000) {
            dispatch(wsConnectionError());
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnectionStart(url));
            }, timeout);
          }
          dispatch(wsConnectionClosed());
        };
      }

      next(action);
    };
  };
};

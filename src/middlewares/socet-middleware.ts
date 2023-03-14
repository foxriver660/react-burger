import { INVALID_TOKEN, JWT_EXPIRED } from "../utils/constant";
import { Middleware } from "redux";
import { TActions } from "../services/types/data";

export const socketMiddleware = (wsActions: TActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let timeout = 8000;
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
        isConnected = true;
       /*  console.log("create WebSocket", socket); */
      }

      if (type === wsDisconnect().type) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        reconnectTimer = 0;
        socket?.close(1000, "User disconnected");
        socket = null;
        url = "";
        /* console.log("warning: DISCONNECT WebSocket"); */
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
         /*  console.log("socket.onmessage:", parsedData); */
          const { success, ...restParsedData } = parsedData;
          success && dispatch(wsGetMessage(restParsedData));
          if (
            restParsedData.message === INVALID_TOKEN ||
            restParsedData.message === JWT_EXPIRED
          ) {
            dispatch(wsConnectionFailed());
          }
        };

        socket.onerror = (event) => {
          dispatch(wsConnectionError());
          /* console.log("socket.onerror:", event); */
        };

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            dispatch(wsConnectionError());
          }
          dispatch(wsConnectionClosed());
          if (isConnected) {
            /*  console.log("++++++ОТРАБОТАЛ РЕКОНЕКТ++++++"); */
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnectionStart(url));
            }, timeout);
          }
        };
      }

      next(action);
    };
  };
};

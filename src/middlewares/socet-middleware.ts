import { getCookie } from "../utils/cookie";
import { INVALID_TOKEN } from "../utils/constant";
import { refreshToken } from "../services/actions/profileActions";
import { Middleware } from "redux";
import { TActions } from "../services/types/data";


export const socketMiddleware = (wsUrl: string, wsActions: TActions): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null;
    let isConnectedAuthUser = false;
    let isConnected = false;
    let reconnectTimer = 0;
    let timeout = 5000;
    return (next) => (action) => {
      const { dispatch, getState } = store;
     
      const { type } = action;
      const {
        wsConnectionStartFeed,
        wsConnectionStartHistory,
        wsDisconnect,
        wsConnectionSuccess,
        wsConnectionClosed,
        wsConnectionError,
        wsGetMessage,
        wsConnectionFailed,
      } = wsActions;
      const { authUser } = getState().profileReducer;
      const accessToken = getCookie("token");
      if (type === wsConnectionStartHistory().type && authUser) {
        isConnectedAuthUser = true;
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        /*  console.log("***create WebSocket History***"); */
      }
      if (type === wsConnectionStartFeed().type) {
        
        socket = new WebSocket(`${wsUrl}/all`);
        isConnected = true;
        /*  console.log("***create WebSocket Feed***"); */
      }
      if (type === wsDisconnect) {
        clearTimeout(reconnectTimer);
        isConnected = false;
        isConnectedAuthUser = false;
        reconnectTimer = 0;
        socket?.close(1000, "User disconnected");
        socket = null;
        /* console.log("***DISCONNECT***"); */
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
          /* console.log("socket.onmessage:", parsedData);  */
          const { success, ...restParsedData } = parsedData;
                   success && dispatch(wsGetMessage(restParsedData));
          if (restParsedData.message === INVALID_TOKEN) {
            dispatch(wsConnectionFailed());
            // TODO убрать в компонент
           /*  dispatch(refreshToken(getCookie("refreshToken"))); */
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
          }
          dispatch(wsConnectionClosed());
          if (isConnectedAuthUser) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnectionStartHistory());
            }, timeout);
          }
          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(wsConnectionStartFeed());
            }, timeout);
          }
        };
      }

      next(action);
    };
  };
};

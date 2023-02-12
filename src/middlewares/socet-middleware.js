import { getCookie } from "../components/utils/cookie";
import { INVALID_TOKEN } from "../components/utils/constant";
import { refreshToken } from "../services/actions/profileActions";

export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;
    let isConnectedAuthUser = false;
    let isConnected = false;
    let reconnectTimer = 0;
    let timeout = 5000;
    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type } = action;
      const {
        wsConnectFeed,
        wsConnectHistory,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnectFailed,
      } = wsActions;
      const { authUser } = getState().profileReducer;
      const accessToken = getCookie("token");
      if (type === wsConnectHistory && authUser) {
        isConnectedAuthUser = true;
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        /*  console.log("***create WebSocket History***"); */
      }
      if (type === wsConnectFeed) {
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
          dispatch({ type: onOpen });
          /* console.log("socket.onopen:", event); */
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
           /* console.log("socket.onmessage:", parsedData);  */ 
          const { success, ...restParsedData } = parsedData;
          success && dispatch({ type: onMessage, payload: restParsedData });
          if (restParsedData.message === INVALID_TOKEN) {
            dispatch({ type: wsConnectFailed });
            dispatch(refreshToken(getCookie("refreshToken")));
          }
        };
        socket.onerror = (event) => {
          dispatch({ type: onError });
          /* console.log("socket.onerror:", event); */
        };
        socket.onclose = (event) => {
          /* console.log("socket.onclose:", event); */
          if (event.code !== 1000) {
            dispatch({ type: onError });
          }
          dispatch({ type: onClose });
          if (isConnectedAuthUser) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsConnectHistory });
            }, timeout);
          }
          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch({ type: wsConnectFeed });
            }, timeout);
          }
        };
      }

      next(action);
    };
  };
};

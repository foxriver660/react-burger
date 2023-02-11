import { getCookie } from "../components/utils/cookie";
export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsConnectFeed,
        wsConnectHistory,
        wsDisconnect,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = wsActions;
      const { authUser } = getState().profileReducer;
      const accessToken = getCookie("token");
      if (type === wsConnectHistory && authUser) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        /* console.log("***СОЕДИНЕНИЕ ИСТОРИЯ УСТАНОВЛЕНО***"); */
      }
      if (type === wsConnectFeed) {
        socket = new WebSocket(`${wsUrl}/all`);
        /* console.log("***СОЕДИНЕНИЕ ЛЕНТА ЗАКАЗОВ УСТАНОВЛЕНО***"); */
      }
      if (type === wsDisconnect) {
        socket?.close(1000, "User disconnected");
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
          /* console.log("socket.onmessage:", parsedData); */
          const { success, ...restParsedData } = parsedData;
          success && dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError });
          /* console.log("socket.onerror:", event); */
        };
        socket.onclose = (event) => {
          dispatch({ type: onClose });
          /* console.log("socket.onclose:", event); */
        };
      }

      next(action);
    };
  };
};

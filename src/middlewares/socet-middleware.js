import { getCookie } from "../components/utils/cookie";
export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, onDisconnect} = wsActions;
      const { authUser } = getState().profileReducer;
      const accessToken = getCookie("token");
      if (type === wsInit && authUser) {
        socket = new WebSocket(`${wsUrl}?token=${accessToken}`);
        console.log("ОТРАБОТАЛА ИСТОРИЯ", `${wsUrl}?token=${accessToken}`);
      }
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}/all`);
        console.log("ОТРАБОТАЛА ЛЕНТА", wsUrl);
      }
      if (type === onDisconnect) {
        socket.close(1000, 'User disconnected');
      }
      /* СОЕДИНЕНИЕ С СЕРВЕРОМ */
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen });
          console.log("socket.onopen:", event);
        };
        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          console.log("ЗАГРУЖЕНО onmessage:", parsedData);
          const { success, ...restParsedData } = parsedData;
          dispatch({ type: onMessage, payload: restParsedData });
        };
        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
          console.log("socket.onerror:", event);
        };
        socket.onclose = (event) => {
          dispatch({ type: onClose });
          console.log("socket.onclose:", event);
        };
       
        
      }

      next(action);
    };
  };
};

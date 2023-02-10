import { rootReducer } from "./reducers/reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "../middlewares/socet-middleware";
import { compose, createStore, applyMiddleware } from "redux";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START_FEED,
  WS_CONNECTION_START_HISTORY,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_DISCONNECT,
} from "./actions/wsActions";

const wsUrl = "wss://norma.nomoreparties.space/orders";
const wsActions = {
  wsConnectFeed: WS_CONNECTION_START_FEED,
  wsConnectHistory: WS_CONNECTION_START_HISTORY,
  wsDisconnect: WS_DISCONNECT,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);

export const store = createStore(rootReducer, enhancer);

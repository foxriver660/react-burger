import { rootReducer } from "./reducers/reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "../middlewares/socet-middleware";
import { compose, createStore, applyMiddleware } from "redux";
import {
  WS_CONNECTION_START_FEED,
  wsDisconnect,
  wsGetMessage,
  wsConnectionError,
  wsConnectionClosed,
  wsConnectionSuccess,
  wsConnectionFailed,
  wsConnectionStartFeed,
  wsConnectionStartHistory
} from "./actions/wsActions";

const wsUrl = "wss://norma.nomoreparties.space/orders";
const wsActions = {
  wsConnectionStartFeed,
  wsConnectionStartHistory,
  wsConnectionFailed,
  wsDisconnect,
  wsConnectionSuccess,
  wsConnectionClosed,
  wsConnectionError,
  wsGetMessage,
};
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions))
);

export const store = createStore(rootReducer, enhancer);

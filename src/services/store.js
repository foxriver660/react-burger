import { rootReducer } from "./reducers/reducers";
import thunk from "redux-thunk";
import {socketMiddleware} from '../middlewares/socet-middleware'
import { compose, createStore, applyMiddleware } from "redux";
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  
} from "./actions/wsActions"

const url = 'wss://norma.nomoreparties.space/orders/all';
const wsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(url, wsActions)));

export const store = createStore(rootReducer, enhancer);

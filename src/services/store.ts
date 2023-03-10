import { rootReducer } from "./reducers/reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "../middlewares/socet-middleware";
import { compose, createStore, applyMiddleware } from "redux";
import {
  
  wsDisconnect,
  wsGetMessage,
  wsConnectionError,
  wsConnectionClosed,
  wsConnectionSuccess,
  wsConnectionFailed,
  wsConnectionStart,
  
} from "./actions/wsActions";


const wsActions = {
  wsConnectionStart,
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
  applyMiddleware(thunk, socketMiddleware(wsActions))
);

export const store = createStore(rootReducer, enhancer);

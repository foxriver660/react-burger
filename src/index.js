import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import {createStore} from 'redux'
import { Provider } from "react-redux";
import {rootReducer} from './services/reducers/reducers'




const root = ReactDOM.createRoot(document.getElementById("root"));





const store = createStore(rootReducer)
console.log(store)


root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

import React from "react";
import './index.css'
import ReactDOM from "react-dom/client";
import App from "./App/App";
import { Provider } from "react-redux";
import { store } from "./services/store";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
export { useAppSelector, useAppDispatch } from "./services/hooks";



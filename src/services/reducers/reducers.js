import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredientReducer";
import { modalReducer } from "./modalReducer";
import { orderReducer } from "./orderReducer";
import { profileReducer } from "./profileReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  ingredientReducer,
  modalReducer,
  orderReducer,
  profileReducer,
  wsReducer,
});

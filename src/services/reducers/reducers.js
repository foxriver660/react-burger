import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredientReducer";
import { modalReducer } from "./modalReducer";
import { orderReducer } from "./orderReducer";

export const rootReducer = combineReducers({
  ingredientReducer,
  modalReducer,
  orderReducer,
});

import { combineReducers } from "redux";
import { ingredientReducer } from "./ingredientReducer";

import { orderReducer } from "./orderReducer";
import { profileReducer } from "./profileReducer";
import { wsReducer } from "./wsReducer";

export const rootReducer = combineReducers({
  ingredientReducer,
  orderReducer,
  profileReducer,
  wsReducer,
});

import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TIngredientsActions } from "../actions/ingredientActions";
import { TOrderActions } from "../actions/orderActions";
import { TProfileActions } from "../actions/profileActions";
import { TWSActions } from "../actions/wsActions";
import { ReactFragment, ReactNode } from "react";
import { TIngredient } from "./data";

type TApplicationActions =
  | TIngredientsActions
  | TOrderActions
  | TProfileActions
  | TWSActions;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

// ТИПИЗАЦИЯ КОМПОНЕНТОВ
export type TOrderBox = {
  doneOrder: number[];
}
export type TIngredientItem = {
  ingredient: TIngredient;
  quantityIngredients: any
}
export type TImageCicle ={
  src: string;
  index?: number;
  rest?: number;
}


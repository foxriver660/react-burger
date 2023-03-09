import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TIngredientsActions } from "../actions/ingredientActions";
import { TOrderActions } from "../actions/orderActions";
import { TProfileActions } from "../actions/profileActions";
import { TWSActions } from "../actions/wsActions";
import { ReactFragment, ReactNode } from "react";
import { TIngredient, TString } from "./data";

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
};

export type TIngredientItem = {
  ingredient: TIngredient;
  quantityIngredients: TString;
};
export type TImageCicle = {
  src: string;
  index?: number;
  rest?: number;
};
export type TModalOverlay = {
  onClose: () => void;
  children: ReactNode;
};
export type TModal = {
  children: ReactNode;
  onClose: () => void;
  type?: string;
};
export type TLoader = {
  classname: string | undefined;
};
export type TIngredientsCategory = {
  filteredArr: TIngredient[];
};
export type TIngredientCard = {
  data: TIngredient;
};

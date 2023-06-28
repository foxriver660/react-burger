import {ThunkAction, ThunkDispatch} from "redux-thunk/es/types";
import { Action, ActionCreator } from "redux";
import { store } from "../store";
import { TIngredientsActions } from "../actions/ingredientActions";
import { TOrderActions } from "../actions/orderActions";
import { TProfileActions } from "../actions/profileActions";
import { TWsActions } from "../actions/wsActions";


export type TApplicationActions=
  | TIngredientsActions
  | TOrderActions
  | TProfileActions
  | TWsActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;




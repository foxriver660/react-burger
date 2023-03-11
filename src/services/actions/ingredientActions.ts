import { nanoid } from "nanoid";
import { AppDispatch } from "../types";
import { getIngredientsAPI } from "../../utils/burger-api";
import { TIngredient, TIngredientShortInfo } from "../types/data";
// !ACTIONS
export const GET_API_INGREDIENTS_ERROR: "GET_API_INGREDIENTS_ERROR" =
  "GET_API_INGREDIENTS_ERROR";
export const GET_API_INGREDIENTS_SUCCESS: "GET_API_INGREDIENTS_SUCCESS" =
  "GET_API_INGREDIENTS_SUCCESS";
export const GET_API_INGREDIENTS: "GET_API_INGREDIENTS" = "GET_API_INGREDIENTS";
export const ADD_INGREDIENT_TO_CONSTRUCTOR: "ADD_INGREDIENT_TO_CONSTRUCTOR" =
  "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR: "ADD_BUN_TO_CONSTRUCTOR" =
  "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR: "DELETE_INGREDIENT_FROM_CONSTRUCTOR" =
  "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const SORT_INSIDE_CONSTRUCTOR: "SORT_INSIDE_CONSTRUCTOR" =
  "SORT_INSIDE_CONSTRUCTOR";
export const RESET_CONSTRUCTOR_AFTER_ORDER: "RESET_CONSTRUCTOR_AFTER_ORDER" =
  "RESET_CONSTRUCTOR_AFTER_ORDER";

// !ACTIONS TYPES
export interface IGetApiIngredientErrorAction {
  readonly type: typeof GET_API_INGREDIENTS_ERROR;
}
export interface IGetApiIngredientSuccessAction {
  readonly type: typeof GET_API_INGREDIENTS_SUCCESS;
}
export interface IGetApiIngredientAction {
  readonly type: typeof GET_API_INGREDIENTS;
  readonly payload: ReadonlyArray<TIngredient>;
}
export interface IAddIngredientToConstructorAction {
  readonly type: typeof ADD_INGREDIENT_TO_CONSTRUCTOR;
  readonly payload: TIngredientShortInfo;
  readonly generateId: string;
}
export interface IAddBunToConstructorAction {
  readonly type: typeof ADD_BUN_TO_CONSTRUCTOR;
  readonly payload: TIngredientShortInfo;
}
export interface IDeleteIngredientFromConstructorAction {
  readonly type: typeof DELETE_INGREDIENT_FROM_CONSTRUCTOR;
  readonly payload: TIngredient;
}
export interface ISortInsideConstructorAction {
  readonly type: typeof SORT_INSIDE_CONSTRUCTOR;
  readonly payload: ReadonlyArray<TIngredient>;
}
export interface IReserConstructorAfterOrderAction {
  readonly type: typeof RESET_CONSTRUCTOR_AFTER_ORDER;
}
// !UNION ALL
export type TIngredientsActions =
  | IAddIngredientToConstructorAction
  | IAddBunToConstructorAction
  | IReserConstructorAfterOrderAction
  | IDeleteIngredientFromConstructorAction
  | ISortInsideConstructorAction
  | IGetApiIngredientErrorAction
  | IGetApiIngredientSuccessAction
  | IGetApiIngredientAction;

// ACTIONS GENERATE
export const getIngredientsError = (): IGetApiIngredientErrorAction => ({
  type: GET_API_INGREDIENTS_ERROR,
});
export const getIngredientsSuccess = (): IGetApiIngredientSuccessAction => ({
  type: GET_API_INGREDIENTS_SUCCESS,
});
export const getIngredients = (
  payload: ReadonlyArray<TIngredient>
): IGetApiIngredientAction => ({
  type: GET_API_INGREDIENTS,
  payload,
});
export const deleteIngredient = (
  payload: TIngredient
): IDeleteIngredientFromConstructorAction => ({
  type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  payload,
});

export const sortIngredient = (payload: ReadonlyArray<TIngredient>) => ({
  type: SORT_INSIDE_CONSTRUCTOR,
  payload,
});
export const addBun = (
  payload: TIngredientShortInfo
): IAddBunToConstructorAction => ({ type: ADD_BUN_TO_CONSTRUCTOR, payload });
export const addIngredient = (
  payload: TIngredientShortInfo
): IAddIngredientToConstructorAction => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  payload,
  generateId: nanoid(),
});
export const resetConstructor = (): IReserConstructorAfterOrderAction => ({
  type: RESET_CONSTRUCTOR_AFTER_ORDER,
});

export const getApiIngredients = () => (dispatch: AppDispatch) => {
  getIngredientsAPI()
    .then((res) => {
      dispatch(getIngredients(res.data));
      dispatch(getIngredientsSuccess());
    })
    .catch((err) => {
      console.log("Ingredient load false:", err);
      dispatch(getIngredientsError());
    });
  /* .finally(() => dispatch(getIngredientsSuccess())); */
};

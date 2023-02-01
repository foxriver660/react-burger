import { nanoid } from "nanoid";
import { getIngredientsAPI } from "../../components/utils/burger-api";
export const GET_API_INGREDIENTS_ERROR = "GET_API_INGREDIENTS_ERROR";
export const GET_API_INGREDIENTS_SUCCESS = "GET_API_INGREDIENTS_SUCCESS";
export const GET_API_INGREDIENTS = "GET_API_INGREDIENTS";
export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const CALC_INGREDIENTS_IN_CONSTRUCTOR =
  "CALC_INGREDIENTS_IN_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR =
  "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
export const SORT_INSIDE_CONSTRUCTOR = "SORT_INSIDE_CONSTRUCTOR";
export const RESET_CONSTRUCTOR_AFTER_ORDER = "RESET_CONSTRUCTOR_AFTER_ORDER";
// ГЕНЕРАТОР THUNK
export const getApiIngredients = () => (dispatch) => {
    getIngredientsAPI()
      .then((res) => {
        dispatch({ type: GET_API_INGREDIENTS, payload: res.data });
        dispatch({ type: GET_API_INGREDIENTS_SUCCESS });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: GET_API_INGREDIENTS_ERROR });
      })
      .finally(() => dispatch({ type: GET_API_INGREDIENTS_SUCCESS }));
  };

// ГЕНЕРАТОРЫ
export const deleteIngredient = (payload) => ({
  type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  payload,
});
export const calcIngredients = () => ({
  type: CALC_INGREDIENTS_IN_CONSTRUCTOR,
});
export const sortIngredient = (payload) => ({
  type: SORT_INSIDE_CONSTRUCTOR,
  payload,
});
export const addBun = (payload) => ({ type: ADD_BUN_TO_CONSTRUCTOR, payload });
export const addIngredient = (payload) => ({
  type: ADD_INGREDIENT_TO_CONSTRUCTOR,
  payload,
  generateId: nanoid(),
});
export const resetConstructor = () => ({ type: RESET_CONSTRUCTOR_AFTER_ORDER });
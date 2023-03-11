import {
  GET_API_INGREDIENTS_ERROR,
  GET_API_INGREDIENTS_SUCCESS,
  GET_API_INGREDIENTS,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  SORT_INSIDE_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  RESET_CONSTRUCTOR_AFTER_ORDER,
} from "../actions/ingredientActions";
import { TIngredientsActions } from "../actions/ingredientActions";
import { TIngredient } from "../types/data";

export type TIngredientsState = {
  serverResponse: { isLoading: boolean; hasError: boolean };
  availableIngredients: Array<TIngredient>;
  constructorIngredients: any;
  constructorBun: any;
};

const defaultState: TIngredientsState = {
  serverResponse: { isLoading: true, hasError: false },
  availableIngredients: [],
  constructorIngredients: [],
  constructorBun: null,
};
export const ingredientReducer = (
  state = defaultState,
  action: TIngredientsActions
): TIngredientsState => {
  switch (action.type) {
    case GET_API_INGREDIENTS_ERROR:
      return {
        ...state,
        serverResponse: { ...state.serverResponse, hasError: true },
      };
    case GET_API_INGREDIENTS_SUCCESS:
      return {
        ...state,
        serverResponse: { ...state.serverResponse, isLoading: false },
      };
    case GET_API_INGREDIENTS:
      return { ...state, availableIngredients: [...action.payload] };

    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          {
            ...state.availableIngredients.find(
              (item) => item._id === action.payload.id
            ),
            nanoid: action.generateId,
          },
        ],
      };

    case ADD_BUN_TO_CONSTRUCTOR:
      return {
        ...state,
        constructorBun: state.availableIngredients.find(
          (item) => item._id === action.payload.id
        ),
      };

    case SORT_INSIDE_CONSTRUCTOR: {
      return {
        ...state,
        constructorIngredients: action.payload,
      };
    }
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item: { nanoid: string }) => item.nanoid !== action.payload.nanoid
          ),
        ],
      };
    case RESET_CONSTRUCTOR_AFTER_ORDER:
      return {
        ...state,
        constructorIngredients: [],
        constructorBun: null,
      };
    default:
      return state;
  }
};

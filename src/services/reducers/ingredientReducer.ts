import {
  GET_API_INGREDIENTS_ERROR,
  GET_API_INGREDIENTS_SUCCESS,
  GET_API_INGREDIENTS,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  SORT_INSIDE_CONSTRUCTOR,
  CALC_INGREDIENTS_IN_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  RESET_CONSTRUCTOR_AFTER_ORDER,
} from "../actions/ingredientActions";
import { TIngredientsActions } from "../actions/ingredientActions";
import { TIngredient } from "../types/data";

export type TIngredientsState = {
  serverResponse: { isLoading: boolean, hasError: boolean },
  availableIngredients: TIngredient[],
  // TODO подумать над этими двумя
  constructorIngredients: any,
  constructorBun: any,
  totalCost: null | number,
};

const defaultState: TIngredientsState = {
  serverResponse: { isLoading: true, hasError: false },
  availableIngredients: [],
  constructorIngredients: [],
  constructorBun: { price: null },
  totalCost: null,
};
export const ingredientReducer = (state = defaultState, action: TIngredientsActions): TIngredientsState => {
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
    case CALC_INGREDIENTS_IN_CONSTRUCTOR:
      return {
        ...state,
        totalCost:
          state.constructorIngredients.reduce(
            (acc: number, curr: { price: number; }) => acc + curr.price,
            0
          ) +
          state.constructorBun.price * 2,
      };
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item: { nanoid: string; }) => item.nanoid !== action.payload.nanoid
          ),
        ],
      };
      case RESET_CONSTRUCTOR_AFTER_ORDER:
      return {
        ...state,
        constructorIngredients: [],
        constructorBun: { price: null },
      };
    default:
      return state;
  }
};

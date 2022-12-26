import {
  GET_API_INGREDIENTS_ERROR,
  GET_API_INGREDIENTS_SUCCESS,
  GET_API_INGREDIENTS,
  ADD_INGREDIENT_TO_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  SORT_INSIDE_CONSTRUCTOR,
  CALC_INGREDIENTS_IN_CONSTRUCTOR,
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
} from "../actions/ingredientActions";

const defaultState = {
  serverResponse: { isLoading: true, hasError: false },
  availableIngredients: [],
  constructorIngredients: [],
  constructorBun: { price: null },
  totalCost: null,
};
export const ingredientReducer = (state = defaultState, action) => {
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
            (acc, curr) => acc + curr.price,
            0
          ) +
          state.constructorBun.price * 2,
      };
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item) => item.nanoid !== action.payload.nanoid
          ),
        ],
      };
    default:
      return state;
  }
};

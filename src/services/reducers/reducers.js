export const GET_API_INGREDIENTS = "GET_API_INGREDIENTS";
export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
export const OPEN_INGREDIENT_MODAL = "OPEN_MODAL";
export const CLOSE_INGREDIENT_MODAL = "OPEN_MODAL";
export const GET_ORDER = "GET_ORDER";
export const RESET_ORDER = "GET_ORDER";

const defaultState = {
  availableIngredients: [],
  constructorIngredients: [],
  totalCost: null,
  selectedIngredient: null,
  currentOrder: { order: null, ingredientsId: [] },
};
const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_API_INGREDIENTS:
      return { ...state, availableIngredients: [...action.payload] };
    case GET_CONSTRUCTOR_INGREDIENTS:
      return {
        ...state,
        constructorIngredients: [...action.payload],
        totalCost:
          state.totalCost +
          state.constructorIngredients.reduce(
            (acc, curr) => acc + curr.price,
            0
          ),
        currentOrder: {
          ...state.currentOrder,
          ingredientsId: state.constructorIngredients.reduce(
            (acc, curr) => [...acc, curr._id],
            []
          ),
        },
      };
    case OPEN_INGREDIENT_MODAL:
      return { ...state, selectedIngredient: action.payload };
    case CLOSE_INGREDIENT_MODAL:
      return { ...state, selectedIngredient: null };
    case GET_ORDER:
      return {
        ...state,
        currentOrder: { ...state.currentOrder, order: action.payload },
      };
    case RESET_ORDER:
      return { ...state, currentOrder: { ...state.currentOrder, order: null } };
    default:
      return state;
  }
};

export { rootReducer };

export const GET_API_INGREDIENTS = "GET_API_INGREDIENTS";
export const GET_CONSTRUCTOR_INGREDIENTS = "GET_CONSTRUCTOR_INGREDIENTS";
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";
const GET_ORDER = "GET_ORDER";

const defaultState = {
  availableIngredients: [],
  constructorIngredients: [],
  totalCost: null,
  currentIngredient: {},
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
          currentOrder: {...state.currentOrder, ingredientsId: state.constructorIngredients.reduce(
            (acc, curr) => [...acc, curr._id],
            [] 
          ) }
      };

    default:
      return state;
  }
};

export { rootReducer };

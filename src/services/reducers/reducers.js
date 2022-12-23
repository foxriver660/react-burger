export const GET_API_INGREDIENTS = "GET_API_INGREDIENTS";

export const ADD_INGREDIENT_TO_CONSTRUCTOR = "ADD_INGREDIENT_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const CALC_INGREDIENTS_IN_CONSTRUCTOR = "CALC_INGREDIENTS_IN_CONSTRUCTOR";
export const DELETE_INGREDIENT_FROM_CONSTRUCTOR =
  "DELETE_INGREDIENT_FROM_CONSTRUCTOR";
  export const SORT = "SORT";
export const OPEN_INGREDIENT_MODAL = "OPEN_MODAL";
export const CLOSE_INGREDIENT_MODAL = "OPEN_MODAL";
export const GET_ORDER = "GET_ORDER";
export const RESET_ORDER = "GET_ORDER";

const defaultState = {
  availableIngredients: [],
  constructorIngredients: [],
  constructorBun: {price: null},
  totalCost: null,
  selectedIngredient: null,
  currentOrder: { order: null, ingredientsId: [] },
};
const rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_API_INGREDIENTS:
      return { ...state, availableIngredients: [...action.payload] };

    case ADD_INGREDIENT_TO_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients,
          state.availableIngredients.find(
            (item) => item._id === action.payload.id
          ),
        ],
        currentOrder: {
          ...state.currentOrder,
          ingredientsId: state.constructorIngredients.reduce(
            (acc, curr) => [...acc, curr._id],
            []
          ),
        },
        
      };
      case ADD_BUN_TO_CONSTRUCTOR:
        return {
          ...state,
          constructorBun: 
            state.availableIngredients.find(
              (item) => item._id === action.payload.id
            ),        
                  
        };
      case SORT: {
        return {
          ...state,
          constructorIngredients: action.payload
        };
      }
      case CALC_INGREDIENTS_IN_CONSTRUCTOR:
        return {
          ...state,
          totalCost: state.constructorIngredients.reduce(
            (acc, curr) =>
              acc + curr.price,
            0
          ) + state.constructorBun.price*2,
        };
    case DELETE_INGREDIENT_FROM_CONSTRUCTOR:
      return {
        ...state,
        constructorIngredients: [
          ...state.constructorIngredients.filter(
            (item) => item._id !== action.payload._id
          ),
        ],
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

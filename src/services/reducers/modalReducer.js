import {
  OPEN_INGREDIENT_MODAL,
  CLOSE_INGREDIENT_MODAL,
} from "../actions/modalActions";

const defaultState = {
  selectedIngredient: null,
};

export const modalReducer = (state = defaultState, action) => {
  switch (action.type) {
    case OPEN_INGREDIENT_MODAL:
      return { ...state, selectedIngredient: action.payload };
    case CLOSE_INGREDIENT_MODAL:
      return { ...state, selectedIngredient: null };
    default:
      return state;
  }
};

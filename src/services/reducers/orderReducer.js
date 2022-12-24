import { GET_ORDER, RESET_ORDER } from "../actions/orderActions";

const defaultState = {
  currentOrder: { order: null },
};

export const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
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

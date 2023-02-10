import { GET_ORDER, RESET_ORDER, GET_ORDER_FAILED } from "../actions/orderActions";

const defaultState = {
  currentOrder: { order: null },
  orderRequestFailed: false,
};

export const orderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        currentOrder: { ...state.currentOrder, order: action.payload },
      };
      case GET_ORDER_FAILED:
      return {
        ...state,
        orderRequestFailed: true,
      };
    case RESET_ORDER:
      return { ...state, currentOrder: { ...state.currentOrder, order: null } };
    default:
      return state;
  }
};

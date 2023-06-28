import {
  GET_ORDER,
  RESET_ORDER,
  GET_ORDER_FAILED,
} from "../actions/orderActions";
import { TOrderActions } from "../actions/orderActions";
export type TOrderState = {
  currentOrder: { order: null | number },
  orderRequestFailed: boolean,
};

const defaultState: TOrderState = {
  currentOrder: { order: null },
  orderRequestFailed: false,
};

export const orderReducer = (state = defaultState, action: TOrderActions) => {
  switch (action.type) {
    case GET_ORDER:
      return {
        ...state,
        currentOrder: { ...state.currentOrder, order: action.payload },
        orderRequestFailed: false,
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

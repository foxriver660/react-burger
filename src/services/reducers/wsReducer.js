import {
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from "../actions/wsActions";

const initialState = {
  wsConnected: false,
  orders: {orders:[]},
};

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};

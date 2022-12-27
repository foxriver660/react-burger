import { getOrderAPI } from "../../components/utils/burger-api";
export const GET_ORDER = "GET_ORDER";
export const RESET_ORDER = "RESET_ORDER";

// ГЕНЕРАТОР THUNK
export const getApiOrder = (ingredients) => (dispatch) => {
    getOrderAPI(ingredients)
      .then((res) => dispatch({ type: GET_ORDER, payload: res.order.number }))
      .catch((err) => {
        console.log(err);
      });
  };
// ГЕНЕРАТОРЫ
export const resetOrder = () => ({ type: RESET_ORDER });

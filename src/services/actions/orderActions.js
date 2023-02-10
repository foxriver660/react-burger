import { getOrderAPI } from "../../components/utils/burger-api";
import { refreshToken } from "./profileActions";
import { getCookie } from "../../components/utils/cookie";
export const GET_ORDER = "GET_ORDER";
export const RESET_ORDER = "RESET_ORDER";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";
// ГЕНЕРАТОР THUNK
export const getApiOrder = (ingredients, token) => (dispatch) => {
  getOrderAPI(ingredients, token)
    .then((res) => {dispatch({ type: GET_ORDER, payload: res.order.number }); console.log("ДАННЫЕ НАПРАВЛЕНЫ getApiOrder:", res);})
    .catch((err) => {
      console.log(err);
      dispatch(refreshToken(getCookie("refreshToken")))
      dispatch({ type: GET_ORDER_FAILED })
    });
};
// ГЕНЕРАТОРЫ
export const resetOrder = () => ({ type: RESET_ORDER });

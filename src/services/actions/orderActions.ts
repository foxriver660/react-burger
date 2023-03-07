import { getOrderAPI } from "../../components/utils/burger-api";
import { refreshToken } from "./profileActions";
import { getCookie } from "../../components/utils/cookie";
import { AppDispatch, AppThunk } from "../types";
// !ACTIONS
export const GET_ORDER: "GET_ORDER" = "GET_ORDER";
export const RESET_ORDER: "RESET_ORDER" = "RESET_ORDER";
export const GET_ORDER_FAILED: "GET_ORDER_FAILED" = "GET_ORDER_FAILED";
// !ACTIONS TYPES
export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface IResetOrderAction {
  readonly type: typeof RESET_ORDER;
}
export interface IGetOrderAction {
  readonly type: typeof GET_ORDER;
  readonly payload: number;
}
// !UNION ALL
export type TOrderActions =
  | IGetOrderFailedAction
  | IResetOrderAction
  | IGetOrderAction;

// ACTIONS GENERATE
export const resetOrder = (): IResetOrderAction => ({ type: RESET_ORDER });
export const getOrder = (payload: number): IGetOrderAction => ({
  type: GET_ORDER,
  payload,
});
export const getOrderFailed = (): IGetOrderFailedAction => ({
  type: GET_ORDER_FAILED,
});
// ГЕНЕРАТОР THUNK
export const getApiOrder: AppThunk =
  (ingredients: string[], token: string) => (dispatch: AppDispatch) => {
    getOrderAPI(ingredients, token)
      .then((res) => {
         dispatch(getOrder(res.order.number));
        /* console.log("ДАННЫЕ НАПРАВЛЕНЫ getApiOrder:", res); */
      })
      .catch((err) => {
        console.log(err);
        // TODO РАЗОБРАТЬСЯ
        /* dispatch(refreshToken(getCookie("refreshToken"))); */
        dispatch(getOrderFailed());
      });
  };

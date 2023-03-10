import { RootState } from "../services/types";

// PROFILE STATE
export const getSuccessTokenUpdate = (state: RootState) =>
  state.profileReducer.successTokenUpdate;
export const getUpdatePassRequest = (state: RootState) =>
  state.profileReducer.updatePassRequest;
export const getResetPassRequest = (state: RootState) =>
  state.profileReducer.resetPassRequest;
export const getUpdateUserProfileFailed = (state: RootState) =>
  state.profileReducer.updateUserProfileFailed;
export const getUpdateUserProfileSuccess = (state: RootState) =>
  state.profileReducer.updateUserProfileSuccess;
export const getAuthUser = (state: RootState) => state.profileReducer.authUser;
// INGREDIENT REDUCER
export const getTotalCost = (state: RootState) =>
  state.ingredientReducer.totalCost;
export const getIngredients = (state: RootState) =>
  state.ingredientReducer.constructorIngredients;
export const getBun = (state: RootState) =>
  state.ingredientReducer.constructorBun;
export const getData = (state: RootState) =>
  state.ingredientReducer.availableIngredients;
export const getServerResponse = (state: RootState) =>
  state.ingredientReducer.serverResponse;
// ORDER REDUCER
export const getOrderRequestFailed = (state: RootState) =>
  state.orderReducer.orderRequestFailed;
export const getOrders = (state: RootState) => state.wsReducer.orders;
export const getOrder = (state: RootState) => state.orderReducer.currentOrder;
// WS REDUCER
export const getWsConnectedFailed = (state: RootState) =>
  state.wsReducer.wsConnectedFailed;

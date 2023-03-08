const getSuccessTokenUpdate = (state: any) =>
  state.profileReducer.successTokenUpdate;
const getUpdatePassRequest = (state: any) => state.profileReducer.updatePassRequest;
const getResetPassRequest = (state: any) => state.profileReducer.resetPassRequest;
const getTotalCost = (state: any) => state.ingredientReducer.totalCost;
const getOrder = (state: any) => state.orderReducer.currentOrder;
const getIngredients = (state: any) =>
  state.ingredientReducer.constructorIngredients;
const getBun = (state: any) => state.ingredientReducer.constructorBun;
const getOrderRequestFailed = (state: any) => state.orderReducer.orderRequestFailed;
const getAuthUser = (state: any) => state.profileReducer.authUser;
const getData = (state: any) => state.ingredientReducer.availableIngredients;
const getOrders = (state: any) => state.wsReducer.orders;
const getWsConnectedFailed = (state: any) => state.wsReducer.wsConnectedFailed;
const getServerResponse = (state: any) => state.ingredientReducer.serverResponse;
const getUpdateUserProfileFailed = (state: any) =>
  state.profileReducer.updateUserProfileFailed;
const getUpdateUserProfileSuccess = (state: any) =>
  state.profileReducer.updateUserProfileSuccess;
export {
  getSuccessTokenUpdate,
  getTotalCost,
  getOrder,
  getIngredients,
  getBun,
  getOrderRequestFailed,
  getAuthUser,
  getData,
  getOrders,
  getUpdatePassRequest,
  getServerResponse,
  getUpdateUserProfileFailed,
  getUpdateUserProfileSuccess,
  getResetPassRequest,
  getWsConnectedFailed,
};

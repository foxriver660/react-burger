const getSuccessTokenUpdate = (state) =>
  state.profileReducer.successTokenUpdate;
const getUpdatePassRequest = (state) => state.profileReducer.updatePassRequest;
const getResetPassRequest = (state) => state.profileReducer.resetPassRequest;
const getTotalCost = (state) => state.ingredientReducer.totalCost;
const getOrder = (state) => state.orderReducer.currentOrder;
const getIngredients = (state) =>
  state.ingredientReducer.constructorIngredients;
const getBun = (state) => state.ingredientReducer.constructorBun;
const getOrderRequestFailed = (state) => state.orderReducer.orderRequestFailed;
const getAuthUser = (state) => state.profileReducer.authUser;
const getData = (state) => state.ingredientReducer.availableIngredients;
const getOrders = (state) => state.wsReducer.orders;
const getWsConnectedFailed = (state) => state.wsReducer.wsConnectedFailed;
const getServerResponse = (state) => state.ingredientReducer.serverResponse;
const getUpdateUserProfileFailed = (state) =>
  state.profileReducer.updateUserProfileFailed;
const getUpdateUserProfileSuccess = (state) =>
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

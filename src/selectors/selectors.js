const getSuccessTokenUpdate = (state) =>
  state.profileReducer.successTokenUpdate;
const getTotalCost = (state) => state.ingredientReducer.totalCost;
const getOrder = (state) => state.orderReducer.currentOrder;
const getIngredients = (state) =>
  state.ingredientReducer.constructorIngredients;
const getBun = (state) => state.ingredientReducer.constructorBun;
const getOrderRequestFailed = (state) => state.orderReducer.orderRequestFailed;
const getAuthUser = (state) => state.profileReducer.authUser;
const getData = (state) => state.ingredientReducer.availableIngredients;
const getOrders = (state) => state.wsReducer.orders;
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
};

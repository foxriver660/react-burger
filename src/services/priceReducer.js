export default function priceReducer(state, action) {
  switch (action.type) {
    case "add":
      return { totalPrice: state.totalPrice + action.payload };
    case "reset":
      return { totalPrice: state.totalPrice * 0 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

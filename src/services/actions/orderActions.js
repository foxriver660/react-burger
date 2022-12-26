export const GET_ORDER = "GET_ORDER";
export const RESET_ORDER = "RESET_ORDER";


// ГЕНЕРАТОРЫ
export const getOrder = (payload) => ({type: GET_ORDER, payload})
export const resetOrder = () => ({type: RESET_ORDER})
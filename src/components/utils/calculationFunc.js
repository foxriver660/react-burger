import { BUN } from "./constant";

export const calcTotalPrice = (arr) =>
  arr.reduce(
    (acc, item) =>
      item.type === BUN ? acc + item.price * 2 : acc + item.price,
    0
  );
export const filterAvailableIngredients = (arr, wsArr) =>
  arr.filter((item) => {
    return wsArr?.ingredients?.some((item2) => item2 === item._id);
  });

export const countingOccurrences = (arr) =>
  arr?.ingredients?.reduce(function (acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

export const findIngredient = (arr, id) => arr.find((item) => item._id === id);

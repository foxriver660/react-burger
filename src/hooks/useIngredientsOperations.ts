import { useMemo } from "react";
import { getData } from "../selectors/selectors";
import { useAppSelector } from "../services/hooks";
import { TIngredient, TOrder } from "../services/types/data";
import { BUN } from "../utils/constant";

function useIngredientsOperations(
  entity?: TIngredient[] | TOrder[] | TOrder | any
) {
  const availableIngredients = useAppSelector(getData);

  let ordersIngredients: TIngredient[] = [];
  const getOrderIngredients = () => {
    entity?.ingredients.forEach((ingredientId: string) => {
      availableIngredients.forEach((ingredient) => {
        if (ingredient._id === ingredientId) {
          ordersIngredients.push(ingredient);
        }
      });
    });
  };
  getOrderIngredients();

  const calcTotalPrice = (arr: TIngredient[]) => {
    return arr.reduce((acc, item) => {
      return item.type === undefined
        ? acc + 0
        : item.type === BUN
        ? acc + item.price * 2
        : acc + item.price;
    }, 0);
  };
  const filterAvailableIngredients = (arr: TIngredient[], wsArr: TOrder) =>
    arr.filter((item) => {
      return wsArr?.ingredients?.some((item2: any) => item2 === item._id);
    });

  const countingOccurrences = useMemo(
    () => (arr: any) =>
      arr?.ingredients?.reduce(function (acc: any, el: any) {
        acc[el] = (acc[el] || 0) + 1;
        return acc;
      }, {}),
    []
  );

  //  !ВЫЧИСЛЕНИЯ

  const filteredIngredients = filterAvailableIngredients(
    availableIngredients,
    entity
  );
  const totalPrice = calcTotalPrice(ordersIngredients);
  const quantityIngredients = countingOccurrences(entity);

  return {
    filteredIngredients,
    totalPrice,
    quantityIngredients,
    calcTotalPrice,
  };
}

export default useIngredientsOperations;

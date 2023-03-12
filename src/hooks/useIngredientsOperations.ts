
import { useMemo } from "react";
import { getData } from "../selectors/selectors";
import { useAppSelector } from "../services/hooks";
import { TIngredient, TOrder } from "../services/types/data";
import { BUN } from "../utils/constant";

const useIngredientsOperations = (a?: TIngredient[] | ReadonlyArray<TOrder> | TOrder, b?: string) => {
  
  const availableIngredients = useAppSelector(getData);
  
  const calcTotalPrice = (arr: TIngredient[]) =>
 { return arr.reduce(
    (acc, item) =>
      {return item.type === undefined ? acc + 0 :  item.type === BUN ? acc + item.price * 2 : acc + item.price},
    0
  );}
const filterAvailableIngredients = (arr: TIngredient[] , wsArr: TOrder) =>
  arr.filter((item) => {
      return wsArr?.ingredients?.some((item2: any) => item2 === item._id);
  });

const countingOccurrences = useMemo(()=> (arr: any) =>
  arr?.ingredients?.reduce(function (acc: any, el: any) {
           acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {}), []) ;


//  !ВЫЧИСЛЕНИЯ
let order: any = a
if(b){
  const findIngredient = (arr:  any, id: string) => arr.find((item: any) => item._id === id);
  order = findIngredient(a, b)   ;}
const filteredIngredients = useMemo(()=> filterAvailableIngredients(availableIngredients, order), [availableIngredients, order]);
const totalPrice = useMemo(()=> calcTotalPrice(filteredIngredients), [filteredIngredients]);
const quantityIngredients = countingOccurrences(order);

  return { order, filteredIngredients, totalPrice, quantityIngredients, calcTotalPrice };
};

export default useIngredientsOperations;
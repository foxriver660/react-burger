
import { getData } from "../selectors/selectors";
import { useAppSelector } from "../services/hooks";
import { TIngredient } from "../services/types/data";
import { BUN } from "../utils/constant";

const useIngredientsOperations = (a: any, b: string | undefined) => {
  
  const availableIngredients = useAppSelector(getData);
  
  const calcTotalPrice = (arr: TIngredient[]) =>
  arr.reduce(
    (acc, item) =>
      item.type === BUN ? acc + item.price * 2 : acc + item.price,
    0
  );
const filterAvailableIngredients = (arr: TIngredient[] , wsArr: any) =>
  arr.filter((item) => {
    return wsArr?.ingredients?.some((item2: any) => item2 === item._id);
  });

const countingOccurrences = (arr: any) =>
  arr?.ingredients?.reduce(function (acc: any, el: any) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});


//  !ВЫЧИСЛЕНИЯ
let order: any = a
if(b){
  const findIngredient = (arr:  any, id: string) => arr.find((item: any) => item._id === id);
  order = findIngredient(a, b);}
const filteredIngredients = filterAvailableIngredients(availableIngredients, order);
const totalPrice = calcTotalPrice(filteredIngredients);
const quantityIngredients = countingOccurrences(order);

  return { order, filteredIngredients, totalPrice, quantityIngredients };
};

export default useIngredientsOperations;
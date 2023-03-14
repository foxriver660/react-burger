import { TIngredient, TOrder } from "../services/types/data";

function useDetermineEntity(
  arr?: TIngredient[] | TOrder[],
  identifier?: string
) {
  const findEntity = (arr: any, id?: string) =>
    arr.find((item: any) => item._id === id);
  const order = findEntity(arr, identifier);

  return { order };
}

export default useDetermineEntity;

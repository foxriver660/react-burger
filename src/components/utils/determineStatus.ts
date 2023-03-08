import { TOrder } from "../../services/types/data";

export const status = (order: TOrder) => {
  return order?.status === "done"
    ? "Выполнен"
    : order?.status === "created"
    ? "Создан"
    : order?.status === "pending"
    ? "Готовится"
    : "Отменен";
};
export const statusColor = (order: TOrder) => {
   return order?.status === "done"
    ? { color: "#00cccc" }
    : order?.status === "cancel"
    ? { color: "red" }
    : { color: "white" };
};

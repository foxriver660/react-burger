import { TOrder } from "../services/types/data";
import { CANCEL, CREATED, DONE, PENDING } from "./constant";

export const status = (order: TOrder) => {
  return order?.status === DONE
    ? "Выполнен"
    : order?.status === CREATED  
    ? "Создан"
    : order?.status === PENDING
    ? "Готовится"
    : "Отменен";
};
export const statusColor = (order: TOrder) => {
  return order?.status === DONE
    ? { color: "var(--color-done)" }
    : order?.status === CANCEL
    ? { color: "var(--color-red)" }
    : { color: "var(--color-modal-outline)" };
};


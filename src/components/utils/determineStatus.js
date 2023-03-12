export const status = (order) => {
  return order?.status === "done"
    ? "Выполнен"
    : order?.status === "created"
    ? "Создан"
    : order?.status === "pending"
    ? "Готовится"
    : "Отменен";
};
export const statusColor = (order) => {
  return order?.status === "done"
    ? { color: "#00cccc" }
    : order?.status === "cancel"
    ? { color: "red" }
    : { color: "white" };
};

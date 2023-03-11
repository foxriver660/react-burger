import { getCookie } from "./cookie";

export const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const BURGER_API_AUTH_URL = `${BURGER_API_URL}/auth`;
export const WS_URL = "wss://norma.nomoreparties.space/orders";
export const WS_URL_FEED = `${WS_URL}/all`;
export const WS_URL_HISTORY = `${WS_URL}?token=${getCookie("token")}`;
// ТИП ИНГРЕДИЕНТОВ
export const SAUCE = "sauce";
export const BUN = "bun";
export const MAIN = "main";
// ТИП ОШИБКИ
export const JWT_MALFORMED = "jwt malformed";
export const JWT_EXPIRED = "jwt expired";
export const INVALID_TOKEN = "Invalid or missing token";
// СТАТУСЫ ЗАКАЗА
export const DONE = "done";
export const CREATED = "created";
export const PENDING = "pending";
export const CANCEL = "cancel";

export const PATH = {
  HOME: "/",
  FEED: "/feed",
  PROFILE: "/profile",
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",

  ORDERS: "/orders",
  INGREDIENT: "/ingredients/:id",
  INGREDIENTS: "/ingredients",

  ORDER: "/feed/:id",
  USER_ORDERS: "/profile/orders",
  USER_ORDER: "/profile/orders/:id",
};
// TODO: this

export const BURGER_API_URL = "https://norma.nomoreparties.space/api";
export const ENDPOINT = {
  AUTH: "/auth",
  INGREDIENTS: "/ingredients",
  ORDERS: "/orders",
  PASSWORD_RESET: "/password-reset",
  PASSWORD_RESET_RESET: "/password-reset/reset",
  // USER
  LOGOUT: "/auth/logout",
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  USER: "/auth/user",
  // TOKEN
  REFRESH_TOKEN: "/auth/token",
};

export const WS_URL = "wss://norma.nomoreparties.space/orders";
export const WS_URL_FEED = `${WS_URL}/all`;

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
  HOME: "/react-burger/",
  FEED: "/feed",
  PROFILE: "/profile",
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ORDERS: "/orders",
  INGREDIENTS: "/ingredients",
  PROFILE_ORDERS: "/profile/orders",
};

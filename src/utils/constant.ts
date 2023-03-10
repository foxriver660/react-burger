import { getCookie } from "./cookie";

const BURGER_API_URL = "https://norma.nomoreparties.space/api";
const BURGER_API_AUTH_URL = `${BURGER_API_URL}/auth`;
const WS_URL = "wss://norma.nomoreparties.space/orders";
const WS_URL_HISTORY = `${WS_URL}?token=${getCookie("token")}`;
// ТИП ИНГРЕДИЕНТОВ
const SAUCE = "sauce";
const BUN = "bun";
const MAIN = "main";
// ТИП ОШИБКИ
const JWT_MALFORMED = "jwt malformed";
const JWT_EXPIRED = "jwt expired";
const INVALID_TOKEN = 'Invalid or missing token';
export {
  BURGER_API_URL,
  BURGER_API_AUTH_URL,
  SAUCE,
  BUN,
  MAIN,
  JWT_MALFORMED,
  JWT_EXPIRED,
  INVALID_TOKEN,
  WS_URL_HISTORY,
  WS_URL
};

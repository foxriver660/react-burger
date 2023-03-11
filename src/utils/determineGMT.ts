// ОПРЕДЕЛЯЕМ GMT
const curOffset = new Date().getTimezoneOffset() / 60;
export const gmt =
  "i-GMT" + (curOffset > 0 ? "-" + curOffset : "+" + -curOffset);
// TODO: this
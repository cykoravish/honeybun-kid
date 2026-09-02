import { createHmac, timingSafeEqual } from "crypto";

export const ORDERS_COOKIE = "orders_auth";

function secret() {
  const s = process.env.ORDERS_AUTH_SECRET;
  if (!s) throw new Error("Missing ORDERS_AUTH_SECRET environment variable");
  return s;
}

export function tokenForPassword(password: string) {
  return createHmac("sha256", secret()).update(password).digest("hex");
}

export function isCorrectPassword(candidate: string) {
  const expected = process.env.ORDERS_PASSWORD;
  if (!expected) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export function isValidToken(token: string | undefined) {
  const expected = process.env.ORDERS_PASSWORD;
  if (!token || !expected) return false;
  const a = Buffer.from(token);
  const b = Buffer.from(tokenForPassword(expected));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

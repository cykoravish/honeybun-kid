// TODO(client): replace with the real WhatsApp business number (country code, no + or spaces)
export const WHATSAPP_NUMBER = "910000000000";

// TODO(client): replace with the real Instagram handle
export const INSTAGRAM_HANDLE = "honeybun.lb";
export const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_HANDLE}`;

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

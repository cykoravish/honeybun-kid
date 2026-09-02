import { Resend } from "resend";
import type { OrderInput } from "./orders";

export async function sendOrderNotification(order: OrderInput, orderId: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.ORDER_NOTIFY_EMAIL;

  if (!apiKey || !notifyEmail) {
    // Not configured yet — order is still saved to the database either way.
    console.log(`[orders] Skipping email for order ${orderId} (Resend not configured)`);
    return;
  }

  const resend = new Resend(apiKey);

  const itemsList = order.items
    .map((i) => `${i.quantity} × ${i.name} (${i.size}) — ₹${i.price * i.quantity}`)
    .join("\n");

  try {
    await resend.emails.send({
      from: "Honeybun Orders <orders@honeybunkidswear.example>",
      to: notifyEmail,
      subject: `New order from ${order.customerName} — ₹${order.subtotal}`,
      text: `New order (COD)

Customer: ${order.customerName}
Phone: ${order.phone}
Address: ${order.address}, ${order.city}
Notes: ${order.notes || "—"}

Items:
${itemsList}

Subtotal: ₹${order.subtotal}

View all orders: /orders`,
    });
  } catch (err) {
    // Never let an email failure block the order — it's already saved.
    console.error(`[orders] Failed to send email for order ${orderId}`, err);
  }
}

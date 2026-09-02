import { NextResponse } from "next/server";
import { createOrder, type CartItem } from "@/lib/orders";
import { sendOrderNotification } from "@/lib/order-email";

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isValidItems(v: unknown): v is CartItem[] {
  if (!Array.isArray(v) || v.length === 0) return false;
  return v.every(
    (item) =>
      item &&
      isNonEmptyString(item.slug) &&
      isNonEmptyString(item.name) &&
      isNonEmptyString(item.size) &&
      isNonEmptyString(item.image) &&
      typeof item.price === "number" &&
      item.price > 0 &&
      typeof item.quantity === "number" &&
      item.quantity > 0 &&
      item.quantity <= 20
  );
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { customerName, phone, address, city, notes, items, subtotal } = body;

  if (
    !isNonEmptyString(customerName) ||
    !isNonEmptyString(phone) ||
    !isNonEmptyString(address) ||
    !isNonEmptyString(city) ||
    !isValidItems(items) ||
    typeof subtotal !== "number" ||
    subtotal <= 0
  ) {
    return NextResponse.json(
      { error: "Please fill in all required fields." },
      { status: 400 }
    );
  }

  // Recompute the subtotal server-side rather than trusting the client value.
  const computedSubtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const order = {
    customerName: customerName.trim().slice(0, 120),
    phone: phone.trim().slice(0, 30),
    address: address.trim().slice(0, 500),
    city: city.trim().slice(0, 100),
    notes: isNonEmptyString(notes) ? notes.trim().slice(0, 500) : undefined,
    paymentMethod: "cod" as const,
    items,
    subtotal: computedSubtotal,
  };

  try {
    const saved = await createOrder(order);
    // Don't let a slow/failed email delay the response to the customer.
    void sendOrderNotification(order, saved.id);
    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("[api/orders] Failed to save order", err);
    return NextResponse.json(
      { error: "We couldn't place your order. Please try again or message us on WhatsApp." },
      { status: 500 }
    );
  }
}

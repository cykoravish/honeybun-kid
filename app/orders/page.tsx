import { cookies } from "next/headers";
import type { Metadata } from "next";
import { isValidToken, ORDERS_COOKIE } from "@/lib/orders-auth";
import { listOrders } from "@/lib/orders";
import OrdersLogin from "@/components/OrdersLogin";
import OrdersLogoutButton from "@/components/OrdersLogoutButton";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Orders — Honeybun Kidswear",
  robots: { index: false, follow: false },
};

export default async function OrdersPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ORDERS_COOKIE)?.value;

  if (!isValidToken(token)) {
    return <OrdersLogin />;
  }

  let orders: Awaited<ReturnType<typeof listOrders>> = [];
  let loadError: string | null = null;
  try {
    orders = await listOrders();
  } catch (err) {
    console.error("[orders page] Failed to load orders", err);
    loadError =
      "Couldn't reach the database. Check MONGODB_URI and that this server's IP is allowed in Atlas' network access list.";
  }

  if (loadError) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl text-ink">Orders</h1>
          <OrdersLogoutButton />
        </div>
        <p className="mt-6 rounded-xl bg-rose/10 px-4 py-3 text-sm text-rose-deep">{loadError}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-5 py-12 sm:px-8 sm:py-16">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl text-ink">Orders</h1>
          <p className="mt-1 text-sm text-ink-soft">{orders.length} total</p>
        </div>
        <OrdersLogoutButton />
      </div>

      {orders.length === 0 ? (
        <p className="mt-10 text-ink-soft">No orders yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <div
              key={order._id.toString()}
              className="rounded-2xl border border-cream-deep bg-cream/40 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium text-ink">{order.customerName}</p>
                  <p className="text-sm text-ink-soft">{order.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-ink">₹{order.subtotal}</p>
                  <p className="text-xs text-ink-soft">
                    {new Date(order.createdAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-ink-soft">
                {order.address}, {order.city}
              </p>
              {order.notes && (
                <p className="mt-1 text-sm italic text-ink-soft">&ldquo;{order.notes}&rdquo;</p>
              )}

              <ul className="mt-4 space-y-1 border-t border-cream-deep pt-3 text-sm text-ink-soft">
                {order.items.map((item) => (
                  <li key={`${item.slug}-${item.size}`}>
                    {item.quantity} × {item.name} ({item.size}) — ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <p className="mt-3 inline-block rounded-full bg-honey/20 px-3 py-1 text-xs font-medium text-honey-deep">
                Cash on delivery · {order.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

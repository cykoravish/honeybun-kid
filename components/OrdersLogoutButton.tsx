"use client";

import { useRouter } from "next/navigation";

export default function OrdersLogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/orders/auth", { method: "DELETE" });
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-ink-soft hover:text-ink"
    >
      Log out
    </button>
  );
}

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartItem } from "@/lib/orders";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: string) => void;
  setQuantity: (slug: string, size: string, quantity: number) => void;
  clear: () => void;
  subtotal: number;
  count: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "honeybun-cart";

function sameLine(a: CartItem, b: { slug: string; size: string }) {
  return a.slug === b.slug && a.size === b.size;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once, on mount. This must run in an effect (not
  // a lazy useState initializer) so the server-rendered markup matches the
  // client's first paint before we hydrate in whatever was saved locally.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupt storage
    }
    setHydrated(true);
  }, []);

  // Persist on every change (after initial hydration)
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore quota errors
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((l) => sameLine(l, item));
      if (existing) {
        return prev.map((l) =>
          sameLine(l, item) ? { ...l, quantity: l.quantity + item.quantity } : l
        );
      }
      return [...prev, item];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((slug: string, size: string) => {
    setItems((prev) => prev.filter((l) => !sameLine(l, { slug, size })));
  }, []);

  const setQuantity = useCallback((slug: string, size: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((l) => !sameLine(l, { slug, size }))
        : prev.map((l) => (sameLine(l, { slug, size }) ? { ...l, quantity } : l))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const subtotal = useMemo(
    () => items.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [items]
  );
  const count = useMemo(() => items.reduce((sum, l) => sum + l.quantity, 0), [items]);

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    setQuantity,
    clear,
    subtotal,
    count,
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

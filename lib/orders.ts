import { ObjectId } from "mongodb";
import { getDb } from "./mongodb";

export type CartItem = {
  slug: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
};

export type OrderInput = {
  customerName: string;
  phone: string;
  address: string;
  city: string;
  notes?: string;
  paymentMethod: "cod";
  items: CartItem[];
  subtotal: number;
};

export type Order = OrderInput & {
  _id: ObjectId;
  status: "new" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: Date;
};

const COLLECTION = "orders";

export async function createOrder(input: OrderInput) {
  const db = await getDb();
  const doc = {
    ...input,
    status: "new" as const,
    createdAt: new Date(),
  };
  const result = await db.collection(COLLECTION).insertOne(doc);
  return { id: result.insertedId.toString(), ...doc };
}

export async function listOrders(): Promise<Order[]> {
  const db = await getDb();
  const docs = await db
    .collection(COLLECTION)
    .find({})
    .sort({ createdAt: -1 })
    .toArray();
  return docs as unknown as Order[];
}

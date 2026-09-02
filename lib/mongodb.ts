import { MongoClient } from "mongodb";

const rawUri = process.env.MONGODB_URI;

if (!rawUri) {
  throw new Error("Missing MONGODB_URI environment variable");
}

// Re-bind to a definitely-string const so TypeScript keeps this narrowed
// type inside the closure below (narrowing from the guard above doesn't
// carry into nested functions).
const uri: string = rawUri;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient> | undefined;

function getClientPromise() {
  if (!clientPromise) {
    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });
    if (process.env.NODE_ENV === "development") {
      // Reuse the client across HMR reloads in dev
      if (!global._mongoClientPromise) {
        global._mongoClientPromise = client.connect();
      }
      clientPromise = global._mongoClientPromise;
    } else {
      clientPromise = client.connect();
    }
  }
  return clientPromise;
}

export async function getDb() {
  const client = await getClientPromise();
  return client.db(process.env.MONGODB_DB || "honeybun");
}

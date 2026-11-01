import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

export async function getDatabase() {
  const uri = process.env.MONGODB_URL;
  if (!uri) {
    throw new Error("MONGODB_URL is not configured.");
  }

  if (!globalForMongo.mongoClientPromise) {
    globalForMongo.mongoClientPromise = new MongoClient(uri).connect();
  }

  try {
    return (await globalForMongo.mongoClientPromise).db("vobyarinnovate");
  } catch (error) {
    globalForMongo.mongoClientPromise = undefined;
    throw error;
  }
}

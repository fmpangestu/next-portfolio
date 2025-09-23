/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
if (!URI) throw new Error("Missing MONGODB_URI");

let cached = (global as any)._mongoose;
if (!cached) cached = (global as any)._mongoose = { conn: null, promise: null };

export async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    // bantu cek env benar2 terbaca
    console.log("[Mongo] connecting to:", URI.split("@")[1]?.split("/")[0], "db:", URI.split("/").pop()?.split("?")[0]);

    cached.promise = mongoose
      .connect(URI, { serverSelectionTimeoutMS: 8000, tls: true })
      .catch((err) => {
        console.error("[Mongo] connect error:", err?.message || err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

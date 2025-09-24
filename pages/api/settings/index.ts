// pages/api/settings/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import Setting from "@/models/Setting";
import { SettingsSchema, type SettingsInput } from "@/lib/zod-settings";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const doc = await Setting.findById("singleton").lean();
    return res.status(200).json({ data: doc ?? null });
  }

  if (req.method === "PUT") {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

    const parsed = SettingsSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const payload: SettingsInput = parsed.data;
    const updated = await Setting.findByIdAndUpdate("singleton", payload, { upsert: true, new: true });
    return res.status(200).json({ data: updated });
  }

  res.setHeader("Allow", ["GET", "PUT"]);
  return res.status(405).end("Method Not Allowed");
}

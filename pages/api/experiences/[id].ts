/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/db";
import Experience from "@/models/Experience";
import { ExperienceCreateSchema } from "@/lib/zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query as { id: string };

  // Jangan balas 400 untuk format id yang jelek — langsung 404 saja
  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ error: "Not found" });
  }

  try {
    if (req.method === "GET") {
      const doc = await Experience.findById(id).lean();
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ data: { ...doc, id: String((doc as any)._id) } });
    }

    if (req.method === "PUT") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

      const parsed = ExperienceCreateSchema.partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

      const updated = await Experience.findByIdAndUpdate(id, parsed.data, { new: true });
      if (!updated) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ id: String(updated._id) });
    }

    if (req.method === "DELETE") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

      const doc = await Experience.findById(id);
      if (!doc) return res.status(404).json({ error: "Not found" });

      await doc.deleteOne();
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end("Method Not Allowed");
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Internal error";
    console.error("[/api/experiences/:id] error:", e);
    return res.status(500).json({ error: msg });
  }
}

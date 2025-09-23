/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import Experience from "@/models/Experience";
import { ExperienceCreateSchema } from "@/lib/zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === "GET") {
    const lang = (req.query.lang as "id" | "en") || "id";
    const docs = await Experience.find({ published: true }).sort({ start: -1 }).lean();
    const data = docs.map((d: any) => ({
      id: String(d._id),
      company: d.company,
      start: d.start,
      end: d.end,
      tools: d.tools,
      role: d.translations?.[lang]?.role ?? d.translations?.id?.role,
      description: d.translations?.[lang]?.description ?? d.translations?.id?.description,
    }));
    return res.status(200).json({ data });
  }

  if (req.method === "POST") {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

    const parsed = ExperienceCreateSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

    const created = await Experience.create(parsed.data);
    return res.status(201).json({ id: String(created._id) });
  }

  res.setHeader("Allow", ["GET","POST"]);
  return res.status(405).end("Method Not Allowed");
}

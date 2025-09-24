// pages/api/certificates/index.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import Certificate from "@/models/Certificate";
import { CertificateCreateSchema } from "@/lib/zod";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const lang = (req.query.lang as "id" | "en") || "id";
      const docs = await Certificate.find({ published: true }).sort({ createdAt: -1 }).lean();
      const data = docs.map((d: any) => ({
        id: String(d._id),
        image_path: d.image_path,
        sertificate_url: d.sertificate_url,
        title: d.translations?.[lang]?.title ?? d.translations?.id?.title ?? d.translations?.en?.title,
        description: d.translations?.[lang]?.description ?? d.translations?.id?.description ?? d.translations?.en?.description,
      }));
      return res.status(200).json({ data });
    }

    if (req.method === "POST") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

      const parsed = CertificateCreateSchema.safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

      const created = await Certificate.create(parsed.data);
      return res.status(201).json({ id: String(created._id) });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end("Method Not Allowed");
  } catch (e: any) {
    console.error("[/api/certificates] error:", e);
    return res.status(500).json({ error: e?.message || "Internal error" });
  }
}

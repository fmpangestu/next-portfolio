// pages/api/certificates/[id].ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import Certificate from "@/models/Certificate";
import { CertificateCreateSchema } from "@/lib/zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // helper yg kita buat

const BUCKET = "portfolio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    const { id } = req.query as { id: string };

    if (req.method === "GET") {
      const doc = await Certificate.findById(id).lean();
      if (!doc || Array.isArray(doc)) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ data: { ...doc, id: String((doc as any)._id) } });
    }

    if (req.method === "PUT") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

      const parsed = CertificateCreateSchema.partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

      const updated = await Certificate.findByIdAndUpdate(id, parsed.data, { new: true });
      if (!updated) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ id: String(updated._id) });
    }

    if (req.method === "DELETE") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

      const doc = await Certificate.findById(id);
      if (!doc) return res.status(404).json({ error: "Not found" });

      // hapus file di Supabase kalau ada storage_path
      if ((doc as any).storage_path) {
        const supabase = supabaseAdmin.storage.from(BUCKET);
        await supabase.remove([(doc as any).storage_path]);
      }
      await doc.deleteOne();
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end("Method Not Allowed");
  } catch (e: any) {
    console.error("[/api/certificates/:id] error:", e);
    return res.status(500).json({ error: e?.message || "Internal error" });
  }
}

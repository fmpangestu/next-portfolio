/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { dbConnect } from "@/lib/db";
import Project from "@/models/Project";
import { ProjectCreateSchema } from "@/lib/zod";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { slugify } from "@/lib/slug";

const BUCKET = "portfolio";

function isObjectId(id: string) {
  return mongoose.Types.ObjectId.isValid(id);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  const { id } = req.query as { id: string };

  if (!isObjectId(id)) return res.status(400).json({ error: "Invalid id" });

  try {
    if (req.method === "GET") {
      const doc = await Project.findById(id).lean();
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ data: { ...doc, id: String((doc as any)._id) } });
    }

    if (req.method === "PUT") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

      // partial update
      const parsed = ProjectCreateSchema.partial().safeParse(req.body);
      if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

      const payload: any = { ...parsed.data };

      // kalau slug di-update, rapikan dengan slugify + tangani duplikasi sederhana
      if (typeof payload.slug === "string" && payload.slug.trim()) {
        payload.slug = slugify(payload.slug);
        const exists = await Project.findOne({ slug: payload.slug, _id: { $ne: id } }).lean();
        if (exists) return res.status(409).json({ error: "Slug already exists" });
      }

      const updated = await Project.findByIdAndUpdate(id, payload, { new: true });
      if (!updated) return res.status(404).json({ error: "Not found" });

      return res.status(200).json({ id: String(updated._id) });
    }

    if (req.method === "DELETE") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) return res.status(401).json({ error: "Unauthorized" });

      const doc: any = await Project.findById(id);
      if (!doc) return res.status(404).json({ error: "Not found" });

      // hapus file di Supabase kalau ada storage_path
      if (doc.storage_path) {
        const supabase = supabaseAdmin.storage.from(BUCKET);
        await supabase.remove([doc.storage_path]); // contoh: "projects/xxx.png"
      }

      await doc.deleteOne();
      return res.status(204).end();
    }

    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    return res.status(405).end("Method Not Allowed");
  } catch (e: any) {
    console.error("[/api/projects/:id] error:", e);
    return res.status(500).json({ error: e?.message || "Internal error" });
  }
}

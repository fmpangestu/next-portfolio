// pages/api/upload.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const config = { api: { bodyParser: false } };

const BUCKET = "portfolio";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end("Method Not Allowed");

  // folder lewat query ?folder=projects | certificates (default: projects)
  const folder = (req.query.folder as string) || "projects";

  const form = formidable({
    multiples: false,
    keepExtensions: true,
    maxFileSize: 2 * 1024 * 1024,         // <= di sini (2 MB)
    filter: (part) => part.mimetype?.startsWith("image/") ?? false, // hanya image
  });

  form.parse(req, async (err, _fields, files) => {
    try {
      if (err) return res.status(400).json({ error: err.message });

      const raw = (files as Record<string, File | File[] | undefined>).file;
      const file: File | undefined = Array.isArray(raw) ? raw[0] : raw;
      if (!file?.filepath) return res.status(400).json({ error: "No file uploaded (key 'file')" });

      const bytes = await fs.readFile(file.filepath);
      const ext = path.extname(file.originalFilename || "") || ".bin";
      const name = `${Date.now()}-${nanoid(6)}${ext}`;
      const storagePath = `${folder}/${name}`;

      const { data: up, error: upErr } = await supabaseAdmin.storage
        .from(BUCKET)
        .upload(storagePath, bytes, {
          contentType: file.mimetype || "application/octet-stream",
          upsert: false,
        });
      if (upErr) return res.status(500).json({ error: upErr.message });

      const { data: pub } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(up!.path);
      return res.status(200).json({ path: pub.publicUrl, storagePath: up!.path });
    } catch (e: any) {
      return res.status(500).json({ error: e?.message || "Upload error" });
    }
  });
}

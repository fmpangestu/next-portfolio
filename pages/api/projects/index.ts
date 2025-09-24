/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import Project from "@/models/Project";
import { ProjectCreateSchema } from "@/lib/zod";
import { slugify } from "@/lib/slug";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();

    if (req.method === "GET") {
      const lang = (req.query.lang as "id" | "en") || "id";
      const category = req.query.category as string | undefined;
      const query: any = { published: true };
      if (category) query.category = category;

      const docs = await Project.find(query).sort({ createdAt: -1 }).lean();
      const data = docs.map((d: any) => ({
        id: String(d._id),
        slug: d.slug,
        username: d.username,
        image_path: d.image_path,
        deployed_url: d.deployed_url,
        github_url: d.github_url,
        category: d.category,
        key_techs: d.key_techs,
        references: d.references,
        title: d.translations?.[lang]?.title ?? d.translations?.id?.title,
        description: d.translations?.[lang]?.description ?? d.translations?.id?.description,
      }));
      return res.status(200).json({ data });
    }

    if (req.method === "POST") {
      const token = (req.headers.authorization || "").replace("Bearer ", "");
      if (token !== process.env.ADMIN_TOKEN) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const parsed = ProjectCreateSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }

      // auto generate slug bila kosong
      let { slug } = parsed.data;
      if (!slug || !slug.trim()) {
        slug = slugify(parsed.data.translations.en.title || parsed.data.translations.id.title);
      } else {
        slug = slugify(slug);
      }

      // handle kemungkinan slug bentrok => tambah sufiks angka
      let finalSlug = slug;
      for (let i = 1; i <= 50; i++) {
        // cek apakah ada yang pakai
        // eslint-disable-next-line no-await-in-loop
        const exists = await Project.exists({ slug: finalSlug });
        if (!exists) break;
        finalSlug = `${slug}-${i}`;
      }

      const created = await Project.create({ ...parsed.data, slug: finalSlug });
      return res.status(201).json({ id: String(created._id), slug: created.slug });
    }

    res.setHeader("Allow", ["GET", "POST"]);
    return res.status(405).end("Method Not Allowed");
  } catch (e: any) {
    // Beri pesan jelas
    if (e?.code === 11000) {
      return res.status(409).json({ error: "Slug already exists" });
    }
    console.error("[/api/projects] error:", e);
    return res.status(500).json({ error: e?.message || "Internal error" });
  }
}

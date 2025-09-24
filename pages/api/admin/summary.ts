// pages/api/admin/summary.ts
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";
import Project from "@/models/Project";
import Certificate from "@/models/Certificate";
import Experience from "@/models/Experience";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");
  await dbConnect();

  const [projectsCount, certificatesCount, experiencesCount] = await Promise.all([
    Project.countDocuments({}),
    Certificate.countDocuments({}),
    Experience.countDocuments({}),
  ]);

  const [recentProjects, recentCertificates, recentExperiences] = await Promise.all([
    Project.find({}).select("slug translations createdAt").sort({ createdAt: -1 }).limit(5).lean(),
    Certificate.find({}).select("translations createdAt").sort({ createdAt: -1 }).limit(5).lean(),
    Experience.find({}).select("company translations start end createdAt").sort({ createdAt: -1 }).limit(5).lean(),
  ]);

  res.status(200).json({
    data: {
      counts: { projects: projectsCount, certificates: certificatesCount, experiences: experiencesCount },
      recents: {
        projects: recentProjects.map((p:any)=>({
          id: String(p._id),
          title: p.translations?.id?.title || p.translations?.en?.title || p.slug,
          createdAt: p.createdAt,
        })),
        certificates: recentCertificates.map((c:any)=>({
          id: String(c._id),
          title: c.translations?.id?.title || c.translations?.en?.title || "Certificate",
          createdAt: c.createdAt,
        })),
        experiences: recentExperiences.map((e:any)=>({
          id: String(e._id),
          title: e.translations?.id?.role || e.translations?.en?.role || e.company,
          createdAt: e.createdAt,
        })),
      },
    },
  });
}

// pages/api/admin/health.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end("Method Not Allowed");

  const out = {
    mongo: false,
    supabase: false,
    env: {
      MONGO_ATLAS_URI: !!process.env.MONGO_ATLAS_URI,
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE: !!process.env.SUPABASE_SERVICE_ROLE,
      NEXT_PUBLIC_ADMIN_TOKEN: !!process.env.NEXT_PUBLIC_ADMIN_TOKEN,
    },
  };

  try {
    await dbConnect();
    out.mongo = true;
  } catch {
    out.mongo = false;
  }

  out.supabase = !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE);

  res.status(200).json({ data: out });
}

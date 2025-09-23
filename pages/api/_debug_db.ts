import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "@/lib/db";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    res.status(200).json({ ok: true });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    res.status(500).json({
      ok: false,
      name: e?.name,
      code: e?.code,
      message: e?.message,
      reason: e?.reason,
    });
  }
}

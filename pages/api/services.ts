import { NextApiRequest, NextApiResponse } from "next";
import { services } from "@/data";
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(services);
  res.status(200).json({ services });
};
export default handler;

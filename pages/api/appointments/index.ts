import type { NextApiRequest, NextApiResponse } from "next";
import appointments from "../../../data";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json(appointments);
};

export default handler;

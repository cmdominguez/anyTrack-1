import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../db';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const shippingStatus = await prisma.shippingStatus.findMany();
  res.status(200).json(shippingStatus);
};


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    default:
      return res.status(405).json("error");
  }
}

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  if(!req.query.id){
    return
  }
  
  const shippings = await prisma.shipping.findUnique({
    where: {
      id: Number(req.query.id),
    },
    select: {
      shipload: true,
      driver: {
        select: {
          name: true,
        },
      },
      vehicle: {
        select: {
          patent: true,
          position: true,
          type: {
            select: {
              name: true,
            },
          },
        },
      },
      receiver: {
        select: {
          name: true,
          phone: true,
          address: true,
        },
      },
      sender: {
        select: {
          name: true,
          phone: true,
          address: true,
        },
      },
    },
  });
  res.status(200).json(shippings);
}

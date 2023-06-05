import { Prisma, PrismaClient, Shipping } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const shippings = await prisma.shipping.findMany({
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
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    destination,
    shipload,
    origin,
    driverId,
    receiverId,
    senderId,
    vehicleId,
  } = req.body as Prisma.ShippingUncheckedCreateInput;

  try {
    const newShipping = prisma.shipping.create({
      data: {
        destination,
        shipload,
        origin,
        driverId,
        receiverId,
        senderId,
        vehicleId,
        shippingStatusId: 1,
      },
    });
    if ((await newShipping).id) {
      res.status(200).json(newShipping);
    } else {
      res.status(500).json("Error to create shipping");
    }
  } catch (e) {
    res.status(500).json(e);
    throw e;
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    default:
      return res.status(405).json("error");
  }
}

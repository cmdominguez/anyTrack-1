import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

const selectShippings = async (where: Prisma.ShippingWhereInput) => {
  const shippings = await prisma.shipping.findMany({
    where,
    select: {
      origin: true,
      destination: true,
      shipload: true,
      createdAt: true,
      updatedAt: true,
      status: {
        select: {
          name: true,
        },
      },
      driver: {
        select: {
          id: true,
          name: true,
        },
      },
      vehicle: {
        select: {
          id: true,
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
          id: true,
          name: true,
          phone: true,
          address: true,
        },
      },
      sender: {
        select: {
          id: true,
          name: true,
          phone: true,
          address: true,
        },
      },
    },
  });

  return shippings;
};

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const where: Prisma.ShippingWhereInput = req.query.status
    ? {
        shippingStatusId: {
          equals: Number(req.query.status),
        },
      }
    : {};

  const shippings = await selectShippings(where);

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
      const shipping = await selectShippings({
        id: (await newShipping).id,
      });
      res.status(200).json(shipping);
    } else {
      res.status(500).json("Error to create shipping");
    }
  } catch (e: any) {
    res.status(500).send(e.message);
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

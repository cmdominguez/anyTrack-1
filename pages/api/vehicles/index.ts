import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../db';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const where: Prisma.VehicleWhereInput = req.query.search
    ? {
        patent: {
          contains: String(req.query.search),
        },
      }
    : {};
  const vehicles = await prisma.vehicle.findMany({
    where,
  });
  res.status(200).json(vehicles);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { vehicleTypeId, patent } =
    req.body as Prisma.VehicleUncheckedCreateInput;

  try {
    const newVehicle = await prisma.vehicle.create({
      data: {
        vehicleTypeId,
        patent,
      },
    });
    if (newVehicle) {
      res.status(200).json(newVehicle);
    } else {
      res.status(500).json("Error to create driver");
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

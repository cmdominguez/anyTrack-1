import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const where: Prisma.VehicleWhereInput = req.query.search
    ? {
        patent: {
          contains: String(req.query.search),
          mode: "insensitive",
        },
      }
    : {};
  const vehicles = await prisma.vehicle.findMany({
    where,
    select: {
      id: true,
      patent: true,
      type: {
        select: {
          id: true,
          name: true,
        },
      },
    },
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
      const vehicle = await prisma.vehicle.findUnique({
        where: {
          id: newVehicle.id,
        },
        select: {
          id: true,
          patent: true,
          type: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      res.status(200).json(vehicle);
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

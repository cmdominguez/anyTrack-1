import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });
  res.status(200).json(vehicle);
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const updatedVehicle = await prisma.vehicle.update({
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
      where: {
        id: Number(req.query.id),
      },
      data: req.body,
    });
    res.status(200).json(updatedVehicle);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const deletedVehicle = await prisma.vehicle.delete({
      where: {
        id: Number(req.query.id),
      },
    });
    res.status(200).json(deletedVehicle);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.id) {
    return;
  }

  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "PUT":
      return handlePut(req, res);
    case "DELETE":
      return handleDelete(req, res);
    default:
      return res.status(405).json("error");
  }
}

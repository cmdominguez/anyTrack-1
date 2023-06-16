import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const where: Prisma.DriverWhereInput = req.query.search
    ? {
        OR: [
          {
            dni: {
              contains: String(req.query.search),
            },
          },
          {
            email: {
              contains: String(req.query.search),
              mode: "insensitive",
            },
          },
        ],
      }
    : {};
  const clientUsers = await prisma.driver.findMany({
    where,
  });
  res.status(200).json(clientUsers);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, dni } = req.body as Prisma.DriverUncheckedCreateInput;

  try {
    const newDriver = await prisma.driver.create({
      data: {
        email,
        name,
        dni,
      },
    });
    if (newDriver) {
      res.status(200).json(newDriver);
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

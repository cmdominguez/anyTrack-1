import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db";

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const where = req.query.search
    ? {
        OR: [
          {
            dni: {
              contains: String(req.query.search),
            },
          },
          {
            name: {
              contains: String(req.query.search),
            },
          },
          {
            address: {
              contains: String(req.query.search),
            },
          },
        ],
      }
    : {};
  const clientUsers = await prisma.clientUser.findMany({
    where,
    select: {
      address: true,
      dni: true,
      name: true,
      phone: true,
      id: true,
    },
  });
  res.status(200).json(clientUsers);
};

const handlePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { address, dni, name, phone } =
    req.body as Prisma.ClientUserUncheckedCreateInput;

  try {
    const newClient = await prisma.clientUser.create({
      data: {
        address,
        dni,
        name,
        phone,
      },
    });
    if (newClient) {
      res.status(200).json(newClient);
    } else {
      res.status(500).json("Error to create cliente");
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

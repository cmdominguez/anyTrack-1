import { Prisma, PrismaClient, Shipping } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientUsers = await prisma.clientUser.findMany({
    select: {
      address: true,
      dni: true,
      name: true,
      phone: true,
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
  } catch (e) {
    console.log(e);

    res.status(500).send(e);
    // throw e;
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

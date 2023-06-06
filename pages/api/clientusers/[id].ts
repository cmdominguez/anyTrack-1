import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from '../../../db';

const handleGet = async (req: NextApiRequest, res: NextApiResponse) => {
  const clientuser = await prisma.clientUser.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });
  res.status(200).json(clientuser);
};

const handlePut = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const updatedClient = await prisma.clientUser.update({
      where: {
        id: Number(req.query.id),
      },
      data: req.body,
    });
    res.status(200).json(updatedClient);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};

const handleDelete = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const deletedClient = await prisma.clientUser.delete({
      where: {
        id: Number(req.query.id),
      },
    });
    res.status(200).json(deletedClient)
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

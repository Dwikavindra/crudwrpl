import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { searchName } = req.body;

  try {
    const response = await prisma.product.findMany({
      where: {
        name: {
          contains: searchName,
        },
      },
    });
    res.send(response);
  } catch (e) {
    console.log(e);
  }
}

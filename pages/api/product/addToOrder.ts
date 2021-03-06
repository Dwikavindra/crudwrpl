import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { prisma } from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const email = req.body[0].email;
  const arrayA = [...req.body];
  const session = await getSession({ req });
  if (session) {
    arrayA.forEach(async (item) => {
      try {
        await prisma.product.update({
          where: {
            productID: item.productID,
          },
          data: {
            stock: parseInt(item.stock) - parseInt(item.quantity),
          },
        });
      } catch (e) {
        console.log(e);
      }
    });
    console.log(arrayA);
    arrayA.forEach((item: any) => {
      delete item.stock;
    });
    try {
      await prisma.orders.createMany({
        data: arrayA,
      });
      await prisma.cart.deleteMany({
        where: {
          email,
        },
      });
      res.status(200).end();
    } catch (e) {
      console.log(e);
    }
  } else {
    return res.status(401);
  }
}

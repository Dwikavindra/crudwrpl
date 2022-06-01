import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../../lib/prisma";

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
//     const product: Prisma.productCreateInput = JSON.parse(req.body);
//     const savedProduct = await prisma.product.create({ data: product });
//     res.status(200).json(savedProduct);
//   } catch (err) {
//     res.status(400).json({ message: "Something went wrong" });
//   }
// };
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, cost, description, productID, imageUrl } = req.body;

  try {
    await prisma.product.create({
      data: {
        productID,
        name,
        description,
        cost,
        imageUrl,
      },
    });
    res.status(200).json({ message: "succesfuly created" });
  } catch (e) {
    console.log(imageUrl);
    console.log(e);
  }
}

import { Product } from "../../src/helper/types";

export const addProductToDB = async (data: Product) => {
  try {
    fetch("http://localhost:3000/api/product/addproduct", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (e) {
    console.log(e);
  }
};

import { Product } from "../../pages/product/edit/[id]";

export const submitToDB = async (data: Product) => {
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

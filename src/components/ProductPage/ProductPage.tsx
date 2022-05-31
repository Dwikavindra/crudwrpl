import { product } from "@prisma/client";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import { ProductGridDiv } from "./styled";
async function deleteProductOnDatabase(id: number) {
  const status = await axios
    .delete(`http://localhost:3000/product/${id.toString()}`)
    .catch((error) => {
      if (error.response) {
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
    });
  return status;
}

type HomeProp = {
  products: product[];
};
export default function ProductPage(props: HomeProp) {
  const [products, setProducts] = useState<product[]>(props.products);

  return (
    <>
      <ProductGridDiv>
        {products.map((product: product) => {
          return (
            <ProductCard
              key={product.productID}
              productId={product.productID}
              productName={product.name}
              productPrice={product.cost}
              productImageUrl={product.imageUrl}
            ></ProductCard>
          );
        })}
      </ProductGridDiv>
    </>
  );
}

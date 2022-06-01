import { product } from "@prisma/client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import ProductCard from "./ProductCard";
import Image from "next/image";

type HomeProp = {
  products: product[];
};
export default function ProductPage(props: HomeProp) {
  const [products, setProducts] = useState<product[]>(props.products);
  const [searchedProduct, setSearchedProduct] = useState<any[]>([]);
  const [searchName, setSearchName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (searchName === "") {
      setSearchedProduct([]);
      return;
    }
    setIsLoading(true);
    async function fetchData() {
      await fetch("http://localhost:3000/api/product/searchproduct", {
        body: JSON.stringify({ searchName }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          setSearchedProduct(data);
          setIsLoading(false);
        });
    }
    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchName]);

  const handler = debounce((e) => {
    setSearchName(e?.target?.value);
  }, 300);

  return (
    <div className="pt-[76px] relative">
      <div className="w-full bg-[#DBE1EE] flex items-center justify-evenly h-20 px-4 rounded-b-2xl mb-5 sticky top-[76px] z-20">
        <input
          className="w-[95%] rounded-lg h-10 pl-2 outline-none border-custom-lightOrange border-[1px]"
          type="text"
          onChange={handler}
          placeholder="Search a product"
          spellCheck={false}
        />
        <button>
          <Image
            src="/magnifier.svg"
            alt="search-logo"
            width="20"
            height="20"
          />
        </button>
      </div>
      {searchName === "" ? (
        <div className="grid grid-cols-2 gap-y-5 pb-8 justify-items-center content-evenly sm:grid-cols-3 sm:gap-y-8 sm:gap-x-5 lg:grid-cols-5 lg:gap-y-12 lg:gap-x-9">
          {products.map((product: product) => {
            return (
              <ProductCard
                key={product.productID}
                productId={product.productID}
                productName={product.name}
                productPrice={product.cost}
                productImageUrl={product.imageUrl}
              />
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-y-5 pb-8 justify-items-center content-evenly sm:grid-cols-3 sm:gap-y-8 sm:gap-x-5 lg:grid-cols-5 lg:gap-y-12 lg:gap-x-9">
          {isLoading ? (
            <div className="mx-auto w-screen flex justify-center">
              <Image
                src="/loading.svg"
                width={50}
                height={50}
                alt="loading"
                className="animate-spin"
              />
            </div>
          ) : (
            searchedProduct.map((product) => {
              return (
                <ProductCard
                  key={product.productID}
                  productId={product.productID}
                  productName={product.name}
                  productPrice={product.cost}
                  productImageUrl={product.imageUrl}
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}

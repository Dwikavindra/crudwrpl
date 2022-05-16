import { Prisma } from "@prisma/client";
import { useState } from "react";
import { uid } from "uid";
import Header from "../src/components/Header/Header";
import Router from "next/router";
import Image from "next/image";

interface Product {
  name: string;
  cost: string;
  description: string;
  productID: string;
}

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({ productID: "", name: "", cost: "", description: "" });
  const [isOpen, setIsOpen] = useState(false);

  const submitToDB = async (data: Product) => {
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

  const submitHandler = (e: any) => {
    if (product.cost === "" || product.name === "" || product.description === "") return;
    try {
      e.preventDefault();
      submitToDB(product);
      setProduct({ productID: "", name: "", cost: "", description: "" });
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        Router.push("/");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };
  const cancelHandler = () => {
    setProduct({ productID: "", name: "", cost: "", description: "" });
    setTimeout(() => {
      Router.push("/");
    }, 100);
  };
  return (
    <>
      <Header />
      <div className={`absolute mx-auto right-0 left-0 top-24 z-50 font-semibold flex flex-col justify-center items-center w-[25%] h-24 bg-green-400 rounded-md select-none gap-y-3 ${isOpen ? "flex" : "hidden"}`}>
        <p className="text-2xl">Product Added!</p>
        <p className="">Redirecting to main page</p>
      </div>
      <div className="pt-36 text-center font-semibold text-lg md:text-xl lg:text-2xl">
        <h1>Add New Product</h1>
      </div>
      <div className="flex flex-col lg:flex-row mt-3 lg:mt-7 gap-x-24 lg:justify-around mx-auto w-[85vw] lg:w-[65vw] lg:h-[65vh]">
        <div className="w-full  lg:w-1/2 grid grid-cols-2 p-7 lg:p-5 gap-4">
          <Image src={"/placeholder.png"} width="100%" height="100%" />
          <Image src={"/placeholder.png"} width="100%" height="100%" />
          <Image src={"/placeholder.png"} width="100%" height="100%" />
          <Image src={"/placeholder.png"} width="100%" height="100%" />
        </div>
        <div className="w-full  lg:w-1/2">
          <form onSubmit={submitHandler} spellCheck={false} autoComplete="off" className="w-full h-full lg:mt-20 mx-auto">
            <div className="flex flex-col gap-y-2 mb-5">
              <label htmlFor="productName" className="lg:text-xl font-semibold">
                Name
              </label>
              <input
                className="w-[80%] sm:w-[65%] lg:w-[60%] overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Name"
                type="text"
                name="productName"
                id="productName"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                maxLength={14}
              />
            </div>
            <div className="flex flex-col gap-y-2 mb-5">
              <label htmlFor="productCost" className="lg:text-xl font-semibold">
                Price
              </label>
              <input
                className="w-1/2 lg:w-1/3 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                placeholder="Enter Price"
                type="text"
                name="productCost"
                id="productCost"
                value={product.cost}
                onChange={(e) => setProduct({ ...product, cost: e.target.value })}
                maxLength={15}
              />
            </div>
            <div className="flex flex-col gap-y-2 mb-10">
              <label htmlFor="productDesc" className="lg:text-xl font-semibold">
                Description
              </label>
              <textarea
                className="w-[80%] sm:w-[65%] lg:w-1/2 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500 resize-y pb-5"
                placeholder="Enter Description"
                rows={2}
                name="productDesc"
                id="productDesc"
                value={product.description}
                onChange={(e) => setProduct({ ...product, description: e.target.value })}
                maxLength={16}
              />
            </div>
            <div className="flex gap-x-4">
              <button
                className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-2 py-2 rounded"
                type="submit"
                onClick={() => {
                  setProduct({ ...product, productID: String(uid(25)) });
                }}
              >
                Add Product
              </button>
              <button className="bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition text-white px-4 py-2 rounded" type="reset" onClick={cancelHandler}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

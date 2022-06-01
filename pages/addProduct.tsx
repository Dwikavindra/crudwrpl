import { Prisma } from "@prisma/client";
import { useState } from "react";
import { uid } from "uid";
import Header from "../src/components/Header/Header";
import Router from "next/router";
import Image from "next/image";
import { Product } from "../src/helper/types";
import { submitProduct } from "../src/firebase/firebase";
import { addProductToDB } from "../src/database/addtoDB";

export default function AddProduct() {
  const [product, setProduct] = useState<Product>({
    productID: String(uid(25)),
    name: "",
    cost: "",
    description: "",
    imageUrl: "",
  });
  const [isOpen, setIsOpen] = useState(false);
  const [imageString, setImageString] = useState<string>("/placeholder.png");
  const [imageFile, setImageFile] = useState<File>();

  const submitImageLocally = (file: any) => {
    if (file.target.files && file.target.files[0]) {
      setImageFile(file.target.files[0]);
      setImageString(URL.createObjectURL(file.target.files[0]));
    }
  };

  const submitHandler = async (e: any) => {
    if (
      product.cost === "" ||
      product.name === "" ||
      product.description === "" ||
      product.imageUrl == null
    )
      return;
    try {
      e.preventDefault();
      setIsOpen(true);
      await submitProduct(imageFile!, product, addProductToDB);
      setTimeout(() => {
        setProduct({
          productID: "",
          name: "",
          cost: "",
          description: "",
          imageUrl: "",
        });
        setIsOpen(false);
        Router.push("/");
      }, 3000);
    } catch (e) {
      console.log(e);
    }
  };
  const cancelHandler = () => {
    setProduct({
      productID: "",
      name: "",
      cost: "",
      description: "",
      imageUrl: "",
    });
    setTimeout(() => {
      Router.push("/");
    }, 3000);
  };
  return (
    <>
      <div>
        <Header />
        {isOpen && (
          <div
            className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-screen`}
          >
            <div
              className={`fixed mx-auto top-32 right-0 left-0 font-semibold flex flex-col justify-center items-center w-[20%] h-24 bg-custom-darkBlue text-custom-lightGrey rounded-md select-none gap-y-3`}
            >
              <p className="text-2xl ">Product Added!</p>
              <p className="">Redirecting to main page</p>
            </div>
          </div>
        )}
        <div className="pt-36 text-center font-semibold text-lg md:text-xl lg:text-2xl">
          <h1>Add Product</h1>
        </div>
        <div className="flex flex-col lg:flex-row mt-3 lg:mt-7 gap-x-24 lg:justify-around mx-auto w-[85vw] lg:w-[65vw] lg:h-[65vh]">
          <div className=" flex border-2 border-black justify-items-center justify-center align-middle lg:w-60 lg:h-60">
            <div className="min-w-full">
              <Image
                src={imageString}
                alt="img-template"
                width="100%"
                height="100%"
                layout="responsive"
              ></Image>
            </div>
          </div>
          <div className="w-full  lg:w-1/2">
            <form
              onSubmit={submitHandler}
              spellCheck={false}
              autoComplete="off"
              className="w-full h-full lg:mt-20 mx-auto"
            >
              <div className="flex flex-col gap-y-2 mb-5">
                <label
                  htmlFor="productName"
                  className="lg:text-xl font-semibold"
                >
                  Name
                </label>
                <input
                  className="w-[80%] sm:w-[65%] lg:w-[60%] overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                  placeholder="Enter Name"
                  type="text"
                  name="productName"
                  id="productName"
                  value={product.name as string}
                  onChange={(e) =>
                    setProduct({ ...product, name: e.target.value })
                  }
                  maxLength={14}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 mb-5">
                <label
                  htmlFor="productCost"
                  className="lg:text-xl font-semibold"
                >
                  Price
                </label>
                <input
                  className="w-1/2 lg:w-1/3 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500"
                  placeholder="Enter Price"
                  type="text"
                  name="productCost"
                  id="productCost"
                  value={product.cost as string}
                  onChange={(e) =>
                    setProduct({ ...product, cost: e.target.value })
                  }
                  maxLength={15}
                  required
                />
              </div>
              <div className="flex flex-col gap-y-2 mb-10">
                <label
                  htmlFor="productDesc"
                  className="lg:text-xl font-semibold"
                >
                  Description
                </label>
                <textarea
                  className="w-[80%] sm:w-[65%] lg:w-1/2 overflow-auto p-2 rounded border border-gray-400 outline-1 outline-gray-700 focus:border-gray-500 resize-y pb-5"
                  placeholder="Enter Description"
                  rows={2}
                  name="productDesc"
                  id="productDesc"
                  value={product.description as string}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                  maxLength={16}
                  required
                />
              </div>
              <div className="flex border-2 border-black">
                <label
                  htmlFor="productCost"
                  className="lg:text-xl font-semibold"
                >
                  Upload Your Image
                </label>
                <input
                  onChange={submitImageLocally}
                  type="file"
                  accept="image/png, image/jpeg"
                ></input>
              </div>
              <div className="flex gap-x-4 mt-4">
                <button
                  className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-3 py-2 rounded"
                  type="submit"
                  disabled={isOpen ? true : false}
                  onClick={() => {
                    setProduct({ ...product, productID: String(uid(25)) });
                  }}
                >
                  Update
                </button>
                <button
                  className="bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition text-white px-4 py-2 rounded"
                  type="reset"
                  onClick={cancelHandler}
                  disabled={false}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

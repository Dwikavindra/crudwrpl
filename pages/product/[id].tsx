import Header from "../../src/components/Header/Header";
import { prisma } from "../../lib/prisma";
import { useState } from "react";
import Image from "next/image";
import Router from "next/router";
import Head from "next/head";

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const product = await prisma.product.findUnique({
    where: {
      productID: id,
    },
  });
  return { props: { product } };
}

export default function Detail(props: any) {
  const [product, setProduct] = useState({ productID: props.product.productID, name: props.product.name, cost: props.product.cost, description: props.product.description });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenToast, setIsOpenToast] = useState(false);

  // console.log(props);

  const editHandler = () => {
    Router.push("/product/edit/" + props.product.productID);
  };

  const openModalHandler = () => {
    setIsOpenModal(true);
  };

  const closeModalHandler = () => {
    setIsOpenModal(false);
  };

  const deleteHandler = () => {
    setIsOpenModal(false);
    setIsOpenToast(true);
    setTimeout(() => {
      setIsOpenToast(false);
      Router.push("/");
    }, 3000);
  };
  return (
    <>
      <Head>
        <title>{product.name} | Detail Product</title>
      </Head>
      <Header />
      {isOpenModal && <DeleteProduct product={product} handleClose={closeModalHandler} deleteHandler={deleteHandler} />}
      {isOpenToast && (
        <div className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-screen flex justify-center items-center`}>
          <div className={`font-semibold flex flex-col items-center justify-center w-[20%] h-[20%] bg-custom-darkBlue text-custom-lightGrey rounded-md gap-y-4`}>
            <p className="text-2xl">Product Deleted!</p>
            <p className="">Redirecting to main page</p>
          </div>
        </div>
      )}
      <div className="pt-28 lg:pt-36 text-center font-semibold text-lg md:text-xl lg:text-2xl">
        <h1>Product Detail</h1>
      </div>
      <div className="flex flex-col lg:flex-row mt-3 lg:mt-8 lg:justify-center lg:h-[65vh]">
        <div className="w-full h-[37vh] lg:h-full lg:w-[40%] flex flex-col items-center justify-center gap-y-4 lg:gap-y-16">
          <Image src={"/placeholder.png"} alt="img-template" width={160 * 2} height={153 * 2} objectFit="contain" />
          <div className="flex gap-x-3 justify-center sm:justify-around w-[70%]">
            <Image src={"/placeholder.png"} alt="img-template" width="80" height="76" />
            <Image src={"/placeholder.png"} alt="img-template" width="80" height="76" />
            <Image src={"/placeholder.png"} alt="img-template" width="80" height="76" />
          </div>
        </div>
        <div className="w-full lg:w-1/2 h-full flex flex-col gap-y-3 justify-between py-2 px-8 lg:px-0">
          <div className="space-y-3 mt-5">
            <p className="text-4xl lg:text-5xl font-bold text-custom-darkBlue">{product.name}</p>
            <p className="text-xl font-semibold">{product.cost}</p>
            <p className="text-lg">{product.description}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-medium text-2xl">Stock: {props.product.stock}</p>
            <div className="flex gap-x-2 select-none">
              <Image src={"/minus.svg"} width={30} height={30} alt="minus" />
              <p className="text-lg font-medium">{props.product.stock}</p>
              <Image src={"/plus.svg"} width={30} height={30} alt="minus" />
            </div>
          </div>
          <div className="flex lg:flex-col gap-x-5 lg:w-[60%] gap-y-4 lg:mb-5 lg:text-xl lg:mx-auto">
            <button className="bg-custom-lightOrange hover:bg-[#e2910f] font-semibold transition text-white px-3 py-2 rounded-md" onClick={editHandler}>
              Edit Item
            </button>
            <button className="bg-white border-[2px] lg:border-[3px] hover:bg-[#f1f1f1] border-custom-lightOrange font-semibold transition text-custom-lightOrange px-4 py-2 rounded-md" type="reset" onClick={openModalHandler}>
              Delete Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function DeleteProduct({ product, handleClose, deleteHandler }: { product: any; handleClose: any; deleteHandler: any }) {
  const { productID: id, name } = product;
  const deleteDataOnDB = (data: string) => {
    try {
      fetch("http://localhost:3000/api/product/deleteproduct", {
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
  const handleDelete = () => {
    deleteDataOnDB(id);
    deleteHandler();
  };
  return (
    <div className={`absolute select-none bg-black bg-opacity-30 z-40 w-screen h-[110vh] md:h-screen flex justify-center items-center`}>
      <div className={`flex flex-col justify-center items-center px-10 sm:px-16 py-8 md:px-24 md:py-12 lg:px-32 lg:py-20 bg-custom-darkBlue text-custom-lightGrey rounded-md select-none gap-y-3`}>
        <div className="flex flex-col gap-y-4 mb-4">
          <p className="text-2xl font-semibold">Are you sure you want to delete:</p>
          <hr />
          <div>
            <p className="text-xl font-medium text-custom-lightOrange">
              Product Name : <span className="text-white">{name}</span>
            </p>
            <p className="text-xl font-medium text-custom-lightOrange">
              Product ID : <span className="text-white">{id}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-x-4">
          <button onClick={handleDelete} className="px-6 py-2 bg-custom-lightOrange rounded hover:bg-[#e2910f] font-semibold transition text-white">
            Yes
          </button>
          <button onClick={handleClose} className="px-4 py-2 rounded bg-custom-darkOrange hover:bg-[#d45133] font-semibold transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

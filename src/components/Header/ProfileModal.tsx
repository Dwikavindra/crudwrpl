import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
export default function ProfileModal() {
  const router = useRouter();
  return (
    <div className="bg-custom-lightOrange space-y-3 text-white font-medium absolute top-16 z-20 min-w-max left-5 rounded-b-lg overflow-hidden">
      <p
        className="cursor-pointer hover:bg-[#db9017] p-2"
        onClick={() => {
          router.push("/addProduct");
        }}
      >
        Add Product
      </p>
      <p className="cursor-pointer hover:bg-[#db9017] p-2">Order Tracker</p>
      <p
        className="cursor-pointer hover:bg-[#db9017] p-2"
        onClick={() => signOut()}
      >
        Sign Out
      </p>
    </div>
  );
}

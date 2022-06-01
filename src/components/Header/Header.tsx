import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import ProfileModal from "./ProfileModal";

export default function Header() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLButtonElement>(null);
  // console.log(session?.user?.image);
  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (isOpen && !ref?.current!.contains(e.target)) {
        setIsOpen(false);
      } else return;
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [isOpen]);
  return (
    <div className="w-full fixed z-20 flex justify-between bg-[#16213b] px-6 py-3">
      <Link href={"/"} passHref>
        <a className="p-2 hover:bg-[#1d2b4d] rounded-lg transition">
          <Image src="/home.svg" alt="home" width="30" height="30" />
        </a>
      </Link>
      <div className="flex items-center w-36 h-12">
        <Image src="/logo.svg" alt="icon" width="480px" height="136px" />
      </div>
      <div className="flex items-center gap-x-3 relative">
        <Link href={"/cart"} passHref>
          <a className="p-2 hover:bg-[#db9017] rounded-full flex items-center transition bg-custom-lightOrange">
            <Image src="/Vector.svg" alt="home" width="25" height="25" />
          </a>
        </Link>
        <button
          className="flex items-center hover:bg-[#1d2b4d] p-1 rounded-md transition"
          onClick={() => setIsOpen(!isOpen)}
          ref={ref}
        >
          <Image
            src={session?.user?.image!}
            alt={session?.user?.name!}
            width={45}
            height={45}
            className="rounded-full"
          />
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </button>
        {isOpen && <ProfileModal />}
      </div>
    </div>
  );
}

import { HeaderAddProductButtonWrapper, HeaderContent, HeaderLogoWrapper, NavBar } from "../globalstyled";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <NavBar>
      <HeaderContent>
        <Image src="/home.svg" alt="home" width="100%" height="100%"></Image>
        <HeaderLogoWrapper>
          <Image src="/placeholder.png" alt="icon" width="240px" height="60px"></Image>
        </HeaderLogoWrapper>
        <HeaderAddProductButtonWrapper>
          <Link href={"/addProduct"}>
            <p className="font-semibold text-white cursor-pointer">Add New Product</p>
          </Link>
        </HeaderAddProductButtonWrapper>
      </HeaderContent>
    </NavBar>
  );
}

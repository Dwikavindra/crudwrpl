import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  productId: string | null;
  productName: string | null;
  productPrice: string | null;
  productImageUrl: string | null;
};

export default function ProductCard(props: ProductCardProps) {
  const returnImageUrl = (imageUrl: string | null): string => {
    if (imageUrl === null) {
      return "/placeholder.png";
    } else {
      return imageUrl as string;
    }
  };
  return (
    <Link href={"/product/" + props.productId} passHref>
      <a className="bg-[#e5e5e5] border-[1px] border-[#9b9b9b] h-72 w-52 rounded-xl shadow-xl hover:scale-[1.02] transition duration-200">
        <div className="w-40 h-full mx-auto flex flex-col justify-center gap-y-5">
          <Image alt="placeholder" src={returnImageUrl(props.productImageUrl)} width="160" height="160" />
          <div>
            <p>{props.productName}</p>
            <p className="font-bold">Rp {parseInt(props?.productPrice!).toLocaleString("en-US", { maximumFractionDigits: 2 })}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}

import { Button } from "@/components/ui/button";
import { ShopCategories } from "@/lib/ShopCategories";
import { ExternalLink, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface MyShopProps {
  logo: string;
  name: string;
  uniqueUrl: string;
  category: string;
}

function Shop({ logo, name, uniqueUrl, category }: MyShopProps) {
    const ShopCategory = ShopCategories.find((shopCategory) => shopCategory.data === category);
  return (
    <div className="border rounded-xl shadow-md w-52 text-center px-3 py-3">
      <div className="flex justify-center">
        <Image src={logo} width={100} height={70} alt="Shop Logo" className="rounded-md" />
      </div>
      <div className="flex flex-col gap-3">
        <Link href={`/s/${uniqueUrl}`}><p className="text-xl font-semibold underline">{name}</p></Link>
        <div className="flex text-sm text-gray-500 gap-2 justify-center items-center">
            <Tag size={14}/>
            {ShopCategory?.label}
        </div>
        <Link href={`/s/${uniqueUrl}/dashboard`}>
        <Button className="w-full">Dashboard <ExternalLink /></Button>
        </Link>
      </div>
    </div>
  );
}

export default Shop;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { productType } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
function Product({ product }: { product: productType }) {
    return (
        <Card className="border shadow-md w-80">
            <CardHeader className="p-0">
                <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
                <CardTitle className="text-lg font-semibold">{product.name}</CardTitle>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">₹{product.price}</span>
                    <Link href={product.productUrl} target="_blank">
                        <Button size="sm">View Product</Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default Product
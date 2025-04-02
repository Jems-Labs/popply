import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const shopId = searchParams.get("id");

    if (!shopId) {
      return NextResponse.json({ msg: "No shop ID provided" }, { status: 400 });
    }

    const parsedShopId = parseInt(shopId);
    if (isNaN(parsedShopId)) {
      return NextResponse.json({ msg: "Invalid shop ID" }, { status: 400 });
    }

    const shop = await prisma.shop.findUnique({
      where: { id: parsedShopId },
    });

    if (!shop) {
      return NextResponse.json({ msg: "No shop found" }, { status: 404 });
    }

    const products = await prisma.product.findMany({
      where: { shopId: parsedShopId },
      include: { shop: true },
    });

    if (!products.length) {
      return NextResponse.json({ msg: "No products found" }, { status: 404 });
    }

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");

  try {
    if (!productId) {
      return NextResponse.json(
        { msg: "No product id provided" },
        { status: 400 }
      );
    }
    const parsedProductId = parseInt(productId);
    const product = await prisma.product.findUnique({
      where: { id: parsedProductId },
    });
    if (!product) {
      return NextResponse.json({ msg: "No product found" }, { status: 404 });
    }

    await prisma.product.update({
      where: { id: parsedProductId },
      data: {
        clicks: {
          increment: 1,
        },
      },
    });

    return NextResponse.json(
      { msg: "Clicks incremented successfully" },
      { status: 200 }
    );
  } catch (_) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

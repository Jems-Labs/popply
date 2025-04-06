import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const shopId = searchParams.get("id");
  const id = await getToken();
  try {
    if (!id || !shopId) {
      return NextResponse.json({ msg: "No id provided" }, { status: 400 });
    }
    const parsedShopId = parseInt(shopId);
    const shop = await prisma.shop.findUnique({
      where: {
        id: parsedShopId,
      },
    });

    if (!shop) {
      return NextResponse.json({ msg: "No shop found" }, { status: 404 });
    }
    if (shop.status !== "draft") {
      return NextResponse.json(
        { msg: "Shop is not in draft" },
        { status: 400 }
      );
    }
    const today = new Date();
    const expiresAt = new Date(today);
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.shop.update({
      where: { id: parsedShopId },
      data: {
        status: "open",
        launchDate: today,
        expiresAt: expiresAt,
      },
    });
    return NextResponse.json({ msg: "Launched" }, { status: 200 });
  } catch (_) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

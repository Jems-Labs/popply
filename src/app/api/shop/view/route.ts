import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const id = await getToken();
  const data = await req.json();
  const { shopId } = data;

  try {
    if (!id || !shopId) {
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const parsedShopId = parseInt(shopId);

    // check if already viewed
    const alreadyViewed = await prisma.shopView.findFirst({
      where: {
        userId: id,
        shopId: parsedShopId,
      },
    });

    if (alreadyViewed) {
      return NextResponse.json({ msg: "Already viewed" }, { status: 200 });
    }

    await prisma.shopView.create({
      data: {
        userId: id,
        shopId: parsedShopId,
      },
    });

    return NextResponse.json({ msg: "Viewed the shop" }, { status: 200 });
  } catch (_) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

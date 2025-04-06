import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const shops = await prisma.shop.findMany({
      where: {
        status: "open",
      },
      include: {
        upvotes: true,
      },
    });

    if (shops.length === 0) {
      return NextResponse.json({ msg: "No shops found" }, { status: 404 });
    }

    return NextResponse.json(shops, { status: 200 });
  } catch (_) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

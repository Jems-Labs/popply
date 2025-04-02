import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const id = await getToken();
  const { searchParams } = new URL(req.url);
  const shopUrl = searchParams.get("url");
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      return NextResponse.json({ msg: "No user found" }, { status: 400 });
    }
    if (!shopUrl) {
      return NextResponse.json(
        { msg: "No Shop URL provided" },
        { status: 40 }
      );
    }

    const shop = await prisma.shop.findUnique({
      where: {
        uniqueUrl: shopUrl,
        ownerId: id,
      },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    if (!shop) {
      return NextResponse.json({ msg: "No Shop found" }, { status: 404 });
    }

    return NextResponse.json(shop, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

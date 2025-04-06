import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { NextResponse } from "next/server";

export async function GET() {
  const id = await getToken();
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const shops = await prisma.shop.findMany({
      where: {
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

    return NextResponse.json(shops, { status: 200 });
  } catch (_) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

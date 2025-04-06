import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  try {
    if (!id) {
      return NextResponse.json({ msg: "No id provided" }, { status: 400 });
    }

    const parsedUserId = parseInt(id);
    if (isNaN(parsedUserId)) {
      return NextResponse.json({ msg: "Invalid id provided" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: parsedUserId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        shops: true,
        viewedShops: true,
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "No user found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

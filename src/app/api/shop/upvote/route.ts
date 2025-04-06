import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const userId = await getToken();

  if (!id) return NextResponse.json({ msg: "No shop id provided" }, { status: 400 });
  if (!userId) return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });

  const parsedId = Number(id);
  const parsedUserId = Number(userId);

  if (isNaN(parsedId) || isNaN(parsedUserId))
    return NextResponse.json({ msg: "Invalid id" }, { status: 400 });

  try {
    const shop = await prisma.shop.findUnique({
      where: { id: parsedId },
    });

    if (!shop) return NextResponse.json({ msg: "No shop found" }, { status: 404 });

    const alreadyUpvoted = await prisma.upvote.findFirst({
      where: {
        shopId: parsedId,
        userId: parsedUserId,
      },
    });

    if (alreadyUpvoted) {
      return NextResponse.json({ msg: "Already upvoted" }, { status: 400 });
    }

    await prisma.upvote.create({
      data: {
        shopId: parsedId,
        userId: parsedUserId,
      },
    });

    return NextResponse.json({ msg: "Upvoted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

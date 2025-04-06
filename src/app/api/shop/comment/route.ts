import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { addComment } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const id = await getToken();
  const data = await req.json();
  try {
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const validatedData = await addComment.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json({ msg: "Invalid Inputs" }, { status: 400 });
    }

    const { shopId, text } = validatedData.data;
    const shop = await prisma.shop.findUnique({
      where: { id: shopId },
    });

    if (!shop) {
      return NextResponse.json({ msg: "No shop found" }, { status: 404 });
    }

    await prisma.comment.create({
      data: {
        shopId,
        text,
        userId: id,
      },
    });

    return NextResponse.json({ msg: "Commented" }, { status: 200 });
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

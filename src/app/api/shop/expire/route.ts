
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();

    await prisma.shop.updateMany({
      where: {
        status: "open",
        expiresAt: {
          lt: now,
        },
      },
      data: {
        status: "expired",
      },
    });

    return NextResponse.json({ msg: "Expired shops updated"}, { status: 200 });
  } catch (_) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

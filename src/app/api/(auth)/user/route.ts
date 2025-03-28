import prisma from "@/lib/db";
import { getToken } from "@/lib/generateToken";
import { passwordCompare, passwordHash } from "@/lib/passwordHash";

import { NextResponse } from "next/server";

export async function GET() {
  try {
    const id = await getToken();
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "No User found" }, { status: 404 });
    }

    return NextResponse.json(
      {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const data = await req.json();
  try {
    const id = await getToken();
    if (!id) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 400 });
    }
    const { currentPassword, newPassword } = data;

    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      return NextResponse.json({ msg: "No User found" }, { status: 404 });
    }

    const isMatch = await passwordCompare(currentPassword, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: "Incorrect Password" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json(
        { msg: "Password must be at least 6 characters long" },
        { status: 400 }
      );
    }
    const hashedPassword = await passwordHash(newPassword);

    await prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({ msg: "Changed password" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

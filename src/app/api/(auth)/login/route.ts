import prisma from "@/lib/db";
import { generateTokenAndSetCookie } from "@/lib/generateToken";
import { passwordCompare } from "@/lib/passwordHash";
import { loginSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const validatedData = loginSchema.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json({ msg: "Invalid Inputs" }, { status: 400 });
    }
    const { email, password } = validatedData.data;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return NextResponse.json({ msg: "No user found" }, { status: 404 });
    }
    const isMatch = await passwordCompare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ msg: "Invalid credentials" }, { status: 400 });
    }
    const response = NextResponse.json(
      {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
      { status: 200 }
    );
    const res = generateTokenAndSetCookie(user?.id, response);
    return res;
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

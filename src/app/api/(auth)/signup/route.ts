
import prisma from "@/lib/db";
import { passwordHash } from "@/lib/passwordHash";
import { signupSchema } from "@/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();

  try {
    const validatedData = signupSchema.safeParse(data);
    if (!validatedData.success) {
      return NextResponse.json({ msg: "Invalid Inputs" }, { status: 400 });
    }
    const { name, email, password } = validatedData.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      return NextResponse.json({ msg: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await passwordHash(password);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    if (!newUser) {
      return NextResponse.json(
        { msg: "Failed to create new user" },
        { status: 400 }
      );
    }

    return NextResponse.json({ msg: "User created" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

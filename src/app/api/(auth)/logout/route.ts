import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json(
      { msg: "Logged Out" },
      { status: 200 }
    );
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
    });
    return response;
  } catch (error) {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

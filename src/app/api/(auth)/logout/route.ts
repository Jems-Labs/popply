import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({ msg: "Logged Out" }, { status: 200 });
    response.cookies.set("token", "", {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
    return response;
  } catch {
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}
